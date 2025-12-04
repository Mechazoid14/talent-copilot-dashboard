import React, { useState, useEffect } from "react";
import "./App.css";
import Papa from "papaparse";
/* -------------------------------------------------------------------------- */
/*  GOOGLE SHEETS CSV URL                                                     */
/* -------------------------------------------------------------------------- */

const LEADERS_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1wyfOlRg5TEA2bQKbu-1zmysBSrS7h1JCoPCNdq79OCQ/export?format=csv&gid=0";

/* -------------------------------------------------------------------------- */
/*  V3 STATUS BEACON COMPONENT                                                */
/* -------------------------------------------------------------------------- */

const StatusBeacon = ({ status }) => {
  const normalized = (status || "").toLowerCase();
  const iconMap = {
    now: "⚡",
    soon: "⏳",
    watchlist: "👁‍🗨",
  };

  const icon = iconMap[normalized] || "●";
  const label = (status || "").toUpperCase();

  return (
    <div className={`status-beacon v3 ${normalized}`}>
      <span className="sb-ring" aria-hidden="true">
        <span className="sb-dot" />
      </span>
      <span className="sb-label">
        <span className="sb-icon">{icon}</span>
        {label}
      </span>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  SIMPLE SPARKLINE COMPONENT (DEMAND VS SUPPLY)                             */
/* -------------------------------------------------------------------------- */

const Sparkline = ({ demand, supply }) => {
  const width = 120;
  const height = 40;

  const toPath = (points) => {
    if (!points || points.length === 0) return "";
    const step = width / (points.length - 1 || 1);
    return points
      .map((v, i) => {
        const x = i * step;
        const y = height - (v / 100) * height;
        return `${i === 0 ? "M" : "L"}${x},${y}`;
      })
      .join(" ");
  };

  const demandPath = toPath(demand);
  const supplyPath = toPath(supply);

  return (
    <svg className="sparkline" viewBox={`0 0 ${width} ${height}`}>
      <path
        d={demandPath}
        className="sparkline-line demand"
        fill="none"
        strokeWidth="2"
      />
      <path
        d={supplyPath}
        className="sparkline-line supply"
        fill="none"
        strokeWidth="2"
      />
    </svg>
  );
};

/* -------------------------------------------------------------------------- */
/*  CIRCULAR GAUGE FOR SUCCESS PROBABILITY                                    */
/* -------------------------------------------------------------------------- */

const Gauge = ({ value }) => {
  const size = 140;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, value));
  const offset = circumference * (1 - clamped / 100);

  return (
    <svg className="gauge" viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id="gaugeStroke" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="50%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#a855f7" />
        </linearGradient>
      </defs>

      <circle
        className="gauge-track"
        cx={size / 2}
        cy={size / 2}
        r={radius}
      />
      <circle
        className="gauge-fill"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
      />

      <text
        x="50%"
        y="48%"
        textAnchor="middle"
        className="gauge-value"
      >{`${clamped}%`}</text>
      <text x="50%" y="63%" textAnchor="middle" className="gauge-label">
        Success
      </text>
    </svg>
  );
};

/* -------------------------------------------------------------------------- */
/*  OUTREACH MODAL                                                            */
/* -------------------------------------------------------------------------- */

