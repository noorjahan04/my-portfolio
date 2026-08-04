import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { FaCommentDots, FaTimes, FaPaperPlane } from "react-icons/fa";
import {
  FaTwitter,
  FaLinkedinIn,
  FaGithub,
  FaYoutube,
  FaWhatsapp,
  FaMapMarkerAlt,
  FaEnvelope,
  FaDownload,
  FaEye,
  FaPhoneAlt,
  FaEllipsisH,
  FaUserAstronaut,
  FaProjectDiagram,
  FaBriefcase,
  FaLaptopCode,
  FaAddressCard,
  FaLeaf,
  FaGraduationCap,
  FaCloudUploadAlt,
  FaTshirt,
  FaListUl,
  FaSun,
  FaCode,
  FaArrowUp,
  FaHeart,
} from "react-icons/fa";
import {
  RESUME_URL,
  profile,
  about,
  skills,
  experience,
  education,
  projects,
  miniProjects,
  githubStats,
  months,
} from "./data/portfolio.js";

const PROJECT_ICONS = {
  leaf: FaLeaf,
  grad: FaGraduationCap,
  cloud: FaCloudUploadAlt,
  shirt: FaTshirt,
  list: FaListUl,
  sun: FaSun,
};

const GH_GREENS = ["#ebedf0", "#c6e48b", "#7bc96f", "#239a3b", "#196127"];

