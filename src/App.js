import React, { useState, useMemo } from "react";
import "./App.css";

const sampleLeaders = [
  {
    id: 1,
    name: "Ahmed R.",
    title: "Principal Engineering Manager",
    company: "Careem",
    location: "Dubai",
    function: "engineering",
    readinessTier: "now",
    hireabilityScore: 81,
    warmth: 0.22,
    signals: ["Promotion gap 34 months", "Cloud scale", "Market pressure"],
  },
  {
    id: 2,
    name: "Sana T.",
    title: "Principal Product Manager - AI/ML",
    company: "Microsoft",
    location: "Dubai",
    function: "product",
    readinessTier: "soon",
    hireabilityScore: 75,
    warmth: 0.18,
    signals: ["AI strategy ownership", "Relocation friendly"],
  },
  {
    id: 3,
    name: "Vikram S.",
    title: "Senior Manager - Information Security",
    company: "e& Enterprise",
    location: "Abu Dhabi",
    function: "security",
    readinessTier: "watchlist",
    hireabilityScore: 68,
    warmth: 0.12,
    signals: ["Cloud security lead", "Compliance ownership"],
  },
  {
    id: 4,
    name: "Leena K.",
    title: "Director Product - Payments",
    company: "Fintech (Confidential)",
    location: "Riyadh",
    function: "product",
    readinessTier: "now",
    hireabilityScore: 83,
    warmth: 0.3,
    signals: ["Expansion charter", "Cross-market exposure"],
  },
];

const readinessOrder = ["now", "soon", "watchlist"];