const OutreachModal = ({ leader, onClose }) => {
  if (!leader) return null;

  const firstName = leader.name ? leader.name.split(" ")[0] : "there";

  const defaultMessage = `Hi ${firstName},

I’ve been tracking your work around ${leader.focus} at ${leader.company} and believe you’re in the top readiness tier for a GCC leadership brief we’re shaping.

Would you be open to a short, confidential conversation about what “next 3 years” looks like for you in ${leader.location}?`;

  return (
    <div className="modal-backdrop">
      <div className="modal slide-up">
        <div className="modal-header">
          <div>
            <div className="modal-eyebrow">Outreach Console</div>
            <div className="modal-name">{leader.name}</div>
            <div className="modal-title">
              {leader.title} · {leader.company} · {leader.location}
            </div>
          </div>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-section-label">Suggested opener</div>
        <textarea
          className="modal-message"
          defaultValue={defaultMessage}
        />

        <div className="modal-footer">
          <div className="modal-hint">
            This is just a draft. You’ll send it via LinkedIn / email.
          </div>
          <div>
            <button className="btn-outline secondary-btn" onClick={onClose}>
              Close
            </button>
            <button className="nav-cta modal-primary" onClick={onClose}>
              Mark as Contacted
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  FALLBACK DATA IF SHEET FAILS                                              */
/* -------------------------------------------------------------------------- */

const trendDemand = [40, 55, 68, 72, 65];
const trendSupply = [70, 64, 59, 52, 45];

const depthByFunction = [
  { label: "Engineering", value: 92 },
  { label: "Product", value: 76 },
  { label: "Security", value: 64 },
];

const triggers = [
  {
    id: 1,
    type: "now",
    when: "2h ago",
    text: "Ahmed Rahman moved from Soon → Now — promotion gap crossed 36 months at Careem.",
  },
  {
    id: 2,
    type: "soon",
    when: "1d ago",
    text: "Rania Al Nasser led new fintech launch at STC — compensation competitiveness should be reviewed.",
  },
  {
    id: 3,
    type: "watchlist",
    when: "3d ago",
    text: "Farah Labib joined Watchlist — new AI data governance exposure at G42.",
  },
];

const marketInsights = [
  {
    id: 1,
    tag: "Engineering",
    text: "Strong senior engineering leadership across Dubai & Abu Dhabi; highly competitive for platform & data leadership.",
  },
  {
    id: 2,
    tag: "Product",
    text: "Mature product talent in BNPL, marketplaces & SaaS; strong growth & monetisation track record.",
  },
  {
    id: 3,
    tag: "Security",
    text: "Deep cyber & cloud security leaders from telco, gov and AI orgs; UAE is now the GCC hub for security leadership.",
  },
];

const fallbackLeaders = [
  {
    id: 1,
    name: "Ahmed Rahman",
    title: "Director of Engineering — Mobility",
    company: "Careem",
    location: "Dubai",
    readinessTier: "now",
    hireabilityScore: 84,
    warmth: 32,
    focus: "mobility & platform scale",
    function: "engineering",
  },
  {
    id: 2,
    name: "Nikhil Prasad",
    title: "Senior Engineering Manager — Logistics",
    company: "Talabat",
    location: "Dubai",
    readinessTier: "soon",
    hireabilityScore: 79,
    warmth: 24,
    focus: "logistics & last-mile",
    function: "engineering",
  },
  {
    id: 3,
    name: "Lina Mansour",
    title: "Head of Product — Platform",
    company: "Noon",
    location: "Dubai",
    readinessTier: "watchlist",
    hireabilityScore: 82,
    warmth: 18,
    focus: "platform & reliability",
    function: "product",
  },
  {
    id: 4,
    name: "Omar Suleiman",
    title: "Principal Security Engineering Manager",
    company: "Microsoft",
    location: "Dubai",
    readinessTier: "soon",
    hireabilityScore: 87,
    warmth: 21,
    focus: "security & cloud scale",
    function: "security",
  },
];

/* -------------------------------------------------------------------------- */
/*  CSV PARSER FOR LEADERS SHEET                                              */
/*  Expecting headers:                                                        */
/*  name,title,company,location,readinessTier,hireabilityScore,warmth,focus,  */
/*  function                                                                  */
/* -------------------------------------------------------------------------- */

function parseLeadersCsv(csvText) {
  const result = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
  });

  return result.data
    .map((obj, idx) => {
      const rawFn = (obj.function || "").toLowerCase().trim();

      let fn = "";
      if (rawFn.includes("engineer")) fn = "engineering";
      else if (rawFn.includes("product")) fn = "product";
      else if (rawFn.includes("sec")) fn = "security";
      else fn = rawFn;

      return {
        id: idx + 1,
        name: obj.name || "",
        title: obj.title || "",
        company: obj.company || "",
        location: obj.location || "",
        readinessTier: (obj.readinessTier || "").toLowerCase(),
        hireabilityScore: Number(obj.hireabilityScore || 0),
        warmth: Number(obj.warmth || 0),
        focus: obj.focus || "",
        function: fn,
      };
    })
    .filter(Boolean);
}




