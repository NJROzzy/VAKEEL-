// Case paths: plain-language guidance for common legal situations in India.
// General information only, not legal advice.
const PATHS = [
  {
    id: "fir",
    icon: "🚔",
    cat: "Criminal",
    title: "Police won't register my complaint (FIR)",
    summary: "A crime happened and the police are refusing or delaying an FIR.",
    type: "Criminal",
    meaning: "For a cognisable offence (theft, assault, cheating and similar), police must register an FIR. You can file a Zero FIR at any police station, even outside its area, and many states allow e-FIRs online.",
    where: "Police station → Superintendent of Police → Judicial Magistrate",
    steps: [
      "Give a written complaint at the police station and keep a stamped copy or receipt.",
      "If they refuse, send the complaint in writing (registered post or email) to the Superintendent of Police (Sec. 173(4) BNSS).",
      "If still no action, apply to the Judicial Magistrate, who can direct the police to investigate (Sec. 175(3) BNSS).",
      "Once registered, you are entitled to a free copy of the FIR."
    ],
    docs: ["Written complaint with date, time, place and what happened", "ID proof", "Any evidence: photos, messages, medical report, witness names"],
    deadlines: ["Report as early as possible. Delay can weaken the case."],
    help: [["Emergency", "112"], ["Free legal aid (NALSA)", "15100"]]
  },
  {
    id: "arrest",
    icon: "⛓️",
    cat: "Criminal",
    title: "I or a family member has been arrested",
    summary: "Someone was detained or arrested, or fears arrest.",
    type: "Criminal",
    meaning: "An arrested person has constitutional rights. If the offence is bailable, bail is a right. For non-bailable offences, the court decides. If you only fear arrest, you can apply for anticipatory bail.",
    where: "Magistrate's Court · Sessions Court · High Court",
    steps: [
      "The person must be told the grounds of arrest, and a relative or friend must be informed (Secs. 47–48 BNSS).",
      "They have the right to meet a lawyer and must be produced before a magistrate within 24 hours (Art. 22).",
      "Engage a vakeel, or ask for a free legal aid lawyer at the court or police station.",
      "Apply for bail before the Magistrate; if refused, approach the Sessions Court and then the High Court.",
      "If arrest is only feared, apply for anticipatory bail in the Sessions Court or High Court (Sec. 482 BNSS)."
    ],
    docs: ["Copy of FIR (or FIR number and police station)", "Arrest memo", "ID and address proof of the accused", "Surety's ID and property/income proof (for bail)"],
    deadlines: ["Production before a magistrate within 24 hours of arrest."],
    help: [["Free legal aid (NALSA)", "15100"], ["Emergency", "112"]]
  },
  {
    id: "summons",
    icon: "📩",
    cat: "Criminal",
    title: "I received a legal notice or court summons",
    summary: "A letter from a lawyer, or a summons or warrant from a court.",
    type: "Civil or Criminal",
    meaning: "A legal notice is a formal warning before a case is filed. A summons means a case is already filed and you must appear. Ignoring either can lead to a decision against you without your side being heard (ex parte), or to a warrant.",
    where: "The court named on the summons",
    steps: [
      "Do not ignore it. Note the court, case number and the hearing date.",
      "Look the case up on eCourts using the CNR number or case number.",
      "Show it to a vakeel. A legal notice is usually answered with a reply notice through a lawyer.",
      "Appear on the date, in person or through your advocate (who will file a vakalatnama).",
      "Explore settlement, mediation or Lok Adalat if the dispute can be resolved."
    ],
    docs: ["The notice or summons itself", "All documents and messages related to the dispute"],
    deadlines: ["The hearing date on the summons.", "Replies to legal notices often state a 15–30 day period."],
    help: [["Track case", "ecourts.gov.in"], ["Free legal aid (NALSA)", "15100"]]
  },
  {
    id: "cyber",
    icon: "💻",
    cat: "Criminal",
    title: "Online fraud or cybercrime",
    summary: "UPI or bank fraud, hacked accounts, online harassment, fake calls.",
    type: "Criminal",
    meaning: "Speed matters. Reporting financial fraud within the first hours gives the best chance of freezing the money before it moves.",
    where: "National Cybercrime Portal · Cyber police station",
    steps: [
      "Call 1930 immediately for financial fraud.",
      "Call your bank to block cards, UPI or net banking.",
      "File a complaint on cybercrime.gov.in and note the acknowledgement number.",
      "Save screenshots, transaction IDs, phone numbers, URLs and chats. Do not delete anything.",
      "Follow up with the cyber cell or the local police station."
    ],
    docs: ["Bank statement showing the transaction", "Screenshots of messages, profiles and URLs", "ID proof"],
    deadlines: ["Report within hours, not days, for the best chance of recovery."],
    help: [["Cyber fraud helpline", "1930"], ["Report online", "cybercrime.gov.in"]]
  },
  {
    id: "dv",
    icon: "🛡️",
    cat: "Family",
    title: "Domestic violence or dowry harassment",
    summary: "Physical, emotional, sexual or financial abuse at home.",
    type: "Civil and Criminal",
    meaning: "The Protection of Women from Domestic Violence Act, 2005 gives quick civil remedies: protection orders, the right to stay in the shared home, money for expenses and custody. Cruelty by a husband or relatives is also a crime (Sec. 85 BNS, formerly 498A IPC).",
    where: "Protection Officer · Magistrate's Court · Police",
    steps: [
      "If in danger, call 112 or the women's helpline 181.",
      "Contact the Protection Officer of your district or a registered service provider, or apply directly to the Magistrate.",
      "Ask for protection, residence and monetary orders. Interim orders can be passed quickly.",
      "For criminal action, file a police complaint or FIR.",
      "One Stop Centres (Sakhi) offer shelter, medical, police and legal help in one place."
    ],
    docs: ["Medical records of injuries", "Photos, messages, recordings", "Marriage proof, dowry/streedhan list", "Names of witnesses"],
    deadlines: ["No strict deadline for DV Act relief. Act early for safety."],
    help: [["Women helpline", "181"], ["Emergency", "112"], ["Free legal aid (NALSA)", "15100"]]
  },
  {
    id: "divorce",
    icon: "💍",
    cat: "Family",
    title: "Divorce, maintenance or child custody",
    summary: "Ending a marriage, claiming support, or deciding who the children live with.",
    type: "Civil (family)",
    meaning: "The law that applies depends on religion and how the marriage was registered (Hindu Marriage Act, Special Marriage Act, personal laws). Maintenance can be claimed by a wife, children or parents regardless of religion (Sec. 144 BNSS).",
    where: "Family Court (or District Court where none exists)",
    steps: [
      "Mutual consent: both spouses jointly petition after living separately for at least one year. There is a six-month waiting period, which the court may waive.",
      "Contested divorce: file on grounds such as cruelty, desertion or adultery. Courts usually send the parties to mediation first.",
      "Maintenance: apply in the Family Court. Interim maintenance can be granted while the case continues.",
      "Custody: decided on the child's welfare. Visitation for the other parent is common."
    ],
    docs: ["Marriage certificate or wedding proof", "Income and expense proofs", "Children's birth certificates and school records", "Address proof"],
    deadlines: ["Mutual consent: minimum one year of separation before filing."],
    help: [["Free legal aid (NALSA)", "15100"]]
  },
  {
    id: "property",
    icon: "🏠",
    cat: "Property",
    title: "Land or property dispute",
    summary: "Encroachment, family partition, illegal possession, ownership fights.",
    type: "Civil",
    meaning: "Most property disputes are civil suits: for a declaration of ownership, possession, partition, or an injunction to stop someone. Updating land records (mutation) goes to revenue authorities, not civil courts.",
    where: "Civil Judge court (by value) · Revenue office / Tehsildar for mutation",
    steps: [
      "Collect title documents and check land records online on your state's Bhulekh portal.",
      "Send a legal notice through a vakeel. Many disputes settle at this stage.",
      "If someone is about to take or build on the property, file a suit with an urgent application for a temporary injunction.",
      "File the civil suit for declaration, possession or partition.",
      "Consider mediation or Lok Adalat, especially in family partitions."
    ],
    docs: ["Sale deed, gift deed, will or partition deed", "Land records (khatauni, 7/12, jamabandi etc.)", "Property tax and electricity receipts", "Site map or survey records"],
    deadlines: ["Suit for possession based on ownership: generally 12 years from when the other person's possession became adverse (Limitation Act)."],
    help: [["Free legal aid (NALSA)", "15100"], ["Central Acts", "indiacode.nic.in"]]
  },
  {
    id: "consumer",
    icon: "🛒",
    cat: "Money",
    title: "Defective product or poor service",
    summary: "Faulty goods, refunds denied, builder delays, insurance claims rejected.",
    type: "Consumer (civil)",
    meaning: "The Consumer Protection Act, 2019 lets you file a complaint yourself, without a lawyer. Which commission hears it depends on how much you paid.",
    where: "District Commission (up to ₹50 lakh) · State (₹50 lakh–₹2 crore) · National (above ₹2 crore)",
    steps: [
      "Complain to the company in writing and keep the reply.",
      "Call the National Consumer Helpline 1915 for pre-litigation mediation.",
      "If unresolved, file online on e-Daakhil with a short statement of facts and the relief you want.",
      "Attend hearings (online hearings are often available)."
    ],
    docs: ["Bill or invoice", "Warranty or contract", "Emails and complaints to the company", "Photos of the defect"],
    deadlines: ["File within 2 years of the problem arising."],
    help: [["National Consumer Helpline", "1915"], ["File online", "edaakhil.nic.in"]]
  },
  {
    id: "cheque",
    icon: "🧾",
    cat: "Money",
    title: "Cheque bounced or money not repaid",
    summary: "Someone owes you money, or their cheque was dishonoured.",
    type: "Criminal (cheque) · Civil (recovery)",
    meaning: "A bounced cheque given for a debt is an offence under Sec. 138 of the Negotiable Instruments Act, but the deadlines are strict. For loans without a cheque, you file a civil recovery suit.",
    where: "Judicial Magistrate's Court (cheque) · Civil Court (recovery suit)",
    steps: [
      "Collect the bank's cheque return memo.",
      "Send a legal demand notice within 30 days of receiving the memo.",
      "The drawer has 15 days from receiving the notice to pay.",
      "If unpaid, file the complaint within one month after those 15 days end.",
      "The court can order interim compensation of up to 20% of the cheque amount."
    ],
    docs: ["Original cheque and return memo", "Copy of legal notice and postal proof", "Loan agreement or proof of debt"],
    deadlines: ["Notice: 30 days from the return memo.", "Complaint: within 1 month after the 15-day payment period ends."],
    help: [["Free legal aid (NALSA)", "15100"]]
  },
  {
    id: "accident",
    icon: "🚑",
    cat: "Money",
    title: "Road accident compensation",
    summary: "Injury or death in a vehicle accident.",
    type: "Civil (claim) · Criminal (rash driving)",
    meaning: "Victims or their families can claim compensation from the vehicle owner and insurer before the Motor Accident Claims Tribunal (MACT). Separate compensation schemes cover hit-and-run cases.",
    where: "Motor Accident Claims Tribunal (MACT)",
    steps: [
      "Get medical help first. Hospitals must treat accident victims.",
      "Make sure an FIR is registered, and note the vehicle number.",
      "File a claim before the MACT where the accident happened, where you live, or where the defendant lives.",
      "For hit-and-run, apply under the Hit and Run Motor Accidents compensation scheme through the district authorities."
    ],
    docs: ["FIR copy", "Medical records and bills", "Income proof of the victim", "Death certificate and post-mortem report (in fatal cases)"],
    deadlines: ["File the claim within 6 months of the accident."],
    help: [["Emergency", "112"], ["Free legal aid (NALSA)", "15100"]]
  },
  {
    id: "work",
    icon: "💼",
    cat: "Work",
    title: "Workplace problem: unpaid salary or harassment",
    summary: "Wages withheld, wrongful termination, or sexual harassment at work.",
    type: "Labour / civil",
    meaning: "Wage and dismissal disputes go to the Labour Department. Sexual harassment at work is covered by the POSH Act, 2013: workplaces with 10 or more employees must have an Internal Committee.",
    where: "Labour Commissioner · Internal Committee · Local Committee (district)",
    steps: [
      "Write to your employer or HR and keep copies.",
      "For unpaid wages or termination, complain to the Labour Commissioner / Labour Department of your district.",
      "For sexual harassment, complain in writing to the Internal Committee. If there is none, or the complaint is against the employer, go to the district Local Committee.",
      "You can also use the government SHe-Box portal for harassment complaints."
    ],
    docs: ["Appointment letter, payslips, bank statements", "Emails and messages", "Names of witnesses"],
    deadlines: ["POSH complaint: within 3 months of the incident (extendable by another 3 months)."],
    help: [["SHe-Box", "shebox.wcd.gov.in"], ["Free legal aid (NALSA)", "15100"]]
  },
  {
    id: "govt",
    icon: "🏛️",
    cat: "Government",
    title: "Problem with a government office",
    summary: "Information denied, file stuck, or rights violated by an authority.",
    type: "Administrative / constitutional",
    meaning: "The Right to Information Act, 2005 lets any citizen ask a public authority for information. If an authority violates your rights and there is no other remedy, you can file a writ petition in the High Court (Art. 226).",
    where: "Public Information Officer → Appellate Authority → Information Commission · High Court",
    steps: [
      "File an RTI application with the ₹10 fee (central government: rtionline.gov.in).",
      "If there is no reply in 30 days, or the reply is unsatisfactory, file a first appeal.",
      "Then file a second appeal with the Central or State Information Commission.",
      "Use the CPGRAMS grievance portal (pgportal.gov.in) for central government complaints.",
      "For serious rights violations, consult a vakeel about a writ petition."
    ],
    docs: ["Copies of your applications and replies", "Postal or online acknowledgements"],
    deadlines: ["RTI reply: 30 days (48 hours if life or liberty is involved).", "First appeal: within 30 days. Second appeal: within 90 days."],
    help: [["RTI online", "rtionline.gov.in"], ["Grievances", "pgportal.gov.in"]]
  }
];

