export type GalleryItem = {
  title: string;
  src?: string;   // e.g. "/gallery/env-01.jpg" (under public/gallery)
  href?: string;  // optional ArtStation or external link
};

export const works: GalleryItem[] = [
  { title: "Cavern Shrine",   src: "/gallery/env-01.jpg", href: "https://www.artstation.com/zykiufx" },
  { title: "Forgotten City",  src: "/gallery/env-02.jpg", href: "https://www.artstation.com/zykiufx" },
  { title: "Clifftop Ruins",  src: "/gallery/env-03.jpg", href: "https://www.artstation.com/zykiufx" },
  { title: "Forest Path",     src: "/gallery/env-04.jpg", href: "https://www.artstation.com/zykiufx" },
  { title: "Harbor Docks",    src: "/gallery/env-05.jpg", href: "https://www.artstation.com/zykiufx" },
  { title: "Desert Outpost",  src: "/gallery/env-06.jpg", href: "https://www.artstation.com/zykiufx" },
];

export const preview = (n = 3) => works.slice(0, n);

// uh