function App() {
  const [activeDomain, setActiveDomain] = useState("all");
  const [radarMode, setRadarMode] = useState("both"); // market | leaders | both
  const [consoleMode, setConsoleMode] = useState("terminal"); // terminal | hud

  const filteredLeaders = useMemo(() => {
    if (activeDomain === "all") return sampleLeaders;
    return sampleLeaders.filter(
      (l) => (l.function || "").toLowerCase() === activeDomain
    );
  }, [activeDomain]);

  const readinessStats = useMemo(() => {
    const base = { now: 0, soon: 0, watchlist: 0 };
    sampleLeaders.forEach((l) => {
      const tier = (l.readinessTier || "").toLowerCase();
      if (tier === "now" || tier === "soon" || tier === "watchlist") {
        base[tier] += 1;
      }
    });
    return base;
  }, []);

  const activeStats = useMemo(() => {
    const base = { now: 0, soon: 0, watchlist: 0 };
    filteredLeaders.forEach((l) => {
      const tier = (l.readinessTier || "").toLowerCase();
      if (tier in base) base[tier] += 1;
    });
    return base;
  }, [filteredLeaders]);

  const radarLegend = useMemo(() => {
    if (radarMode === "market") {
      return {
        label: "Market readiness clusters (GCC leadership)",
        stats: readinessStats,
      };
    }
    if (radarMode === "leaders") {
      return {
        label: "Leaders in your current focus set",
        stats: activeStats,
      };
    }
    return {
      label: "Market + current leaders overlay",
      stats: {
        now: readinessStats.now + activeStats.now,
        soon: readinessStats.soon + activeStats.soon,
        watchlist: readinessStats.watchlist + activeStats.watchlist,
      },
    };
  }, [radarMode, readinessStats, activeStats]);

  const totalLeaders = sampleLeaders.length;

  return (
    <div className="App">
      {/* BACKGROUND GRID */}
      <div className="bg-grid" />

      {/* TOP NAV */}
      <header className="top-nav">
        <div className="brand-block">
          <div className="brand-logo">TC</div>
          <div>
            <div className="brand-eyebrow">Talent Copilot</div>
            <div className="brand-title">
              GCC Talent Intelligence Command Center
            </div>
          </div>
        </div>
        <div className="top-nav-right">
          <div className="top-pill">
            UAE • Saudi • Leadership • Engineering / Product / Security
          </div>
          <button className="primary-btn">
            Book 20-min Strategy Review
          </button>
        </div>
      </header>

      <div className="layout">
        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="sidebar-section">
            <div className="sidebar-label">View</div>
            <button
              className={
                activeDomain === "all"
                  ? "sidebar-tab sidebar-tab-active"
                  : "sidebar-tab"
              }
              onClick={() => setActiveDomain("all")}
            >
              All Leadership
            </button>
            <button
              className={
                activeDomain === "engineering"
                  ? "sidebar-tab sidebar-tab-active"
                  : "sidebar-tab"
              }
              onClick={() => setActiveDomain("engineering")}
            >
              Engineering
            </button>
            <button
              className={
                activeDomain === "product"
                  ? "sidebar-tab sidebar-tab-active"
                  : "sidebar-tab"
              }
              onClick={() => setActiveDomain("product")}
            >
              Product
            </button>
            <button
              className={
                activeDomain === "security"
                  ? "sidebar-tab sidebar-tab-active"
                  : "sidebar-tab"
              }
              onClick={() => setActiveDomain("security")}
            >
              Security
            </button>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-label">Radar Mode</div>
            <button
              className={
                radarMode === "market"
                  ? "sidebar-tab sidebar-tab-active"
                  : "sidebar-tab"
              }
              onClick={() => setRadarMode("market")}
            >
              Market Only
            </button>
            <button
              className={
                radarMode === "leaders"
                  ? "sidebar-tab sidebar-tab-active"
                  : "sidebar-tab"
              }
              onClick={() => setRadarMode("leaders")}
            >
              Leaders Only
            </button>
            <button
              className={
                radarMode === "both"
                  ? "sidebar-tab sidebar-tab-active"
                  : "sidebar-tab"
              }
              onClick={() => setRadarMode("both")}
            >
              Combined View
            </button>
          </div>

          <div className="sidebar-section">
            <div className="sidebar-label">Console Mode</div>
            <button
              className={
                consoleMode === "terminal"
                  ? "sidebar-tab sidebar-tab-active"
                  : "sidebar-tab"
              }
              onClick={() => setConsoleMode("terminal")}
            >
              Terminal
            </button>
            <button
              className={
                consoleMode === "hud"
                  ? "sidebar-tab sidebar-tab-active"
                  : "sidebar-tab"
              }
              onClick={() => setConsoleMode("hud")}
            >
              HUD Assistant
            </button>
          </div>
        </aside>

        {/* MAIN PANEL */}
        <main className="main-panel">
          {/* HERO ROW */}
          <section className="hero-row">
            {/* RADAR CARD */}
            <div className="card radar-card">
              <div className="card-header-row">
                <div>
                  <div className="card-eyebrow">
                    Real-time Readiness Radar
                  </div>
                  <div className="card-title">
                    GCC Leadership Readiness Scan
                  </div>
                  <div className="card-subtitle">
                    {radarLegend.label}
                  </div>
                </div>
                <div className="card-metrics">
                  <div className="metric-pill">
                    Leaders tracked: <span>{totalLeaders}</span>
                  </div>
                  <div className="metric-pill">
                    Domain focus:{" "}
                    <span>
                      {activeDomain === "all"
                        ? "Engineering • Product • Security"
                        : activeDomain.charAt(0).toUpperCase() +
                          activeDomain.slice(1)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="radar-layout">
                <div className="radar-shell">
                  <div className="radar-circle radar-circle-outer" />
                  <div className="radar-circle radar-circle-mid" />
                  <div className="radar-circle radar-circle-inner" />
                  <div className="radar-sweep" />
                  {/* Static blips positioned for visual feel */}
                  <div className="radar-blip blip-now" />
                  <div className="radar-blip blip-soon" />
                  <div className="radar-blip blip-watch" />
                </div>
                <div className="radar-legend">
                  {readinessOrder.map((tier) => (
                    <div key={tier} className="legend-row">
                      <div className={`legend-dot legend-${tier}`} />
                      <div className="legend-label">
                        {tier === "now"
                          ? "Ready Now"
                          : tier === "soon"
                          ? "Ready Soon"
                          : "Watchlist"}
                      </div>
                      <div className="legend-value">
                        {radarLegend.stats[tier]}
                      </div>
                    </div>
                  ))}
                  <div className="legend-footnote">
                    Visual radar is indicative. Counts are driven by your
                    live leadership intelligence.
                  </div>
                </div>
              </div>
            </div>

            {/* SUMMARY CARD */}
            <div className="card summary-card">
              <div className="card-eyebrow">Hiring Risk Profile</div>
              <div className="card-title">Current Search Snapshot</div>
              <div className="summary-grid">
                <div className="summary-block">
                  <div className="summary-label">Overall Feasibility</div>
                  <div className="summary-value">
                    82<span className="summary-unit">/100</span>
                  </div>
                  <div className="summary-bar">
                    <div
                      className="summary-bar-fill fill-green"
                      style={{ width: "82%" }}
                    />
                  </div>
                  <div className="summary-note">
                    Strong market alignment for your current brief.
                  </div>
                </div>
                <div className="summary-block">
                  <div className="summary-label">
                    Offer Acceptance Likelihood
                  </div>
                  <div className="summary-value">
                    74<span className="summary-unit">%</span>
                  </div>
                  <div className="summary-bar">
                    <div
                      className="summary-bar-fill fill-amber"
                      style={{ width: "74%" }}
                    />
                  </div>
                  <div className="summary-note">
                    Sensitive to compensation and interview velocity.
                  </div>
                </div>
                <div className="summary-block">
                  <div className="summary-label">Pipeline Health</div>
                  <div className="summary-value">
                    3.1<span className="summary-unit">x</span>
                  </div>
                  <div className="summary-bar">
                    <div
                      className="summary-bar-fill fill-blue"
                      style={{ width: "62%" }}
                    />
                  </div>
                  <div className="summary-note">
                    Balanced funnel for leadership roles in Dubai/Riyadh.
                  </div>
                </div>
                <div className="summary-block">
                  <div className="summary-label">Diversity Trajectory</div>
                  <div className="summary-value">
                    +9<span className="summary-unit">pts</span>
                  </div>
                  <div className="summary-bar">
                    <div
                      className="summary-bar-fill fill-purple"
                      style={{ width: "54%" }}
                    />
                  </div>
                  <div className="summary-note">
                    Positive movement in shortlists vs last quarter.
                  </div>
                </div>
              </div>
              <div className="summary-footnote">
                These indicators will eventually be powered by live ATS/HRIS
                + market data. Right now they help tell the predictive story
                to investors and partners.
              </div>
            </div>
          </section>

          {/* LEADERS + SIGNALS ROW */}
          <section className="row-2">
            <div className="card leaders-card">
              <div className="card-header-row">
                <div>
                  <div className="card-eyebrow">
                    Leadership Profiles in Focus
                  </div>
                  <div className="card-title">
                    Shortlisted Leaders — {activeDomain === "all"
                      ? "All Functions"
                      : activeDomain.charAt(0).toUpperCase() +
                        activeDomain.slice(1)}
                  </div>
                  <div className="card-subtitle">
                    Warmth, hireability and key signals for potential outreach.
                  </div>
                </div>
              </div>
              <div className="leaders-grid">
                {filteredLeaders.map((leader) => (
                  <article key={leader.id} className="leader-card">
                    <div className="leader-header">
                      <div>
                        <div className="leader-name">{leader.name}</div>
                        <div className="leader-title">{leader.title}</div>
                        <div className="leader-meta">
                          {leader.company} • {leader.location}
                        </div>
                      </div>
                      <div
                        className={`tier-chip tier-${leader.readinessTier}`}
                      >
                        {leader.readinessTier === "now"
                          ? "Ready Now"
                          : leader.readinessTier === "soon"
                          ? "Ready Soon"
                          : "Watchlist"}
                      </div>
                    </div>
                    <div className="leader-stats-row">
                      <div className="leader-stat">
                        <span>Hireability</span>
                        <strong>{leader.hireabilityScore}/100</strong>
                      </div>
                      <div className="leader-stat">
                        <span>Warmth Index</span>
                        <strong>
                          {(leader.warmth * 100).toFixed(0)}
                          %
                        </strong>
                      </div>
                    </div>
                    <div className="leader-signals">
                      {leader.signals.map((s, idx) => (
                        <span key={idx} className="signal-pill">
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="leader-footer">
                      <span className="leader-footnote">
                        This is illustrative data to demonstrate how Talent
                        Copilot will surface leadership signals.
                      </span>
                      <button className="ghost-btn">
                        Open Outreach Playbook
                      </button>
                    </div>
                  </article>
                ))}
                {filteredLeaders.length === 0 && (
                  <div className="empty-state">
                    No leaders mapped yet for this function. In a live
                    environment, this panel would pull directly from your ATS
                    / talent map.
                  </div>
                )}
              </div>
            </div>

            {/* SIGNAL FEED */}
            <div className="card signals-card">
              <div className="card-eyebrow">Signals Feed</div>
              <div className="card-title">Recent Leadership Market Signals</div>
              <ul className="signals-list">
                <li>
                  <span className="signal-tag tag-green">Positive</span>
                  Multiple GCC fintechs have opened Director / VP roles in
                  Payments — talent movement expected in the next quarter.
                </li>
                <li>
                  <span className="signal-tag tag-amber">Watch</span>
                  Cybersecurity leadership demand in Riyadh is outpacing
                  supply — feasibility drops if compensation is not adjusted.
                </li>
                <li>
                  <span className="signal-tag tag-blue">Insight</span>
                  Engineering leaders with AI/ML exposure are clustering in
                  Dubai, with remote-friendly expectations rising.
                </li>
                <li>
                  <span className="signal-tag tag-purple">Diversity</span>
                  Leadership shortlists are still skewed in favour of a narrow
                  demographic in some teams — diversity gains require
                  deliberate sourcing.
                </li>
              </ul>
            </div>
          </section>

          {/* CONSOLE ROW */}
          <section className="console-row card">
            <div className="console-header">
              <div>
                <div className="card-eyebrow">Talent Strategy Console</div>
                <div className="card-title">
                  {consoleMode === "terminal"
                    ? "Command-Line View"
                    : "Assistant View"}
                </div>
                <div className="card-subtitle">
                  Ask questions like: “How risky is my hiring plan?” or “Where
                  is leadership readiness highest in GCC?”
                </div>
              </div>
              <div className="console-mode-toggle">
                <button
                  className={
                    consoleMode === "terminal"
                      ? "toggle-chip toggle-chip-active"
                      : "toggle-chip"
                  }
                  onClick={() => setConsoleMode("terminal")}
                >
                  Terminal
                </button>
                <button
                  className={
                    consoleMode === "hud"
                      ? "toggle-chip toggle-chip-active"
                      : "toggle-chip"
                  }
                  onClick={() => setConsoleMode("hud")}
                >
                  HUD Assistant
                </button>
              </div>
            </div>

            {consoleMode === "terminal" ? (
              <div className="terminal-console">
                <div className="terminal-line">
                  &gt; INIT TALENT_COPILOT --region GCC --focus leadership
                </div>
                <div className="terminal-line terminal-ok">
                  [OK] Data sources: market benchmarks, leadership map,
                  readiness tiers.
                </div>
                <div className="terminal-line">
                  &gt; SCAN --mode {radarMode.toUpperCase()} --function{" "}
                  {activeDomain === "all" ? "ALL" : activeDomain.toUpperCase()}
                </div>
                <div className="terminal-line">
                  [INFO] Readiness distribution:
                  {"  "}
                  NOW={radarLegend.stats.now} | SOON=
                  {radarLegend.stats.soon} | WATCHLIST=
                  {radarLegend.stats.watchlist}
                </div>
                <div className="terminal-line">
                  [RISK] Hiring risk is moderate. Main drivers: competition for
                  AI/ML, cybersecurity leadership; salary expectations trending
                  upward in Dubai &amp; Riyadh.
                </div>
                <div className="terminal-line">
                  [RECOMMEND] Accelerate warm outreach to high-readiness
                  leaders. Align compensation bands for critical functions.
                </div>
                <div className="terminal-cursor">▌</div>
              </div>
            ) : (
              <div className="hud-console">
                <div className="hud-grid">
                  <div className="hud-card">
                    <div className="hud-label">Hiring Outlook</div>
                    <div className="hud-main">
                      GCC leadership hiring feasibility is{" "}
                      <span className="hud-highlight">favourable</span> with
                      concentrated readiness in{" "}
                      <span className="hud-highlight">
                        Engineering &amp; Product
                      </span>{" "}
                      across Dubai and Riyadh.
                    </div>
                    <div className="hud-meta">
                      Suggested move: lock in top 3–5 warm leaders before the
                      next funding or restructuring cycle.
                    </div>
                  </div>
                  <div className="hud-card">
                    <div className="hud-label">Risk &amp; Mitigation</div>
                    <div className="hud-main">
                      Primary risk factors:
                      <ul>
                        <li>Compensation misalignment for AI/ML leadership.</li>
                        <li>
                          Limited cybersecurity leadership pool in Saudi
                          compared to demand.
                        </li>
                        <li>Offer drop-off if processes run too long.</li>
                      </ul>
                    </div>
                    <div className="hud-meta">
                      Playbook: tighten interview loops, pre-align ranges,
                      emphasise impact &amp; autonomy in outreach.
                    </div>
                  </div>
                  <div className="hud-card">
                    <div className="hud-label">Next Best Actions</div>
                    <ul className="hud-actions">
                      <li>
                        Shortlist 5–7 leaders in the <strong>“Ready Now”</strong>{" "}
                        tier for immediate mapping conversations.
                      </li>
                      <li>
                        Build a <strong>6–9 month bench</strong> for “Soon” tier
                        leaders across GCC.
                      </li>
                      <li>
                        Layer in <strong>diversity objectives</strong> at the
                        shortlisting stage, not just at final offer.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