const CATS = ["All", "Criminal", "Family", "Property", "Money", "Work", "Government"];

const grid = document.getElementById("path-grid");
const detail = document.getElementById("path-detail");
const chips = document.getElementById("cat-chips");
const search = document.getElementById("path-search");
let activeCat = "All";

function linkFor(value) {
  if (/^\d+$/.test(value)) return `<a href="tel:${value}">${value}</a>`;
  return `<a href="https://${value}" target="_blank" rel="noopener">${value} ↗</a>`;
}

function renderChips() {
  chips.innerHTML = CATS.map(c =>
    `<button class="chip${c === activeCat ? " on" : ""}" data-cat="${c}" aria-pressed="${c === activeCat}">${c}</button>`
  ).join("");
}

function renderGrid() {
  const q = search.value.trim().toLowerCase();
  const list = PATHS.filter(p =>
    (activeCat === "All" || p.cat === activeCat) &&
    (!q || (p.title + " " + p.summary + " " + p.meaning).toLowerCase().includes(q))
  );
  grid.innerHTML = list.length
    ? list.map(p => `
      <button class="path-card" data-id="${p.id}">
        <span class="path-icon" aria-hidden="true">${p.icon}</span>
        <span class="path-title">${p.title}</span>
        <span class="path-sum">${p.summary}</span>
      </button>`).join("")
    : `<p class="empty">No match. Try another word, or call the free legal aid helpline <a href="tel:15100">15100</a>.</p>`;
}

