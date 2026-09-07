"use client";

import { useEffect, useMemo, useState } from "react";

const chapters = [
  { id: "overview", number: "00", label: "The takeaway" },
  { id: "performance", number: "01", label: "Overall performance" },
  { id: "campaigns", number: "02", label: "Campaign breakdown" },
  { id: "channels", number: "03", label: "Channel breakdown" },
  { id: "creative", number: "04", label: "Winning creative" },
  { id: "actions", number: "05", label: "Action register" },
];

const campaigns = [
  {
    name: "Always-on acquisition",
    status: "Beat target",
    result: "4.8x",
    metric: "ROAS",
    change: "+21% vs. last period",
    bars: [42, 55, 58, 68, 72, 87, 96],
    happened:
      "Revenue grew faster than spend as budget shifted into creator-led product proof and higher-intent audiences.",
    why: "The campaign gave people a use case, a reason to believe and a product demonstration within the first three seconds.",
    learning:
      "Specific moments outperform generic lifestyle. Showing when the product matters makes the benefit instantly legible.",
    next: "Scale the winning creator structure into three new need states. Increase budget by 15% while ROAS stays above 4.2x.",
  },
  {
    name: "Summer launch",
    status: "Built demand",
    result: "3.7x",
    metric: "ROAS",
    change: "+34% new-customer revenue",
    bars: [30, 48, 71, 84, 76, 69, 73],
    happened:
      "The launch created a strong first-week spike, then settled as frequency rose across the broadest prospecting audiences.",
    why: "Distinctive colour and a clear seasonal cue earned attention. Repeated exposure without enough narrative variation limited the tail.",
    learning:
      "A strong campaign world opens the door. A deeper bank of stories keeps it open once the launch moment passes.",
    next: "Keep the visual world. Add product proof, creator reaction and comparison edits before the next frequency peak.",
  },
  {
    name: "Retention push",
    status: "Most efficient",
    result: "6.2x",
    metric: "ROAS",
    change: "18% of total revenue",
    bars: [52, 48, 62, 59, 73, 80, 91],
    happened:
      "Email-engaged and recent-site audiences converted efficiently, but the available audience capped total volume.",
    why: "The message acknowledged existing product knowledge and moved straight to a new reason to buy. No re-introduction needed.",
    learning:
      "Retention creative should reward familiarity. The more we know about the audience, the less the ad needs to explain.",
    next: "Build sequential messages by recency and previous purchase. Protect efficiency rather than forcing spend into a finite pool.",
  },
];

const channels = [
  {
    name: "Meta",
    role: "Scale engine",
    spend: "GBP112k",
    result: "4.6x ROAS",
    share: "65% of spend",
    driver:
      "Creator-led demonstrations did the heavy lifting. Advantage+ found volume once the creative made the benefit obvious.",
    learnt:
      "Creative breadth, not narrower targeting, unlocked the next pocket of efficient reach.",
    action:
      "Refresh the top three concepts with new openings every 14 days. Keep the body of the ad recognisable.",
  },
  {
    name: "Google",
    role: "Intent capture",
    spend: "GBP53k",
    result: "4.1x ROAS",
    share: "25% of spend",
    driver:
      "Brand search converted efficiently after paid social lifted demand. Shopping gained from cleaner product-group bidding.",
    learnt:
      "Search performed best when social had already created the question. The channels are compounding, not competing.",
    action:
      "Expand non-brand coverage around the three need states proven in social. Hold brand budget to true demand.",
  },
  {
    name: "TikTok",
    role: "Learning engine",
    spend: "GBP19.2k",
    result: "2.8x ROAS",
    share: "10% of spend",
    driver:
      "Fast, face-first openings lifted attention, but the transition from story to product page lost too much intent.",
    learnt:
      "The platform can generate curiosity. The landing experience needs to finish the same story the creator starts.",
    action:
      "Test a creator-matched landing page and keep investment capped until post-click conversion improves by 20%.",
  },
];

const creatives = [
  {
    title: "Product in hand",
    channel: "Meta · Prospecting",
    primary: "6.1x",
    primaryLabel: "ROAS",
    secondary: "GBP23.90 CPA",
    worked:
      "The product fills the frame before the viewer has time to scroll. Scale, colour and direct product interaction do the stopping.",
    take:
      "Lead with product truth. Use the first frame to make the ad identifiable without a logo or headline.",
    future:
      "Carry the close-up structure into texture, leak-proof and size demonstrations.",
  },
  {
    title: "Run with it",
    channel: "TikTok · Prospecting",
    primary: "38%",
    primaryLabel: "Hook rate",
    secondary: "GBP28.10 CPA",
    worked:
      "Motion starts immediately and the cobalt styling feels native to the wider campaign without looking like a cut-down TV ad.",
    take:
      "Movement earns the first second. Product presence needs to arrive just as quickly to turn attention into intent.",
    future:
      "Test the same motion hook with a product close-up at 0.5 seconds and creator voiceover from frame one.",
  },
  {
    title: "Ritual reset",
    channel: "Meta · Retargeting",
    primary: "4.9x",
    primaryLabel: "ROAS",
    secondary: "2.1% CTR",
    worked:
      "A simple top-down composition makes the product feel part of an everyday ritual. Familiar objects create context at a glance.",
    take:
      "Still life works when every prop explains the use moment. Decoration without meaning is just clutter.",
    future:
      "Build a repeatable visual system around workday, workout and weekend rituals.",
  },
];

