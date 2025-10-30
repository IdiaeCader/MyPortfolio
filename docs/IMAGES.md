# Images and Gallery Data

Where to put images

- Gallery images: place JPG/PNG files under public/gallery (e.g. public/gallery/env-01.jpg).
- Profile and other site images: place under public/images.
- Resume: /resume.pdf is rewritten to /images/Artboard 1.png via next.config.js. Replace that image to update the resume link.

How to wire images into the site

- Edit src/data/works.ts. Each item is:
  { title: "Name", src: "/gallery/your-file.jpg", href?: "https://..." }

- The Gallery page uses all items from works.
- The Home page shows a preview (first N items) via preview(n).

Tips

- Keep file names short and lowercase; prefer hyphens.
- Use consistent aspect ratio (16:10 recommended). Images are auto-cropped with object-fit: cover.
- If you leave src undefined, the card shows a styled placeholder with the title.
