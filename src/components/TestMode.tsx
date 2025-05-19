
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { startCameraStream, stopCameraStream, listenForStudentDetection } from "@/services/api";
import { useStudent } from "@/context/StudentContext";
import { toast } from "sonner";
import { Student } from "@/types";
import { Card } from "@/components/ui/card";

const TestMode = () => {
  const [cameraIp, setCameraIp] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentFrame, setCurrentFrame] = useState<string | null>(null);
  const { setDetectedStudent } = useStudent();
  const videoRef = useRef<HTMLImageElement>(null);
  const cleanupRef = useRef<() => void>(() => {});

  const handleStartStream = () => {
    if (!cameraIp) {
      toast.error("Please enter a camera IP address");
      return;
    }
    
    try {
      setIsStreaming(true);
      toast.success("Camera stream started");
      
      const cleanup = startCameraStream(cameraIp, (frameData) => {
        setCurrentFrame(`data:image/jpeg;base64,${frameData}`);
      });
      
      cleanupRef.current = cleanup;
      
      const studentDetectionCleanup = listenForStudentDetection((student) => {
        toast.info(`Student detected: ${student.Name}`);
        setDetectedStudent(student);
      });
      
      const originalCleanup = cleanupRef.current;
      cleanupRef.current = () => {
        originalCleanup();
        studentDetectionCleanup();
      };
    } catch (error) {
      console.error("Error starting camera stream:", error);
      toast.error("Failed to start camera stream");
      setIsStreaming(false);
    }
  };

  const handleStopStream = () => {
    stopCameraStream();
    cleanupRef.current();
    setIsStreaming(false);
    setCurrentFrame(null);
    toast.info("Camera stream stopped");
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (isStreaming) {
        stopCameraStream();
        cleanupRef.current();
      }
    };
  }, [isStreaming]);

  return (
    <div className="glass-panel p-6 animate-fade-in">
      <h2 className="text-2xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        Test Mode - Face Recognition
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex space-x-2">
            <Input
              type="text"
              value={cameraIp}
              onChange={(e) => setCameraIp(e.target.value)}
              placeholder="Enter camera IP address"
              className="tech-input flex-1"
              disabled={isStreaming}
            />
            {isStreaming ? (
              <Button className="tech-button bg-destructive hover:bg-destructive/80" onClick={handleStopStream}>
                Stop Stream
              </Button>
            ) : (
              <Button className="tech-button" onClick={handleStartStream}>
                Start Stream
              </Button>
            )}
          </div>
          
          <Card className="relative w-full aspect-video overflow-hidden bg-muted/30 flex items-center justify-center">
            {currentFrame ? (
              <img
                ref={videoRef}
                src={currentFrame}
                alt="Camera Feed"
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="text-center text-muted-foreground p-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                <p className="mt-2">Camera feed will appear here</p>
                <p className="text-sm mt-1">Start the stream to begin face detection</p>
              </div>
            )}
            
            {isStreaming && (
              <div className="absolute top-2 right-2 flex items-center space-x-2 bg-black/50 rounded-md px-2 py-1">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                <span className="text-xs text-white">LIVE</span>
              </div>
            )}
          </Card>
          
          <div className="text-sm text-muted-foreground">
            <p className="font-medium mb-1">Instructions:</p>
            <ol className="list-decimal ml-5 space-y-1">
              <li>Enter the IP address of your camera</li>
              <li>Click "Start Stream" to begin face detection</li>
              <li>Position faces clearly in the camera view</li>
              <li>Detected student information will appear on the right</li>
            </ol>
          </div>
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="m12 8 4 4-4 4"/></svg>
              <p className="mt-2">Student details will appear here</p>
              <p className="text-sm mt-1">When a face is detected and matched</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestMode;
