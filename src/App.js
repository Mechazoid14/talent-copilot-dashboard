import React, { useState } from "react";
import "./App.css";

// Leadership candidates (realistic GCC-style profiles)
const candidates = [
  // ENGINEERING LEADERS
  {
    id: 1,
    name: "Ahmed Rahman",
    title: "Director of Engineering - Mobility",
    company: "Careem",
    location: "Dubai",
    domain: "engineering",
    hireabilityScore: 84,
    readinessTier: "now",
    signals: ["Promotion gap 38 months", "Led microservices migration", "Team of 40+ engineers"],
    warmth: 0.32,
  },
  {
    id: 2,
    name: "Nikhil Prasad",
    title: "Senior Engineering Manager - Logistics",
    company: "Talabat",
    location: "Dubai",
    domain: "engineering",
    hireabilityScore: 79,
    readinessTier: "soon",
    signals: ["Checkout latency reduction", "High-traffic systems", "Works closely with product"],
    warmth: 0.24,
  },
  {
    id: 3,
    name: "Lina Mansour",
    title: "Head of Engineering - Platform",
    company: "Noon",
    location: "Dubai",
    domain: "engineering",
    hireabilityScore: 82,
    readinessTier: "watchlist",
    signals: ["Cloud cost optimisation", "Platform reliability", "Multi-country ownership"],
    warmth: 0.18,
  },
  {
    id: 4,
    name: "Omar Suleiman",
    title: "Principal Software Engineering Manager",
    company: "Microsoft",
    location: "Dubai",
    domain: "engineering",
    hireabilityScore: 87,
    readinessTier: "soon",
    signals: ["Azure-scale ownership", "Influences global roadmap"],
    warmth: 0.21,
  },

  // PRODUCT LEADERS
  {
    id: 5,
    name: "Sara Al Essa",
    title: "Senior Product Manager - Growth",
    company: "Tabby",
    location: "Dubai",
    domain: "product",
    hireabilityScore: 81,
    readinessTier: "now",
    signals: ["Experimentation culture", "Checkout conversion wins", "Owns PLG initiatives"],
    warmth: 0.35,
  },
  {
    id: 6,
    name: "Harish Verma",
    title: "Principal Product Manager - AI Experiences",
    company: "Microsoft",
    location: "Dubai",
    domain: "product",
    hireabilityScore: 78,
    readinessTier: "soon",
    signals: ["AI/ML feature ownership", "Cross-org influence"],
    warmth: 0.22,
  },
  {
    id: 7,
    name: "Dalia Khaled",
    title: "Director of Product - Marketplace",
    company: "Yalla",
    location: "Dubai",
    domain: "product",
    hireabilityScore: 80,
    readinessTier: "watchlist",
    signals: ["Monetisation strategy", "Consumer engagement"],
    warmth: 0.16,
  },
  {
    id: 8,
    name: "Amir Farouk",
    title: "Lead Product Manager - Media & Streaming",
    company: "Anghami",
    location: "Abu Dhabi",
    domain: "product",
    hireabilityScore: 76,
    readinessTier: "soon",
    signals: ["Subscription funnels", "Cross-border markets"],
    warmth: 0.2,
  },

  // SECURITY LEADERS
  {
    id: 9,
    name: "Rehan Ali",
    title: "Senior Manager - Cyber Defense",
    company: "e& Enterprise",
    location: "Abu Dhabi",
    domain: "security",
    hireabilityScore: 73,
    readinessTier: "now",
    signals: ["Incident response lead", "24/7 SOC exposure"],
    warmth: 0.3,
  },
  {
    id: 10,
    name: "Farah Labib",
    title: "Head of Security & Compliance",
    company: "G42",
    location: "Abu Dhabi",
    domain: "security",
    hireabilityScore: 77,
    readinessTier: "soon",
    signals: ["Cloud compliance at scale", "AI data governance"],
    warmth: 0.23,
  },
  {
    id: 11,
    name: "Nabeel Zahid",
    title: "Principal Consultant - Offensive Security",
    company: "DarkMatter",
    location: "Abu Dhabi",
    domain: "security",
    hireabilityScore: 72,
    readinessTier: "watchlist",
    signals: ["Red teaming", "Gov & critical infra exposure"],
    warmth: 0.17,
  },
  {
    id: 12,
    name: "Priya Chand",
    title: "Regional Security Architect - Zero Trust",
    company: "Cisco",
    location: "Dubai",
    domain: "security",
    hireabilityScore: 75,
    readinessTier: "soon",
    signals: ["Zero trust rollouts", "Multi-cloud security"],
    warmth: 0.21,
  },
];

// Map readiness tier to CSS class
const readinessBadgeClass = (tier) => {
  switch (tier) {
    case "now":
      return "badge now";
    case "soon":
      return "badge soon";
    default:
      return "badge watchlist";
  }
};

