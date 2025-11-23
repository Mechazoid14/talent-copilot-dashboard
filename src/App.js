import React, { useState } from "react";
import "./App.css";

// Leadership candidates (sample data)
const candidates = [
  {
    id: 1,
    name: "Ahmed R.",
    title: "Principal Engineering Manager - Backend",
    company: "Careem",
    location: "Dubai",
    domain: "engineering",
    hireabilityScore: 81,
    readinessTier: "now",
    signals: ["Promotion gap 34 months", "Cloud scale", "Market pressure"],
    warmth: 0.2,
  },
  {
    id: 2,
    name: "Sana T.",
    title: "Principal Product Manager - AI/ML",
    company: "Microsoft",
    location: "Dubai",
    domain: "product",
    hireabilityScore: 75,
    readinessTier: "soon",
    signals: ["AI strategy", "Relocation friendly"],
    warmth: 0.15,
  },
  {
    id: 3,
    name: "Vikram S.",
    title: "Senior Manager - Information Security",
    company: "e& Enterprise",
    location: "Abu Dhabi",
    domain: "security",
    hireabilityScore: 68,
    readinessTier: "watchlist",
    signals: ["Cloud security", "Compliance ownership"],
    warmth: 0.1,
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
                <strong>Ahmed R.</strong> moved from Soon to Now — promotion
                gap crossed 36 months at Careem.
              </li>
              <li>
                <strong>Sana T.</strong> added new AI/ML certification — skill–
                market fit score increased.
              </li>
              <li>
                <strong>Vikram S.</strong> joined Watchlist — new GCC
                compliance exposure at e&amp; Enterprise.
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
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
