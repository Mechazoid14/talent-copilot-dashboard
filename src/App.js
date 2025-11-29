import React, { useState } from "react";
import "./App.css";

// Leadership candidates (realistic GCC-style profiles)
const candidates = [
  // ---------- UAE: ENGINEERING ----------
  {
    id: 1,
    name: "Ahmed Rahman",
    title: "Director of Engineering - Mobility",
    company: "Careem",
    location: "Dubai",
    country: "UAE",
    domain: "engineering",
    hireabilityScore: 84,
    readinessTier: "now",
    signals: [
      "Promotion gap 38 months",
      "Led microservices migration",
      "Team of 40+ engineers",
    ],
    warmth: 0.32,
  },
  {
    id: 2,
    name: "Nikhil Prasad",
    title: "Senior Engineering Manager - Logistics",
    company: "Talabat",
    location: "Dubai",
    country: "UAE",
    domain: "engineering",
    hireabilityScore: 79,
    readinessTier: "soon",
    signals: [
      "Checkout latency reduction",
      "High-traffic systems",
      "Works closely with product",
    ],
    warmth: 0.24,
  },
  {
    id: 3,
    name: "Lina Mansour",
    title: "Head of Engineering - Platform",
    company: "Noon",
    location: "Dubai",
    country: "UAE",
    domain: "engineering",
    hireabilityScore: 82,
    readinessTier: "watchlist",
    signals: [
      "Cloud cost optimisation",
      "Platform reliability",
      "Multi-country ownership",
    ],
    warmth: 0.18,
  },
  {
    id: 4,
    name: "Omar Suleiman",
    title: "Principal Software Engineering Manager",
    company: "Microsoft",
    location: "Dubai",
    country: "UAE",
    domain: "engineering",
    hireabilityScore: 87,
    readinessTier: "soon",
    signals: ["Azure-scale ownership", "Influences global roadmap"],
    warmth: 0.21,
  },

  // ---------- UAE: PRODUCT ----------
  {
    id: 5,
    name: "Sara Al Essa",
    title: "Senior Product Manager - Growth",
    company: "Tabby",
    location: "Dubai",
    country: "UAE",
    domain: "product",
    hireabilityScore: 81,
    readinessTier: "now",
    signals: [
      "Experimentation culture",
      "Checkout conversion wins",
      "Owns PLG initiatives",
    ],
    warmth: 0.35,
  },
  {
    id: 6,
    name: "Harish Verma",
    title: "Principal Product Manager - AI Experiences",
    company: "Microsoft",
    location: "Dubai",
    country: "UAE",
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
    country: "UAE",
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
    country: "UAE",
    domain: "product",
    hireabilityScore: 76,
    readinessTier: "soon",
    signals: ["Subscription funnels", "Cross-border markets"],
    warmth: 0.2,
  },

  // ---------- UAE: SECURITY ----------
  {
    id: 9,
    name: "Rehan Ali",
    title: "Senior Manager - Cyber Defense",
    company: "e& Enterprise",
    location: "Abu Dhabi",
    country: "UAE",
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
    country: "UAE",
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
    country: "UAE",
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
    country: "UAE",
    domain: "security",
    hireabilityScore: 75,
    readinessTier: "soon",
    signals: ["Zero trust rollouts", "Multi-cloud security"],
    warmth: 0.21,
  },

  // ---------- SAUDI: ENGINEERING ----------
  {
    id: 13,
    name: "Faisal Al Harbi",
    title: "Senior Engineering Manager - Payments",
    company: "STC Pay",
    location: "Riyadh",
    country: "Saudi Arabia",
    domain: "engineering",
    hireabilityScore: 82,
    readinessTier: "soon",
    signals: ["High-scale payments", "KSA-first architecture"],
    warmth: 0.25,
  },
  {
    id: 14,
    name: "Mariam Al Qahtani",
    title: "Director of Engineering - Platforms",
    company: "Aramco Digital",
    location: "Dhahran",
    country: "Saudi Arabia",
    domain: "engineering",
    hireabilityScore: 80,
    readinessTier: "watchlist",
    signals: ["Data platform modernisation", "Cloud enablement"],
    warmth: 0.18,
  },

  // ---------- SAUDI: PRODUCT ----------
  {
    id: 15,
    name: "Yousef Al Saud",
    title: "Head of Product - AI Platforms",
    company: "NEOM Tech",
    location: "Riyadh",
    country: "Saudi Arabia",
    domain: "product",
    hireabilityScore: 83,
    readinessTier: "soon",
    signals: ["AI platform roadmap", "Greenfield ecosystem"],
    warmth: 0.27,
  },
  {
    id: 16,
    name: "Rania Al Nasser",
    title: "Lead Product Manager - Fintech",
    company: "STC",
    location: "Riyadh",
    country: "Saudi Arabia",
    domain: "product",
    hireabilityScore: 79,
    readinessTier: "now",
    signals: ["KSA fintech regulation", "Digital wallets"],
    warmth: 0.34,
  },

  // ---------- SAUDI: SECURITY ----------
  {
    id: 17,
    name: "Khalid Al Hassan",
    title: "Head of Cybersecurity",
    company: "Saudi National Bank",
    location: "Riyadh",
    country: "Saudi Arabia",
    domain: "security",
    hireabilityScore: 78,
    readinessTier: "now",
    signals: ["Banking cyber", "Risk & governance"],
    warmth: 0.29,
  },
  {
    id: 18,
    name: "Lama Al Jaber",
    title: "Director - Cloud Security",
    company: "SDAIA",
    location: "Riyadh",
    country: "Saudi Arabia",
    domain: "security",
    hireabilityScore: 80,
    readinessTier: "soon",
    signals: ["National AI security", "Hybrid cloud"],
    warmth: 0.24,
  },
];