function App() {
  const [activeDomain, setActiveDomain] = useState("engineering");
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const filteredCandidates = candidates.filter(
    (c) => c.domain === activeDomain
  );

  const getSubtitle = () => {
    switch (activeDomain) {
      case "engineering":
        return "Engineering Leadership Talent Board";
      case "product":
        return "Product Leadership Talent Board";
      case "security":
        return "Security Leadership Talent Board";
      default:
        return "";
    }
  };

  const openOutreach = (candidate) => {
    setSelectedCandidate(candidate);
  };

  const closeOutreach = () => {
    setSelectedCandidate(null);
  };

  const copyMessage = async () => {
    if (!selectedCandidate) return;

    const firstName = selectedCandidate.name.split(" ")[0];
    const msg = `Hi ${firstName},

I’ve been tracking how leaders like you are driving ${selectedCandidate.domain} outcomes across GCC. Your ownership of ${selectedCandidate.signals[0] || "key initiatives"} at ${selectedCandidate.company} really stood out.

I’m working with a leadership team that’s building the next phase of their ${selectedCandidate.domain} strategy in UAE, and your background looks like a strong fit for what they’re trying to solve in the next 12–18 months.

Would you be open to a short, no-commitment conversation to explore whether this could be an interesting move for you?`;

    try {
      await navigator.clipboard.writeText(msg);
      alert("Outreach draft copied to clipboard ✅");
    } catch (e) {
      alert("Couldn’t auto-copy, please copy manually.");
    }
  };

  return (
    <div className="App">
      {/* TOP NAV */}
      <header>
        <div className="logo">TC</div>
        <h1>Leadership Command Center</h1>
        <button>Book Strategy Call</button>
      </header>

      <main>
        {/* OVERVIEW ROW */}
        <section className="overview-row">
          <div className="card large">
            <div className="card-header">
              <h2>Active Role Feasibility</h2>
              <span>Updated 2h ago</span>
            </div>
            <div className="card-body">
              <div className="feasibility-score">87</div>
              <div className="feasibility-text">
                Overall market feasibility for current brief
              </div>
            </div>
          </div>

          <div className="card notifications">
            <div className="card-header">
              <h2>Trigger Notifications</h2>
              <span>Now / Soon / Watchlist</span>
            </div>
            <ul className="notif-list">
              <li>
                <strong>Ahmed Rahman</strong> moved from Soon to Now — promotion
                gap crossed 36 months at Careem.
              </li>
              <li>
                <strong>Sara Al Essa</strong> added experimentation wins at
                Tabby — growth fit score increased.
              </li>
              <li>
                <strong>Farah Labib</strong> joined Watchlist — new AI data
                governance exposure at G42.
              </li>
            </ul>
          </div>
        </section>

        {/* DOMAIN TABS */}
        <div className="domain-tabs">
          {["engineering", "product", "security"].map((domain) => (
            <button
              key={domain}
              className={activeDomain === domain ? "tab active" : "tab"}
              onClick={() => setActiveDomain(domain)}
            >
              {domain.charAt(0).toUpperCase() + domain.slice(1)}
            </button>
          ))}
        </div>

        {/* TALENT BOARD */}
        <section className="card talent-board">
          <div className="card-header">
            <div>
              <h2>{getSubtitle()}</h2>
              <span>Now / Soon / Watchlist Intelligence</span>
            </div>
          </div>

          <div className="cards-grid">
            {filteredCandidates.map((c) => (
              <div key={c.id} className="candidate-card">
                <div className="candidate-top">
                  <div>
                    <div className="candidate-name">{c.name}</div>
                    <div className="candidate-title">{c.title}</div>
                  </div>
                  <div className={readinessBadgeClass(c.readinessTier)}>
                    {c.readinessTier}
                  </div>
                </div>
                <div className="candidate-meta">
                  {c.company} • {c.location}
                </div>
                <div className="candidate-score-row">
                  <span>Hireability score</span>
                  <span className="score">{c.hireabilityScore}/100</span>
                </div>
                <div className="candidate-footer">
                  <span>Warmth: {(c.warmth * 100).toFixed(0)}%</span>
                  <button
                    className="outreach-btn"
                    onClick={() => openOutreach(c)}
                  >
                    Outreach
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* OUTREACH MODAL */}
      {selectedCandidate && (
        <div className="modal-backdrop" onClick={closeOutreach}>
          <div
            className="modal"
            onClick={(e) => {
              e.stopPropagation(); // prevent closing when clicking inside modal
            }}
          >
            <div className="modal-header">
              <h3>Outreach Preview</h3>
              <button className="modal-close" onClick={closeOutreach}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-candidate">
                <div className="modal-name">{selectedCandidate.name}</div>
                <div className="modal-title">
                  {selectedCandidate.title} · {selectedCandidate.company}
                </div>
                <div className="modal-meta">{selectedCandidate.location}</div>
              </div>

              <div className="modal-section-label">Smart draft</div>
              <div className="modal-message">
                Hi {selectedCandidate.name.split(" ")[0]},
                <br />
                <br />
                I’ve been tracking how leaders like you are driving{" "}
                {selectedCandidate.domain} outcomes across GCC. Your ownership
                of{" "}
                {selectedCandidate.signals[0] || "key initiatives"} at{" "}
                {selectedCandidate.company} really stood out.
                <br />
                <br />
                I’m working with a leadership team that’s building the next
                phase of their {selectedCandidate.domain} strategy in UAE, and
                your background looks like a strong fit for what they’re trying
                to solve in the next 12–18 months.
                <br />
                <br />
                Would you be open to a short, no-commitment conversation to
                explore whether this could be an interesting move for you?
              </div>
            </div>

            <div className="modal-footer">
              <button className="primary-btn" onClick={copyMessage}>
                Copy message
              </button>
              <button className="secondary-btn" onClick={closeOutreach}>
                Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
