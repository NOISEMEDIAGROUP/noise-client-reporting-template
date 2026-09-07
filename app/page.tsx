"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const chapters = [
  { id: "overview", number: "00", label: "The takeaway" },
  { id: "performance", number: "01", label: "Overall performance" },
  { id: "campaigns", number: "02", label: "Campaign breakdown" },
  { id: "channels", number: "03", label: "Channel breakdown" },
  { id: "creative", number: "04", label: "Winning creative" },
  { id: "actions", number: "05", label: "Overall learnings + next steps" },
];

const campaigns = [
  {
    name: "Meta · Prospecting",
    status: "Efficient scale",
    result: "2,366",
    metric: "leads",
    change: "$116 CPL",
    bars: [78, 72, 68, 63, 58, 51, 46],
    happened:
      "Prospecting delivered 2,366 leads from $274.8K of spend, with lead volume holding up as investment reduced.",
    why: "The campaign gave people a use case, a reason to believe and a product demonstration within the first three seconds.",
    learning:
      "Direct model detail, finance and product proof are doing more work than broad lifestyle language.",
    next: "Keep prospecting as the scale engine, but rotate in model-specific finance and riding-experience concepts before fatigue appears.",
  },
  {
    name: "Meta · Retargeting",
    status: "Most efficient",
    result: "2,711",
    metric: "leads",
    change: "$20 CPL",
    bars: [44, 49, 56, 61, 70, 77, 91],
    happened:
      "Retargeting generated more leads despite a 25% month-on-month spend reduction, with a 5.7% landing-page-to-lead rate.",
    why: "Distinctive colour and a clear seasonal cue earned attention. Repeated exposure without enough narrative variation limited the tail.",
    learning:
      "High-intent audiences reward direct, branded product-first creative and finance cues.",
    next: "Protect the $20 CPL advantage while expanding model-specific retargeting and monitoring frequency by dealer tier.",
  },
  {
    name: "Google · PMax",
    status: "Conversion engine",
    result: "4,444",
    metric: "conversions",
    change: "$39.89 CPA",
    bars: [41, 46, 53, 62, 70, 79, 87],
    happened:
      "Performance Max delivered 84% of Google conversions, with Chief, Pursuit and Scout carrying the largest volume.",
    why: "The message acknowledged existing product knowledge and moved straight to a new reason to buy. No re-introduction needed.",
    learning:
      "Weighted value and model-level signal quality matter more now than simply finding more lead volume.",
    next: "Move PMax to weighted conversion values and use Max Conversion Value so the account optimises toward desirable bikes, not just form fills.",
  },
];

const channels = [
  {
    name: "Meta",
    role: "Scale engine",
    spend: "$381k",
    result: "5,267 leads",
    share: "65% of spend",
    driver:
      "Meta delivered 50% of total leads, with retargeting producing 2,711 leads at $20 CPL and prospecting adding 2,366.",
    learnt:
      "The account can reduce spend and still hold volume when creative and audience intent are aligned.",
    action:
      "Maintain stage-specific creative: aspirational motion for consideration, model detail for prospecting and direct finance/product proof for retargeting.",
  },
  {
    name: "Google",
    role: "Intent capture",
    spend: "$201k",
    result: "5,287 conversions",
    share: "35% of spend",
    driver:
      "Performance Max drove 4,444 conversions at $39.89 CPA; Brand Search added 843 at $28.65 CPA.",
    learnt:
      "Search is capturing the demand Meta creates, but model value and product mix need to influence optimisation.",
    action:
      "Apply weighted conversion values, scale Catch All where model quality is strongest and switch on AI Max for Brand.",
  },
  {
    name: "Portfolio mix",
    role: "Model balance",
    spend: "$583k",
    result: "10,508 leads",
    share: "July total",
    driver:
      "Scout still supplied 4,197 leads, while Bagger rose to 2,177 and became the second-largest model signal.",
    learnt:
      "Bagger is now aligned to its 29% retail target; Touring and Chief remain underrepresented and need deliberate investment.",
    action:
      "Hold Bagger momentum and build dedicated Touring/Chief routes so the portfolio is not over-dependent on Scout.",
  },
];

