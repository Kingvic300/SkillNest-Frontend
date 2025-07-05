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
          });
          gsap.set(content, { opacity: 0 });

          const timeline = gsap.timeline({
               paused: true,
               defaults: { ease: "power2.inOut", duration: 0.3 },
          });

          timeline
              .to(card, { y: 0, scale: 1, opacity: 1 })
              .to(content, { opacity: 1 }, "-=0.2");

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
                      "absolute right-0 mt-3 w-64 rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-900 transform-gpu transition-all",
                      !open && "pointer-events-none"
                  )}
              >
                   {/* Arrow */}
                   <div className="absolute -top-2 right-5 w-4 h-4 bg-white border-l border-t border-gray-200 rotate-45 dark:bg-gray-900 dark:border-gray-700 z-10" />

                   {/* Content */}
                   <div ref={contentRef} className="relative z-20 p-4">
                        {content}
                   </div>
              </div>
         </div>
     );
};
