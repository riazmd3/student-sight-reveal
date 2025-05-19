
import React, { createContext, useState, useContext, ReactNode } from "react";
import { Student } from "@/types";

interface StudentContextType {
  detectedStudent: Student | null;
  setDetectedStudent: (student: Student | null) => void;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const StudentProvider = ({ children }: { children: ReactNode }) => {
  const [detectedStudent, setDetectedStudent] = useState<Student | null>(null);

  return (
    <StudentContext.Provider value={{ detectedStudent, setDetectedStudent }}>
      {children}
    </StudentContext.Provider>
  );
};

export const useStudent = () => {
  const context = useContext(StudentContext);
  if (context === undefined) {
    throw new Error("useStudent must be used within a StudentProvider");
  }
  return context;
};
