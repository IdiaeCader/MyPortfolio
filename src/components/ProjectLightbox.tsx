"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export type Project = {
  title: string;
  description?: string;
  images?: { title?: string; src?: string }[];
};

type Props = {
  open: boolean;
  onClose: () => void;
  project?: Project | null;
};

export default function ProjectLightbox({ open, onClose, project }: Props) {
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    document.body.classList.toggle("no-scroll", open);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (open) window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("no-scroll");
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  // Kick off the CSS transition on next frame
  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => setEntered(true));
    return () => {
      cancelAnimationFrame(id);
      setEntered(false);
    };
  }, [open]);

  if (!mounted || !open) return null;

  const imgs = project?.images?.length
    ? project.images
    : [
        { title: "Preview 1", src: "" },
        { title: "Preview 2", src: "" },
        { title: "Preview 3", src: "" },
      ];

  return createPortal(
    <div className={`lightbox ${entered ? "open" : ""}`} role="dialog" aria-modal="true" aria-label={project?.title || "Project"}>
      <button className="lightbox-backdrop" aria-label="Close" onClick={onClose} />
      <div className="lightbox-panel" role="document">
        <header className="lightbox-head">
          <h2>{project?.title || "Project"}</h2>
          <button className="btn" onClick={onClose} aria-label="Close">Close</button>
        </header>
        <div className="lightbox-body">
          <div className="lightbox-hero placeholder">
            {/* Replace with actual main image if available */}
            <span>Hero Image</span>
          </div>
          <p style={{ color: "var(--muted)", margin: "10px 0 16px" }}>
            {project?.description ||
              "Project description goes here. Add goals, tools used, and what you focused on. This is placeholder text."}
          </p>
          <div className="lightbox-gallery">
            {imgs.map((img, i) => (
              <div key={i} className="thumb placeholder">
                {/* Replace with <img src={img.src!} alt={img.title || `Image ${i+1}`} /> */}
                <span>{img.title || `Image ${i + 1}`}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
