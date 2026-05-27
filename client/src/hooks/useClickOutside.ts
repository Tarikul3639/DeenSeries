"use client";

import { useEffect, useRef } from "react";

type UseClickOutsideProps<T extends HTMLElement> = {
  onClose: () => void;
  ignoreRef?: React.RefObject<HTMLElement | null>; // optional trigger button ref
  closeOnScroll?: boolean; // whether to close on scroll (default: false)
};

export function useClickOutside<T extends HTMLElement>({
  onClose,
  ignoreRef,
  closeOnScroll = false,
}: UseClickOutsideProps<T>) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;

      if (
        ref.current &&
        !ref.current.contains(target) &&
        !ignoreRef?.current?.contains(target)
      ) {
        onClose();
      }
    };

    const handleScroll = () => {
      onClose();
    };

    document.addEventListener("mousedown", handler);

    if (closeOnScroll) {
      window.addEventListener("wheel", handleScroll, { passive: true });
      window.addEventListener("touchmove", handleScroll, {
        passive: true,
      });
    }

    return () => {
      document.removeEventListener("mousedown", handler);

      if (closeOnScroll) {
        window.removeEventListener("wheel", handleScroll);
        window.removeEventListener("touchmove", handleScroll);
      }
    };
  }, [onClose, ignoreRef, closeOnScroll]);

  return ref;
}

// Usage example:
/*
const MyComponent = () => {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>({
        onClose: () => setOpen(false),
        closeOnScroll: true,
    });

  return <div ref={ref}>Click outside me!</div>;
};
*/