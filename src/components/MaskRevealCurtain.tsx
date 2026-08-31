"use client";

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

export interface MaskRevealCurtainHandle {
  trigger: (onScrollReady: () => void) => void;
}

/**
 * Fullscreen clip-path polygon curtain wipe overlay.
 * Usage: attach ref, call ref.current.trigger(() => scrollToTarget(...))
 *
 * Animation sequence:
 * 1. Curtain enters from LEFT (clip-path sweeps left→right, covering screen)
 * 2. onScrollReady() is called (scrollToTarget runs while screen is hidden)
 * 3. Curtain exits to RIGHT (clip-path sweeps left→right, revealing new section)
 */
const MaskRevealCurtain = forwardRef<MaskRevealCurtainHandle>((_, ref) => {
  const curtainRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);

  useImperativeHandle(ref, () => ({
    trigger(onScrollReady: () => void) {
      const el = curtainRef.current;
      if (!el) {
        onScrollReady();
        return;
      }

      // Reset to initial closed state (no transition)
      el.style.transition = "none";
      el.style.clipPath = "polygon(0 0, 0 0, 0 100%, 0 100%)"; // fully hidden left
      el.style.visibility = "visible";
      el.style.pointerEvents = "all";

      // Force reflow
      void el.offsetWidth;

      // Phase 1: Sweep IN (left edge → right edge) — covers screen in 500ms
      el.style.transition = "clip-path 0.52s cubic-bezier(0.77, 0, 0.175, 1)";
      el.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";

      // Phase 2: After curtain fully covers screen → scroll, then sweep OUT
      setTimeout(() => {
        // Execute scroll while hidden
        onScrollReady();

        // Small pause so browser can settle on new scroll position
        setTimeout(() => {
          // Phase 3: Sweep OUT (left edge peels away → screen revealed)
          el.style.transition = "clip-path 0.58s cubic-bezier(0.22, 0.61, 0.36, 1)";
          el.style.clipPath = "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)";

          // Phase 4: After reveal, hide curtain completely
          setTimeout(() => {
            el.style.visibility = "hidden";
            el.style.pointerEvents = "none";
            el.style.clipPath = "polygon(0 0, 0 0, 0 100%, 0 100%)";
            el.style.transition = "none";
          }, 620);
        }, 80);
      }, 540);
    },
  }));

  useEffect(() => {
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      ref={curtainRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        pointerEvents: "none",
        visibility: "hidden",
        clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
        background: "linear-gradient(135deg, #2A281F 0%, #1a1812 60%, #2A281F 100%)",
        willChange: "clip-path",
      }}
    />,
    document.body
  );
});

MaskRevealCurtain.displayName = "MaskRevealCurtain";
export default MaskRevealCurtain;
