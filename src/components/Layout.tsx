
import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

const Layout = ({ children, className }: LayoutProps) => {
  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8 flex flex-col items-center">
      <header className="w-full max-w-6xl mb-8">
        <div className="glass-panel p-4 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <div className="w-10 h-10 rounded-full bg-blue-accent flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="m12 16 4-4-4-4"/></svg>
            </div>
            <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Student Sight Reveal
            </h1>
          </div>
          <div className="notification-badge flex items-center">
            <span className="mr-2">Smart Recognition Active</span>
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-gentle"></div>
          </div>
        </div>
      </header>
      <main className={cn("w-full max-w-6xl flex-1", className)}>
        {children}
      </main>
      <footer className="w-full max-w-6xl mt-8 text-center text-sm text-white/70">
        &copy; {new Date().getFullYear()} Student Sight Reveal - Smart Recognition System
      </footer>
    </div>
  );
};

export default Layout;