function showPath(id, scroll = true) {
  const p = PATHS.find(x => x.id === id);
  if (!p) { detail.hidden = true; return; }
  detail.hidden = false;
  detail.innerHTML = `
    <div class="detail-head">
      <span class="path-icon big" aria-hidden="true">${p.icon}</span>
      <div>
        <span class="tag">${p.type}</span>
        <h3>${p.title}</h3>
      </div>
      <button class="close" aria-label="Close">×</button>
    </div>
    <p class="meaning">${p.meaning}</p>
    <div class="where"><b>Where to go</b><span>${p.where}</span></div>
    <div class="detail-grid">
      <div class="detail-steps">
        <h4>Your path, step by step</h4>
        <ol>${p.steps.map(s => `<li>${s}</li>`).join("")}</ol>
      </div>
      <div class="detail-side">
        <h4>Keep ready</h4>
        <ul class="ticks">${p.docs.map(d => `<li>${d}</li>`).join("")}</ul>
        <h4>Time limits</h4>
        <ul class="warn">${p.deadlines.map(d => `<li>${d}</li>`).join("")}</ul>
        <h4>Helplines &amp; portals</h4>
        <ul class="helps">${p.help.map(([k, v]) => `<li><span>${k}</span>${linkFor(v)}</li>`).join("")}</ul>
      </div>
    </div>
    <p class="disclaimer">General information, not legal advice. Laws and limits can change and differ by state. Confirm with a vakeel or your District Legal Services Authority.</p>`;
  history.replaceState(null, "", "#" + p.id);
  if (scroll) detail.scrollIntoView({ behavior: "smooth", block: "start" });
}

chips.addEventListener("click", e => {
  const b = e.target.closest(".chip");
  if (!b) return;
  activeCat = b.dataset.cat;
  renderChips();
  renderGrid();
});
search.addEventListener("input", () => {
  if (activeCat !== "All") { activeCat = "All"; renderChips(); }
  renderGrid();
});
grid.addEventListener("click", e => {
  const b = e.target.closest(".path-card");
  if (b) showPath(b.dataset.id);
});
detail.addEventListener("click", e => {
  if (e.target.closest(".close")) {
    detail.hidden = true;
    history.replaceState(null, "", location.pathname + "#paths");
  }
});

renderChips();
renderGrid();
const initial = location.hash.slice(1);
if (PATHS.some(p => p.id === initial)) showPath(initial);
