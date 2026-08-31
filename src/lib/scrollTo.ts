"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Universal instant scroll to target section by ID or position.
 * Perfectly computes target scroll position by summing preceding sibling heights in the sticky stack.
 */
export function scrollToTarget(target: string | number, offset = 0) {
  if (typeof window === "undefined") return;

  let finalTop = 0;

  if (typeof target === "number") {
    finalTop = target;
  } else {
    const cleanId = target.replace(/^(\/)?#/, "");
    if (!cleanId || cleanId === "top" || cleanId === "hero") {
      finalTop = 0;
    } else {
      const el = document.getElementById(cleanId);
      if (!el) {
        console.warn(`[scrollToTarget] Element with id "${cleanId}" not found.`);
        return;
      }

      // In a continuous sticky stacking layout, find <main> and iterate through its direct children
      const mainEl = document.querySelector("main") || document.body;
      if (mainEl && mainEl.contains(el)) {
        let cumulativeHeight = 0;
        for (let i = 0; i < mainEl.children.length; i++) {
          const child = mainEl.children[i] as HTMLElement;
          // If this child is our element, or contains our element (like a GSAP pin-spacer or wrapper)
          if (child === el || child.contains(el)) {
            break;
          }
          // Exclude fixed / absolute elements (like fixed Navbar, fixed Footer, floating CTA)
          const style = window.getComputedStyle(child);
          if (style.position !== "fixed" && style.position !== "absolute") {
            cumulativeHeight += child.offsetHeight;
          }
        }
        finalTop = cumulativeHeight;
      } else {
        finalTop = el.offsetTop;
      }
    }
  }

  finalTop = Math.max(0, finalTop + offset);

  // 1. Lenis instant jump without locking
  const lenisInstance = (window as any).lenis;
  if (lenisInstance && typeof lenisInstance.scrollTo === "function") {
    lenisInstance.scrollTo(finalTop, {
      immediate: true,
      force: true,
    });
  }

  // 2. Native window scrollTo fallback / sync
  window.scrollTo({
    top: finalTop,
    left: 0,
    behavior: "auto",
  });

  // 3. Synchronize GSAP ScrollTrigger
  if (typeof ScrollTrigger !== "undefined") {
    ScrollTrigger.update();
    ScrollTrigger.refresh();
  }

  // 4. Update browser URL hash cleanly
  if (typeof target === "string" && target.includes("#")) {
    const hash = target.substring(target.indexOf("#"));
    if (window.location.hash !== hash) {
      window.history.pushState(null, "", hash);
    }
  }
}