const creatives = [
  {
    title: "Challenger POV",
    channel: "Meta · Consideration",
    primary: "3.09%",
    primaryLabel: "CTR",
    secondary: "23K LPV",
    worked:
      "A first-person riding perspective makes the experience legible immediately and gives the viewer a reason to imagine the bike in motion.",
    take:
      "Upper-funnel creative can sell the riding experience before it sells the specification.",
    future:
      "Cut the longer Porch House story into 6–15 second edits with the bike moving in the opening frame.",
  },
  {
    title: "Scout Monthly Payments",
    channel: "Meta · Conversion prospecting",
    primary: "798",
    primaryLabel: "leads",
    secondary: "$101 CPL",
    worked:
      "The payment proposition makes the value exchange concrete while keeping the bike central, turning consideration into a measurable action.",
    take:
      "A specific affordability cue can do more conversion work than a broad lifestyle promise.",
    future:
      "Build payment variants for Bagger, Touring and Chief, then sequence them against model-specific landing pages.",
  },
  {
    title: "Chieftain Finance",
    channel: "Meta · Conversion retargeting",
    primary: "212",
    primaryLabel: "leads",
    secondary: "$17 CPL",
    worked:
      "A direct finance message and detailed bike view answer the final question for high-intent riders without over-explaining.",
    take:
      "Retargeting should be product-first, branded and specific. The audience has already done the dreaming.",
    future:
      "Create finance and trade-in routes for each priority model, with the strongest proof in the first frame.",
  },
];

const actions = [
  {
    code: "A-01",
    workstream: "Strategy",
    priority: "Scale now",
    signal: "July delivered 10,508 leads at $55.50 CPL, 7% below forecast.",
    action: "Reinvest into the account at improved cost levels to rebuild volume without giving back the efficiency gain.",
    owner: "Strategy + Paid",
    due: "Week 1",
    success: "CPL ≤$60; leads rebuild.",
  },
  {
    code: "A-02",
    workstream: "Strategy",
    priority: "Build",
    signal: "PMax drove 84% of Google conversions and concentrated on Chief, Pursuit and Scout.",
    action: "Introduce weighted conversion values and switch on Max Conversion Value to prioritise desirable bike sales, not lead volume.",
    owner: "Paid + Strategy",
    due: "Before next pacing call",
    success: "Model mix improves; CPL ≤$60.",
  },
  {
    code: "A-03",
    workstream: "Creative",
    priority: "Produce",
    signal: "Bagger reached 29% of July leads; Touring and Chief remain at 4% each.",
    action: "Launch 3–4 Bagger concepts and expand Touring/Chief creative using rider-led lifestyle, product detail and finance.",
    owner: "Creative",
    due: "Next production sprint",
    success: "Bagger holds ≥29%; mix broadens.",
  },
  {
    code: "A-04",
    workstream: "Creative",
    priority: "Prove",
    signal: "Challenger POV hit 3.09% CTR; static and lifestyle low performers were more text-heavy.",
    action: "Build a stage-specific creative matrix: experience-led video, product-first prospecting and branded finance retargeting.",
    owner: "Creative + Paid",
    due: "Before next flight",
    success: "4 territories live; CTR/CPL at benchmark.",
  },
  {
    code: "A-05",
    workstream: "Account",
    priority: "Orchestrate",
    signal: "Production can move faster than feedback and red-flagged routes can stay in working folders.",
    action: "Quarantine rejected political, Harley and profanity routes and introduce Cleared / Awaiting Feedback / Not Shipping status.",
    owner: "Account + Creative",
    due: "48 hours",
    success: "No unapproved asset reaches media.",
  },
  {
    code: "A-06",
    workstream: "Account",
    priority: "De-risk",
    signal: "July reporting shows lead volume, not downstream model value.",
    action: "Set a weekly Power BI/CRM quality loop, reconcile selected model to lead form and bring a 30-day decision forecast.",
    owner: "Account + Data",
    due: "Start next week",
    success: "Quality tracked; next approval pre-booked.",
  },
];

const actionStatusOrder = ["Ready", "Approved", "In progress", "Done"];
const storyPanelCount = 12;