// Region-based stats
const regionStats = {
  UAE: {
    success: 72,
    time: "48 days",
    relocation: "High",
    pressure: "High ↑",
  },
  "Saudi Arabia": {
    success: 68,
    time: "61 days",
    relocation: "Medium",
    pressure: "Very High ↑↑",
  },
};

// Region + domain supply heat (0–1 range)
const supplyHeat = {
  UAE: {
    engineering: 0.86,
    product: 0.8,
    security: 0.76,
  },
  "Saudi Arabia": {
    engineering: 0.78,
    product: 0.81,
    security: 0.88,
  },
};

// Region-level market insights
const marketInsights = {
  UAE: {
    engineering: "Strong senior engineering leadership across Dubai & Abu Dhabi; highly competitive for platform & data roles.",
    product:
      "Mature product talent in BNPL, marketplaces and SaaS; strong growth & monetisation experience.",
    security:
      "Deep cyber & cloud security from telco, gov and AI orgs; GCC hub for security leadership.",
  },
  "Saudi Arabia": {
    engineering:
      "Growing depth in platform, data and fintech engineering; national-scale transformation projects.",
    product:
      "High impact product talent in fintech, AI and smart city; many roles linked to mega-projects.",
    security:
      "One of the strongest cyber markets in the region; banking, gov and national AI security demand is intense.",
  },
};

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
  const [searchQuery, setSearchQuery] = useState("");
  const [region, setRegion] = useState("UAE");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredCandidates = candidates.filter((c) => {
    if (c.domain !== activeDomain) return false;
    if (c.country !== region) return false;
    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.company.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q) ||
      c.location.toLowerCase().includes(q)
    );
  });

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

I’ve been tracking how leaders like you are driving ${selectedCandidate.domain} outcomes across ${region}. Your ownership of ${
      selectedCandidate.signals[0] || "key initiatives"
    } at ${selectedCandidate.company} really stood out.

I’m working with a leadership team that’s building the next phase of their ${
      selectedCandidate.domain
    } strategy in ${region}, and your background looks like a strong fit for what they’re trying to solve in the next 12–18 months.

