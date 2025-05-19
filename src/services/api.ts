
import { Student, StudentResponse } from "@/types";
import { toast } from "sonner";
import io, { Socket } from "socket.io-client";

const API_URL = "http://localhost:5000";
let socket: Socket | null = null;

export const initSocket = (): Socket => {
  if (!socket) {
    socket = io(API_URL);
    
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    
    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });
  }
  
  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const registerStudent = async (studentData: Student): Promise<StudentResponse> => {
  try {
    const response = await fetch(`${API_URL}/api/students`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to register student");
    }
    
    return await response.json();
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "Failed to register student");
    throw error;
  }
};

export const startCameraStream = (cameraIp: string, onFrame: (frameData: string) => void) => {
  const socket = initSocket();
  
  // Listen for camera frames from the server
  socket.on("camera_frame", (data) => {
    onFrame(data.image);
  });
  
  // Request the server to start streaming from the specified camera
  socket.emit("start_camera", { camera_ip: cameraIp });
  
  return () => {
    socket.off("camera_frame");
  };
};

export const stopCameraStream = () => {
  if (socket) {
    socket.emit("stop_camera");
  }
};

export const listenForStudentDetection = (callback: (student: Student) => void) => {
  const socket = initSocket();
  
  socket.on("student_detected", (data) => {
    if (data.success && data.student) {
      callback(data.student);
    }
  });
  
  return () => {
    socket.off("student_detected");
  };
};
