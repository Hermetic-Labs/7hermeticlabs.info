const menuButton = document.querySelector(".menu-button");
const navigation = document.querySelector("#site-nav");

menuButton?.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!open));
  navigation.classList.toggle("open", !open);
});

navigation?.addEventListener("click", (event) => {
  if (!event.target.closest("a")) return;
  menuButton?.setAttribute("aria-expanded", "false");
  navigation.classList.remove("open");
});

const layers = {
  language: {
    number: "01", kicker: "Language layer",
    title: "Say the same true thing, clearly, across every surface.",
    body: "Capture vocabulary, voice, proof, claims, and calls to action in one usable library—so good communication is repeatable, not trapped in one person’s head.",
    list: ["Voice and vocabulary", "Evidence and claim notes", "Reusable message patterns"]
  },
  presence: {
    number: "02", kicker: "Presence layer",
    title: "Give every channel a job instead of filling a feed.",
    body: "Define why each surface exists, what belongs there, and how it connects back to the business. Presence becomes intentional rather than noisy.",
    list: ["Channel roles", "Profile consistency", "Cadence and accessibility"]
  },
  campaigns: {
    number: "03", kicker: "Campaign layer",
    title: "Turn one useful idea into coordinated, reviewable work.",
    body: "Connect the objective, audience, assets, platform-native treatments, approvals, timing, and handoffs without pretending planning equals publishing.",
    list: ["Objectives and audiences", "Content and asset references", "Review and release states"]
  },
  network: {
    number: "04", kicker: "Network layer",
    title: "Keep the relationship context attached to the work.",
    body: "Make owners, contributors, partners, handoffs, and follow-ups visible—so a growing network produces continuity instead of lost threads.",
    list: ["Owners and responsibilities", "Partner context", "Tasks and handoffs"]
  },
  impact: {
    number: "05", kicker: "Impact layer",
    title: "Separate attention from outcomes—and record the evidence.",
    body: "Track what was released, what response followed, what changed in the real world, and what still needs verification before making the next claim.",
    list: ["Publication receipts", "Outcome notes", "Corrections and evidence"]
  }
};

const panel = document.querySelector("#coverage-panel");
document.querySelectorAll("[data-layer]").forEach((tab) => {
  tab.addEventListener("click", () => {
    const layer = layers[tab.dataset.layer];
    document.querySelectorAll("[data-layer]").forEach((item) => item.setAttribute("aria-selected", String(item === tab)));
    panel.classList.add("switching");
    window.setTimeout(() => {
      panel.querySelector(".panel-number").textContent = layer.number;
      panel.querySelector(".panel-kicker").textContent = layer.kicker;
      panel.querySelector("h3").textContent = layer.title;
      panel.querySelector("div > p:last-child").textContent = layer.body;
      panel.querySelector("ul").innerHTML = layer.list.map((item) => `<li>${item}</li>`).join("");
      panel.classList.remove("switching");
    }, 130);
  });
});

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("visible"));
}

