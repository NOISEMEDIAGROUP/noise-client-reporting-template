"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

const reportBasePath = process.env.NEXT_PUBLIC_REPORT_BASE_PATH ?? "";
const reportAsset = (filename: string) => `${reportBasePath}/${filename}`;

const report = {
  client: "Indian Motorcycle",
  period: "July 2026",
  previousPeriod: "June 2026",
  title: {
    kicker: "Monthly performance",
    headline: "Noise × Indian Motorcycle",
    periodLine: "July 2026 · compared with June 2026",
  },
  summary: {
    points: [
      {
        title: "Efficiency held the cut",
        text: "Spend fell 31%. Volume fell 14%. Blended CPL is $55.50 — 20% cheaper than June and under the $114.56 forecast.",
      },
      {
        title: "Retargeting did more with less",
        text: "2,711 leads at $20 CPL on 25% less spend. That is the control number for the next phase.",
      },
      {
        title: "Google converted. Mix did not.",
        text: "$38 CPA, with 84% of conversions on PMax. Scout still leads. Touring and Chief stay at 4%.",
      },
    ],
    nextMonthPriority: "Rebuild lead volume at or under $55.50 CPL. Do not buy back June’s $90.",
  },
  overall: {
    insight: "Efficiency held the period.",
    intro: "Full-account numbers versus June. One takeaway for the month — not a comment on every line.",
    kpis: [
      { label: "Media spend", value: "$583k", previous: "$845k", change: "31%", direction: "down" as const },
      { label: "Leads", value: "10,508", previous: "12,219", change: "14%", direction: "down" as const },
      { label: "Blended CPL", value: "$55.50", previous: "$69.38", change: "20%", direction: "down" as const },
      { label: "Leads vs forecast", value: "109%", previous: "vs plan", change: "hold", direction: "up" as const },
      { label: "Spend vs plan", value: "101%", previous: "on plan", change: "hold", direction: "up" as const },
      { label: "Meta CPL", value: "$72", previous: "$90", change: "20%", direction: "down" as const },
      { label: "Google CPA", value: "$38", previous: "$47", change: "20%", direction: "down" as const },
      { label: "Retargeting CPL", value: "$20", previous: "$29", change: "31%", direction: "down" as const },
    ],
    takeaway: "Spend can fall 31% and still beat forecast if money follows people who already want the bike. Cost is the win. Mix is the open job.",
  },
  movement: {
    insight: "Volume fell slower than spend.",
    intro: "The cut did not break the account. Cost is the story of the month.",
    stats: [
      { label: "Spend", value: "−31%", detail: "$583k vs $845k June · 101% of plan" },
      { label: "Leads", value: "−14%", detail: "10,508 vs 12,219 · 109% of forecast" },
      { label: "Blended CPL", value: "−20%", detail: "$55.50 vs $69.38 June · vs $114.56 FY forecast" },
    ],
  },
  mix: {
    insight: "Both channels got cheaper. Meta still bought the scale.",
    intro: "The channel split the overall numbers hid. Spend share held. Efficiency moved.",
    rows: [
      { name: "Meta", spend: "$381k", spendChange: "−31%", result: "5,267 leads", resultChange: "−14%", efficiency: "$72 CPL", efficiencyChange: "−20%" },
      { name: "Google", spend: "$201k", spendChange: "−31%", result: "5,287 conv.", resultChange: "−14%", efficiency: "$38 CPA", efficiencyChange: "−20%" },
    ],
  },
  funnel: {
    insight: "Intent did the work.",
    intro: "Warm audiences and search captured demand. Cold prospecting still bought volume — at a different cost.",
    items: [
      { name: "Meta prospecting", result: "2,366 leads", metric: "$116 CPL", note: "$274.8k · the scale engine" },
      { name: "Meta retargeting", result: "2,711 leads", metric: "$20 CPL", note: "25% less spend · more leads" },
      { name: "Google PMax", result: "4,444 conv.", metric: "$39.89 CPA", note: "84% of Google conversions" },
      { name: "Brand Search", result: "843 conv.", metric: "$28.65 CPA", note: "Cleanest intent in Google" },
    ],
  },
  channels: [
    {
      id: "meta",
      name: "Meta",
      insight: "Retargeting made the cut look like a win.",
      intro: "Scale engine · 65% of spend. Headline results versus June.",
      kpis: [
        { label: "Spend", value: "$381k", previous: "$552k", change: "31%", direction: "down" as const },
        { label: "Leads", value: "5,267", previous: "6,124", change: "14%", direction: "down" as const },
        { label: "CPL", value: "$72", previous: "$90", change: "20%", direction: "down" as const },
        { label: "Retargeting CPL", value: "$20", previous: "$29", change: "31%", direction: "down" as const },
      ],
      story: [
        {
          label: "What the results tell us",
          stat: "$72",
          support: "Blended CPL · 20% cheaper than June",
          text: "Under the $114.56 forecast. Not April’s $60. A good Meta result on less spend.",
        },
        {
          label: "Biggest win / challenge",
          stat: "$20",
          support: "Retargeting CPL · 2,711 leads",
          text: "More leads on 25% less spend. The win. Prospecting at $116 is the open challenge.",
        },
        {
          label: "What’s driving performance",
          stat: "−31%",
          support: "Spend moved into warm audiences",
          text: "Volume fell 14% — slower than spend. Efficiency improved because intent did, not because the channel broke.",
        },
        {
          label: "What we do next",
          stat: "$72",
          support: "Rebuild volume at or under this",
          text: "Do not buy lead count back at June’s $90. Protect $20 first.",
        },
      ],
      campaigns: [
        { name: "Prospecting", result: "2,366 leads", metric: "$116 CPL", note: "$274.8k spend · scale engine" },
        { name: "Retargeting", result: "2,711 leads", metric: "$20 CPL", note: "25% less spend · more leads" },
        { name: "Consideration", result: "3.09% CTR", metric: "23K LPV", note: "Video range · vs 1.47% static" },
      ],
    },
    {
      id: "google",
      name: "Google",
      insight: "Google converted cheaply. Mix did not.",
      intro: "Intent capture · 35% of spend. Headline results versus June.",
      kpis: [
        { label: "Spend", value: "$201k", previous: "$291k", change: "31%", direction: "down" as const },
        { label: "Conversions", value: "5,287", previous: "6,148", change: "14%", direction: "down" as const },
        { label: "CPA", value: "$38", previous: "$47", change: "20%", direction: "down" as const },
        { label: "PMax share", value: "84%", previous: "of Google conv.", change: "hold", direction: "up" as const },
      ],
      story: [
        {
          label: "What the results tell us",
          stat: "$38",
          support: "Google CPA · 20% cheaper than June",
          text: "Below blended CPL and a third of the $114.56 forecast. On 35% of spend it matched Meta’s conversion count.",
        },
        {
          label: "Biggest win / challenge",
          stat: "4%",
          support: "Touring and Chief of leads · vs 18% / 12% retail",
          text: "Cost is a win. Portfolio is not. Scout still supplies the volume.",
        },
        {
          label: "What’s driving performance",
          stat: "84%",
          support: "of Google conversions on PMax",
          text: "Feeds followed the strongest form-fill signal. The algorithm optimised for volume, not desirable bikes.",
        },
        {
          label: "What we do next",
          stat: "$40",
          support: "Hold CPA. Change the success test",
          text: "Value-weight PMax. The next test is model mix, not more conversions at $39.89.",
        },
      ],
      campaigns: [
        { name: "Performance Max", result: "4,444 conv.", metric: "$39.89 CPA", note: "84% of Google conversions" },
        { name: "Brand Search", result: "843 conv.", metric: "$28.65 CPA", note: "Highest-efficiency Google route" },
        { name: "Catch All", result: "Mix lever", metric: "Scout still leads", note: "Volume is not yet retail mix" },
      ],
    },
  ],
  models: {
    insight: "Scout still supplies the leads. Bagger is on its target. The gap is Touring and Chief.",
    intro: "Lead mix versus FY retail targets. Volume is not the same as value.",
    rows: [
      { name: "Scout", result: "4,197 leads", metric: "40% of leads", note: "FY retail target 42%" },
      { name: "Bagger", result: "2,177 leads", metric: "21% of leads", note: "FY retail target 29% — now on it" },
      { name: "Touring", result: "4%", metric: "of leads", note: "FY retail target 18%" },
      { name: "Chief", result: "4%", metric: "of leads", note: "FY retail target 12%" },
    ],
  },
  campaign: {
    name: "Meta · Retargeting",
    insight: "More leads. Less spend. $20 CPL.",
    intro: "Versus the June flight. The campaign that explains the efficiency gain.",
    kpis: [
      { label: "Leads", value: "2,711", previous: "2,510", change: "8%", direction: "up" as const },
      { label: "Spend", value: "$54k", previous: "$72k", change: "25%", direction: "down" as const },
      { label: "CPL", value: "$20", previous: "$29", change: "31%", direction: "down" as const },
      { label: "LP to lead", value: "5.7%", previous: "2–5% paid range", change: "hold", direction: "up" as const },
    ],
    story: [
      {
        label: "What the results tell us",
        stat: "$20",
        support: "CPL · vs $29 June · vs ~$33 CTA",
        text: "Almost a third of blended CPL. An exceptional campaign result.",
      },
      {
        label: "Biggest win / challenge",
        stat: "+8%",
        support: "Leads on 25% less spend",
        text: "The reverse of a typical cut. Volume rose while money fell.",
      },
      {
        label: "What’s driving performance",
        stat: "5.7%",
        support: "Landing page to lead",
        text: "Ad and page agreed: product, finance, quote. No re-selling the dream on arrival.",
      },
      {
        label: "What we do next",
        stat: "$20",
        support: "Hold this as the line",
        text: "Reinvest here first. Watch frequency, not just CPL.",
      },
    ],
  },
  creative: {
    showcase: [
      {
        title: "Challenger POV",
        stage: "Consideration",
        primary: "3.09%",
        primaryLabel: "CTR",
        line: "The ride is obvious in frame one.",
        imageIndex: 0,
      },
      {
        title: "Scout Monthly Payments",
        stage: "Prospecting",
        primary: "798",
        primaryLabel: "leads",
        line: "A monthly figure did more than lifestyle copy.",
        imageIndex: 1,
      },
      {
        title: "Chieftain Finance",
        stage: "Retargeting",
        primary: "$17",
        primaryLabel: "CPL",
        line: "Product and finance closed the last question.",
        imageIndex: 2,
      },
    ],
    best: [
      {
        title: "Challenger POV",
        stage: "Consideration",
        primary: "3.09% CTR",
        why: "First-person riding. The viewer can imagine the bike before they are asked to buy it.",
        kind: "meta" as const,
        imageIndex: 0,
      },
      {
        title: "Scout Monthly Payments",
        stage: "Prospecting",
        primary: "$101 CPL",
        why: "A specific monthly figure made the value exchange concrete while keeping the bike central.",
        kind: "meta" as const,
        imageIndex: 1,
      },
      {
        title: "Chieftain Finance",
        stage: "Retargeting",
        primary: "$17 CPL",
        why: "A direct finance line and a detailed bike view. The audience had already done the dreaming.",
        kind: "meta" as const,
        imageIndex: 2,
      },
    ],
    worst: [
      {
        title: "Spec-sheet static",
        stage: "Consideration",
        primary: "1.47% CTR",
        why: "Bike-only specs in frame one. The ride is invisible. Static sits well below the 3.8% video benchmark.",
        kind: "type" as const,
      },
      {
        title: "Broad lifestyle prospecting",
        stage: "Prospecting",
        primary: "~$140 CPL",
        why: "Lifestyle language without a number. Get a Quote prospecting costs more than the $101 payment line.",
        kind: "type" as const,
      },
      {
        title: "Catch All search",
        stage: "Google",
        primary: "Mix, not volume",
        why: "Filled Scout. Did not move Touring or Chief toward retail targets.",
        kind: "type" as const,
      },
    ],
    learnings: [
      {
        title: "Sell the ride up-funnel",
        text: "Experience-led video wins consideration. Spec sheets do not. Cut longer stories into 6–15s with the bike moving immediately.",
      },
      {
        title: "Name the payment",
        text: "A specific monthly figure converted colder audiences more cheaply than broad lifestyle copy.",
      },
      {
        title: "Product and finance close",
        text: "Retargeting should be branded, specific and in-frame-one. The audience has already done the dreaming.",
      },
      {
        title: "Signal now beats extra fills",
        text: "PMax followed the strongest conversion signal. Weighted values have to push the account toward the bikes we actually want to sell.",
      },
    ],
    next: {
      keep: [
        "POV riding video at consideration.",
        "Payment-led prospecting with the bike in frame.",
        "Product-first finance retargeting near $20 CPL.",
        "Brand Search. Do not starve it to fund prospecting.",
      ],
      improve: [
        "Value-weight PMax so mix, not form fills, sets the bid.",
        "Send payment ads to model-specific landing pages.",
        "Stop over-relying on Scout creative for volume.",
      ],
      test: [
        "Payment variants for Bagger, Touring and Chief.",
        "Dedicated Touring and Chief routes — rider-led, then product, then finance.",
        "Trade-in as a retargeting CTA beside Get a Quote.",
      ],
    },
  },
  next: {
    continue: [
      { title: "Reinvest at the new cost base", text: "Put spend back in while CPL is $55.50. Rebuild volume without giving the efficiency back." },
      { title: "Protect the $20 line", text: "Retargeting is the control campaign. Add spend carefully and watch frequency." },
      { title: "Hold Brand Search", text: "Lowest CPA in Google. Do not starve it to fund prospecting." },
    ],
    optimise: [
      { title: "Value-weight Google", text: "Move PMax to weighted conversion values and Max Conversion Value." },
      { title: "Model-specific pages", text: "Match payment and product ads to the bike they sell." },
      { title: "Close the quality loop", text: "Weekly Power BI check: selected model versus lead form, plus a 30-day decision forecast." },
    ],
    test: [
      { title: "Build Touring and Chief", text: "Dedicated routes so the mix is not Scout-dependent. Bagger holds at 29%." },
      { title: "Payment variants by model", text: "Repeat the Scout monthly-payment idea on Bagger, Touring and Chief." },
      { title: "Trade-in in retargeting", text: "Run it beside Get a Quote on high-intent riders." },
    ],
  },
  thanks: {
    headline: "Thank you.",
    email: "BRANDS@NOISEMEDIAGROUP.CO.UK",
    phone: "+44 0203 007 0500",
    cities: "LONDON, LOS ANGELES, NEW YORK",
    social: "@NOISEMEDIAGROUP",
    web: "WWW.NOISEMEDIAGROUP.CO.UK",
  },
};