export default function Home() {
  const storyRef = useRef<HTMLElement>(null);
  const [activeChapter, setActiveChapter] = useState("overview");
  const [activePanelIndex, setActivePanelIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [campaignIndex, setCampaignIndex] = useState(0);
  const [channelIndex, setChannelIndex] = useState(0);
  const [creativeIndex, setCreativeIndex] = useState(0);
  const [actionStatuses, setActionStatuses] = useState(
    actions.map(() => "Ready"),
  );

  const progress = useMemo(() => {
    const index = chapters.findIndex((chapter) => chapter.id === activeChapter);
    return `${((index + 1) / chapters.length) * 100}%`;
  }, [activeChapter]);

  useEffect(() => {
    const story = storyRef.current;
    if (!story) return;
    const panels = Array.from(
      story.querySelectorAll<HTMLElement>("[data-story-panel]"),
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const panel = visible.target as HTMLElement;
        const chapter = panel.closest<HTMLElement>(".chapter");
        if (chapter?.id) setActiveChapter(chapter.id);
        const panelIndex = panels.indexOf(panel);
        if (panelIndex >= 0) setActivePanelIndex(panelIndex);
      },
      { root: story, threshold: [0.55, 0.75] },
    );

    panels.forEach((panel) => observer.observe(panel));
    return () => observer.disconnect();
  }, []);

  const jumpTo = (id: string) => {
    const story = storyRef.current;
    const section = document.getElementById(id);
    if (!story || !section) return;
    setMenuOpen(false);
    story.scrollTo({ left: section.offsetLeft, behavior: "smooth" });
  };

  const stepPanel = (direction: number) => {
    const story = storyRef.current;
    if (!story) return;
    const panels = Array.from(
      story.querySelectorAll<HTMLElement>("[data-story-panel]"),
    );
    const nextIndex = Math.min(
      panels.length - 1,
      Math.max(0, activePanelIndex + direction),
    );
    story.scrollTo({ left: panels[nextIndex].offsetLeft, behavior: "smooth" });
  };

  const campaign = campaigns[campaignIndex];
  const channel = channels[channelIndex];
  const creative = creatives[creativeIndex];

  const selectCampaign = (index: number) => {
    setCampaignIndex(index);
    requestAnimationFrame(() => {
      const detail = storyRef.current?.querySelector<HTMLElement>(".campaign-detail-panel");
      if (detail && storyRef.current) storyRef.current.scrollTo({ left: detail.offsetLeft, behavior: "smooth" });
    });
  };

  const selectCreative = (index: number) => {
    setCreativeIndex(index);
    requestAnimationFrame(() => {
      const detail = storyRef.current?.querySelector<HTMLElement>(".creative-detail-panel");
      if (detail && storyRef.current) storyRef.current.scrollTo({ left: detail.offsetLeft, behavior: "smooth" });
    });
  };

  const advanceAction = (index: number) => {
    setActionStatuses((current) =>
      current.map((status, statusIndex) => {
        if (statusIndex !== index) return status;
        const nextIndex = (actionStatusOrder.indexOf(status) + 1) % actionStatusOrder.length;
        return actionStatusOrder[nextIndex];
      }),
    );
  };

  return (
    <div className="report-shell">
      <a className="skip-link" href="#overview">
        Skip to report
      </a>
      <div className="read-progress" aria-hidden="true">
        <span style={{ width: progress }} />
      </div>

      <header className="topbar">
        <button
          className="noise-mark"
          onClick={() => jumpTo("overview")}
          aria-label="Return to the report cover"
        >
          <img src="/noise-logo-black.png" alt="Noise Media" />
        </button>
        <div className="report-name">
          <span>For</span>
          <strong>Indian Motorcycle</strong>
        </div>
        <button
          className="menu-toggle"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="report-chapters"
          aria-label={menuOpen ? "Close report menu" : "Open report menu"}
        >
          <i />
          <i />
          <i />
        </button>
      </header>

      <aside
        className={`chapter-nav ${menuOpen ? "open" : ""}`}
        aria-label="Report chapters"
        id="report-chapters"
      >
        <p>Jump to chapter</p>
        <nav aria-label="Report navigation">
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              className={activeChapter === chapter.id ? "active" : ""}
              onClick={() => jumpTo(chapter.id)}
              aria-current={activeChapter === chapter.id ? "location" : undefined}
            >
              <span>{chapter.number}</span>
              {chapter.label}
            </button>
          ))}
        </nav>
        <div className="nav-foot">
          <span>{chapters.findIndex((c) => c.id === activeChapter) + 1}</span>
          <i />
          <span>{chapters.length}</span>
        </div>
      </aside>

      <main
        className="horizontal-story"
        ref={storyRef}
        tabIndex={0}
        onWheel={(event) => {
          if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
          event.preventDefault();
          storyRef.current?.scrollBy({ left: event.deltaY, behavior: "auto" });
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") stepPanel(1);
          if (event.key === "ArrowLeft") stepPanel(-1);
        }}
        aria-label="Horizontal performance report"
      >
        <section className="chapter hero" id="overview" data-story-panel>
          <div className="hero-kicker reveal">August 2026 · July performance review</div>
          <h1>
            <span className="sr-only">More revenue.</span>
            More intent.
            <br />
            <span>Less wasted spend.</span>
          </h1>
          <div className="hero-bottom">
            <p className="hero-summary">
              Spend reduced <strong>31%</strong> while leads fell only <strong>14%</strong>.
              The gap came from better conversion efficiency. This report turns that result
              into six proactive moves across strategy, creative and account leadership.
            </p>
            <div className="hero-actions">
              <button className="round-link" onClick={() => jumpTo("performance")}>
                <span>Start the story</span>
                <b aria-hidden="true">→</b>
              </button>
              <button className="text-link" onClick={() => jumpTo("actions")}>
                Review 6 moves
              </button>
            </div>
          </div>
          <div className="hero-index" aria-hidden="true">
            00
          </div>
          <div className="metric-ribbon" aria-label="Headline performance">
            <div>
              <span>Media spend</span>
              <strong>$583k</strong>
              <small className="up">101% of forecast</small>
            </div>
            <div>
              <span>Leads</span>
              <strong>10,508</strong>
              <small className="up">↑ 109% of forecast</small>
            </div>
            <div>
              <span>Blended CPL</span>
              <strong>$55.50</strong>
              <small className="up">↓ 20% CPL</small>
            </div>
            <div>
              <span>Impressions</span>
              <strong>30.6m</strong>
              <small>impressions</small>
            </div>
          </div>
        </section>

        <section className="chapter chapter-run light" id="performance">
          <div className="story-panel performance-lead" data-story-panel>
            <ChapterHeader
            number="01"
            eyebrow="Overall performance"
            title="Efficiency improved because spend followed intent."
            intro="This was not volume bought at any cost. Leads held up while investment reduced because the account moved money toward the audiences, models and messages already showing intent."
          />

            <div className="performance-story">
            <div className="story-beat">
              <span>What happened</span>
              <strong>10,508 leads</strong>
              <p>
                July lead volume beat forecast by 9% while spend landed at 101% of plan.
              </p>
            </div>
            <div className="connector" aria-hidden="true">→</div>
            <div className="story-beat cobalt">
              <span>Why it happened</span>
              <strong>3 shifts</strong>
              <p>
                Spend down 31%. CPL down 20%. Retargeting held volume while
                PMax concentrated conversion demand.
              </p>
            </div>
            <div className="connector" aria-hidden="true">→</div>
            <div className="story-beat coral">
              <span>What we learnt</span>
              <strong>Clarity scales</strong>
              <p>
                Model detail and finance cues help media find the right rider;
                broad lifestyle alone does not.
              </p>
            </div>
            </div>
          </div>

          <div className="story-panel evidence-panel" data-story-panel>
            <div className="evidence-grid">
            <article className="evidence-card chart-card">
              <div className="card-topline">
                <span>July actual vs. forecast</span>
                <small>Forecast = 100</small>
              </div>
              <div className="comparison-chart" aria-label="Spend index 101, leads index 109">
                <div className="chart-axis"><span>130</span><span>100</span><span>70</span></div>
                <div className="bar-group">
                  <div><i style={{ height: "71%" }} /><span>Spend</span><b>101</b></div>
                  <div><i className="revenue" style={{ height: "82%" }} /><span>Leads</span><b>109</b></div>
                </div>
              </div>
            </article>
            <article className="evidence-card quote-card">
              <span className="mini-label">The takeaway</span>
              <blockquote>
                Volume softened. Efficiency did not.
              </blockquote>
              <details>
                <summary>See the evidence behind this view</summary>
                <p>
                  Conversion rate rose 14%, CPL improved 20% and retargeting
                  delivered 2,711 leads at $20 CPL despite a 25% spend reduction.
                </p>
              </details>
            </article>
            </div>
          </div>

          <div className="story-panel replay-panel" data-story-panel>
            <article className="result-replay">
            <div className="replay-intro">
              <span className="mini-label">Result brought to life</span>
              <h3>July did more with less</h3>
              <p>
                The account delivered 10,508 leads at $55.50 CPL while spend held
                at 101% of forecast.
              </p>
            </div>
            <div className="replay-comparison">
              <div>
                <span>Forecast</span>
                <strong>$60</strong>
                <small>Blended CPL</small>
                <i><b style={{ width: "76%" }} /></i>
              </div>
              <div className="after">
                <span>Actual</span>
                <strong>$55.50</strong>
                <small>Blended CPL</small>
                <i><b style={{ width: "69%" }} /></i>
              </div>
            </div>
            <div className="replay-impact">
              <span>Impact</span>
              <strong>109% of forecast</strong>
              <p>Lead volume beat plan while conversion efficiency improved.</p>
              <button onClick={() => jumpTo("actions")}>Decision triggered · A-01</button>
            </div>
            </article>
          </div>
        </section>

        <section className="chapter chapter-run dark" id="campaigns">
          <div className="story-panel campaign-lead" data-story-panel>
            <ChapterHeader
            number="02"
            eyebrow="Campaign breakdown"
            title="Every campaign gets a verdict."
            intro="Results matter. The reason behind them is what makes the next result better."
            dark
          />

            <div className="selector" role="tablist" aria-label="Select campaign">
            {campaigns.map((item, index) => (
              <button
                key={item.name}
                role="tab"
                aria-selected={campaignIndex === index}
                className={campaignIndex === index ? "selected" : ""}
                onClick={() => selectCampaign(index)}
              >
                <span>0{index + 1}</span>
                {item.name}
              </button>
            ))}
            </div>
          </div>

          <div className="story-panel campaign-detail-panel" data-story-panel>
            <div className="inline-selector" role="tablist" aria-label="Change campaign">
              {campaigns.map((item, index) => (
                <button key={item.name} role="tab" aria-selected={campaignIndex === index} className={campaignIndex === index ? "selected" : ""} onClick={() => setCampaignIndex(index)}>
                  <span>0{index + 1}</span>{item.name}
                </button>
              ))}
            </div>
            <div className="campaign-panel" role="tabpanel">
            <div className="campaign-result">
              <span className="status-pill">{campaign.status}</span>
              <strong>{campaign.result}</strong>
              <small>{campaign.metric}</small>
              <em>{campaign.change}</em>
              <div className="spark-bars" aria-label="Seven-week performance trend">
                {campaign.bars.map((height, index) => (
                  <i key={`${height}-${index}`} style={{ height: `${height}%` }} />
                ))}
              </div>
            </div>
            <div className="campaign-analysis">
              <NarrativeBlock label="What happened" text={campaign.happened} />
              <NarrativeBlock label="Why" text={campaign.why} />
              <NarrativeBlock label="What we learnt" text={campaign.learning} accent />
              <NarrativeBlock label="What happens next" text={campaign.next} action />
            </div>
            </div>
            <div className="embedded-decision">
            <span>Decision this result creates</span>
            <strong>{actions[campaignIndex].action}</strong>
            <div>
              <small>Owner · {actions[campaignIndex].owner}</small>
              <small>Due · {actions[campaignIndex].due}</small>
              <small>Success · {actions[campaignIndex].success}</small>
            </div>
            <button onClick={() => jumpTo("actions")}>Open in action register ↘</button>
            </div>
          </div>
        </section>

        <section className="chapter chapter-run light" id="channels">
          <div className="story-panel channel-story-panel" data-story-panel>
            <ChapterHeader
            number="03"
            eyebrow="Channel breakdown"
            title="One plan. Different jobs."
            intro="We judge each channel by the role it plays in the system, not by forcing every platform into the same scorecard."
          />

            <div className="channel-layout">
            <div className="channel-list" role="tablist" aria-label="Select channel">
              {channels.map((item, index) => (
                <button
                  key={item.name}
                  role="tab"
                  aria-selected={channelIndex === index}
                  className={channelIndex === index ? "selected" : ""}
                  onClick={() => setChannelIndex(index)}
                >
                  <span>{item.name}</span>
                  <small>{item.role}</small>
                  <b aria-hidden="true">↗</b>
                </button>
              ))}
            </div>

            <div className="channel-panel" role="tabpanel">
              <div className="channel-metrics">
                <div><span>Spend</span><strong>{channel.spend}</strong></div>
                <div><span>Result</span><strong>{channel.result}</strong></div>
                <div><span>Role in the mix</span><strong>{channel.share}</strong></div>
              </div>
              <div className="channel-narrative">
                <NarrativeBlock label="What drove performance" text={channel.driver} />
                <NarrativeBlock label="What we learnt" text={channel.learnt} accent />
                <NarrativeBlock label="Actionable next step" text={channel.action} action />
              </div>
            </div>
            </div>
          </div>
        </section>

        <section className="chapter chapter-run creative-chapter" id="creative">
          <div className="story-panel creative-overview-panel" data-story-panel>
            <ChapterHeader
            number="04"
            eyebrow="Top-performing creative"
            title="Show the work. Prove the learning."
            intro="The client sees the ad, the result and the reason it worked in one place. Click a creative to unpack the lesson."
          />

            <div className="creative-grid" role="list" aria-label="Top creative examples">
            {creatives.map((item, index) => (
              <button
                key={item.title}
                role="listitem"
                className={`creative-card ${creativeIndex === index ? "selected" : ""}`}
                onClick={() => selectCreative(index)}
                aria-label={`View analysis for ${item.title}`}
              >
                <span className="creative-rank">0{index + 1}</span>
                <span className="creative-image">
                  <img
                    src="/indian-creative-triptych.png"
                    alt={`${item.title} Indian Motorcycle campaign creative`}
                    style={{ left: `${index * -100}%` }}
                  />
                  <i>{item.channel}</i>
                </span>
                <span className="creative-caption">
                  <b>{item.title}</b>
                  <span>{item.primary} {item.primaryLabel}</span>
                </span>
              </button>
            ))}
            </div>
          </div>

          <div className="story-panel creative-detail-panel" data-story-panel>
            <div className="inline-selector creative-inline-selector" role="tablist" aria-label="Change creative">
              {creatives.map((item, index) => (
                <button key={item.title} role="tab" aria-selected={creativeIndex === index} className={creativeIndex === index ? "selected" : ""} onClick={() => setCreativeIndex(index)}>
                  <span>0{index + 1}</span>{item.title}
                </button>
              ))}
            </div>
            <div className="creative-analysis" aria-live="polite">
            <div className="creative-score">
              <span>Selected creative</span>
              <strong>{creative.primary}</strong>
              <small>{creative.primaryLabel} · {creative.secondary}</small>
            </div>
            <NarrativeBlock label="Why it worked" text={creative.worked} />
            <NarrativeBlock label="What we take from it" text={creative.take} accent />
            <NarrativeBlock label="Influence on future creative" text={creative.future} action />
            </div>
            <div className="creative-brief-action">
            <div>
              <span>Turn the learning into work</span>
              <strong>Next brief: three need states, nine opening frames, one clear product truth.</strong>
            </div>
            <button onClick={() => jumpTo("actions")}>Add to action register ↘</button>
            </div>
          </div>
        </section>

        <section className="chapter chapter-run action-chapter" id="actions">
          <div className="story-panel action-lead-panel" data-story-panel>
            <ChapterHeader
            number="05"
            eyebrow="Overall learnings + next steps"
            title="The report becomes the plan."
            intro="The period leaves us with three clear learnings — and six decisions across strategy, creative and account leadership."
          />

            <div className="register-summary">
            <span className="live-register-label">Live action register</span>
            <div><strong>{actions.length}</strong><span>Moves</span></div>
            <div><strong>{actionStatuses.filter((status) => status !== "Ready").length}</strong><span>Moved forward</span></div>
            <p>Three workstreams. Six moves. Each one has an owner, a deadline, a guardrail and a decision it unlocks.</p>
            </div>
            <div className="learning-strip" aria-label="Overall learnings">
              <article><span>01 · Efficiency</span><strong>Intent is the lever.</strong><p>Spend can reduce without surrendering volume when model, audience and message agree.</p></article>
              <article><span>02 · Portfolio</span><strong>Bagger is moving.</strong><p>Its 29% lead share now matches retail intent; Touring and Chief need a deliberate push.</p></article>
              <article><span>03 · Quality</span><strong>Lead volume is not value.</strong><p>CRM and Power BI need to close the loop from selected model to downstream quality.</p></article>
            </div>
          </div>

          <div className="story-panel action-register-panel" data-story-panel>
            <div className="action-register" aria-label="Action register">
            <div className="register-head" aria-hidden="true">
              <span>Signal + action</span>
              <span>Accountability</span>
              <span>Decision state</span>
            </div>
            {actions.map((item, index) => (
              <article className="action-row" key={item.code}>
                <div className="action-main">
                  <div className="action-meta"><span>{item.code}</span><b>{item.workstream}</b><b>{item.priority}</b></div>
                  <small>{item.signal}</small>
                  <h3>{item.action}</h3>
                </div>
                <dl>
                  <div><dt>Owner</dt><dd>{item.owner}</dd></div>
                  <div><dt>Due</dt><dd>{item.due}</dd></div>
                  <div><dt>Success</dt><dd>{item.success}</dd></div>
                </dl>
                <button
                  className="status-control"
                  data-status={actionStatuses[index].toLowerCase().replace(" ", "-")}
                  onClick={() => advanceAction(index)}
                  aria-label={`Change status for ${item.code}. Current status: ${actionStatuses[index]}`}
                >
                  <i />
                  {actionStatuses[index]}
                  <span>↻</span>
                </button>
              </article>
            ))}
            </div>
          </div>

          <div className="story-panel action-finale-panel" data-story-panel>
            <div className="action-loop" aria-label="How the report drives action">
              <span>01 <b>See the result</b></span>
              <span>02 <b>Understand the cause</b></span>
              <span>03 <b>Make the decision</b></span>
              <span>04 <b>Track the outcome</b></span>
            </div>

            <div className="final-payoff">
              <span>THE PRINCIPLE</span>
              <p>
                Performance you can see.
                <br />
                <em>Decisions you can move.</em>
              </p>
              <button onClick={() => jumpTo("overview")}>Back to the start ←</button>
            </div>
          </div>
        </section>
      </main>

      <div className="slide-controls" aria-label="Slide controls">
        <span>Use ← →</span>
        <button
          onClick={() => stepPanel(-1)}
          disabled={activePanelIndex === 0}
          aria-label="Previous panel"
        >
          ←
        </button>
        <strong>
          {String(activePanelIndex + 1).padStart(2, "0")} / {storyPanelCount}
        </strong>
        <button
          onClick={() => stepPanel(1)}
          disabled={activePanelIndex === storyPanelCount - 1}
          aria-label="Next panel"
        >
          →
        </button>
      </div>

    </div>
  );
}

function ChapterHeader({
  number,
  eyebrow,
  title,
  intro,
  dark = false,
}: {
  number: string;
  eyebrow: string;
  title: string;
  intro: string;
  dark?: boolean;
}) {
  return (
    <header className={`chapter-header ${dark ? "on-dark" : ""}`}>
      <div className="section-number">{number}</div>
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      <p>{intro}</p>
    </header>
  );
}

function NarrativeBlock({
  label,
  text,
  accent = false,
  action = false,
}: {
  label: string;
  text: string;
  accent?: boolean;
  action?: boolean;
}) {
  return (
    <div className={`narrative-block ${accent ? "accent" : ""} ${action ? "action" : ""}`}>
      <span>{label}</span>
      <p>{text}</p>
    </div>
  );
}
