/* ==========================================================================
   Anaya Bika Point — interaction layer
   Vanilla JS, zero dependencies, zero scroll listeners, zero RAF loops.

   All motion is CSS-driven (transitions + keyframes). JavaScript only:
     1. Live open / closed status (IST)
     2. Hero gallery carousel (CSS crossfade)
     3. Mobile menu
     4. Scroll reveal (IntersectionObserver)
     5. Active navigation (IntersectionObserver)
     6. Header elevation state (IntersectionObserver sentinel)
     7. Image fallbacks (drop-in friendly)
     8. Footer year

   Every module is defensive: missing DOM nodes are a no-op, never an error.
   ========================================================================== */
(function () {
  "use strict";

  /* ------------------------------------------------------------------------
     Config
     ---------------------------------------------------------------------- */
  var STORE_TZ = "Asia/Calcutta";
  var OPEN_MINUTES = 10 * 60; // 10:00 AM
  var CLOSE_MINUTES = 21 * 60; // 9:00 PM
  var CLOSED_WEEKDAY = "Fri";
  var HOURS_LABEL = "10:00 AM - 9:00 PM";
  var CAROUSEL_DELAY = 5200;
  var NAV_BREAKPOINT = 1120; // must match the CSS breakpoint that hides .nav

  var reduceMotion = false;
  try {
    reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (err) {
    reduceMotion = false;
  }

  /* ------------------------------------------------------------------------
     Helpers
     ---------------------------------------------------------------------- */
  function logError(scope, err) {
    // Descriptive, non-fatal logging to simplify debugging.
    if (window.console && typeof window.console.warn === "function") {
      window.console.warn("[Anaya Bika Point] " + scope + " failed:", err);
    }
  }

  function toArray(nodeList) {
    return Array.prototype.slice.call(nodeList || []);
  }

  function supportsObserver() {
    return "IntersectionObserver" in window;
  }

  /* ------------------------------------------------------------------------
     1. Live open / closed status (IST)
     ---------------------------------------------------------------------- */
  function getStoreTime() {
    var now = new Date();
    try {
      var formatter = new Intl.DateTimeFormat("en-GB", {
        timeZone: STORE_TZ,
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });
      var parts = formatter.formatToParts(now);
      var map = {};
      for (var i = 0; i < parts.length; i += 1) {
        map[parts[i].type] = parts[i].value;
      }
      var hour = parseInt(map.hour, 10);
      var minute = parseInt(map.minute, 10);
      if (isNaN(hour) || isNaN(minute)) {
        throw new Error("Unparsable store time");
      }
      return { weekday: map.weekday, minutes: hour * 60 + minute };
    } catch (err) {
      logError("status/timezone lookup", err);
      // Fallback: use the visitor's local clock rather than showing nothing.
      return { weekday: "", minutes: now.getHours() * 60 + now.getMinutes() };
    }
  }

  function resolveStatus() {
    var storeTime = getStoreTime();

    if (storeTime.weekday === CLOSED_WEEKDAY) {
      return {
        state: "closed",
        badge: "Closed on Fridays",
        short: "Closed on Fridays",
        detail: "Friday is our weekly off \u00b7 Back open Saturday at 10:00 AM"
      };
    }

    if (storeTime.minutes >= OPEN_MINUTES && storeTime.minutes < CLOSE_MINUTES) {
      return {
        state: "open",
        badge: "Open Today \u00b7 10 AM - 9 PM",
        short: "Open Today \u00b7 10 AM - 9 PM",
        detail: "Open now \u00b7 " + HOURS_LABEL + " (IST)"
      };
    }

    if (storeTime.minutes < OPEN_MINUTES) {
      return {
        state: "closed",
        badge: "Closed now \u00b7 Opens 10:00 AM",
        short: "Opens today at 10 AM",
        detail: "Opens today at 10:00 AM \u00b7 " + HOURS_LABEL + " (IST)"
      };
    }

    var nextIsFriday = storeTime.weekday === "Thu";
    return {
      state: "closed",
      badge: "Closed now \u00b7 Opens tomorrow",
      short: "Closed now",
      detail: nextIsFriday
        ? "Closed for today \u00b7 Reopens Sunday at 10:00 AM (Friday weekly off)"
        : "Closed for today \u00b7 Reopens tomorrow at 10:00 AM"
    };
  }

  function initStatus() {
    var badges = toArray(document.querySelectorAll("[data-status-badge]"));
    var targets = {
      statusText: document.getElementById("statusText"),
      mobileStatusText: document.getElementById("mobileStatusText"),
      heroStatusText: document.getElementById("heroStatusText"),
      hoursStatusText: document.getElementById("hoursStatusText"),
      hoursDetail: document.getElementById("hoursDetail")
    };

    var hasTargets =
      badges.length > 0 ||
      targets.statusText ||
      targets.mobileStatusText ||
      targets.heroStatusText ||
      targets.hoursStatusText ||
      targets.hoursDetail;

    if (!hasTargets) return;

    function render() {
      var status;
      try {
        status = resolveStatus();
      } catch (err) {
        logError("status render", err);
        return;
      }

      var isOpen = status.state === "open";

      for (var b = 0; b < badges.length; b += 1) {
        var badge = badges[b];
        badge.classList.toggle("is-open", isOpen);
        badge.classList.toggle("is-closed", !isOpen);
        badge.setAttribute("data-state", status.state);
      }

      if (targets.statusText) targets.statusText.textContent = status.badge;
      if (targets.mobileStatusText) targets.mobileStatusText.textContent = status.badge;
      if (targets.hoursStatusText) targets.hoursStatusText.textContent = status.badge;
      if (targets.heroStatusText) targets.heroStatusText.textContent = status.short;
      if (targets.hoursDetail) targets.hoursDetail.textContent = status.detail;
    }

    render();
    // Keep the pill honest while the tab stays open.
    window.setInterval(function () {
      if (!document.hidden) render();
    }, 60000);
  }

  /* ------------------------------------------------------------------------
     2. Hero gallery carousel (CSS handles the crossfade)
     ---------------------------------------------------------------------- */
  function initCarousel() {
    var root = document.querySelector("[data-carousel]");
    if (!root) return;

    var stage = root.querySelector("[data-stage]");
    var slides = toArray(root.querySelectorAll("[data-slide]"));
    var dotsWrap = root.querySelector("[data-dots]");
    var prevBtn = root.querySelector("[data-prev]");
    var nextBtn = root.querySelector("[data-next]");
    var toggleBtn = root.querySelector("[data-autoplay-toggle]");
    var counter = root.querySelector("[data-current]");

    if (!stage || slides.length === 0) return;

    var index = 0;
    for (var s = 0; s < slides.length; s += 1) {
      if (slides[s].classList.contains("is-active")) {
        index = s;
        break;
      }
    }

    var timer = null;
    var hovered = false;
    var userPaused = false;
    var visible = true;
    var dots = [];

    function pad(value) {
      return value < 10 ? "0" + value : String(value);
    }

    function buildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = "";
      dots = [];
      for (var i = 0; i < slides.length; i += 1) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "carousel-dot";
        dot.setAttribute("aria-label", "Go to slide " + (i + 1) + " of " + slides.length);
        (function (target) {
          dot.addEventListener("click", function () {
            goTo(target, true);
          });
        })(i);
        dotsWrap.appendChild(dot);
        dots.push(dot);
      }
    }

    function syncUi() {
      for (var i = 0; i < slides.length; i += 1) {
        var isActive = i === index;
        slides[i].classList.toggle("is-active", isActive);
        slides[i].setAttribute("aria-hidden", isActive ? "false" : "true");
      }
      for (var d = 0; d < dots.length; d += 1) {
        var activeDot = d === index;
        dots[d].classList.toggle("is-active", activeDot);
        dots[d].setAttribute("aria-current", activeDot ? "true" : "false");
      }
      if (counter) counter.textContent = pad(index + 1);
    }

    function goTo(nextIndex, fromUser) {
      index = ((nextIndex % slides.length) + slides.length) % slides.length;
      syncUi();
      if (fromUser) startTimer();
    }

    function stopTimer() {
      if (timer !== null) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    function startTimer() {
      stopTimer();
      if (userPaused || reduceMotion || !visible || hovered || document.hidden) return;
      timer = window.setInterval(function () {
        goTo(index + 1, false);
      }, CAROUSEL_DELAY);
    }

    function setToggleUi() {
      if (!toggleBtn) return;
      var paused = userPaused;
      toggleBtn.setAttribute("aria-pressed", paused ? "true" : "false");
      toggleBtn.setAttribute("aria-label", paused ? "Play slideshow" : "Pause slideshow");
    }

    buildDots();
    syncUi();
    setToggleUi();

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        goTo(index - 1, true);
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        goTo(index + 1, true);
      });
    }
    if (toggleBtn) {
      toggleBtn.addEventListener("click", function () {
        userPaused = !userPaused;
        setToggleUi();
        if (userPaused) {
          stopTimer();
        } else {
          startTimer();
        }
      });
    }

    // Pause while the pointer is over the gallery; resume politely after.
    root.addEventListener("mouseenter", function () {
      hovered = true;
      stopTimer();
    });
    root.addEventListener("mouseleave", function () {
      hovered = false;
      startTimer();
    });
    root.addEventListener("focusin", stopTimer);
    root.addEventListener("focusout", function (event) {
      if (!root.contains(event.relatedTarget)) startTimer();
    });

    // Keyboard support when focus is inside the carousel.
    root.addEventListener("keydown", function (event) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(index - 1, true);
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(index + 1, true);
      }
    });

    // Swipe support (touch only, passive).
    var startX = null;
    var startY = null;

    stage.addEventListener(
      "touchstart",
      function (event) {
        if (!event.touches || event.touches.length !== 1) return;
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
      },
      { passive: true }
    );

    stage.addEventListener(
      "touchend",
      function (event) {
        if (startX === null || !event.changedTouches || !event.changedTouches.length) return;
        var dx = event.changedTouches[0].clientX - startX;
        var dy = event.changedTouches[0].clientY - startY;
        startX = null;
        startY = null;
        if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;
        goTo(dx < 0 ? index + 1 : index - 1, true);
      },
      { passive: true }
    );

    // Only run the timer while the gallery is on screen.
    if (supportsObserver()) {
      try {
        var observer = new IntersectionObserver(
          function (entries) {
            for (var i = 0; i < entries.length; i += 1) {
              visible = entries[i].isIntersecting;
            }
            if (visible) {
              startTimer();
            } else {
              stopTimer();
            }
          },
          { threshold: 0.15 }
        );
        observer.observe(root);
      } catch (err) {
        logError("carousel observer", err);
      }
    }

    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        stopTimer();
      } else {
        startTimer();
      }
    });

    startTimer();
  }

  /* ------------------------------------------------------------------------
     3. Mobile menu
     ---------------------------------------------------------------------- */
  function initMobileMenu() {
    var toggle = document.querySelector("[data-menu-toggle]");
    var panel = document.querySelector("[data-mobile-menu]");
    if (!toggle || !panel) return;

    function isOpen() {
      return toggle.getAttribute("aria-expanded") === "true";
    }

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      panel.classList.toggle("is-open", open);
      panel.setAttribute("aria-hidden", open ? "false" : "true");
      document.body.classList.toggle("is-locked", open);
    }

    setOpen(false);

    toggle.addEventListener("click", function () {
      setOpen(!isOpen());
    });

    panel.addEventListener("click", function (event) {
      var target = event.target;
      if (target && target.closest && target.closest("a")) {
        setOpen(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (!isOpen()) return;
      var target = event.target;
      if (!target) return;
      if (panel.contains(target) || toggle.contains(target)) return;
      setOpen(false);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > NAV_BREAKPOINT) setOpen(false);
    });
  }

  /* ------------------------------------------------------------------------
     4. Scroll reveal (IntersectionObserver, staggered via --delay)
     ---------------------------------------------------------------------- */
  function initReveal() {
    var items = toArray(document.querySelectorAll(".reveal"));
    if (!items.length) return;

    function showAll() {
      for (var i = 0; i < items.length; i += 1) {
        items[i].classList.add("is-visible");
      }
    }

    if (!supportsObserver() || reduceMotion) {
      showAll();
      return;
    }

    try {
      var observer = new IntersectionObserver(
        function (entries, obs) {
          for (var i = 0; i < entries.length; i += 1) {
            if (!entries[i].isIntersecting) continue;
            entries[i].target.classList.add("is-visible");
            obs.unobserve(entries[i].target);
          }
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
      );

      for (var j = 0; j < items.length; j += 1) {
        observer.observe(items[j]);
      }
    } catch (err) {
      logError("scroll reveal", err);
      showAll();
    }
  }

  /* ------------------------------------------------------------------------
     5. Active navigation (observer only — no scroll handler)
     ---------------------------------------------------------------------- */
  function initActiveNav() {
    var links = toArray(document.querySelectorAll(".nav-link"));
    if (!links.length || !supportsObserver()) return;

    var pairs = [];
    for (var i = 0; i < links.length; i += 1) {
      var href = links[i].getAttribute("href");
      if (!href || href.charAt(0) !== "#") continue;
      var section = document.getElementById(href.slice(1));
      if (section) pairs.push({ link: links[i], section: section });
    }
    if (!pairs.length) return;

    function activate(id) {
      for (var k = 0; k < links.length; k += 1) {
        var isActive = links[k].getAttribute("href") === "#" + id;
        links[k].classList.toggle("is-active", isActive);
        if (isActive) {
          links[k].setAttribute("aria-current", "true");
        } else {
          links[k].removeAttribute("aria-current");
        }
      }
    }

    try {
      var observer = new IntersectionObserver(
        function (entries) {
          var best = null;
          for (var e = 0; e < entries.length; e += 1) {
            if (!entries[e].isIntersecting) continue;
            if (!best || entries[e].intersectionRatio > best.intersectionRatio) {
              best = entries[e];
            }
          }
          if (best && best.target.id) activate(best.target.id);
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
      );

      for (var p = 0; p < pairs.length; p += 1) {
        observer.observe(pairs[p].section);
      }
    } catch (err) {
      logError("active nav observer", err);
    }
  }

  /* ------------------------------------------------------------------------
     6. Header elevation state
     Uses a 1px sentinel at the top of the document so the sticky header can
     gain its shadow without ever listening to a scroll event.
     ---------------------------------------------------------------------- */
  function initHeaderState() {
    var header = document.getElementById("siteHeader");
    if (!header || !supportsObserver()) return;
    if (!document.body) return;

    var sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText =
      "position:absolute;top:0;left:0;width:1px;height:16px;pointer-events:none;opacity:0;";
    document.body.appendChild(sentinel);

    try {
      var observer = new IntersectionObserver(
        function (entries) {
          for (var i = 0; i < entries.length; i += 1) {
            header.classList.toggle("is-scrolled", !entries[i].isIntersecting);
          }
        },
        { threshold: 0 }
      );
      observer.observe(sentinel);
    } catch (err) {
      logError("header state observer", err);
    }
  }

  /* ------------------------------------------------------------------------
     7. Image fallbacks (drop-in friendly)
     ---------------------------------------------------------------------- */
  function markMissing(img) {
    img.classList.add("is-missing");
    var media = img.closest ? img.closest("[data-media]") : null;
    if (media) media.classList.add("is-placeholder");
  }

  function initImageFallbacks() {
    var images = toArray(document.querySelectorAll("img[data-fallback]"));

    for (var i = 0; i < images.length; i += 1) {
      var img = images[i];

      img.addEventListener("error", function () {
        markMissing(this);
      });

      // Handle images that already failed before this script ran.
      if (img.complete && img.naturalWidth === 0) {
        markMissing(img);
      }
    }
  }

  /* ------------------------------------------------------------------------
     8. Footer year
     ---------------------------------------------------------------------- */
  function initYear() {
    var year = document.getElementById("year");
    if (!year) return;
    year.textContent = String(new Date().getFullYear());
  }

  /* ------------------------------------------------------------------------
     Bootstrap
     ---------------------------------------------------------------------- */
  function boot() {
    var tasks = [
      ["status", initStatus],
      ["carousel", initCarousel],
      ["mobile menu", initMobileMenu],
      ["reveal", initReveal],
      ["active nav", initActiveNav],
      ["header state", initHeaderState],
      ["image fallbacks", initImageFallbacks],
      ["year", initYear]
    ];

    for (var i = 0; i < tasks.length; i += 1) {
      try {
        tasks[i][1]();
      } catch (err) {
        logError(tasks[i][0] + " init", err);
      }
    }

    // Reveal observers are attached, so the no-JS safety net can step aside.
    try {
      document.documentElement.classList.remove("no-js");
    } catch (err) {
      logError("no-js class removal", err);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
