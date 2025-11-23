import React, { useState } from "react";
import "./App.css";

// Single source of truth for all candidates
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
              className={
                activeDomain === domain ? "tab active" : "tab"
              }
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
                  <button className="outreach-btn">Outreach</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