const chapters = [
  { id: "title", number: "00", label: "Title" },
  { id: "summary", number: "01", label: "This month" },
  { id: "overall", number: "02", label: "Overall results" },
  { id: "meta", number: "03", label: "Meta" },
  { id: "google", number: "04", label: "Google" },
  { id: "models", number: "05", label: "Model mix" },
  { id: "campaign", number: "06", label: "Campaign" },
  { id: "creative", number: "07", label: "Creative" },
  { id: "next", number: "08", label: "What happens next" },
  { id: "thanks", number: "09", label: "Thank you" },
];

const storyPanelLabels = [
  "Title",
  "This month in 3 points",
  "Overall results",
  "How spend moved",
  "Channel mix",
  "Funnel",
  "Meta results",
  "Meta story",
  "Meta campaigns",
  "Google results",
  "Google story",
  "Google campaigns",
  "Model mix",
  "Campaign results",
  "Campaign story",
  "Winning creative",
  "Top vs low",
  "Creative learnings",
  "Keep / Improve / Test",
  "What happens next",
  "Thank you",
];

const storyPanelCount = storyPanelLabels.length;
const mobileStoryQuery = "(max-width: 820px)";

const isVerticalStory = () =>
  typeof window !== "undefined" && window.matchMedia(mobileStoryQuery).matches;

