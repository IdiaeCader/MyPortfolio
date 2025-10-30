export const metadata = { title: "About | Tristan McClean" };

export default function AboutPage() {
  return (
    <section className="page-hero">
      <div className="container two-col">
        <div>
          <h1>About Tristan McClean</h1>
          <p>Belfast, County Antrim, Northern Ireland — Environment Artist</p>
          <p>
            I have almost always had great interest in video games and their design, primarily the massive
            open worlds of MMO games. I also appreciate the importance of post-processing and effects that
            really add to the environment.
          </p>
          <p>
            I am looking forward to the future, and what it will bring. I believe that my skills will develop
            to the point of working with the best in the industry and I am truly looking forward to the
            experience of contributing to the sector using my skills to create amazing content that empowers others.
          </p>
          <ul className="values">
            <li>Environment Art • World Building • Level Design</li>
            <li>3D Modeling • Environment Design • Branding</li>
            <li>Web Development • Product Photography</li>
          </ul>
        </div>
        <div className="tall placeholder"><span>Portrait / Environment Showcase</span></div>
      </div>
    </section>
  );
}