Would you be open to a short, no-commitment conversation to explore whether this could be an interesting move for you?`;

    try {
      await navigator.clipboard.writeText(msg);
      alert("Outreach draft copied to clipboard ✅");
    } catch (e) {
      alert("Couldn’t auto-copy, please copy manually.");
    }
  };

  const currentHeat = supplyHeat[region];
  const currentInsights = marketInsights[region];

  return (
    <div className="App">
      {/* TOP NAV WITH BRANDING */}
      <header>
        <div className="header-left">
          <div className="logo">TC</div>
          <div>
            <div className="product-name">Talent Copilot</div>
            <div className="product-tagline">
              GCC Leadership Command Center (UAE · Saudi Arabia)
            </div>
          </div>
        </div>
        <div className="header-right">
          <div className="founder-line">
            Ayush Mishra · Founder — Talent Copilot
          </div>
          <button>Book Strategy Call</button>
        </div>
      </header>

      <main>
        {/* OVERVIEW ROW */}
        <section className="overview-row">
          {/* Feasibility Intelligence Card */}
          <div className="card large">
            <div className="card-header">
              <h2>Role Feasibility Intelligence</h2>
              <span>Region: {region}</span>
            </div>
            <div className="feasibility-stats">
              <div className="stat">
                <label>Success Probability</label>
                <span className="highlight">
                  {regionStats[region].success}%
                </span>
              </div>
              <div className="stat">
                <label>Time-to-Fill</label>
                <span className="highlight">{regionStats[region].time}</span>
              </div>
              <div className="stat">
                <label>Relocation Friendly</label>
                <span className="highlight">
                  {regionStats[region].relocation}
                </span>
              </div>
              <div className="stat">
                <label>Market Pressure</label>
                <span className="highlight high">
                  {regionStats[region].pressure}
                </span>
              </div>
            </div>

            <div className="supply-heatbars">
              <div className="heat-title">Talent Depth by Function</div>
              <div className="heat-row">
                <span className="heat-label">Engineering</span>
                <div className="heat-bar">
                  <div
                    className="heat-fill eng"
                    style={{ width: `${currentHeat.engineering * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="heat-row">
                <span className="heat-label">Product</span>
                <div className="heat-bar">
                  <div
                    className="heat-fill prod"
                    style={{ width: `${currentHeat.product * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="heat-row">
                <span className="heat-label">Security</span>
                <div className="heat-bar">
                  <div
                    className="heat-fill sec"
                    style={{ width: `${currentHeat.security * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Trigger Notifications */}
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
                <strong>Rania Al Nasser</strong> led new fintech launch at STC —
                offer competitiveness should be reviewed.
              </li>
              <li>
                <strong>Farah Labib</strong> joined Watchlist — new AI data
                governance exposure at G42.
              </li>
            </ul>
          </div>
        </section>

        {/* REGION TABS */}
        <div className="region-tabs">
          {["UAE", "Saudi Arabia"].map((reg) => (
            <button
              key={reg}
              className={region === reg ? "tab active" : "tab"}
              onClick={() => setRegion(reg)}
            >
              {reg}
            </button>
          ))}
        </div>

        {/* DOMAIN TABS */}
        <div className="domain-tabs">
          {["engineering", "product", "security"].map((domain) => (
            <button
              key={domain}
              className={activeDomain === domain ? "tab active" : "tab"}
              onClick={() => {
                setActiveDomain(domain);
                setSearchQuery(""); // reset search when switching domain
              }}
            >
              {domain.charAt(0).toUpperCase() + domain.slice(1)}
            </button>
          ))}
        </div>

        {/* SEARCH BAR */}
        <div className="search-row">
          <input
            type="text"
            placeholder="Search leaders by name, company or role..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {/* MARKET INSIGHTS CARD */}
        <section className="card market-card">
          <div className="card-header">
            <h2>Market Insights — {region}</h2>
            <span>Engineering · Product · Security</span>
          </div>
          <div className="insights-list">
            <div className="insight-row">
              <div className="pill eng-pill">Engineering</div>
              <p>{currentInsights.engineering}</p>
            </div>
            <div className="insight-row">
              <div className="pill prod-pill">Product</div>
              <p>{currentInsights.product}</p>
            </div>
            <div className="insight-row">
              <div className="pill sec-pill">Security</div>
              <p>{currentInsights.security}</p>
            </div>
          </div>
        </section>

        {/* TALENT BOARD */}
        <section className="card talent-board">
          <div className="card-header">
            <div>
              <h2>{getSubtitle()}</h2>
              <span>
                {region} · Now / Soon / Watchlist Intelligence ·{" "}
                {filteredCandidates.length} leaders surfaced
              </span>
            </div>
          </div>

          <div className="cards-grid">
            {filteredCandidates.map((c) => {
              const regionMatch = c.country === region;
              return (
                <div
                  key={c.id}
                  className={
                    regionMatch
                      ? "candidate-card"
                      : "candidate-card candidate-cross"
                  }
                >
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
                  <div className="candidate-region">
                    {regionMatch ? "Core region fit" : "Cross-border target"}
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
              );
            })}
            {filteredCandidates.length === 0 && (
              <div style={{ fontSize: "0.8rem", color: "#64748b" }}>
                No leaders match this search in this region & domain.
              </div>
            )}
          </div>
        </section>
      </main>

      {/* OUTREACH MODAL */}
      {selectedCandidate && (
        <div className="modal-backdrop" onClick={closeOutreach}>
          <div
            className="modal"
            onClick={(e) => {
              e.stopPropagation();
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
                <div className="modal-meta">
                  {selectedCandidate.location} · {selectedCandidate.country}
                </div>
              </div>

              <div className="modal-section-label">Smart draft</div>
              <div className="modal-message">
                Hi {selectedCandidate.name.split(" ")[0]},
                <br />
                <br />
                I’ve been tracking how leaders like you are driving{" "}
                {selectedCandidate.domain} outcomes across {region}. Your
                ownership of{" "}
                {selectedCandidate.signals[0] || "key initiatives"} at{" "}
                {selectedCandidate.company} really stood out.
                <br />
                <br />
                I’m working with a leadership team that’s building the next
                phase of their {selectedCandidate.domain} strategy in {region},
                and your background looks like a strong fit for what they’re
                trying to solve in the next 12–18 months.
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