function scrollStoryTo(_story: HTMLElement, target: HTMLElement) {
  const vertical = isVerticalStory();
  target.scrollIntoView({
    behavior: "instant",
    block: vertical ? "start" : "nearest",
    inline: vertical ? "nearest" : "start",
  });
}

function closestPanelIndex(story: HTMLElement, panels: HTMLElement[]) {
  const origin = isVerticalStory() ? story.getBoundingClientRect().top : story.getBoundingClientRect().left;
  return panels.reduce((closestIndex, panel, index) => {
    const panelEdge = isVerticalStory() ? panel.getBoundingClientRect().top : panel.getBoundingClientRect().left;
    const closestEdge = isVerticalStory()
      ? panels[closestIndex].getBoundingClientRect().top
      : panels[closestIndex].getBoundingClientRect().left;
    return Math.abs(panelEdge - origin) < Math.abs(closestEdge - origin) ? index : closestIndex;
  }, 0);
}

type Kpi = {
  label: string;
  value: string;
  previous: string;
  change: string;
  direction: "up" | "down";
};

export default function Home() {
  const storyRef = useRef<HTMLElement>(null);
  const [activeChapter, setActiveChapter] = useState("title");
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
        const index = closestPanelIndex(story, panels);
        const panel = panels[index];
        if (!panel) return;
        setActivePanelIndex(index);
        const chapter = panel.closest<HTMLElement>(".chapter");
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
    scrollStoryTo(story, section);
  };

  const stepPanel = (direction: number) => {
    const story = storyRef.current;
    if (!story) return;
    const panels = Array.from(story.querySelectorAll<HTMLElement>("[data-story-panel]"));
    const currentIndex = closestPanelIndex(story, panels);
    const nextIndex = Math.min(panels.length - 1, Math.max(0, currentIndex + direction));
    const panel = panels[nextIndex];
    if (panel) scrollStoryTo(story, panel);
  };

  const meta = report.channels[0];
  const google = report.channels[1];

  return (
    <div className="report-shell">
      <a className="skip-link" href="#summary">
        Skip to report
      </a>
      <div className="read-progress" aria-hidden="true">
        <span style={{ width: progress }} />
      </div>

      <header className="topbar">
        <button className="noise-mark" onClick={() => jumpTo("title")} aria-label="Return to title">
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
          if (isVerticalStory()) return;
          if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
          event.preventDefault();
          storyRef.current?.scrollBy({ left: event.deltaY, behavior: "auto" });
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowDown") stepPanel(1);
          if (event.key === "ArrowLeft" || event.key === "ArrowUp") stepPanel(-1);
        }}
        aria-label="Performance report"
      >
        <section className="chapter chapter-run thank-you-chapter" id="title">
          <div className="story-panel title-panel" data-story-panel>
            <div className="thank-you-main">
              <p className="thank-kicker">{report.title.kicker}</p>
              <h1 className="editable" contentEditable suppressContentEditableWarning>{report.title.headline}</h1>
              <p className="title-period editable" contentEditable suppressContentEditableWarning>{report.title.periodLine}</p>
            </div>
            <div className="thank-foot">
              <span>Noise Media</span>
              <span>{report.period}</span>
            </div>
          </div>
        </section>

        <section className="chapter chapter-run light" id="summary">
          <div className="story-panel" data-story-panel>
            <ChapterHeader
              number="01"
              eyebrow="Executive summary"
              title="This month in 3 points."
              intro="The period in three lines. Then the one thing we do next."
            />
            <div className="month-points">
              {report.summary.points.map((point, index) => (
                <article key={point.title}>
                  <span>0{index + 1}</span>
                  <h3 className="editable" contentEditable suppressContentEditableWarning>{point.title}</h3>
                  <p className="editable" contentEditable suppressContentEditableWarning>{point.text}</p>
                </article>
              ))}
            </div>
            <div className="priority-callout">
              <span>Next month priority</span>
              <p className="editable" contentEditable suppressContentEditableWarning>{report.summary.nextMonthPriority}</p>
            </div>
          </div>
        </section>

        <section className="chapter chapter-run light" id="overall">
          <div className="story-panel results-hero" data-story-panel>
            <ChapterHeader
              number="02"
              eyebrow="Overall results"
              title={report.overall.insight}
              intro={report.overall.intro}
            />
            <KpiBoard kpis={report.overall.kpis} previousPeriod={report.previousPeriod} />
            <Takeaway text={report.overall.takeaway} />
          </div>
          <div className="story-panel" data-story-panel>
            <ChapterHeader
              number="02"
              eyebrow="How spend moved"
              title={report.movement.insight}
              intro={report.movement.intro}
            />
            <div className="movement-grid">
              {report.movement.stats.map((stat) => (
                <article key={stat.label}>
                  <span>{stat.label}</span>
                  <strong className="editable" contentEditable suppressContentEditableWarning>{stat.value}</strong>
                  <p className="editable" contentEditable suppressContentEditableWarning>{stat.detail}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="story-panel" data-story-panel>
            <ChapterHeader
              number="02"
              eyebrow="Channel mix"
              title={report.mix.insight}
              intro={report.mix.intro}
            />
            <div className="channel-mix" aria-label="Results by channel">
              <div className="mix-head">
                <span>Channel</span>
                <span>Spend</span>
                <span>Result</span>
                <span>Efficiency</span>
              </div>
              {report.mix.rows.map((row) => (
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
              number="02"
              eyebrow="Funnel"
              title={report.funnel.insight}
              intro={report.funnel.intro}
            />
            <DetailGrid items={report.funnel.items} />
          </div>
        </section>

        <section className="chapter chapter-run light" id="meta">
          <div className="story-panel" data-story-panel>
            <ChapterHeader
              number="03"
              eyebrow="Meta · headline results"
              title={meta.insight}
              intro={meta.intro}
            />
            <KpiBoard kpis={meta.kpis} previousPeriod={report.previousPeriod} />
          </div>
          <div className="story-panel" data-story-panel>
            <ChapterHeader
              number="03"
              eyebrow="Meta · the story"
              title={meta.insight}
              intro="Four boxes. The number is the point. The line underneath is the meaning."
            />
            <StoryBoxes boxes={meta.story} />
          </div>
          <div className="story-panel" data-story-panel>
            <ChapterHeader
              number="03"
              eyebrow="Meta · campaigns"
              title="Prospecting bought volume. Retargeting bought the result."
              intro="The three Meta jobs in the period."
            />
            <DetailGrid items={meta.campaigns} />
          </div>
        </section>

        <section className="chapter chapter-run light" id="google">
          <div className="story-panel" data-story-panel>
            <ChapterHeader
              number="04"
              eyebrow="Google · headline results"
              title={google.insight}
              intro={google.intro}
            />
            <KpiBoard kpis={google.kpis} previousPeriod={report.previousPeriod} />
          </div>
          <div className="story-panel" data-story-panel>
            <ChapterHeader
              number="04"
              eyebrow="Google · the story"
              title={google.insight}
              intro="Four boxes. The number is the point. The line underneath is the meaning."
            />
            <StoryBoxes boxes={google.story} />
          </div>
          <div className="story-panel" data-story-panel>
            <ChapterHeader
              number="04"
              eyebrow="Google · campaigns"
              title="PMax filled the form. Brand was clean. Catch All did not fix mix."
              intro="The three Google jobs in the period."
            />
            <DetailGrid items={google.campaigns} />
          </div>
        </section>

        <section className="chapter chapter-run light" id="models">
          <div className="story-panel" data-story-panel>
            <ChapterHeader
              number="05"
              eyebrow="Model mix"
              title={report.models.insight}
              intro={report.models.intro}
            />
            <DetailGrid items={report.models.rows} />
          </div>
        </section>

        <section className="chapter chapter-run light" id="campaign">
          <div className="story-panel" data-story-panel>
            <ChapterHeader
              number="06"
              eyebrow="Campaign pull-out"
              title={report.campaign.insight}
              intro={`${report.campaign.name}. ${report.campaign.intro}`}
            />
            <KpiBoard kpis={report.campaign.kpis} previousPeriod={report.previousPeriod} />
          </div>
          <div className="story-panel" data-story-panel>
            <ChapterHeader
              number="06"
              eyebrow="Campaign · the story"
              title={report.campaign.insight}
              intro="Four boxes. The number is the point. The line underneath is the meaning."
            />
            <StoryBoxes boxes={report.campaign.story} />
          </div>
        </section>

        <section className="chapter chapter-run creative-chapter" id="creative">
          <div className="story-panel creative-hero-panel" data-story-panel>
            <ChapterHeader
              number="07"
              eyebrow="Winning creative"
              title="The work that did the job."
              intro="Larger frames. One line each. Creative is the point of this page."
            />
            <div className="creative-hero-grid">
              {report.creative.showcase.map((item) => (
                <article key={item.title}>
                  <CreativeMedia kind="meta" title={item.title} stage={item.stage} imageIndex={item.imageIndex} />
                  <div>
                    <strong>{item.primary}</strong>
                    <span>{item.primaryLabel}</span>
                    <h3 className="editable" contentEditable suppressContentEditableWarning>{item.title}</h3>
                    <p className="editable" contentEditable suppressContentEditableWarning>{item.line}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="story-panel" data-story-panel>
            <ChapterHeader
              number="07"
              eyebrow="Top vs low"
              title="What worked. What did not."
              intro="Three best, three worst. Key metric. One line on why."
            />
            <div className="performer-split">
              <div>
                <p className="performer-label">Best</p>
                {report.creative.best.map((item) => (
                  <article key={item.title}>
                    <CreativeMedia kind={item.kind} title={item.title} stage={item.stage} imageIndex={item.imageIndex} />
                    <div>
                      <b>{item.primary}</b>
                      <h3 className="editable" contentEditable suppressContentEditableWarning>{item.title}</h3>
                      <p className="editable" contentEditable suppressContentEditableWarning>{item.why}</p>
                    </div>
                  </article>
                ))}
              </div>
              <div>
                <p className="performer-label low">Low</p>
                {report.creative.worst.map((item) => (
                  <article key={item.title}>
                    <CreativeMedia kind={item.kind} title={item.title} stage={item.stage} />
                    <div>
                      <b>{item.primary}</b>
                      <h3 className="editable" contentEditable suppressContentEditableWarning>{item.title}</h3>
                      <p className="editable" contentEditable suppressContentEditableWarning>{item.why}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
          <div className="story-panel" data-story-panel>
            <ChapterHeader
              number="07"
              eyebrow="Key creative learnings"
              title="What the work told us."
              intro="What performance says about the creative — not another metrics dump."
            />
            <div className="learn-grid learn-grid-4">
              {report.creative.learnings.map((item, index) => (
                <article key={item.title}>
                  <span>0{index + 1}</span>
                  <h3 className="editable" contentEditable suppressContentEditableWarning>{item.title}</h3>
                  <p className="editable" contentEditable suppressContentEditableWarning>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="story-panel" data-story-panel>
            <ChapterHeader
              number="07"
              eyebrow="What we do next"
              title="Keep. Improve. Test."
              intro="The creative actions that follow the work above."
            />
            <div className="kit-grid">
              <article>
                <span>Keep</span>
                <ul>
                  {report.creative.next.keep.map((line) => (
                    <li className="editable" contentEditable suppressContentEditableWarning key={line}>{line}</li>
                  ))}
                </ul>
              </article>
              <article>
                <span>Improve</span>
                <ul>
                  {report.creative.next.improve.map((line) => (
                    <li className="editable" contentEditable suppressContentEditableWarning key={line}>{line}</li>
                  ))}
                </ul>
              </article>
              <article>
                <span>Test</span>
                <ul>
                  {report.creative.next.test.map((line) => (
                    <li className="editable" contentEditable suppressContentEditableWarning key={line}>{line}</li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="chapter chapter-run light" id="next">
          <div className="story-panel next-panel" data-story-panel>
            <ChapterHeader
              number="08"
              eyebrow="What happens next"
              title="Continue. Optimise. Test."
              intro="Short, action-led recommendations. Each one follows a number above."
            />
            <div className="happens-grid">
              <article>
                <span>Continue</span>
                {report.next.continue.map((item) => (
                  <div key={item.title}>
                    <h3 className="editable" contentEditable suppressContentEditableWarning>{item.title}</h3>
                    <p className="editable" contentEditable suppressContentEditableWarning>{item.text}</p>
                  </div>
                ))}
              </article>
              <article>
                <span>Optimise</span>
                {report.next.optimise.map((item) => (
                  <div key={item.title}>
                    <h3 className="editable" contentEditable suppressContentEditableWarning>{item.title}</h3>
                    <p className="editable" contentEditable suppressContentEditableWarning>{item.text}</p>
                  </div>
                ))}
              </article>
              <article>
                <span>Test</span>
                {report.next.test.map((item) => (
                  <div key={item.title}>
                    <h3 className="editable" contentEditable suppressContentEditableWarning>{item.title}</h3>
                    <p className="editable" contentEditable suppressContentEditableWarning>{item.text}</p>
                  </div>
                ))}
              </article>
            </div>
          </div>
        </section>

        <section className="chapter chapter-run thank-you-chapter" id="thanks">
          <div className="story-panel thank-you-panel" data-story-panel>
            <div className="thank-you-main">
              <p className="thank-kicker">Noise Media</p>
              <h2 className="editable" contentEditable suppressContentEditableWarning>{report.thanks.headline}</h2>
              <div className="thank-contact">
                <a className="editable" href={`mailto:${report.thanks.email.toLowerCase()}`} contentEditable suppressContentEditableWarning>
                  {report.thanks.email}
                </a>
                <a className="editable" href="tel:+442030070500" contentEditable suppressContentEditableWarning>
                  {report.thanks.phone}
                </a>
                <p className="editable" contentEditable suppressContentEditableWarning>{report.thanks.cities}</p>
                <a
                  className="editable"
                  href="https://www.instagram.com/noisemediagroup"
                  target="_blank"
                  rel="noreferrer"
                  contentEditable
                  suppressContentEditableWarning
                >
                  {report.thanks.social}
                </a>
                <a
                  className="editable"
                  href={`https://${report.thanks.web.toLowerCase()}`}
                  target="_blank"
                  rel="noreferrer"
                  contentEditable
                  suppressContentEditableWarning
                >
                  {report.thanks.web}
                </a>
              </div>
            </div>
            <div className="thank-foot">
              <span>Noise × {report.client}</span>
              <span>{report.period}</span>
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
    <div className={`kpi-board${kpis.length > 4 ? " kpi-2row" : ""}`} aria-label="Headline stats versus previous period">
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

function ChapterHeader({
  number,
  eyebrow,
  title,
  intro,
}: {
  number: string;
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="chapter-header insight-header">
      <div className="section-number">{number}</div>
      <div>
        <span className="eyebrow editable" contentEditable suppressContentEditableWarning>{eyebrow}</span>
        <h2 className="editable" contentEditable suppressContentEditableWarning>{title}</h2>
      </div>
      {intro ? <p className="editable" contentEditable suppressContentEditableWarning>{intro}</p> : null}
    </header>
  );
}

function Takeaway({ text }: { text: string }) {
  return (
    <article className="takeaway-bar">
      <span>The takeaway</span>
      <p className="editable" contentEditable suppressContentEditableWarning>{text}</p>
    </article>
  );
}

function StoryBoxes({
  boxes,
}: {
  boxes: { label: string; stat: string; support: string; text: string }[];
}) {
  return (
    <div className="story-boxes">
      {boxes.map((box) => (
        <article key={box.label}>
          <span>{box.label}</span>
          <strong className="editable" contentEditable suppressContentEditableWarning>{box.stat}</strong>
          <small className="editable" contentEditable suppressContentEditableWarning>{box.support}</small>
          <p className="editable" contentEditable suppressContentEditableWarning>{box.text}</p>
        </article>
      ))}
    </div>
  );
}

function DetailGrid({
  items,
}: {
  items: { name: string; result: string; metric: string; note: string }[];
}) {
  return (
    <div className={`detail-grid cols-${items.length}`}>
      {items.map((item) => (
        <article key={item.name}>
          <span>{item.name}</span>
          <strong className="editable" contentEditable suppressContentEditableWarning>{item.result}</strong>
          <b className="editable" contentEditable suppressContentEditableWarning>{item.metric}</b>
          <p className="editable" contentEditable suppressContentEditableWarning>{item.note}</p>
        </article>
      ))}
    </div>
  );
}

function CreativeMedia({
  kind,
  title,
  stage,
  imageIndex = 0,
}: {
  kind: "meta" | "type";
  title: string;
  stage: string;
  imageIndex?: number;
}) {
  if (kind === "meta") {
    return (
      <span className="creative-image">
        <Image
          src={reportAsset("indian-creative-triptych.png")}
          alt={`${title} Indian Motorcycle campaign creative`}
          width={1200}
          height={675}
          sizes="(max-width: 820px) 100vw, 32vw"
          unoptimized
          style={{ left: `${-imageIndex * 100}%` }}
        />
        <i>{stage}</i>
      </span>
    );
  }
  return (
    <span className="type-creative">
      <i>{stage}</i>
      <b>{title}</b>
    </span>
  );
}
