"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

const reportBasePath = process.env.NEXT_PUBLIC_REPORT_BASE_PATH ?? "";
const reportAsset = (filename: string) => `${reportBasePath}/${filename}`;

const report = {
  client: "Indian Motorcycle",
  period: "July 2026",
  previousPeriod: "June 2026",
  overall: {
    kpis: [
      { label: "Media spend", value: "$583k", previous: "$845k", change: "31%", direction: "down" as const },
      { label: "Leads", value: "10,508", previous: "12,219", change: "14%", direction: "down" as const },
      { label: "Blended CPL", value: "$55.50", previous: "$69.38", change: "20%", direction: "down" as const },
      { label: "Leads vs forecast", value: "109%", previous: "Spend 101% of plan", change: "hold", direction: "up" as const },
    ],
    mix: [
      { name: "Meta", spend: "$381k", spendChange: "−31%", result: "5,267 leads", resultChange: "−14%", efficiency: "$72 CPL", efficiencyChange: "−20%" },
      { name: "Google", spend: "$201k", spendChange: "−31%", result: "5,287 conv.", resultChange: "−14%", efficiency: "$38 CPA", efficiencyChange: "−20%" },
    ],
  },
  wins: [
    {
      title: "Efficiency held the period",
      result: "CPL −20% while leads still beat forecast by 9%.",
      why: "Spend dropped 31%, but it dropped toward people already showing intent — retargeting and Performance Max — rather than being cut evenly.",
      means: "The account can buy the next period on cost, not on volume panic. Success is beating forecast at a lower CPL, not spending in full to protect lead count.",
    },
    {
      title: "Retargeting did more with less",
      result: "2,711 leads at $20 CPL after a 25% spend cut.",
      why: "High-intent riders already knew the bike. Direct finance, colour and product proof answered the last question instead of re-selling the dream.",
      means: "Bottom-funnel efficiency is the clearest success indicator in the mix. If retargeting CPL stays near $20, the system is working.",
    },
    {
      title: "Google converted the demand Meta created",
      result: "PMax delivered 4,444 conversions — 84% of Google — at $39.89 CPA.",
      why: "Search did not have to introduce the brand. It captured riders who already had a model in mind and moved them to a form.",
      means: "Google’s job is intent capture, not awareness. Success is CPA and model quality, not matching Meta on lead volume.",
    },
  ],
  channels: [
    {
      id: "meta",
      name: "Meta",
      role: "Scale engine · 65% of spend",
      kpis: [
        { label: "Spend", value: "$381k", previous: "$552k", change: "31%", direction: "down" as const },
        { label: "Leads", value: "5,267", previous: "6,124", change: "14%", direction: "down" as const },
        { label: "CPL", value: "$72", previous: "$90", change: "20%", direction: "down" as const },
        { label: "Retargeting CPL", value: "$20", previous: "$29", change: "31%", direction: "down" as const },
      ],
      split: [
        { name: "Prospecting", result: "2,366 leads", metric: "$116 CPL", note: "$274.8k spend · scale engine" },
        { name: "Retargeting", result: "2,711 leads", metric: "$20 CPL", note: "25% less spend · more leads" },
      ],
      commentary: {
        tellsUs: "Meta still carries half of all leads on 65% of spend, and it got cheaper. Volume softened because investment did — not because the channel broke.",
        winsFailures: "Win: retargeting produced more leads at $20 CPL on 25% less spend. Drag: prospecting is still $116 CPL, so scale remains expensive relative to the warm audience.",
        why: "Creative matched the funnel. Prospecting led with use-case and product proof in the first three seconds. Retargeting led with finance, colour and a detailed bike — no re-introduction.",
        success: "Meta is succeeding when CPL falls faster than lead volume, and when retargeting can take a spend cut without losing the lead. $20 retargeting CPL is the benchmark to protect.",
      },
      creatives: [
        {
          title: "Challenger POV",
          stage: "Consideration",
          primary: "3.09%",
          primaryLabel: "CTR",
          secondary: "23K LPV",
          objective: "Attention and site traffic",
          why: "First-person riding makes the experience obvious in the opening frame. The viewer can imagine the bike before they are asked to buy it.",
          learning: "Upper-funnel work should sell the ride, not the spec sheet. Cut longer stories into 6–15s with the bike moving immediately.",
        },
        {
          title: "Scout Monthly Payments",
          stage: "Prospecting",
          primary: "798",
          primaryLabel: "leads",
          secondary: "$101 CPL",
          objective: "Prospecting leads",
          why: "A specific monthly figure made the value exchange concrete while keeping the bike central. Affordability did more conversion work than lifestyle language.",
          learning: "Build payment variants for Bagger, Touring and Chief, then send each to a model-specific landing page.",
        },
        {
          title: "Chieftain Finance",
          stage: "Retargeting",
          primary: "212",
          primaryLabel: "leads",
          secondary: "$17 CPL",
          objective: "High-intent conversion",
          why: "A direct finance line and a detailed bike view answered the last question. The audience had already done the dreaming.",
          learning: "Retargeting should be product-first, branded and specific. Put the strongest proof in frame one, then finance and trade-in routes by model.",
        },
      ],
    },
    {
      id: "google",
      name: "Google",
      role: "Intent capture · 35% of spend",
      kpis: [
        { label: "Spend", value: "$201k", previous: "$291k", change: "31%", direction: "down" as const },
        { label: "Conversions", value: "5,287", previous: "6,148", change: "14%", direction: "down" as const },
        { label: "CPA", value: "$38", previous: "$47", change: "20%", direction: "down" as const },
        { label: "PMax share", value: "84%", previous: "of Google conv.", change: "hold", direction: "up" as const },
      ],
      split: [
        { name: "Performance Max", result: "4,444 conv.", metric: "$39.89 CPA", note: "84% of Google conversions" },
        { name: "Brand Search", result: "843 conv.", metric: "$28.65 CPA", note: "Highest-efficiency Google route" },
      ],
      commentary: {
        tellsUs: "Google converted as many people as Meta, on roughly half the spend. It is catching demand the rest of the mix creates, not manufacturing it.",
        winsFailures: "Win: PMax and Brand Search both cleared a $40 CPA. Gap: optimisation still rewards form fills. Chief, Pursuit and Scout took the volume; Touring and Chief retail mix remain light.",
        why: "Queries and product feeds already carried model knowledge. The ads did not re-introduce Indian. They moved a known rider to a quote.",
        success: "Google succeeds when CPA stays under $40 and the model mix starts to look like retail targets — not when it simply matches Meta on conversion count.",
      },
      creatives: [
        {
          title: "PMax · Chief / Pursuit / Scout",
          stage: "Performance Max",
          primary: "4,444",
          primaryLabel: "conversions",
          secondary: "$39.89 CPA",
          objective: "Efficient conversions",
          why: "Product-first assets met riders who already knew the model. PMax concentrated on the bikes with the strongest conversion signal.",
          learning: "Signal quality now matters more than finding extra form fills. Weighted conversion values should push the account toward the bikes we actually want to sell.",
        },
        {
          title: "Brand Search",
          stage: "Search",
          primary: "843",
          primaryLabel: "conversions",
          secondary: "$28.65 CPA",
          objective: "Capture existing demand",
          why: "Brand queries are the cleanest intent in the mix. The ad only had to confirm availability and send the rider to a quote.",
          learning: "Protect Brand. Switch on AI Max for Brand and keep the landing page as direct as the query.",
        },
        {
          title: "Catch All · model pages",
          stage: "Search / PMax",
          primary: "Mix",
          primaryLabel: "quality lever",
          secondary: "Scout still leads",
          objective: "Desirable model mix",
          why: "Where model-level landing pages and feed assets were strongest, conversion quality followed. Broad catch-alls filled volume, not mix.",
          learning: "Scale Catch All only where model quality is proven. Touring and Chief need dedicated routes or the portfolio stays Scout-heavy.",
        },
      ],
    },
  ],
  campaign: {
    name: "Meta · Retargeting",
    vs: "vs June flight",
    kpis: [
      { label: "Leads", value: "2,711", previous: "2,510", change: "8%", direction: "up" as const },
      { label: "Spend", value: "$54k", previous: "$72k", change: "25%", direction: "down" as const },
      { label: "CPL", value: "$20", previous: "$29", change: "31%", direction: "down" as const },
      { label: "LP to lead", value: "5.7%", previous: "June flight", change: "hold", direction: "up" as const },
    ],
    commentary: {
      tellsUs: "This was the most efficient campaign in the period. It made more leads on a quarter less spend, which is why blended CPL could fall while total investment fell faster than volume.",
      winsFailures: "Win: $20 CPL and a 5.7% landing-page-to-lead rate. Limit: repeated branded product shots without enough narrative variation will cap the tail if frequency climbs.",
      why: "Distinctive colour and a seasonal cue earned the stop. Finance and a close bike view closed the people who were already in-market. No awareness job was being asked of this audience.",
      success: "Retargeting is the control campaign. If CPL holds near $20 while we rebuild spend, the next phase is working. If frequency rises and CPL follows, rotate the story, not the audience.",
    },
  },
  learnings: [
    {
      title: "Intent is the lever",
      text: "Spend can fall 31% and the period can still beat forecast if money follows people who already want the bike.",
    },
    {
      title: "Stage-specific creative is doing the work",
      text: "Experience-led video wins consideration. Product and finance win conversion. Broad lifestyle copy does not scale either job.",
    },
    {
      title: "Volume is not the same as value",
      text: "Scout still supplies the leads. Bagger is now on its 29% retail target. Touring and Chief at 4% each are the gap the next phase has to close.",
    },
  ],
  nextPhase: [
    {
      title: "Reinvest at the new cost base",
      text: "Put spend back into the account while CPL is $55.50, 7% below forecast. Rebuild lead volume without giving the efficiency back.",
      success: "CPL ≤ $60 as volume recovers.",
    },
    {
      title: "Value-weight Google",
      text: "Move PMax to weighted conversion values and Max Conversion Value so the account optimises toward desirable bikes, not form fills.",
      success: "Model mix moves toward retail targets.",
    },
    {
      title: "Build the missing models",
      text: "Protect Bagger. Launch dedicated Touring and Chief routes — rider-led lifestyle, product detail and finance — so the mix is not Scout-dependent.",
      success: "Bagger holds ≥29%; Touring and Chief share rises.",
    },
    {
      title: "Close the quality loop",
      text: "Weekly Power BI / CRM check: selected model versus lead form, plus a 30-day decision forecast. Next budget follows quality, not lead count alone.",
      success: "Quality tracked before the next pacing call.",
    },
  ],
};

