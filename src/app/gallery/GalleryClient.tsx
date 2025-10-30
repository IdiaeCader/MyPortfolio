"use client";

import { useState } from "react";
import { works } from "../../data/works";
import GalleryCard from "../../components/GalleryCard";
import ProjectLightbox, { Project } from "../../components/ProjectLightbox";

export default function GalleryClient() {
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState<Project | null>(null);

  const onOpen = (title: string) => {
    setProject({
      title,
      description: "Placeholder description. Replace with tools, goals, and a brief breakdown.",
      images: [{ title: "Alt 1" }, { title: "Alt 2" }, { title: "Alt 3" }],
    });
    setOpen(true);
  };

  return (
    <section className="section">
      <div className="container">
        <h1>Gallery</h1>
        <p style={{ color: "var(--muted)", marginTop: 4 }}>
          Selected environment work. More on{" "}
          <a href="https://www.artstation.com/zykiufx" target="_blank" rel="noreferrer">ArtStation</a>.
        </p>
        <div className="grid cards-3">
          {works.map((w, i) => (
            <GalleryCard
              key={i}
              title={w.title}
              src={w.src}
              href={w.href}
              onClick={() => onOpen(w.title)}
            />
          ))}
        </div>
      </div>

      <ProjectLightbox open={open} onClose={() => setOpen(false)} project={project} />
    </section>
  );
}
