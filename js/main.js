/* =========================================================
   Online Journal — Main Interactions
   ========================================================= */
(function () {
  "use strict";

  /* -------------------------------------------------------
     1. Journaling Prompts
     ------------------------------------------------------- */
  const PROMPTS = [
    '"What is a small, quiet moment from yesterday that you never want to forget?"',
    '"If you were entirely gentle with yourself today, what expectation would you immediately drop?"',
    '"Describe the physical sensation of an emotion you felt strongly this week."',
    '"Who made you feel genuinely heard recently, and how did they do it?"',
    '"What is something you loved doing as a child that has no place in your current routine?"',
    '"Where in your body do you carry your worries, and what would it say if it could speak?"',
    '"What did today teach you that yesterday could not?"',
    '"Write about a stranger whose face you still remember."'
  ];

  function initPrompts() {
    const promptEl = document.getElementById("prompt-text");
    const nextBtn = document.getElementById("btn-next-prompt");
    if (!promptEl || !nextBtn) return;

    let i = 0;
    nextBtn.addEventListener("click", () => {
      i = (i + 1) % PROMPTS.length;
      promptEl.style.opacity = "0";
      promptEl.style.transform = "translateY(6px)";
      promptEl.style.transition = "opacity .25s, transform .25s";
      setTimeout(() => {
        promptEl.textContent = PROMPTS[i];
        promptEl.style.opacity = "1";
        promptEl.style.transform = "none";
      }, 220);
    });
  }

  /* -------------------------------------------------------
     2. Mood Selector
     ------------------------------------------------------- */
  function initMood() {
    const buttons = document.querySelectorAll(".mood-btn");
    if (!buttons.length) return;

    buttons.forEach(btn => {
      btn.addEventListener("click", () => {
        buttons.forEach(b => {
          b.classList.remove("is-active");
          b.setAttribute("aria-checked", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-checked", "true");
      });
    });
  }

  /* -------------------------------------------------------
     3. Word Counter
     ------------------------------------------------------- */
  function initWordCounter() {
    const textarea = document.getElementById("quick-entry-input");
    const counter = document.getElementById("char-counter");
    if (!textarea || !counter) return;

    const update = () => {
      const words = textarea.value.trim().split(/\s+/).filter(Boolean).length;
      counter.textContent = words + (words === 1 ? " word written" : " words written");
    };
    textarea.addEventListener("input", update);
    update();
  }

  /* -------------------------------------------------------
     4. Calendar Grid (September/October 2026 mock)
     ------------------------------------------------------- */
  function initCalendar() {
    const grid = document.getElementById("cal-days");
    if (!grid) return;

    const year = 2026;
    const month = 8; // September (0-indexed)
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = 28;

    const dotColors = {
      1: "var(--sage)",
      2: "var(--terra)",
      3: "var(--sage)",
      4: "var(--sage)",
      7: "var(--sage)",
      8: "var(--amber)",
      9: "var(--sage)",
      10: "var(--sage)",
      11: "var(--terra)",
      14: "var(--sage)",
      15: "var(--sage)",
      16: "var(--sage)",
      17: "var(--amber)",
      18: "var(--sage)",
      19: "var(--indigo)",
      20: "var(--amber)",
      21: "var(--sage)",
      22: "var(--sage)",
      23: "var(--sage)"
    };

    let html = "";
    // Leading muted days from previous month
    for (let i = 0; i < firstDay; i++) {
      html += `<div class="cal-day cal-day--muted" aria-hidden="true"></div>`;
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const isToday = d === today;
      const dot = dotColors[d]
        ? `<span class="cal-day__marker" style="background:${dot}"></span>`
        : "";
      const classes = ["cal-day"];
      if (isToday) classes.push("cal-day--today");
      html += `
        <div class="${classes.join(" ")}" role="button" tabindex="0"
             aria-label="September ${d}, 2026${isToday ? " (today)" : ""}">
          <span>${d}</span>
          ${dot}
        </div>`;
    }
    grid.innerHTML = html;
  }

  /* -------------------------------------------------------
     5. Tools Grid
     ------------------------------------------------------- */
  const TOOLS = [
    { name: "Gratitude Jar",       cat: "reflect", icon: "local_cafe",           color: "icon-amber",   desc: "Drop positive memories, kind words, and mini triumphs into an illustrated vintage mason jar." },
    { name: "Mood Board",          cat: "reflect", icon: "dashboard_customize",  color: "icon-rose",    desc: "Pin magazine clippings, color swatches, textures, and quotes to a corkboard canvas." },
    { name: "Vision Board",        cat: "reflect", icon: "flag",                 color: "icon-emerald", desc: "Curate annual aspirations, thematic words, and milestones with interactive goal checkpoints." },
    { name: "Habit Tracker",       cat: "track",   icon: "check_box",            color: "icon-blue",    desc: "Bullet journal style 30-day dot grids with micro-stickers and habit correlation graphs." },
    { name: "Goal Planner",        cat: "track",   icon: "event_note",           color: "icon-stone",   desc: "Quarterly milestone breakdowns with mid-term reviews and tactile progress bars." },
    { name: "Brain Dump",          cat: "write",   icon: "electric_bolt",        color: "icon-orange",  desc: "Unfiltered rapid-capture sheet that auto-sorts fleeting thoughts into to-dos and journals." },
    { name: "Meditation Timer",    cat: "reflect", icon: "self_improvement",     color: "icon-purple",  desc: "Gentle Tibetan singing bowl chimes, interval bells, and rhythmic breathing guide." },
    { name: "Focus Timer",         cat: "track",   icon: "hourglass_top",        color: "icon-red",     desc: "Analog Pomodoro mechanical dial with ambient background sounds (rain, cafe, fireplace)." },
    { name: "Reading Log",         cat: "track",   icon: "menu_book",            color: "icon-yellow",  desc: "Bookshelf tracker with book jacket thumbnails, passage clipping, and star reviews." },
    { name: "Quote Collector",     cat: "reflect", icon: "format_quote",         color: "icon-cyan",    desc: "Hand-lettered card archive of literary passages tagged by author and emotional mood." },
    { name: "Dream Journal",       cat: "write",   icon: "nights_stay",          color: "icon-indigo",  desc: "Lucid dream logger with sleep cycle tags, symbol tracker, and night-sky mood index." },
    { name: "Prompt Generator",    cat: "write",   icon: "casino",               color: "icon-pink",    desc: "1,500+ curated literary, philosophical, and introspective prompts for writer's block." },
    { name: "Cadence & Tone",      cat: "write",   icon: "spellcheck",           color: "icon-slate",   desc: "Real-time syllable pacing, readability grade, sentiment balance, and writing velocity." },
    { name: "Affirmation Cards",   cat: "reflect", icon: "style",                color: "icon-rose",    desc: "Flip daily hand-stamped letterpress affirmation cards to reset mindset and perspective." },
    { name: "Memory Lane",         cat: "track",   icon: "history",              color: "icon-teal",    desc: "\u201COn this day 1, 2, or 5 years ago\u201D time capsule flashbacks to see personal growth over time." },
    { name: "Travel Log",          cat: "track",   icon: "pin_drop",             color: "icon-lime",    desc: "Route maps with custom passport stamps, geo-tagged entries, and souvenir ticket stubs." }
  ];

  function renderTools(filter = "all") {
    const grid = document.getElementById("tools-grid");
    if (!grid) return;

    const filtered = filter === "all"
      ? TOOLS
      : TOOLS.filter(t => t.cat === filter);

    grid.innerHTML = filtered.map((tool, idx) => `
      <article class="tool" data-cat="${tool.cat}" data-name="${tool.name.toLowerCase()}">
        <div>
          <div class="tool__icon ${tool.color}">
            <span class="material-symbols-outlined" aria-hidden="true">${tool.icon}</span>
          </div>
          <h3>${idx + 1}. ${tool.name}</h3>
          <p>${tool.desc}</p>
        </div>
        <a href="#tool-${tool.name.toLowerCase().replace(/\s+/g, "-")}" class="tool__link">
          Open Tool <span class="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
        </a>
      </article>
    `).join("");
  }

  function initTools() {
    const grid = document.getElementById("tools-grid");
    if (!grid) return;

    renderTools("all");

    const tabs = document.querySelectorAll(".ttab");
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => {
          t.classList.remove("is-active");
          t.setAttribute("aria-selected", "false");
        });
        tab.classList.add("is-active");
        tab.setAttribute("aria-selected", "true");
        renderTools(tab.dataset.filter);
      });
    });

    // Search filter
    const searchInput = document.getElementById("tool-search");
    if (searchInput) {
      searchInput.addEventListener("input", () => {
        const q = searchInput.value.trim().toLowerCase();
        grid.querySelectorAll(".tool").forEach(card => {
          const name = card.dataset.name || "";
          card.style.display = name.includes(q) ? "" : "none";
        });
      });
    }
  }

  /* -------------------------------------------------------
     6. Newsletter form
     ------------------------------------------------------- */
  function initNewsletter() {
    const form = document.getElementById("newsletter-form");
    const msg = document.getElementById("newsletter-msg");
    if (!form || !msg) return;

    form.addEventListener("submit", e => {
      e.preventDefault();
      const email = form.querySelector("input[type=email]").value.trim();
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!ok) {
        msg.textContent = "Please enter a valid email address.";
        msg.style.color = "#ba1a1a";
        return;
      }
      msg.textContent = "Welcome to The Sunday Ink Letter. Check your inbox for a gentle hello.";
      msg.style.color = "";
      form.reset();
    });
  }

  /* -------------------------------------------------------
     7. Scroll reveal
     ------------------------------------------------------- */
  function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length || !("IntersectionObserver" in window)) {
      items.forEach(i => i.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    items.forEach(el => io.observe(el));
  }

  /* -------------------------------------------------------
     8. Boot
     ------------------------------------------------------- */
  function boot() {
    initPrompts();
    initMood();
    initWordCounter();
    initCalendar();
    initTools();
    initNewsletter();
    initReveal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
