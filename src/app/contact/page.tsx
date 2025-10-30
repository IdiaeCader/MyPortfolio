import ContactForm from "../../components/ContactForm";

export const metadata = { title: "Contact | Tristan McClean" };

export default function ContactPage() {
  return (
    <section className="page-hero">
      <div className="container two-col">
        <div>
          <h1>Get in Touch</h1>
          <p>Belfast, County Antrim, Northern Ireland</p>
          <ul className="values">
            <li>Environment Artist — World Building and Level Design</li>
            <li>Open to freelance and full-time opportunities</li>
            <li>
              ArtStation:{" "}
              <a href="https://www.artstation.com/zykiufx" target="_blank" rel="noreferrer">
                artstation.com/zykiufx
              </a>
            </li>
            <li>
              Socials:{" "}
              <a href="https://tristanmcclean.carrd.co/" target="_blank" rel="noreferrer">
                tristanmcclean.carrd.co
              </a>
            </li>
            <li>
              Resume:{" "}
              <a href="/resume.pdf" target="_blank" rel="noreferrer">
                View
              </a>{" "}
              {/* Place resume.pdf in /public */}
            </li>
          </ul>
        </div>
        <div>
          <ContactForm />
          <p style={{ color: "var(--muted)", marginTop: "0.75rem" }}>
            Prefer email? <a href="mailto:tzanderm@gmail.com">tzanderm@gmail.com</a>
          </p>
        </div>
      </div>
    </section>
  );
}
