import React from "react";
import { Send, MessageSquare, Code, BookOpen, Users, Mail, Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative font-inter bg-gradient-to-r from-neet-neutral/90 via-neet-neutral to-neet-neutral/90 border-t border-neet-primary/20 backdrop-blur-sm overflow-hidden">
      {/* Top glow border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neet-primary/40 to-transparent"></div>
      
      {/* Large background logo */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 translate-y-1/2 opacity-20 z-0">
        <span className="text-[300px] font-limelight font-bold text-neet-primary">NeetLabs</span>
      </div>

      {/* Footer content */}
      <div className="relative z-10 px-4 lg:px-8 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12 items-start">
            
            {/* Section 1: Platform */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-neet-accent/90 mb-4 flex items-center">
                <Code className="w-5 h-5 mr-2 text-neet-primary" />
                Platform
              </h3>
              <nav className="flex flex-col space-y-4">
                <a
                  href="/problems"
                  className="group flex items-center text-neet-accent/80 hover:text-neet-primary transition-all duration-300 hover:translate-x-1"
                >
                  <span className="text-sm font-medium">Coding Problems</span>
                  <div className="ml-2 w-0 group-hover:w-4 h-px bg-neet-primary transition-all duration-300"></div>
                </a>
                
                <a
                  href="/playlists"
                  className="group flex items-center text-neet-accent/80 hover:text-neet-primary transition-all duration-300 hover:translate-x-1"
                >
                  <span className="text-sm font-medium">Learning Paths</span>
                  <div className="ml-2 w-0 group-hover:w-4 h-px bg-neet-primary transition-all duration-300"></div>
                </a>
                
                <a
                  href="/challenges"
                  className="group flex items-center text-neet-accent/80 hover:text-neet-primary transition-all duration-300 hover:translate-x-1"
                >
                  <span className="text-sm font-medium">Weekly Challenges</span>
                  <div className="ml-2 w-0 group-hover:w-4 h-px bg-neet-primary transition-all duration-300"></div>
                </a>
              </nav>
            </div>

            {/* Section 2: Resources */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-neet-accent/90 mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-neet-primary" />
                Resources
              </h3>
              <nav className="flex flex-col space-y-4">
                <a
                  href="/docs"
                  className="group flex items-center text-neet-accent/80 hover:text-neet-primary transition-all duration-300 hover:translate-x-1"
                >
                  <span className="text-sm font-medium">Cohorts</span>
                  <div className="ml-2 w-0 group-hover:w-4 h-px bg-neet-primary transition-all duration-300"></div>
                </a>
                
                <a
                  href="/blog"
                  className="group flex items-center text-neet-accent/80 hover:text-neet-primary transition-all duration-300 hover:translate-x-1"
                >
                  <span className="text-sm font-medium">Roadmaps</span>
                  <div className="ml-2 w-0 group-hover:w-4 h-px bg-neet-primary transition-all duration-300"></div>
                </a>
                
                <a
                  href="/cheatsheets"
                  className="group flex items-center text-neet-accent/80 hover:text-neet-primary transition-all duration-300 hover:translate-x-1"
                >
                  <span className="text-sm font-medium">Cheat Sheets</span>
                  <div className="ml-2 w-0 group-hover:w-4 h-px bg-neet-primary transition-all duration-300"></div>
                </a>
              </nav>
            </div>

            {/* Section 3: Community */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-neet-accent/90 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2 text-neet-primary" />
                Community
              </h3>
              <nav className="flex flex-col space-y-4">
                <a
                  href="/forum"
                  className="group flex items-center text-neet-accent/80 hover:text-neet-primary transition-all duration-300 hover:translate-x-1"
                >
                  <span className="text-sm font-medium">Discussion Forum</span>
                  <div className="ml-2 w-0 group-hover:w-4 h-px bg-neet-primary transition-all duration-300"></div>
                </a>
                
                <a
                  href="/events"
                  className="group flex items-center text-neet-accent/80 hover:text-neet-primary transition-all duration-300 hover:translate-x-1"
                >
                  <span className="text-sm font-medium">Coding Events</span>
                  <div className="ml-2 w-0 group-hover:w-4 h-px bg-neet-primary transition-all duration-300"></div>
                </a>
                
                <button
                  onClick={() => {}}
                  className="group flex items-center text-neet-accent/80 hover:text-neet-primary transition-all duration-300 hover:translate-x-1 text-left"
                >
                  <MessageSquare className="w-4 h-4 mr-2 opacity-80" />
                  <span className="text-sm font-medium">Feedback</span>
                  <div className="ml-2 w-0 group-hover:w-4 h-px bg-neet-primary transition-all duration-300"></div>
                </button>
              </nav>
            </div>

            {/* Section 4: Contact & Social */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-neet-accent/90 mb-4 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-neet-primary" />
                Connect With Us
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Send className="w-4 h-4 mt-1 mr-3 text-neet-accent/70 flex-shrink-0" />
                  <p className="text-sm text-neet-accent/80">
                    contact@neetlabs.io
                  </p>
                </div>
                
                <div className="flex space-x-4 mt-6">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-neet-base-100/10 backdrop-blur-sm border border-neet-base-100/20 flex items-center justify-center hover:bg-neet-primary/20 hover:border-neet-primary/40 transition-all duration-300">
                    <Github className="w-4 h-4 text-neet-accent/70" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-neet-base-100/10 backdrop-blur-sm border border-neet-base-100/20 flex items-center justify-center hover:bg-neet-primary/20 hover:border-neet-primary/40 transition-all duration-300">
                    <Twitter className="w-4 h-4 text-neet-accent/70" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-neet-base-100/10 backdrop-blur-sm border border-neet-base-100/20 flex items-center justify-center hover:bg-neet-primary/20 hover:border-neet-primary/40 transition-all duration-300">
                    <Linkedin className="w-4 h-4 text-neet-accent/70" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright section */}
          <div className="mt-16 pt-8 border-neet-base-100/10 justify-between items-center">
            <div className="flex justify-center mb-4 md:mb-0">
              <p className="text-xs text-neet-accent/60 text-right">
                © 2025 NeetLabs. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;