const actions = [
  {
    code: "A-01",
    priority: "Scale now",
    signal: "Always-on acquisition reached 4.8x ROAS, 21% above the previous period.",
    action: "Increase budget 15% across the three proven need states.",
    owner: "Paid + Creative",
    due: "9 Sep",
    success: "ROAS stays above 4.2x",
  },
  {
    code: "A-02",
    priority: "Protect",
    signal: "Three creative families generated 62% of prospecting revenue.",
    action: "Rotate opening frames every 14 days before performance softens.",
    owner: "Creative",
    due: "12 Sep",
    success: "CPA remains within 5%",
  },
  {
    code: "A-03",
    priority: "Test",
    signal: "TikTok earned a 38% hook rate but lost intent after the click.",
    action: "Launch a creator-matched landing page for the winning story.",
    owner: "Growth",
    due: "20 Sep",
    success: "Conversion rate rises 20%",
  },
  {
    code: "A-04",
    priority: "Guardrail",
    signal: "Retention delivered 6.2x ROAS from a finite audience pool.",
    action: "Cap spend and build messages around recency and previous purchase.",
    owner: "Paid",
    due: "Ongoing",
    success: "Frequency stays below 3.5",
  },
];

const actionStatusOrder = ["Ready", "Approved", "In progress", "Done"];