const chapters = [
  { id: "overall", number: "01", label: "Overall results" },
  ...report.channels.map((channel, index) => ({
    id: channel.id,
    number: String(index + 2).padStart(2, "0"),
    label: channel.name,
  })),
  { id: "campaign", number: String(report.channels.length + 2).padStart(2, "0"), label: "Campaign" },
  { id: "creative", number: String(report.channels.length + 3).padStart(2, "0"), label: "Winning creatives" },
  { id: "learnings", number: String(report.channels.length + 4).padStart(2, "0"), label: "Core learnings" },
  { id: "next", number: String(report.channels.length + 5).padStart(2, "0"), label: "Next phase" },
];

const storyPanelLabels = [
  "Overall results",
  "Key wins",
  ...report.channels.flatMap((channel) => [`${channel.name} results`, `${channel.name} commentary`]),
  "Campaign results",
  "Campaign commentary",
  ...report.channels.map((channel) => `Winning creatives · ${channel.name}`),
  "Core learnings",
  "Next phase",
];

const storyPanelCount = storyPanelLabels.length;

type Kpi = {
  label: string;
  value: string;
  previous: string;
  change: string;
  direction: "up" | "down";
};

export default function Home() {
  const storyRef = useRef<HTMLElement>(null);
  const [activeChapter, setActiveChapter] = useState("overall");
  const [activePanelIndex, setActivePanelIndex] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const progress = useMemo(
    () => `${((activePanelIndex + 1) / storyPanelCount) * 100}%`,
    [activePanelIndex],
  );

  useEffect(() => {
    const story = storyRef.current;
    if (!story) return;
    const panels = Array.from(story.querySelectorAll<HTMLElement>("[data-story-panel]"));

    let animationFrame = 0;
    const syncActivePanel = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(() => {
        const storyLeft = story.getBoundingClientRect().left;
        const closest = panels.reduce(
          (best, panel, index) => {
            const distance = Math.abs(panel.getBoundingClientRect().left - storyLeft);
            return distance < best.distance ? { index, panel, distance } : best;
          },
          { index: 0, panel: panels[0], distance: Number.POSITIVE_INFINITY },
        );
        if (!closest.panel) return;
        setActivePanelIndex(closest.index);
        const chapter = closest.panel.closest<HTMLElement>(".chapter");
        if (chapter?.id) setActiveChapter(chapter.id);
      });
    };

    syncActivePanel();
    story.addEventListener("scroll", syncActivePanel, { passive: true });
    window.addEventListener("resize", syncActivePanel);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      story.removeEventListener("scroll", syncActivePanel);
      window.removeEventListener("resize", syncActivePanel);
    };
  }, []);

  const jumpTo = (id: string) => {
    const story = storyRef.current;
    const section = document.getElementById(id);
    if (!story || !section) return;
    setMenuOpen(false);
    const left = section.getBoundingClientRect().left - story.getBoundingClientRect().left + story.scrollLeft;
    story.scrollTo({ left, behavior: "smooth" });
  };

  const stepPanel = (direction: number) => {
    const story = storyRef.current;
    if (!story) return;
    const panels = Array.from(story.querySelectorAll<HTMLElement>("[data-story-panel]"));
    const storyLeft = story.getBoundingClientRect().left;
    const currentIndex = panels.reduce(
      (closestIndex, panel, index) =>
        Math.abs(panel.getBoundingClientRect().left - storyLeft) <
        Math.abs(panels[closestIndex].getBoundingClientRect().left - storyLeft)
          ? index
          : closestIndex,
      0,
    );
    const nextIndex = Math.min(panels.length - 1, Math.max(0, currentIndex + direction));
    const panel = panels[nextIndex];
    const left = panel.getBoundingClientRect().left - story.getBoundingClientRect().left + story.scrollLeft;
    story.scrollTo({ left, behavior: "smooth" });
  };

  return (
    <div className="report-shell">
      <a className="skip-link" href="#overall">
        Skip to report
      </a>
      <div className="read-progress" aria-hidden="true">
        <span style={{ width: progress }} />
      </div>

      <header className="topbar">
        <button className="noise-mark" onClick={() => jumpTo("overall")} aria-label="Return to overall results">
          <Image src={reportAsset("noise-logo-black.png")} alt="Noise Media" width={1920} height={830} priority unoptimized />
        </button>
        <div className="report-name">
          <span>Noise ×</span>
          <strong>{report.client}</strong>
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

      <aside className={`chapter-nav ${menuOpen ? "open" : ""}`} aria-label="Report chapters" id="report-chapters">
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
          <span>{String(activePanelIndex + 1).padStart(2, "0")}</span>
          <i />
          <span>{String(storyPanelCount).padStart(2, "0")}</span>
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
        <section className="chapter chapter-run light" id="overall">
          <div className="story-panel results-hero" data-story-panel>
            <p className="hero-kicker">
              {report.period} · compared with {report.previousPeriod}
            </p>
            <h1>Overall results</h1>
            <p className="hero-summary">
              Headline numbers across the full period, every channel included. Arrows show change versus {report.previousPeriod}.
            </p>
            <KpiBoard kpis={report.overall.kpis} previousPeriod={report.previousPeriod} />
            <div className="channel-mix" aria-label="Results by channel">
              <div className="mix-head">
                <span>Channel</span>
                <span>Spend</span>
                <span>Result</span>
                <span>Efficiency</span>
              </div>
              {report.overall.mix.map((row) => (
                <div className="mix-row" key={row.name}>
                  <strong>{row.name}</strong>
                  <span>{row.spend} <em>{row.spendChange}</em></span>
                  <span>{row.result} <em>{row.resultChange}</em></span>
                  <span>{row.efficiency} <em>{row.efficiencyChange}</em></span>
                </div>
              ))}
            </div>
          </div>

          <div className="story-panel" data-story-panel>
            <ChapterHeader
              number="01"
              eyebrow="Key wins"
              title="What the overall numbers actually mean."
              intro="The three results that define the period: why they happened, and what they tell us about success."
            />
            <div className="win-grid">
              {report.wins.map((win, index) => (
                <article className="win-card" key={win.title}>
                  <span>0{index + 1}</span>
                  <h3 className="editable" contentEditable suppressContentEditableWarning>{win.title}</h3>
                  <p className="win-result editable" contentEditable suppressContentEditableWarning>{win.result}</p>
                  <NarrativeBlock label="Why this happened" text={win.why} />
                  <NarrativeBlock label="What this means" text={win.means} accent />
                </article>
              ))}
            </div>
          </div>
        </section>

        {report.channels.map((channel, index) => (
          <section className="chapter chapter-run light" id={channel.id} key={channel.id}>
            <div className="story-panel" data-story-panel>
              <ChapterHeader
                number={String(index + 2).padStart(2, "0")}
                eyebrow={`${channel.name} · headline results`}
                title={`${channel.name} versus ${report.previousPeriod}.`}
                intro={channel.role}
              />
              <KpiBoard kpis={channel.kpis} previousPeriod={report.previousPeriod} />
              <div className="split-row">
                {channel.split.map((item) => (
                  <article key={item.name}>
                    <span>{item.name}</span>
                    <strong>{item.result}</strong>
                    <b>{item.metric}</b>
                    <p>{item.note}</p>
                  </article>
                ))}
              </div>
            </div>

            <div className="story-panel" data-story-panel>
              <ChapterHeader
                number={String(index + 2).padStart(2, "0")}
                eyebrow={`${channel.name} · commentary`}
                title="What these results tell us."
                intro="Wins, failures, cause, and the success indicator we should judge this channel by."
              />
              <CommentaryGrid copy={channel.commentary} />
            </div>
          </section>
        ))}

        <section className="chapter chapter-run light" id="campaign">
          <div className="story-panel" data-story-panel>
            <ChapterHeader
              number={String(report.channels.length + 2).padStart(2, "0")}
              eyebrow="Campaign pull-out"
              title={report.campaign.name}
              intro={`${report.campaign.vs}. The campaign that most clearly explains the efficiency gain.`}
            />
            <KpiBoard kpis={report.campaign.kpis} previousPeriod={report.previousPeriod} />
          </div>
          <div className="story-panel" data-story-panel>
            <ChapterHeader
              number={String(report.channels.length + 2).padStart(2, "0")}
              eyebrow="Campaign commentary"
              title="What this campaign tells us."
              intro="Keep this structure even when the featured campaign changes: result, cause, implication."
            />
            <CommentaryGrid copy={report.campaign.commentary} />
          </div>
        </section>

        <section className="chapter chapter-run creative-chapter" id="creative">
          {report.channels.map((channel) => (
            <div className="story-panel creative-story-panel" data-story-panel key={`${channel.id}-creative`}>
              <ChapterHeader
                number={String(report.channels.length + 3).padStart(2, "0")}
                eyebrow={`Winning creatives · ${channel.name}`}
                title={`Top ${channel.creatives.length} on ${channel.name}.`}
                intro="Key stats against the objective, why it performed, and the learning we take into the next phase."
              />
              <div className="creative-stack">
                {channel.creatives.map((item, creativeIndex) => (
                  <article className="creative-card-full" key={item.title}>
                    {channel.id === "meta" ? (
                      <span className="creative-image">
                        <Image
                          src={reportAsset("indian-creative-triptych.png")}
                          alt={`${item.title} Indian Motorcycle campaign creative`}
                          width={1200}
                          height={675}
                          sizes="32vw"
                          unoptimized
                          style={{ left: `${-creativeIndex * 100}%` }}
                        />
                        <i>{item.stage}</i>
                      </span>
                    ) : (
                      <span className="type-creative">
                        <i>{item.stage}</i>
                        <b>{item.title}</b>
                      </span>
                    )}
                    <div className="creative-card-body">
                      <h3 className="editable" contentEditable suppressContentEditableWarning>{item.title}</h3>
                      <p className="creative-stats">
                        <strong>{item.primary}</strong>
                        <span>{item.primaryLabel} · {item.secondary}</span>
                      </p>
                      <p className="creative-objective">Objective: {item.objective}</p>
                      <NarrativeBlock label="Why it performed" text={item.why} />
                      <NarrativeBlock label="Learning we take" text={item.learning} accent />
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="chapter chapter-run light" id="learnings">
          <div className="story-panel" data-story-panel>
            <ChapterHeader
              number={String(report.channels.length + 4).padStart(2, "0")}
              eyebrow="Core learnings"
              title="What the period taught us."
              intro="Carry these three lines into the next phase. Everything below them is execution."
            />
            <div className="learn-grid">
              {report.learnings.map((item, index) => (
                <article key={item.title}>
                  <span>0{index + 1}</span>
                  <h3 className="editable" contentEditable suppressContentEditableWarning>{item.title}</h3>
                  <p className="editable" contentEditable suppressContentEditableWarning>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="chapter chapter-run light" id="next">
          <div className="story-panel next-panel" data-story-panel>
            <ChapterHeader
              number={String(report.channels.length + 5).padStart(2, "0")}
              eyebrow="Next phase of work"
              title="What we are going to do."
              intro="Four moves that follow the results. Each one has a success test."
            />
            <div className="next-grid">
              {report.nextPhase.map((item, index) => (
                <article key={item.title}>
                  <span>0{index + 1}</span>
                  <h3 className="editable" contentEditable suppressContentEditableWarning>{item.title}</h3>
                  <p className="editable" contentEditable suppressContentEditableWarning>{item.text}</p>
                  <small className="editable" contentEditable suppressContentEditableWarning>Success: {item.success}</small>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <div className="slide-controls" aria-label="Report page navigation">
        <button onClick={() => stepPanel(-1)} disabled={activePanelIndex === 0} aria-label="Previous panel">
          <b aria-hidden="true">←</b><span>Previous</span>
        </button>
        <div>
          <span>{storyPanelLabels[activePanelIndex]}</span>
          <strong>{String(activePanelIndex + 1).padStart(2, "0")} / {String(storyPanelCount).padStart(2, "0")}</strong>
        </div>
        <button onClick={() => stepPanel(1)} disabled={activePanelIndex === storyPanelCount - 1} aria-label="Next panel">
          <span>Next</span><b aria-hidden="true">→</b>
        </button>
      </div>
    </div>
  );
}

function KpiBoard({ kpis, previousPeriod }: { kpis: Kpi[]; previousPeriod: string }) {
  return (
    <div className="kpi-board" aria-label="Headline stats versus previous period">
      {kpis.map((kpi) => (
        <div key={kpi.label}>
          <span>{kpi.label}</span>
          <strong className="editable" contentEditable suppressContentEditableWarning>{kpi.value}</strong>
          {kpi.change === "hold" ? (
            <small>{kpi.previous}</small>
          ) : (
            <Delta change={kpi.change} direction={kpi.direction} />
          )}
          {kpi.change === "hold" ? null : (
            <em>vs {previousPeriod} {kpi.previous}</em>
          )}
        </div>
      ))}
    </div>
  );
}

function Delta({ change, direction }: { change: string; direction: "up" | "down" }) {
  return (
    <small className={`delta ${direction}`}>
      {direction === "up" ? "↑" : "↓"} {change}
    </small>
  );
}

function CommentaryGrid({
  copy,
}: {
  copy: { tellsUs: string; winsFailures: string; why: string; success: string };
}) {
  return (
    <div className="commentary-grid">
      <NarrativeBlock label="What these results tell us" text={copy.tellsUs} />
      <NarrativeBlock label="Big wins / failures" text={copy.winsFailures} />
      <NarrativeBlock label="Why this happened" text={copy.why} />
      <NarrativeBlock label="Success indicator" text={copy.success} accent />
    </div>
  );
}

function ChapterHeader({
  number,
  eyebrow,
  title,
  intro,
}: {
  number: string;
  eyebrow: string;
  title: string;
  intro: string;
}) {
  return (
    <header className="chapter-header">
      <div className="section-number">{number}</div>
      <div>
        <span className="eyebrow editable" contentEditable suppressContentEditableWarning>{eyebrow}</span>
        <h2 className="editable" contentEditable suppressContentEditableWarning>{title}</h2>
      </div>
      <p className="editable" contentEditable suppressContentEditableWarning>{intro}</p>
    </header>
  );
}

function NarrativeBlock({
  label,
  text,
  accent = false,
}: {
  label: string;
  text: string;
  accent?: boolean;
}) {
  return (
    <div className={`narrative-block ${accent ? "accent" : ""}`}>
      <span className="editable" contentEditable suppressContentEditableWarning>{label}</span>
      <p className="editable" contentEditable suppressContentEditableWarning>{text}</p>
    </div>
  );
}
