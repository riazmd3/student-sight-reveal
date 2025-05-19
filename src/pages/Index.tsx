
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import AddStudentForm from "@/components/AddStudentForm";
import TestMode from "@/components/TestMode";
import StudentCard from "@/components/StudentCard";
import { useStudent } from "@/context/StudentContext";
import { StudentProvider } from "@/context/StudentContext";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

const MainContent = () => {
  const [activeTab, setActiveTab] = useState<string>("dashboard");
  const { detectedStudent } = useStudent();

  return (
    <>
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="glass-panel mb-6 grid grid-cols-3">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="add-student">Add Student</TabsTrigger>
          <TabsTrigger value="test-mode">Test Mode</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="mt-0">
          <div className="glass-panel p-6 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Student Sight Reveal
              </h2>
              <p className="text-muted-foreground mt-2">
                Smart recognition system for instant student identification
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
              <Button 
                className="glass-panel h-auto py-10 flex flex-col items-center space-y-4 hover:bg-glass hover:bg-opacity-20 transition-all duration-300"
                variant="ghost"
                onClick={() => setActiveTab("add-student")}
              >
                <div className="w-16 h-16 rounded-full bg-blue-accent flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <span className="text-lg font-semibold">Add Student</span>
                <p className="text-sm text-muted-foreground">
                  Register new students with their details
                </p>
              </Button>
              
              <Button 
                className="glass-panel h-auto py-10 flex flex-col items-center space-y-4 hover:bg-glass hover:bg-opacity-20 transition-all duration-300"
                variant="ghost"
                onClick={() => setActiveTab("test-mode")}
              >
                <div className="w-16 h-16 rounded-full bg-purple-accent flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4z"/></svg>
                </div>
                <span className="text-lg font-semibold">Test Mode</span>
                <p className="text-sm text-muted-foreground">
                  Detect faces and retrieve student info
                </p>
              </Button>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    className="glass-panel h-auto py-10 flex flex-col items-center space-y-4 hover:bg-glass hover:bg-opacity-20 transition-all duration-300"
                    variant="ghost"
                  >
                    <div className="w-16 h-16 rounded-full bg-blue-accent/80 flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
                    </div>
                    <span className="text-lg font-semibold">Help & Info</span>
                    <p className="text-sm text-muted-foreground">
                      Learn how to use the system
                    </p>
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-panel border border-glass-border">
                  <div className="p-4 space-y-4">
                    <h3 className="text-xl font-bold">How to Use Student Sight Reveal</h3>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">1. Add Student</h4>
                      <p className="text-sm text-muted-foreground">
                        Upload a photo and enter student details to register them in the system.
                        Make sure to provide clear facial images for better recognition.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">2. Test Mode</h4>
                      <p className="text-sm text-muted-foreground">
                        Enter your camera IP address to start the stream. When a registered face
                        is detected, the system will display the student's details automatically.
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-medium">3. Student Details</h4>
                      <p className="text-sm text-muted-foreground">
                        Detected student information will appear in a card format showing all
                        relevant details including name, registration number, and other information.
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="add-student" className="mt-0">
          <AddStudentForm />
        </TabsContent>
        
        <TabsContent value="test-mode" className="mt-0">
          <TestMode />
        </TabsContent>
      </Tabs>
      
      {detectedStudent && (
        <div className="fixed bottom-4 right-4 w-80 z-50 animate-scale-in">
          <div className="px-4 py-2 bg-blue-accent text-white rounded-t-xl flex items-center justify-between">
            <span className="font-medium">Student Detected</span>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0 text-white hover:bg-blue-600"
              onClick={() => {
                document.getElementById('student-notification')?.classList.add('animate-fade-out');
                setTimeout(() => {
                  useStudent().setDetectedStudent(null);
                }, 300);
              }}
            >
              ✕
            </Button>
          </div>
          <div id="student-notification">
            <StudentCard student={detectedStudent} />
          </div>
        </div>
      )}
    </>
  );
};

const Index = () => {
  return (
    <StudentProvider>
      <Layout>
        <MainContent />
      </Layout>
    </StudentProvider>
  );
};

export default Index;