/* -------------------------------------------------------------------------- */
/*  MAIN APP                                                                  */
/* -------------------------------------------------------------------------- */

function App() {
  const [region, setRegion] = useState("UAE");
  const [domain, setDomain] = useState("Engineering");
  const [selectedLeader, setSelectedLeader] = useState(null);

  const [leaders, setLeaders] = useState(fallbackLeaders);
  const [leadersLoading, setLeadersLoading] = useState(false);
  const [leadersError, setLeadersError] = useState(null);

  const successProbability = 72;
  const timeToFillDays = 48;
  const relocationFriendly = "High";
  const marketPressure = "High ↑";

  useEffect(() => {
    async function loadLeaders() {
      if (!LEADERS_CSV_URL) return;
      try {
        setLeadersLoading(true);
        setLeadersError(null);

        const res = await fetch(LEADERS_CSV_URL);
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        const text = await res.text();
        const parsed = parseLeadersCsv(text);

        if (parsed.length) {
          setLeaders(parsed);
        }
      } catch (err) {
        console.error("Failed to load leaders from sheet:", err);
        setLeadersError("Could not sync leaders from Google Sheets.");
      } finally {
        setLeadersLoading(false);
      }
    }

    loadLeaders();
  }, []);

  const handleOutreach = (leader) => {
    setSelectedLeader(leader);
  };

  const domainKey = domain.toLowerCase();

  return (
    <div className="App">
      <div className="command-shell">
        {/* TOP NAV */}
        <header className="command-nav">
          <div className="nav-left">
            <div className="nav-logo">TC</div>
            <div>
              <div className="nav-product">Talent Copilot</div>
              <div className="nav-sub">
                GCC Leadership Command Center ({region})
              </div>
            </div>
          </div>
          <div className="nav-right">
            <div className="nav-founder">
              Ayush Mishra · Founder — Talent Copilot
            </div>
            <button className="nav-cta">Book Strategy Call</button>
          </div>
        </header>

        <main className="command-main">
          {/* REGION + DOMAIN FILTERS */}
          <div className="filters-row">
            <div className="pill-group">
              {["UAE", "Saudi Arabia"].map((r) => (
                <button
                  key={r}
                  className={`filter-pill ${region === r ? "active" : ""}`}
                  onClick={() => setRegion(r)}
                >
                  {r}
                </button>
              ))}
            </div>
            <div className="pill-group">
              {["Engineering", "Product", "Security"].map((d) => (
                <button
                  key={d}
                  className={`filter-pill ${domain === d ? "active" : ""}`}
                  onClick={() => setDomain(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* TOP GRID: FEASIBILITY + TRIGGERS */}
          <section className="grid-two">
            {/* ROLE FEASIBILITY PANEL */}
            <section className="panel">
              <div className="panel-header">
                <div>
                  <h2>Role Feasibility Intelligence</h2>
                  <p className="panel-sub">
                    Predictive read on whether this brief can be closed on time
                    in {region}.
                  </p>
                </div>
                <div className="panel-tag">Live · 2h ago</div>
              </div>

              <div className="feasibility-grid">
                <div className="gauge-block">
                  <Gauge value={successProbability} />
                </div>

                <div className="feasibility-metrics">
                  <div className="metric-row">
                    <div className="metric-label">
                      Time-to-fill
                      <span className="metric-value">{timeToFillDays} days</span>
                    </div>
                    <div className="metric-label">
                      Relocation friendly
                      <span className="metric-value">
                        {relocationFriendly}
                      </span>
                    </div>
                    <div className="metric-label">
                      Market pressure
                      <span className="metric-value danger">
                        {marketPressure}
                      </span>
                    </div>
                  </div>

                  <div className="trend-block">
                    <div className="trend-header">
                      <div className="panel-sub">Demand vs Supply trend</div>
                      <div className="trend-legend">
                        <span className="dot demand" />
                        Demand
                        <span className="dot supply" />
                        Supply
                      </div>
                    </div>
                    <div className="trend-lines">
                      <Sparkline demand={trendDemand} supply={trendSupply} />
                    </div>
                  </div>

                  <div className="depth-row">
                    <div className="panel-sub">Talent depth ({region})</div>
                    <div className="depth-bars">
                      {depthByFunction.map((fn) => (
                        <div key={fn.label} className="depth-bar-row">
                          <span className="depth-label">{fn.label}</span>
                          <div className="depth-track">
                            <div
                              className="depth-fill"
                              style={{ width: `${fn.value}%` }}
                            />
                          </div>
                          <span className="depth-value">{fn.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* TRIGGER NOTIFICATIONS PANEL */}
            <section className="panel panel-triggers">
              <div className="panel-header">
                <div>
                  <h2>Trigger Notifications</h2>
                  <p className="panel-sub">
                    Watch how leadership readiness shifts across the GCC.
                  </p>
                </div>
                <div className="panel-tag">Now / Soon / Watchlist</div>
              </div>

              <div className="trigger-list">
                {triggers.map((t) => (
                  <div key={t.id} className="trigger-item">
                    <div className="trigger-top">
                      <StatusBeacon status={t.type} />
                      <span className="trigger-time-label">{t.when}</span>
                    </div>
                    <div className="trigger-text">{t.text}</div>
                  </div>
                ))}
              </div>
            </section>
          </section>

          {/* MARKET RADAR */}
          <section className="panel panel-market">
            <div className="panel-header">
              <div>
                <h2>Market Radar — {region}</h2>
                <p className="panel-sub">
                  Snapshot of leadership depth, compensation pressure, and
                  relocation appetite for GCC tech.
                </p>
              </div>
              <div className="panel-tag">
                Engineering · Product · Security
              </div>
            </div>

            <div className="market-grid">
              {marketInsights.map((m) => (
                <div key={m.id} className="market-card">
                  <span className="market-pill">{m.tag}</span>
                  <p>{m.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* LEADERSHIP BOARD */}
          <section className="panel panel-leaders">
            <div className="panel-header">
              <div>
                <h2>Leadership Talent Board</h2>
                <p className="panel-sub">
                  Ranked by hireability &amp; readiness tier for {domain} roles.
                </p>
              </div>
              <div className="panel-tag">Now · Soon · Watchlist</div>
            </div>

            <div className="leaders-meta-row">
              {leadersLoading && (
                <span className="leaders-loading">
                  Syncing leaders from sheet…
                </span>
              )}
              {leadersError && (
                <span className="leaders-error">{leadersError}</span>
              )}
            </div>

            <div className="leaders-row">
              {leaders
                .filter(
                  (leader) =>
                    (leader.function || "").toLowerCase() === domainKey
                )
                .map((leader) => (
                  <article key={leader.id} className="leader-card">
                    <div className="leader-header">
                      <div>
                        <div className="leader-name">{leader.name}</div>
                        <div className="leader-role">{leader.title}</div>
                        <div className="leader-meta">
                          {leader.company} · {leader.location}
                        </div>
                      </div>
                      <StatusBeacon status={leader.readinessTier} />
                    </div>

                    <div className="leader-body">
                      <div className="leader-ring">
                        <div
                          className="ring-outer"
                          style={{
                            "--value": leader.hireabilityScore,
                          }}
                        >
                          <div className="ring-fill" />
                          <div className="ring-inner">
                            <span className="ring-value">
                              {leader.hireabilityScore}
                            </span>
                            <span className="ring-label">/100</span>
                          </div>
                        </div>
                      </div>

                      <div className="leader-stats">
                        <div>
                          <span className="stat-label">Hireability score</span>
                          <div className="stat-value">
                            {leader.hireabilityScore}/100
                          </div>
                        </div>
                        <div>
                          <span className="stat-label">Warmth</span>
                          <div className="stat-value">
                            {leader.warmth}
                            {"%"}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="leader-footer">
                      <div className="leader-hint">
                        Open in Outreach Console
                      </div>
                      <button
                        className="btn-outline"
                        onClick={() => handleOutreach(leader)}
                      >
                        Outreach
                      </button>
                    </div>
                  </article>
                ))}
            </div>
          </section>
        </main>
      </div>

      {/* OUTREACH MODAL */}
      <OutreachModal
        leader={selectedLeader}
        onClose={() => setSelectedLeader(null)}
      />
    </div>
  );
}

export default App;
