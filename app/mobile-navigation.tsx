"use client";

import { useEffect, useRef, useState } from "react";

const links = [
  ["#overview", "בקצרה"],
  ["#problem", "הבעיה"],
  ["#architecture", "ארכיטקטורה"],
  ["#decisions", "החלטות"],
  ["#validation", "בדיקות"],
  ["#prototype", "תיעוד"],
  ["#contact", "יצירת קשר"],
];

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    const closeOutside = (event: PointerEvent) => {
      if (!menuRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOutside);

    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOutside);
    };
  }, [isOpen]);

  return (
    <div className="mobile-navigation" ref={menuRef}>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        onClick={() => setIsOpen((current) => !current)}
      >
        <span>תפריט</span>
        <span className="menu-icon" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
      </button>

      <div className={`mobile-menu${isOpen ? " is-open" : ""}`} id="mobile-menu">
        <nav aria-label="ניווט למובייל">
          {links.map(([href, label]) => (
            <a href={href} key={href} onClick={() => setIsOpen(false)}>
              <span>{label}</span>
              <span aria-hidden="true">←</span>
            </a>
          ))}
        </nav>
        <a className="mobile-resume" href="/resume.pdf" download onClick={() => setIsOpen(false)}>
          הורדת קורות חיים
          <span aria-hidden="true">↓</span>
        </a>
        <a className="mobile-project-book" href="/project-book.pdf" download onClick={() => setIsOpen(false)}>
          הורדת ספר הפרויקט
          <span aria-hidden="true">↓</span>
        </a>
      </div>
    </div>
  );
}
