"use client";

type Props = {
  title: string;
  src?: string;
  href?: string;
  onClick?: () => void;
  aspectRatio?: string; // default 16 / 10
};

export default function GalleryCard({ title, src, href, onClick, aspectRatio = "16 / 10" }: Props) {
  const content = (
    <div className={`img ${src ? "" : "placeholder"}`} style={{ ["--ar" as any]: aspectRatio }}>
      {src ? <img src={src} alt={title} /> : <span>{title}</span>}
    </div>
  );

  return (
    <article className="card">
      {onClick ? (
        <button type="button" onClick={onClick} aria-label={`Open ${title}`} className="click-wrap">
          {content}
        </button>
      ) : href ? (
        <a href={href} target="_blank" rel="noreferrer" aria-label={title} className="click-wrap">
          {content}
        </a>
      ) : (
        content
      )}
      <h3 style={{ margin: "0.5rem 0 0" }}>{title}</h3>
    </article>
  );
}
