// Case Analysis: sends the user's description to /api/analyze and renders both sides.
(() => {
  const form = document.getElementById("analysis-form");
  const story = document.getElementById("an-story");
  const count = document.getElementById("an-count");
  const out = document.getElementById("analysis-result");
  const submit = form.querySelector("button[type=submit]");
  const MAX = 4000;

  const EXAMPLE = {
    story: "I lent ₹3,00,000 to my friend in March 2025 through bank transfer for his shop. There is no written agreement, but we have WhatsApp messages where he says he will return it by December. In January 2026 he gave me a cheque for the full amount, which bounced with 'funds insufficient'. I got the bank memo on 2 February. I haven't sent any legal notice yet and now he has stopped answering my calls.",
    side: "The person who lent the money",
    other: "My friend who borrowed it",
    state: "Maharashtra"
  };

  const BALANCE = {
    strong: { pos: 0, label: "Strong for you" },
    leaning_favourable: { pos: 1, label: "Leaning in your favour" },
    evenly_balanced: { pos: 2, label: "Evenly balanced: a true gray area" },
    leaning_unfavourable: { pos: 3, label: "Leaning against you" },
    weak: { pos: 4, label: "Weak for you" }
  };

  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const list = (items, cls = "") => items && items.length ? `<ul class="${cls}">${items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>` : "";

  story.addEventListener("input", () => {
    count.textContent = `${story.value.length} / ${MAX}`;
    count.classList.toggle("over", story.value.length > MAX);
  });

  document.getElementById("an-example").addEventListener("click", () => {
    story.value = EXAMPLE.story;
    form.side.value = EXAMPLE.side;
    form.otherSide.value = EXAMPLE.other;
    form.state.value = EXAMPLE.state;
    story.dispatchEvent(new Event("input"));
    story.focus();
  });

  form.addEventListener("submit", async e => {
    e.preventDefault();
    const payload = {
      story: story.value.trim(),
      side: form.side.value,
      otherSide: form.otherSide.value,
      state: form.state.value
    };
    if (payload.story.length < 60) {
      showError("Please describe your situation in a little more detail: what happened, when, and what you want.");
      return;
    }
    submit.disabled = true;
    submit.textContent = "Analysing…";
    out.hidden = false;
    out.innerHTML = `
      <div class="an-loading">
        <div class="duel"><span class="good-badge">🟢 Good Lawyer</span><span class="vs">vs</span><span class="devil-badge">😈 Devil's Lawyer</span></div>
        <p>Both lawyers are studying your case. This usually takes 20–60 seconds…</p>
        <div class="bar"><span></span></div>
      </div>`;
    out.scrollIntoView({ behavior: "smooth", block: "start" });

    try {
      const r = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      const data = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(data.error || "Something went wrong. Please try again.");
      render(data);
    } catch (err) {
      showError(err.message === "Failed to fetch" ? "Couldn't reach the server. Check your connection and try again." : err.message);
    } finally {
      submit.disabled = false;
      submit.textContent = "Analyse both sides";
    }
  });

  function showError(msg) {
    out.hidden = false;
    out.innerHTML = `<div class="an-error">${esc(msg)}</div>`;
  }

  function args(items) {
    if (!items || !items.length) return `<p class="muted">No arguments: more facts are needed.</p>`;
    return `<ol class="arg-list">${items.map(a => `
      <li>
        <strong>${esc(a.point)}</strong>
        <p>${esc(a.reasoning)}</p>
        ${a.legal_basis ? `<span class="basis">⚖ ${esc(a.legal_basis)}</span>` : ""}
      </li>`).join("")}</ol>`;
  }

  function render(d) {
    const bal = BALANCE[d.balance] || BALANCE.evenly_balanced;
    const pathLink = d.related_path && d.related_path !== "none"
      ? `<a class="btn ghost" href="#${esc(d.related_path)}">Open the step-by-step guide for this type of case →</a>` : "";

    out.innerHTML = `
      <div class="an-summary">
        <span class="tag">${esc(d.case_type)}</span>
        <h3>Your case, as we understand it</h3>
        <p>${esc(d.case_summary)}</p>
      </div>

      <div class="balance">
        <div class="balance-labels"><span>Strong for you</span><span>Gray area</span><span>Weak for you</span></div>
        <div class="balance-track">${[0, 1, 2, 3, 4].map(i => `<span class="${i === bal.pos ? "on" : ""}"></span>`).join("")}</div>
        <p><b>${esc(bal.label)}.</b> ${esc(d.balance_reason)}</p>
      </div>

      <div class="sides">
        <section class="side good">
          <header><span class="side-icon">🟢</span><div><h3>Good Lawyer</h3><small>Arguing for you</small></div></header>
          <p class="opening">“${esc(d.good_lawyer?.opening)}”</p>
          ${args(d.good_lawyer?.arguments)}
          ${d.good_lawyer?.evidence_to_gather?.length ? `<h4>Evidence that would help you</h4>${list(d.good_lawyer.evidence_to_gather, "ticks")}` : ""}
        </section>
        <section class="side devil">
          <header><span class="side-icon">😈</span><div><h3>Devil's Lawyer</h3><small>Arguing for the other side</small></div></header>
          <p class="opening">“${esc(d.devil_lawyer?.opening)}”</p>
          ${args(d.devil_lawyer?.arguments)}
          ${d.devil_lawyer?.weak_spots?.length ? `<h4>Weak spots in your case</h4>${list(d.devil_lawyer.weak_spots, "crosses")}` : ""}
        </section>
      </div>

      ${d.gray_areas?.length ? `
      <div class="grays">
        <h3>⚖️ The gray areas</h3>
        <p class="muted">Questions a judge could reasonably decide either way.</p>
        ${d.gray_areas.map(g => `
          <div class="gray">
            <h4>${esc(g.issue)}</h4>
            <p>${esc(g.why_uncertain)}</p>
            <div class="tips">
              <div class="tip good"><b>Tips toward you if…</b>${esc(g.tips_in_your_favour_if)}</div>
              <div class="tip devil"><b>Tips against you if…</b>${esc(g.tips_against_you_if)}</div>
            </div>
          </div>`).join("")}
      </div>` : ""}

      <div class="an-bottom">
        ${d.questions_to_clarify?.length ? `<div><h4>A lawyer would ask you…</h4>${list(d.questions_to_clarify)}</div>` : ""}
        ${d.next_steps?.length ? `<div><h4>Suggested next steps</h4><ol>${d.next_steps.map(s => `<li>${esc(s)}</li>`).join("")}</ol></div>` : ""}
      </div>
      ${pathLink}
      <p class="disclaimer">This AI analysis is general legal information based only on what you wrote, not legal advice. It can be wrong or miss facts. Please confirm with an advocate, or get free help from NALSA (15100).</p>`;
  }
})();
