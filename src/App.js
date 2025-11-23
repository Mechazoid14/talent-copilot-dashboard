import React from "react";
import "./App.css";

const sampleCandidates = [
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

const readinessBadgeStyle = (tier) => {
  switch (tier) {
    case "now":
      return "bg-blue-500 text-blue-100 border border-blue-400";
    case "soon":
      return "bg-cyan-500 text-cyan-100 border border-cyan-400";
    default:
      return "bg-purple-500 text-purple-100 border border-purple-400";
  }
};

function App() {
  return (
    <div className="App min-h-screen bg-[#05070b] text-slate-100">
      {/* Top Nav */}
      <header className="border-b border-slate-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold">
            TC
          </div>
          <div>
            <div className="text-sm uppercase tracking-[0.22em] text-slate-400">
              Talent Copilot
            </div>
            <div className="text-base font-semibold text-slate-100">
              Leadership Command Center
            </div>
          </div>
        </div>
        <button className="px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-sm font-medium">
          Book Strategy Call
        </button>
      </header>

      {/* Content */}
      <main className="px-6 py-5 space-y-5">
        {/* Overview row */}
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
                <strong>Vikram S.</strong> joined Watchlist — new GCC compliance
                exposure at e&amp; Enterprise.
              </li>
            </ul>
          </div>
        </section>

        {/* Talent board */}
        <section className="card talent-board">
          <div className="card-header">
            <div>
              <h2>Leadership Talent Board</h2>
              <span>Engineering / Product / Security</span>
            </div>
            <div className="card-sub">
              Sorted by hireability &amp; readiness tier
            </div>
          </div>

          <div className="cards-grid">
            {sampleCandidates.map((c) => (
              <div key={c.id} className="candidate-card">
                <div>
                  <div className="candidate-top">
                    <div>
                      <div className="candidate-name">{c.name}</div>
                      <div className="candidate-title">{c.title}</div>
                    </div>
                    <div className={`badge ${readinessBadgeStyle(c.readinessTier)}`}>
                      {c.readinessTier === "now"
                        ? "Now"
                        : c.readinessTier === "soon"
                        ? "Soon"
                        : "Watchlist"}
                    </div>
                  </div>
                  <div className="candidate-meta">
                    {c.company} • {c.location}
                  </div>
                  <div className="candidate-score-row">
                    <span>Hireability score</span>
                    <span className="score">{c.hireabilityScore}/100</span>
                  </div>
                  <div className="candidate-signals">
                    Signals:
                    <ul>
                      {c.signals.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="candidate-footer">
                  <span>Warmth: {(c.warmth * 100).toFixed(0)}%</span>
                  <button className="outreach-btn">
                    Open in Outreach Console
                  </button>
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
