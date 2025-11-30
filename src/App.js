import React, { useState, useEffect } from "react";
import "./App.css";

// ---------- DATA ----------

const triggers = [
  {
    id: 1,
    label: "NOW",
    text: "Ahmed Rahman moved from Soon → Now — promotion gap crossed 36 months at Careem.",
  },
  {
    id: 2,
    label: "SOON",
    text: "Rania Al Nasser led new fintech launch at STC — compensation competitiveness should be reviewed.",
  },
  {
    id: 3,
    label: "WATCHLIST",
    text: "Farah Labib joined Watchlist — new AI data governance exposure at G42.",
  },
];

const leaders = [
  {
    id: 1,
    name: "Ahmed Rahman",
    title: "Director of Engineering — Mobility",
    company: "Careem",
    location: "Dubai",
    readiness: "NOW",
    score: 84,
    warmth: 32,
  },
  {
    id: 2,
    name: "Nikhil Prasad",
    title: "Senior Engineering Manager — Logistics",
    company: "Talabat",
    location: "Dubai",
    readiness: "SOON",
    score: 79,
    warmth: 24,
  },
  {
    id: 3,
    name: "Lina Mansour",
    title: "Head of Engineering — Platform",
    company: "Noon",
    location: "Dubai",
    readiness: "WATCHLIST",
    score: 82,
    warmth: 18,
  },
  {
    id: 4,
    name: "Omar Suleiman",
    title: "Principal SWE Manager",
    company: "Microsoft",
    location: "Dubai",
    readiness: "SOON",
    score: 87,
    warmth: 21,
  },
];

const demandSeries = [48, 62, 70, 80, 76, 83, 92];
const supplySeries = [72, 74, 71, 69, 64, 60, 58];

// ---------- SMALL HOOKS / VIZ ----------

function useAnimatedNumber(target, duration = 800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame;
    const start = performance.now();

    const animate = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}

function SuccessGauge({ value }) {
  const radius = 48;
  const stroke = 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <svg className="gauge" viewBox="0 0 140 140" aria-hidden="true">
      <defs>
        <linearGradient id="gaugeStroke" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="50%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>
      <circle
        className="gauge-track"
        cx="70"
        cy="70"
        r={radius}
        strokeWidth={stroke}
      />
      <circle
        className="gauge-fill"
        cx="70"
        cy="70"
        r={radius}
        strokeWidth={stroke}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />
      <text x="70" y="70" textAnchor="middle" className="gauge-value">
        {value}%
      </text>
      <text x="70" y="88" textAnchor="middle" className="gauge-label">
        Success
      </text>
    </svg>
  );
}

function Sparkline({ data, color = "#38bdf8" }) {
  if (!data || !data.length) return null;

  const width = 140;
  const height = 42;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1 || 1)) * width;
      const y = height - ((v - min) / range) * height;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg className="sparkline" viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        points={points}
        className="sparkline-line"
      />
      <defs>
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.24" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        className="sparkline-fill"
        fill="url(#sparkFill)"
        points={`${points} ${width},${height} 0,${height}`}
      />
    </svg>
  );
}

function DepthBar({ label, value }) {
  return (
    <div className="depth-bar-row">
      <span className="depth-label">{label}</span>
      <div className="depth-track">
        <div className="depth-fill" style={{ width: `${value}%` }} />
      </div>
      <span className="depth-value">{value}</span>
    </div>
  );
}

function MarketInsight({ label, text }) {
  return (
    <div className="market-card">
      <div className="market-pill">{label}</div>
      <p>{text}</p>
    </div>
  );
}

// ---------- MAIN APP ----------

