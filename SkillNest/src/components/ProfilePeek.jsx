"use client";

import { useRef, useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { cn } from "../lib/utils";

export const ProfilePeek = ({ trigger, content, className, ...props }) => {
     const componentRef = useRef(null);
     const cardRef = useRef(null);
     const triggerRef = useRef(null);
     const contentRef = useRef(null);
     const [open, setOpen] = useState(false);

     // GSAP Animation
     useGSAP(() => {
          const card = cardRef.current;
          const content = contentRef.current;

          if (!card || !content) return;

          gsap.set(card, {
               opacity: 0,
               scale: 0.95,
               y: -10,
               transformOrigin: "top right",
               rotationX: -15,
          });
          gsap.set(content, { opacity: 0, y: 10 });

          const timeline = gsap.timeline({
               paused: true,
               defaults: { ease: "power3.out", duration: 0.4 },
          });

          timeline
              .to(card, { 
                   y: 0, 
                   scale: 1, 
                   opacity: 1, 
                   rotationX: 0,
                   duration: 0.3 
              })
              .to(content, { 
                   opacity: 1, 
                   y: 0 
              }, "-=0.2");

          open ? timeline.play() : timeline.reverse();
     }, [open]);

     // Close on click outside
     useEffect(() => {
          const handleClickOutside = (e) => {
               if (
                   componentRef.current &&
                   !componentRef.current.contains(e.target)
               ) {
                    setOpen(false);
               }
          };
          document.addEventListener("mousedown", handleClickOutside);
          return () => document.removeEventListener("mousedown", handleClickOutside);
     }, []);

     // Close on escape key
     useEffect(() => {
          const handleEscape = (e) => {
               if (e.key === "Escape") {
                    setOpen(false);
               }
          };
          document.addEventListener("keydown", handleEscape);
          return () => document.removeEventListener("keydown", handleEscape);
     }, []);

     return (
         <div
             ref={componentRef}
             {...props}
             className={cn("relative z-50", className)}
         >
              {/* Trigger Button */}
              <div
                  ref={triggerRef}
                  className="relative z-20 cursor-pointer"
                  onClick={() => setOpen((prev) => !prev)}
              >
                   {trigger}
              </div>

              {/* Peek Card */}
              <div
                  ref={cardRef}
                  className={cn(
                      "absolute right-0 mt-3 w-72 rounded-2xl border shadow-2xl transform-gpu transition-all duration-300",
                      "bg-white/95 backdrop-blur-md border-gray-200/50 dark:bg-gray-900/95 dark:border-gray-700/50",
                      "before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/50 before:to-gray-50/50 dark:before:from-gray-800/50 dark:before:to-gray-900/50 before:-z-10",
                      !open && "pointer-events-none"
                  )}
                  style={{
                       boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                  }}
              >
                   {/* Arrow */}
                   <div className="absolute -top-2 right-6 w-4 h-4 bg-white/95 backdrop-blur-md border-l border-t border-gray-200/50 rotate-45 dark:bg-gray-900/95 dark:border-gray-700/50 z-10" />

                   {/* Content */}
                   <div ref={contentRef} className="relative z-20 p-6">
                        {content}
                   </div>
              </div>
         </div>
     );
};
