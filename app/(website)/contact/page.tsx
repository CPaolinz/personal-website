import { profile } from '@/lib/content'

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with Cecilia Paolini by email, LinkedIn, or GitHub.',
}

export default function ContactPage() {
  return (
    <div className="page-wrap inner-page contact-page">
      <section className="page-intro contact-intro">
        <p className="eyebrow">Contact / Say hello</p>
        <h1>Let’s connect.</h1>
        <p>For collaborations, research conversations, or a new problem to solve, feel free to reach out directly.</p>
      </section>
      <div className="contact-options">
        <a className="contact-option contact-option-primary" href={`mailto:${profile.email}`}>
          <span className="contact-option-index">01 / EMAIL</span><span className="contact-option-title">{profile.email}</span><span className="contact-option-arrow">↗</span>
        </a>
        <a className="contact-option" href={profile.linkedin} target="_blank" rel="noreferrer">
          <span className="contact-option-index">02 / PROFESSIONAL</span><span className="contact-option-title">Connect on LinkedIn</span><span className="contact-option-arrow">↗</span>
        </a>
        <a className="contact-option" href={profile.github} target="_blank" rel="noreferrer">
          <span className="contact-option-index">03 / CODE & PROJECTS</span><span className="contact-option-title">Explore GitHub</span><span className="contact-option-arrow">↗</span>
        </a>
      </div>
      <p className="contact-note">For project enquiries, research collaborations, or a good problem to think through.</p>
    </div>
  )
}
