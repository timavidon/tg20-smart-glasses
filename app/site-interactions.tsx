"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type ActiveImage = {
  src: string;
  alt: string;
};

export function SiteImageLightbox() {
  const [activeImage, setActiveImage] = useState<ActiveImage | null>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setActiveImage(null);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  useEffect(() => {
    const openImage = (image: HTMLImageElement) => {
      triggerRef.current = image;
      setActiveImage({
        src: image.currentSrc || image.src,
        alt: image.alt || "תמונה מהפרויקט",
      });
    };

    const findImage = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return null;
      return target.closest<HTMLImageElement>("img[data-zoomable]");
    };

    const openOnClick = (event: MouseEvent) => {
      const image = findImage(event.target);
      if (image) openImage(image);
    };

    const openOnKeyboard = (event: KeyboardEvent) => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const image = findImage(event.target);
      if (!image) return;
      event.preventDefault();
      openImage(image);
    };

    document.addEventListener("click", openOnClick);
    document.addEventListener("keydown", openOnKeyboard);
    return () => {
      document.removeEventListener("click", openOnClick);
      document.removeEventListener("keydown", openOnKeyboard);
    };
  }, []);

  useEffect(() => {
    if (!activeImage) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeImage, close]);

  return (
    <>
      {activeImage && createPortal(
        <div
          className="image-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeImage.alt} בגודל מלא`}
          onMouseDown={(event) => {
            if (event.currentTarget === event.target) close();
          }}
        >
          <button ref={closeRef} className="lightbox-close" type="button" aria-label="סגירת התמונה" onClick={close}>×</button>
          <img src={activeImage.src} alt={`${activeImage.alt} בגודל מלא`} />
        </div>,
        document.body,
      )}
    </>
  );
}

export function HeaderDownloads() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > 160);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <div
      className={`nav-downloads${isVisible ? " is-visible" : ""}`}
      aria-label="הורדות"
      aria-hidden={!isVisible}
    >
      <a className="nav-download" href="/resume.pdf" download aria-label="הורדת קורות חיים" tabIndex={isVisible ? 0 : -1}>
        <span className="nav-file-kind" aria-hidden="true">PDF</span>
        <span>קורת חיים</span>
      </a>
      <a className="nav-download" href="/project-book.pdf" download aria-label="הורדת ספר הפרויקט" tabIndex={isVisible ? 0 : -1}>
        <span className="nav-file-kind" aria-hidden="true">PDF</span>
        <span>ספר הפרויקט</span>
      </a>
    </div>
  );
}

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setIsVisible(window.scrollY > 600);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <a
      className={`back-top${isVisible ? " is-visible" : ""}`}
      href="#top"
      aria-label="חזרה לראש העמוד"
      aria-hidden={!isVisible}
      tabIndex={isVisible ? 0 : -1}
    >
      ↑
    </a>
  );
}