function App() {
  const [region, setRegion] = useState("UAE");
  const [fnFilter, setFnFilter] = useState("Engineering");

  // This is the ONLY state we need for the modal
  const [activeLeader, setActiveLeader] = useState(null);

  const success = useAnimatedNumber(72);
  const timeToFill = useAnimatedNumber(48);
  const depth = { engineering: 92, product: 76, security: 64 };

  const buildMessage = (leader) => {
    if (!leader) return "";
    return `Hi ${leader.name.split(" ")[0]},

I’ve been tracking senior ${fnFilter.toLowerCase()} leadership across ${region}, and your work at ${leader.company} in ${leader.location} really stands out.

We’re running a confidential search for a ${fnFilter.toLowerCase()} leadership role and Talent Copilot signals a very strong fit in terms of scope, impact and timing.

Would you be open to a short conversation this week to explore if it aligns with your next move?

Best,
Ayush`;
  };

  return (
    <div className="App">
      <div className="command-shell">
        {/* TOP NAV */}
        <header className="command-nav">
          <div className="nav-left">
            <div className="nav-logo">TC</div>
            <div>
              <div className="nav-product">TALENT COPILOT</div>
              <div className="nav-sub">
                GCC Leadership Command Center ({region})
              </div>
            </div>
          </div>
          <div className="nav-right">
            <span className="nav-founder">
              Ayush Mishra • Founder — Talent Copilot
            </span>
            <button className="nav-cta">Book Strategy Call</button>
          </div>
        </header>

        <main className="command-main">
          {/* FILTERS */}
          <div className="filters-row">
            <div className="pill-group">
              {["UAE", "Saudi Arabia"].map((r) => (
                <button
                  key={r}
                  className={region === r ? "filter-pill active" : "filter-pill"}
                  onClick={() => setRegion(r)}
                >
                  {r}
                </button>
              ))}
            </div>
            <div className="pill-group">
              {["Engineering", "Product", "Security"].map((fn) => (
                <button
                  key={fn}
                  className={fnFilter === fn ? "filter-pill active" : "filter-pill"}
                  onClick={() => setFnFilter(fn)}
                >
                  {fn}
                </button>
              ))}
            </div>
          </div>

          {/* ROW 1 – FEASIBILITY + TRIGGERS */}
          <section className="grid-two slide-up">
            <div className="panel panel-feasibility">
              <div className="panel-header">
                <div>
                  <h2>Role Feasibility Intelligence</h2>
                  <p className="panel-sub">
                    Predictive read on whether this brief can be closed on time in {region}.
                  </p>
                </div>
                <span className="panel-tag">Live · 2h ago</span>
              </div>

              <div className="feasibility-grid">
                <div className="gauge-block">
                  <SuccessGauge value={success} />
                </div>

                <div className="feasibility-metrics">
                  <div className="metric-row">
                    <div>
                      <span className="metric-label">Time-to-fill</span>
                      <span className="metric-value">{timeToFill} days</span>
                    </div>
                    <div>
                      <span className="metric-label">Relocation friendly</span>
                      <span className="metric-value">High</span>
                    </div>
                  </div>
                  <div className="metric-row">
                    <div>
                      <span className="metric-label">Market pressure</span>
                      <span className="metric-value danger">
                        High <span className="metric-arrow">↑</span>
                      </span>
                    </div>
                    <div>
                      <span className="metric-label">Function focus</span>
                      <span className="metric-value">
                        {fnFilter} leadership
                      </span>
                    </div>
                  </div>

                  <div className="trend-block">
                    <div className="trend-header">
                      <span className="metric-label">Demand vs supply trend</span>
                      <span className="trend-legend">
                        <span className="dot demand" /> Demand
                        <span className="dot supply" /> Supply
                      </span>
                    </div>
                    <div className="trend-lines">
                      <Sparkline data={demandSeries} color="#f97316" />
                      <Sparkline data={supplySeries} color="#38bdf8" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="depth-row">
                <span className="metric-label">Talent depth (UAE)</span>
                <div className="depth-bars">
                  <DepthBar label="Engineering" value={depth.engineering} />
                  <DepthBar label="Product" value={depth.product} />
                  <DepthBar label="Security" value={depth.security} />
                </div>
              </div>
            </div>

            <div className="panel panel-triggers">
              <div className="panel-header">
                <div>
                  <h2>Trigger Notifications</h2>
                  <p className="panel-sub">
                    Watch how leadership readiness shifts across the GCC.
                  </p>
                </div>
                <span className="panel-tag">Now / Soon / Watchlist</span>
              </div>

              <div className="trigger-list">
                {triggers.map((t) => (
                  <div key={t.id} className="trigger-item">
                    <span className={`trigger-badge trigger-${t.label.toLowerCase()}`}>
                      {t.label}
                    </span>
                    <p>{t.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ROW 2 – MARKET RADAR */}
          <section className="panel panel-market slide-up">
            <div className="panel-header">
              <div>
                <h2>Market Radar — {region}</h2>
                <p className="panel-sub">
                  Snapshot of leadership depth, compensation pressure, and relocation appetite for GCC tech.
                </p>
              </div>
              <span className="panel-tag">Engineering · Product · Security</span>
            </div>

            <div className="market-grid">
              <MarketInsight
                label="ENGINEERING"
                text="Strong senior engineering leadership across Dubai & Abu Dhabi; highly competitive for platform & data leadership."
              />
              <MarketInsight
                label="PRODUCT"
                text="Mature product talent in BNPL, marketplaces & SaaS; strong growth & monetisation track record."
              />
              <MarketInsight
                label="SECURITY"
                text="Deep cloud & cyber leaders from telco, government, and AI orgs; UAE is now the GCC hub for security leadership."
              />
            </div>
          </section>

          {/* ROW 3 – LEADERSHIP BOARD */}
          <section className="panel panel-leaders slide-up">
            <div className="panel-header">
              <div>
                <h2>Leadership Talent Board</h2>
                <p className="panel-sub">
                  Ranked by hireability & readiness tier for {fnFilter} leadership roles.
                </p>
              </div>
              <span className="panel-tag">Now · Soon · Watchlist</span>
            </div>

            <div className="leaders-row">
              {leaders.map((leader) => (
                <div key={leader.id} className="leader-card">
                  <div className="leader-header">
                    <div>
                      <div className="leader-name">{leader.name}</div>
                      <div className="leader-role">{leader.title}</div>
                      <div className="leader-meta">
                        {leader.company} • {leader.location}
                      </div>
                    </div>
                    <div
                      className={`readiness-pill readiness-${leader.readiness.toLowerCase()}`}
                    >
                      {leader.readiness}
                    </div>
                  </div>

                  <div className="leader-body">
                    <div className="leader-ring">
                      <div className="ring-outer">
                        <div
                          className="ring-fill"
                          style={{ "--value": `${leader.score}` }}
                        />
                        <div className="ring-inner">
                          <span className="ring-value">{leader.score}</span>
                          <span className="ring-label">/100</span>
                        </div>
                      </div>
                    </div>
                    <div className="leader-stats">
                      <div>
                        <span className="stat-label">Hireability</span>
                        <span className="stat-value">
                          {leader.score}/100
                        </span>
                      </div>
                      <div>
                        <span className="stat-label">Warmth</span>
                        <span className="stat-value">
                          {leader.warmth}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="leader-footer">
                    <span className="leader-hint">
                      Open in Outreach Console
                    </span>
                    {/* THIS is the important bit: directly sets modal state */}
                    <button
                      className="btn-outline"
                      onClick={() => setActiveLeader(leader)}
                    >
                      Outreach
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* SIMPLE MODAL */}
        {activeLeader && (
          <div className="modal-backdrop" onClick={() => setActiveLeader(null)}>
            <div
              className="modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div>
                  <div className="modal-eyebrow">Outreach preview</div>
                  <div className="modal-name">{activeLeader.name}</div>
                  <div className="modal-title">
                    {activeLeader.title} · {activeLeader.company} ·{" "}
                    {activeLeader.location}
                  </div>
                </div>
                <button
                  className="modal-close"
                  onClick={() => setActiveLeader(null)}
                >
                  ✕
                </button>
              </div>

              <div className="modal-section-label">
                Message you can paste into email / LinkedIn
              </div>

              <textarea
                className="modal-message"
                readOnly
                value={buildMessage(activeLeader)}
              />

              <div className="modal-footer">
                <span className="modal-hint">
                  Copy & paste into LinkedIn / email / your outreach console.
                </span>
                <button
                  className="nav-cta modal-primary"
                  onClick={() => {
                    // safest: just try to copy; if it fails nothing breaks
                    if (navigator.clipboard?.writeText) {
                      navigator.clipboard.writeText(
                        buildMessage(activeLeader)
                      );
                    }
                  }}
                >
                  Copy message
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