export default function Home() {
  const [activeChapter, setActiveChapter] = useState("overview");
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
    const sections = chapters
      .map((chapter) => document.getElementById(chapter.id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveChapter(visible.target.id);
      },
      { rootMargin: "-22% 0px -56%", threshold: [0.05, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const jumpTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const campaign = campaigns[campaignIndex];
  const channel = channels[channelIndex];
  const creative = creatives[creativeIndex];

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
        <button className="noise-mark" onClick={() => jumpTo("overview")}>
          NOISE<span>.</span>
        </button>
        <div className="report-name">
          <span>Monthly performance story</span>
          <strong>Sample client · August 2026</strong>
        </div>
        <div className="data-state">
          <span className="live-dot" />
          4 decisions ready
        </div>
      </header>

      <aside className="chapter-nav" aria-label="Report chapters">
        <p>In this report</p>
        <nav>
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

      <main>
        <section className="chapter hero" id="overview">
          <div className="hero-kicker reveal">August 2026 · Monthly report</div>
          <h1>
            More revenue.
            <br />
            <span>Less wasted reach.</span>
          </h1>
          <div className="hero-bottom">
            <p className="hero-summary">
              Revenue grew <strong>28%</strong> while spend rose <strong>12%</strong>.
              The gap came from following intent. This report turns that result
              into four decisions ready to approve, assign and measure.
            </p>
            <div className="hero-actions">
              <button className="round-link" onClick={() => jumpTo("performance")}>
                <span>Bring it to life</span>
                <b aria-hidden="true">↓</b>
              </button>
              <button className="text-link" onClick={() => jumpTo("actions")}>
                Review 4 decisions
              </button>
            </div>
          </div>
          <div className="hero-index" aria-hidden="true">
            00
          </div>
        </section>

        <section className="metric-ribbon" aria-label="Headline performance">
          <div>
            <span>Revenue</span>
            <strong>GBP792.1k</strong>
            <small className="up">↑ 28%</small>
          </div>
          <div>
            <span>Media spend</span>
            <strong>GBP184.2k</strong>
            <small>↑ 12%</small>
          </div>
          <div>
            <span>ROAS</span>
            <strong>4.30x</strong>
            <small className="up">↑ 14%</small>
          </div>
          <div>
            <span>Customer acquisition cost</span>
            <strong>GBP31.40</strong>
            <small className="up">↓ 11%</small>
          </div>
        </section>

        <section className="chapter light" id="performance">
          <ChapterHeader
            number="01"
            eyebrow="Overall performance"
            title="Efficiency improved because spend followed intent."
            intro="This was not growth bought at any cost. Revenue outpaced investment because the account moved money toward what audiences were already telling us worked."
          />

          <div className="performance-story">
            <div className="story-beat">
              <span>What happened</span>
              <strong>+GBP173k</strong>
              <p>
                Incremental revenue versus July, with 73% of the growth coming
                from new customers.
              </p>
            </div>
            <div className="connector" aria-hidden="true">→</div>
            <div className="story-beat cobalt">
              <span>Why it happened</span>
              <strong>3 shifts</strong>
              <p>
                Earlier creative rotation. Higher-intent budget allocation.
                Clearer roles for each channel.
              </p>
            </div>
            <div className="connector" aria-hidden="true">→</div>
            <div className="story-beat coral">
              <span>What we learnt</span>
              <strong>Clarity scales</strong>
              <p>
                The more specific the use moment, the easier it was for media to
                find the right customer.
              </p>
            </div>
          </div>

          <div className="evidence-grid">
            <article className="evidence-card chart-card">
              <div className="card-topline">
                <span>Revenue vs. spend</span>
                <small>Indexed · July = 100</small>
              </div>
              <div className="comparison-chart" aria-label="Revenue index 128, spend index 112">
                <div className="chart-axis"><span>130</span><span>100</span><span>70</span></div>
                <div className="bar-group">
                  <div><i style={{ height: "77%" }} /><span>Spend</span><b>112</b></div>
                  <div><i className="revenue" style={{ height: "94%" }} /><span>Revenue</span><b>128</b></div>
                </div>
              </div>
            </article>
            <article className="evidence-card quote-card">
              <span className="mini-label">The takeaway</span>
              <blockquote>
                We did not just find more people. We gave the right people more
                reasons to act.
              </blockquote>
              <details>
                <summary>See the evidence behind this view</summary>
                <p>
                  Conversion rate rose 13%, high-intent audience revenue rose 31%
                  and the best three creative families held 62% of prospecting
                  revenue without a rise in blended frequency.
                </p>
              </details>
            </article>
          </div>

          <article className="result-replay">
            <div className="replay-intro">
              <span className="mini-label">Result brought to life</span>
              <h3>Budget followed the strongest signal</h3>
              <p>
                The team moved GBP22k from broad lifestyle activity into three
                product-specific need states during the period.
              </p>
            </div>
            <div className="replay-comparison">
              <div>
                <span>Before</span>
                <strong>48%</strong>
                <small>Spend against high intent</small>
                <i><b style={{ width: "48%" }} /></i>
              </div>
              <div className="after">
                <span>After</span>
                <strong>61%</strong>
                <small>Spend against high intent</small>
                <i><b style={{ width: "61%" }} /></i>
              </div>
            </div>
            <div className="replay-impact">
              <span>Impact</span>
              <strong>3.7x to 4.8x</strong>
              <p>ROAS improved while prospecting revenue continued to grow.</p>
              <button onClick={() => jumpTo("actions")}>Decision triggered · A-01</button>
            </div>
          </article>
        </section>

        <section className="chapter dark" id="campaigns">
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
                onClick={() => setCampaignIndex(index)}
              >
                <span>0{index + 1}</span>
                {item.name}
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
        </section>

        <section className="chapter light" id="channels">
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
        </section>

        <section className="chapter creative-chapter" id="creative">
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
                onClick={() => setCreativeIndex(index)}
                aria-label={`View analysis for ${item.title}`}
              >
                <span className="creative-rank">0{index + 1}</span>
                <span className="creative-image">
                  <img
                    src="/sample-creative-triptych.png"
                    alt={`${item.title} sample campaign creative`}
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
        </section>

        <section className="chapter action-chapter" id="actions">
          <ChapterHeader
            number="05"
            eyebrow="Live action register"
            title="The report becomes the plan."
            intro="Every recommendation has a source, an owner, a due date and a threshold that tells us whether to scale, change or stop."
          />

          <div className="register-summary">
            <div><strong>4</strong><span>Decisions</span></div>
            <div><strong>{actionStatuses.filter((status) => status !== "Ready").length}</strong><span>Moved forward</span></div>
            <p>A recommendation without ownership and a success threshold is commentary. This is the working layer.</p>
          </div>

          <div className="action-register" aria-label="Action register">
            <div className="register-head" aria-hidden="true">
              <span>Signal + action</span>
              <span>Accountability</span>
              <span>Decision state</span>
            </div>
            {actions.map((item, index) => (
              <article className="action-row" key={item.code}>
                <div className="action-main">
                  <div className="action-meta"><span>{item.code}</span><b>{item.priority}</b></div>
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
            <button onClick={() => jumpTo("overview")}>Back to the top ↑</button>
          </div>
        </section>
      </main>

      <footer>
        <span>NOISE. Client reporting prototype</span>
        <span>Illustrative data and creative · September 2026</span>
      </footer>
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