function buildGhCells() {
  const cells = [];
  for (let i = 0; i < 52 * 7; i++) {
    const r = Math.sin(i * 12.9898) * 43758.5453;
    const v = r - Math.floor(r);
    let level = 0;
    if (v > 0.55) level = 1;
    if (v > 0.72) level = 2;
    if (v > 0.85) level = 3;
    if (v > 0.94) level = 4;
    cells.push(GH_GREENS[level]);
  }
  return cells;
}
const GH_CELLS = buildGhCells();

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function ProjectCard({ p }) {
  return (
    <div className="pf-project">
      <div
        className="pf-project-media"
        style={{ background: p.gradient || p.color }}
      >
        <div className="pf-project-media-glow" />

        <img
          src={p.image}
          alt={p.title}
          className="pf-project-image"
        />

        <a
          href={p.live}
          target="_blank"
          rel="noreferrer"
          className="pf-eye"
          aria-label="Preview"
        >
          <FaEye />
        </a>
      </div>

      <div className="pf-project-body" style={{ background: p.color }}>
        <h3>{p.title}</h3>
        <p className="pf-project-desc">{p.description}</p>

        <div className="pf-tags">
          {p.tech.map((t) => (
            <span className="pf-tag" key={t}>
              {t}
            </span>
          ))}
        </div>

        <div className="pf-project-btns">
          <a className="pf-btn-green" href={p.live} target="_blank" rel="noreferrer">
            Live
          </a>
          <a className="pf-btn-outline" href={p.code} target="_blank" rel="noreferrer">
            Code
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [skillTab, setSkillTab] = useState("FrontEnd");
  const [expTab, setExpTab] = useState("Experience");
  const [projTab, setProjTab] = useState("Projects");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendStatus, setSendStatus] = useState(null);
  const formRef = useRef(null);

  const handleSendEmail = (e) => {
    e.preventDefault();
    setSending(true);
    setSendStatus(null);
    emailjs
      .sendForm("service_5oq2fuu", "template_62za4aq", formRef.current, "fTK52UoRosSDJU9BE")
      .then(() => {
        setSendStatus({ ok: true, msg: "Message sent successfully!" });
        formRef.current?.reset();
      })
      .catch(() => {
        setSendStatus({ ok: false, msg: "Failed to send. Please try again." });
      })
      .finally(() => setSending(false));
  };

  const skillNote =
    skillTab === "FrontEnd"
      ? "FrontEnd Technologies I am familiar with:"
      : skillTab === "BackEnd"
      ? "BackEnd Technologies I am familiar with:"
      : "Tools I use regularly:";

  const timeline = expTab === "Experience" ? experience : education;
  const projList = projTab === "Projects" ? projects : miniProjects;

  const goTo = (id) => {
    setDrawerOpen(false);
    scrollToSection(id);
  };

  const currentSkills = skills[skillTab] || [];

  return (
    <div className="pf-root">
      <img
        className="pf-profile-photo-mobile"
        src={profile.photo}
        alt={profile.name}
        onClick={() => setDrawerOpen(true)}
        role="button"
        tabIndex={0}
        aria-label="Open profile"
        onKeyDown={(e) => e.key === "Enter" && setDrawerOpen(true)}
      />
      <button className="pf-chat-btn" aria-label="Contact" onClick={() => setContactOpen(true)}>
        <FaCommentDots />
      </button>

      {contactOpen && (
        <div className="pf-modal-backdrop" onClick={() => setContactOpen(false)}>
          <div className="pf-modal" onClick={(e) => e.stopPropagation()}>
            <button className="pf-modal-close" onClick={() => setContactOpen(false)} aria-label="Close">
              <FaTimes />
            </button>
            <h3 className="pf-modal-title">Get in touch</h3>
            <p className="pf-modal-sub">I'd love to hear from you. Send me a message.</p>
            <form ref={formRef} onSubmit={handleSendEmail} className="pf-form">
              <input required type="text" name="name" placeholder="Your Name" />
              <input required type="email" name="email" placeholder="Your Email" />
              <input required type="tel" name="telephone" placeholder="Phone Number" />
              <textarea required name="message" rows="4" placeholder="Your Message" />
              <button type="submit" className="pf-form-btn" disabled={sending}>
                {sending ? "Sending..." : (<>Send <FaPaperPlane /></>)}
              </button>
              {sendStatus && (
                <div className={`pf-form-status ${sendStatus.ok ? "ok" : "err"}`}>{sendStatus.msg}</div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Mobile-only top Resume button */}
      <a className="pf-mobile-resume" href={RESUME_URL} target="_blank" rel="noreferrer">
        Resume <FaDownload />
      </a>

      {/* Mobile drawer backdrop */}
      <div
        className={`pf-drawer-backdrop ${drawerOpen ? "open" : ""}`}
        onClick={() => setDrawerOpen(false)}
      />

      <div className="pf-layout">
        {/* ===== Left profile ===== */}
        <aside className={`pf-profile-wrap ${drawerOpen ? "open" : ""}`}>
          <img className="pf-avatar" src={profile.photo} alt={profile.name} />
          <div className="pf-card">
            <h1 className="pf-name">{profile.name}</h1>
            <span className="pf-role-pill">{profile.role}</span>

            <div className="pf-socials">
              <a className="pf-tw" href={profile.socials.twitter} target="_blank" rel="noreferrer" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a className="pf-li" href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a className="pf-gh" href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <FaGithub />
              </a>
              <a className="pf-yt" href={profile.socials.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
                <FaYoutube />
              </a>
            </div>

            <div className="pf-contact-box">
              <div className="pf-contact-row">
                <span className="pf-ci pf-ci-wa">
                  <FaWhatsapp />
                </span>
                <div>
                  <div className="pf-contact-label">Phone No</div>
                  <div className="pf-contact-value">{profile.phone}</div>
                </div>
              </div>
              <div className="pf-contact-row">
                <span className="pf-ci pf-ci-mail">
                  <FaEnvelope />
                </span>
                <div>
                  <div className="pf-contact-label">Email</div>
                  <div className="pf-contact-value">{profile.email}</div>
                </div>
              </div>
              <div className="pf-contact-row">
                <span className="pf-ci pf-ci-loc">
                  <FaMapMarkerAlt />
                </span>
                <div>
                  <div className="pf-contact-label">Location</div>
                  <div className="pf-contact-value">{profile.location}</div>
                </div>
              </div>
            </div>

            <a className="pf-resume" href={RESUME_URL} target="_blank" rel="noreferrer">
              Resume <FaDownload />
            </a>
          </div>
        </aside>

        {/* ===== Center content ===== */}
        <main className="pf-content">
          {/* About */}
          <section className="pf-section" id="about">
            <div className="pf-heading">
              <h2>About</h2>
              <span className="pf-line" />
            </div>
            <div className="pf-about">
              {about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section className="pf-section" id="skills">
            <div className="pf-heading">
              <h2>FrontEnd Skills</h2>
              <span className="pf-line" />
            </div>
            <div className="pf-tabs">
              {["FrontEnd", "BackEnd", "Tools"].map((t) => (
                <button
                  key={t}
                  className={`pf-tab ${skillTab === t ? "active" : ""}`}
                  onClick={() => setSkillTab(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            <p className="pf-skill-note">{skillNote}</p>
            <div className="pf-skills-grid">
              {currentSkills.map((s) => (
                <div className="pf-skill" key={s.name}>
                  {s.popular && <span>{s.name}</span>}
                  <img src={s.img} alt={s.name} loading="lazy" />
                  <span className="pf-skill-label">{s.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section className="pf-section" id="experience">
            <div className="pf-heading">
              <h2>Experience</h2>
              <span className="pf-line" />
            </div>
            <div className="pf-tabs">
              {["Experience", "Education"].map((t) => (
                <button
                  key={t}
                  className={`pf-tab ${expTab === t ? "active" : ""}`}
                  onClick={() => setExpTab(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="pf-timeline">
              {timeline.map((item, i) => (
                <div className="pf-tl-item" key={item.period}>
                  <div className="pf-tl-node">
                    <span className="pf-tl-icon">
                      {expTab === "Experience" ? <FaBriefcase /> : <FaGraduationCap />}
                    </span>
                  </div>
                  <div className="pf-tl-card">
                    <span className="pf-tl-period">{item.period}</span>
                    <h4>{item.company}</h4>
                    <p>{item.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section className="pf-section" id="projects">
            <div className="pf-heading">
              <h2>Projects</h2>
              <span className="pf-line" />
            </div>
            <div className="pf-tabs">
              {["Projects", "Mini Projects"].map((t) => (
                <button
                  key={t}
                  className={`pf-tab ${projTab === t ? "active" : ""}`}
                  onClick={() => setProjTab(t)}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="pf-projects">
              {projList.map((p) => (
                <ProjectCard p={p} key={p.title} />
              ))}
            </div>
          </section>

          {/* Github */}
          <section className="pf-section" id="github">
            <div className="pf-heading">
              <h2>Github</h2>
              <span className="pf-line" />
            </div>
            <div className="pf-gh-box">
              <div className="pf-gh-months">
                {months.map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
              <div className="pf-gh-grid">
                {GH_CELLS.map((c, i) => (
                  <span className="pf-gh-cell" key={i} style={{ background: c }} />
                ))}
              </div>
              <div className="pf-gh-legend">
                <span>415 contributions in the last year</span>
                <span className="pf-gh-scale">
                  Less
                  {GH_GREENS.map((c) => (
                    <i key={c} style={{ background: c }} />
                  ))}
                  More
                </span>
              </div>
            </div>
            <div className="pf-gh-stats">
              <div className="pf-gh-img">
                <img src={githubStats.streak} alt="GitHub Streak Stats" loading="lazy" />
              </div>
              <div className="pf-gh-img">
                <img src={githubStats.stats} alt="GitHub Stats" loading="lazy" />
              </div>
            </div>
          </section>

          {/* Contacts */}
          <section className="pf-section" id="contacts">
            <div className="pf-heading">
              <h2>Contacts</h2>
              <span className="pf-line" />
            </div>
            <div className="pf-contacts">
              <div className="pf-contacts-list">
                <a className="pf-contacts-item" href={`tel:${profile.phone}`}>
                  <FaWhatsapp /> {profile.phoneDisplay}
                </a>
                <a className="pf-contacts-item" href={`mailto:${profile.email}`}>
                  <FaEnvelope /> {profile.email}
                </a>
                <a
                  className="pf-contacts-item"
                  href="https://maps.google.com/?q=Bengaluru,Karnataka,India"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaMapMarkerAlt /> {profile.location}
                </a>
              </div>
              <div className="pf-contacts-photo">
                <img src={profile.contactPhoto} alt={profile.name} loading="lazy" />
              </div>
              <div className="pf-contacts-social">
                <a className="pf-c-linkedin" href={profile.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                  <FaLinkedinIn />
                </a>
                <a className="pf-c-github" href={profile.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                  <FaGithub />
                </a>
                <a className="pf-c-phone" href={`tel:${profile.phone}`} aria-label="Phone">
                  <FaPhoneAlt />
                </a>
                <a className="pf-c-mail" href={`mailto:${profile.email}`} aria-label="Email">
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </section>
        </main>

        {/* ===== Right nav ===== */}
        <aside className="pf-nav-wrap">
          <nav className="pf-nav">
            <button className="pf-nav-btn" onClick={() => goTo("about")} aria-label="About">
              <FaUserAstronaut />
            </button>
            <button className="pf-nav-btn" onClick={() => goTo("skills")} aria-label="Skills">
              <FaProjectDiagram />
            </button>
            <button className="pf-nav-btn" onClick={() => goTo("experience")} aria-label="Experience">
              <FaBriefcase />
            </button>
            <button className="pf-nav-btn" onClick={() => goTo("projects")} aria-label="Projects">
              <FaLaptopCode />
            </button>
            <button className="pf-nav-btn" onClick={() => goTo("github")} aria-label="Github">
              <FaGithub />
            </button>
            <button className="pf-nav-btn" onClick={() => goTo("contacts")} aria-label="Contacts">
              <FaAddressCard />
            </button>
          </nav>
        </aside>
      </div>
    </div>
  );
}