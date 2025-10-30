"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { preview as getPreview } from "../data/works";
import ProjectLightbox, { Project } from "../components/ProjectLightbox";
import GalleryCard from "../components/GalleryCard";

export default function HomePage() {
  useEffect(() => {
    const el = document.querySelector(".bg-blobs");
    if (!el) return;
    el.classList.remove("green", "theme-green", "theme-blue");
    el.classList.add(Math.random() < 0.5 ? "theme-green" : "theme-blue");
  }, []);

  const [showMore, setShowMore] = useState(false);
  const items = showMore ? getPreview(6) : getPreview(3);

  const software = ["Blender", "Unity", "Adobe Photoshop", "Adobe Illustrator", "VS Code", "More"];

  const [open, setOpen] = useState(false);
  const [project, setProject] = useState<Project | null>(null);

  const onOpen = (title: string) => {
    setProject({
      title,
      description:
        "Placeholder description for this project. Replace with tools, goals, and breakdown details.",
      images: [
        { title: "Alt 1" },
        { title: "Alt 2" },
        { title: "Alt 3" },
      ],
    });
    setOpen(true);
  };

  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-text">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Image
                src="/images/profile.png"
                alt="Tristan McClean"
                width={56}
                height={56}
                style={{ borderRadius: "50%", border: "1px solid rgba(255,255,255,.15)" }}
                priority
              />
              <h1 style={{ margin: 0 }}>Tristan McClean</h1>
            </div>
            <p>Environment Artist — Belfast, County Antrim, Northern Ireland</p>
            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <Link href="/gallery" className="btn btn-primary">View Gallery</Link>
              <Link href="/contact" className="btn">Contact</Link>
            </div>
          </div>
          <div className="hero-image placeholder">
            <span>Featured Environment</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2>Selected Skills</h2>
          <div className="grid cards-3">
            <article className="card">
              <div className="img placeholder"><span>3D Modeling</span></div>
              <h3>3D Modeling</h3>
              <p className="reveal" style={{ color: "var(--muted)", margin: 0 }}>
                Blender workflows for props and environments.
              </p>
            </article>
            <article className="card">
              <div className="img placeholder"><span>World Building</span></div>
              <h3>World Building</h3>
              <p className="reveal" style={{ color: "var(--muted)", margin: 0 }}>
                Cohesive spaces with lighting, FX, and mood.
              </p>
            </article>
            <article className="card">
              <div className="img placeholder"><span>Level Design</span></div>
              <h3>Level Design</h3>
              <p className="reveal" style={{ color: "var(--muted)", margin: 0 }}>
                Readable layouts and player flow in Unity.
              </p>
            </article>
          </div>
        </div>
      </section>

      {/* Latest Work (Expandable Gallery Preview) */}
      <section className="section" data-anim>
        <div className="container">
          <h2>Latest Work</h2>
          <p style={{ color: "var(--muted)", marginTop: 4 }}>
            A quick look at recent environments. Explore the full{" "}
            <Link href="/gallery">gallery</Link>.
          </p>
          <div className="grid cards-3" data-anim>
            {items.map((w, i) => (
              <GalleryCard
                key={i}
                title={w.title}
                src={w.src}
                onClick={() => onOpen(w.title)}
              />
            ))}
          </div>
          <div style={{ marginTop: 12 }}>
            <button className="btn" onClick={() => setShowMore((s) => !s)} data-anim>
              {showMore ? "Show Less" : "Show More"}
            </button>
            <Link href="/gallery" className="btn btn-primary" style={{ marginLeft: 8 }} data-anim>
              View Full Gallery
            </Link>
          </div>
        </div>
      </section>

      {/* Software Proficiency */}
      <section className="section alt" data-anim>
        <div className="container">
          <h2>Software</h2>
          <div className="grid cards-3">
            {software.map((s, i) => (
              <article className="card" key={i} data-anim>
                <div className="img placeholder"><span>{s}</span></div>
                <h3 style={{ margin: "0.5rem 0 0" }}>{s}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="section" data-anim>
        <div className="container two-col">
          <div data-anim>
            <h2>Let’s collaborate</h2>
            <p style={{ color: "var(--muted)" }}>
              Available for freelance and full-time roles. Based in Belfast, working worldwide.
            </p>
            <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
              <Link href="/contact" className="btn btn-primary" data-anim>Contact</Link>
              <a href="https://www.artstation.com/zykiufx" target="_blank" rel="noreferrer" className="btn" data-anim>
                ArtStation
              </a>
            </div>
          </div>
          <div className="tall placeholder" data-anim><span>Feature Image</span></div>
        </div>
      </section>

      <ProjectLightbox open={open} onClose={() => setOpen(false)} project={project} />
    </>
  );
}
