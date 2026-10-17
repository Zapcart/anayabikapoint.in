/* ==========================================================================
   Anaya Bika Point — interaction layer
   Vanilla JS, zero dependencies. Every block is defensive: a failure in one
   feature must never break the rest of the page.

   Modules
     1. Live open / closed status (IST)
     2. Hero carousel
     3. Mobile menu
     4. Fluid scroll dampening (custom RAF lerp, Lenis-style, opt-in)
     5. Scroll-linked visuals (progress bar, --sy, header state)
     6. Scroll reveal (IntersectionObserver, staggered)
     7. Active navigation
     8. Image fallbacks (drop-in friendly)
     9. Pointer tilt on the shop-front frame
    10. Pointer bloom (--mx / --my) + trust-card spotlight (--cx / --cy)
    11. Hero parallax layers
    12. Footer year
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

  /* Smooth scrolling tuning (higher = snappier, lower = more glide). */
  var SCROLL_EASE = 0.16;
  var SCROLL_EPSILON = 0.6;
  var SMOOTH_MIN_WIDTH = 1024;

  var reduceMotion = false;
  try {
    reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (err) {
    reduceMotion = false;
  }

  /* ------------------------------------------------------------------------
     Small helpers
     ---------------------------------------------------------------------- */
  function logError(scope, err) {
    // Descriptive, non-fatal logging to simplify debugging.
    if (window.console && typeof window.console.warn === "function") {
      window.console.warn("[Anaya Bika Point] " + scope + " failed:", err);
    }
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function lerp(from, to, amount) {
    return from + (to - from) * amount;
  }

  function isFinePointer() {
    try {
      return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    } catch (err) {
      return false;
    }
  }

  function scrollTopNow() {
    return window.pageYOffset || document.documentElement.scrollTop || 0;
  }

  function maxScroll() {
    var doc = document.documentElement;
    var body = document.body;
    var height = Math.max(
      doc ? doc.scrollHeight : 0,
      body ? body.scrollHeight : 0,
      body ? body.offsetHeight : 0
    );
    return Math.max(0, height - window.innerHeight);
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
    var isClosedDay = storeTime.weekday === CLOSED_WEEKDAY;

    if (isClosedDay) {
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
        badge: "Open Today (10 AM - 9 PM)",
        short: "Open Today (10 AM - 9 PM)",
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
    var badges = document.querySelectorAll("[data-status-badge]");
    var textTargets = {
      statusText: document.getElementById("statusText"),
      mobileStatusText: document.getElementById("mobileStatusText"),
      heroStatusText: document.getElementById("heroStatusText"),
      hoursStatusText: document.getElementById("hoursStatusText"),
      hoursDetail: document.getElementById("hoursDetail")
    };

    function render() {
      var status;
      try {
        status = resolveStatus();
      } catch (err) {
        logError("status render", err);
        return;
      }

      for (var b = 0; b < badges.length; b += 1) {
        var badge = badges[b];
        badge.classList.toggle("is-open", status.state === "open");
        badge.classList.toggle("is-closed", status.state === "closed");
        badge.setAttribute("data-state", status.state);
      }

      if (textTargets.statusText) textTargets.statusText.textContent = status.badge;
      if (textTargets.mobileStatusText) textTargets.mobileStatusText.textContent = status.badge;
      if (textTargets.hoursStatusText) textTargets.hoursStatusText.textContent = status.badge;
      if (textTargets.heroStatusText) textTargets.heroStatusText.textContent = status.short;
      if (textTargets.hoursDetail) textTargets.hoursDetail.textContent = status.detail;
    }

    render();
    // Keep the badge honest while the tab stays open.
    window.setInterval(function () {
      if (!document.hidden) render();
    }, 60000);
  }

  /* ------------------------------------------------------------------------
     2. Hero carousel
     ---------------------------------------------------------------------- */
  function initCarousel() {
    var root = document.querySelector("[data-carousel]");
    if (!root) return;

    var stage = root.querySelector("[data-stage]");
    var slides = Array.prototype.slice.call(root.querySelectorAll("[data-slide]"));
    var dotsWrap = root.querySelector("[data-dots]");
    var prevBtn = root.querySelector("[data-prev]");
    var nextBtn = root.querySelector("[data-next]");
    var toggleBtn = root.querySelector("[data-autoplay-toggle]");
    var counter = root.querySelector("[data-current]");

    if (!stage || slides.length === 0) return;

    var index = Math.max(
      0,
      slides.findIndex(function (slide) {
        return slide.classList.contains("is-active");
      })
    );
    var timer = null;
    var paused = false;
    var userPaused = false;
    var visible = true;
    var dots = [];

    function pad(value) {
      return String(value).padStart(2, "0");
    }

    function buildDots() {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = "";
      dots = [];
      slides.forEach(function (slide, i) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.className = "carousel-dot";
        dot.setAttribute("aria-label", "Go to slide " + (i + 1) + " of " + slides.length);
        dot.addEventListener("click", function () {
          goTo(i, true);
        });
        dotsWrap.appendChild(dot);
        dots.push(dot);
      });
    }

    function syncUi() {
      slides.forEach(function (slide, i) {
        var isActive = i === index;
        slide.classList.toggle("is-active", isActive);
        slide.setAttribute("aria-hidden", isActive ? "false" : "true");
      });
      dots.forEach(function (dot, i) {
        var isActive = i === index;
        dot.classList.toggle("is-active", isActive);
        dot.setAttribute("aria-current", isActive ? "true" : "false");
      });
      if (counter) counter.textContent = pad(index + 1);
    }

    function goTo(nextIndex, fromUser) {
      if (!slides.length) return;
      index = ((nextIndex % slides.length) + slides.length) % slides.length;
      syncUi();
      if (fromUser) restartTimer();
    }

    function next() {
      goTo(index + 1, false);
    }

    function stopTimer() {
      if (timer !== null) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    function startTimer() {
      stopTimer();
      if (userPaused || reduceMotion || !visible || document.hidden) return;
      timer = window.setInterval(next, CAROUSEL_DELAY);
    }

    function restartTimer() {
      startTimer();
    }

    function setToggleUi() {
      if (!toggleBtn) return;
      var playing = !userPaused;
      toggleBtn.setAttribute("aria-pressed", playing ? "false" : "true");
      toggleBtn.setAttribute("aria-label", playing ? "Pause slideshow" : "Play slideshow");
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

    // Pause while hovered or focused; resume politely afterwards.
    root.addEventListener("mouseenter", function () {
      paused = true;
      stopTimer();
    });
    root.addEventListener("mouseleave", function () {
      paused = false;
      startTimer();
    });
    root.addEventListener("focusin", function () {
      stopTimer();
    });
    root.addEventListener("focusout", function () {
      if (!paused) startTimer();
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

    // Swipe support.
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

    // Pause when the carousel scrolls out of view.
    if ("IntersectionObserver" in window) {
      try {
        var observer = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              visible = entry.isIntersecting;
              if (visible) {
                startTimer();
              } else {
                stopTimer();
              }
            });
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

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      panel.classList.toggle("is-open", open);
      panel.setAttribute("aria-hidden", open ? "false" : "true");
      document.body.classList.toggle("is-locked", open);
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    panel.addEventListener("click", function (event) {
      var target = event.target;
      if (target && target.closest && target.closest("a")) {
        setOpen(false);
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setOpen(false);
        toggle.focus();
      }
    });

    document.addEventListener("click", function (event) {
      if (toggle.getAttribute("aria-expanded") !== "true") return;
      var target = event.target;
      if (!target) return;
      if (panel.contains(target) || toggle.contains(target)) return;
      setOpen(false);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 1000) setOpen(false);
    });
  }

  /* ------------------------------------------------------------------------
     4. Fluid scroll dampening
     A Lenis-style wheel lerp: wheel deltas are accumulated into a target
     offset and the window is eased toward it on requestAnimationFrame.
     Disabled for reduced motion, touch devices, and narrow viewports —
     never hijack a scroll we cannot reproduce faithfully.
     ---------------------------------------------------------------------- */
  function initSmoothScroll() {
    if (reduceMotion) return;
    if (!isFinePointer()) return;
    if (window.innerWidth < SMOOTH_MIN_WIDTH) return;

    var target = scrollTopNow();
    var current = target;
    var running = false;
    var frameId = null;
    var lastApplied = 0;

    function apply(position) {
      lastApplied = Date.now();
      try {
        window.scrollTo({ top: position, left: 0, behavior: "instant" });
      } catch (err) {
        window.scrollTo(0, position);
      }
    }

    function stop() {
      running = false;
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
        frameId = null;
      }
    }

    function tick() {
      frameId = null;
      if (!running) return;

      current = scrollTopNow();
      var distance = target - current;

      if (Math.abs(distance) <= SCROLL_EPSILON) {
        current = target;
        apply(target);
        running = false;
        return;
      }

      var nextTop = current + distance * SCROLL_EASE;
      // Snap within a pixel so the loop always terminates.
      if (Math.abs(target - nextTop) < SCROLL_EPSILON) nextTop = target;
      apply(nextTop);

      frameId = window.requestAnimationFrame(tick);
    }

    function start() {
      if (running) return;
      running = true;
      if (frameId === null) {
        frameId = window.requestAnimationFrame(tick);
      }
    }

    function normalizeDelta(event) {
      var delta = event.deltaY;
      if (event.deltaMode === 1) {
        // Lines.
        delta *= 16;
      } else if (event.deltaMode === 2) {
        // Pages.
        delta *= window.innerHeight;
      }
      // Guard against runaway trackpad spikes.
      return clamp(delta, -240, 240);
    }

    function onWheel(event) {
      if (event.ctrlKey || event.defaultPrevented) return;
      if (document.body.classList.contains("is-locked")) return;
      if (event.target && event.target.closest && event.target.closest("[data-native-scroll]")) return;

      var limit = maxScroll();
      if (limit <= 0) return;

      // Re-sync when the page moved outside of our loop (scrollbar, keyboard).
      if (!running) {
        current = scrollTopNow();
        target = current;
      }

      var delta = normalizeDelta(event);
      if (!delta) return;

      var nextTarget = clamp(target + delta, 0, limit);
      if (nextTarget === target) return;

      event.preventDefault();
      target = nextTarget;
      start();
    }

    // Any scroll we did not produce means the user took over: re-sync.
    function onNativeScroll() {
      if (Date.now() - lastApplied < 140) return;
      current = scrollTopNow();
      target = current;
      stop();
    }

    function onResize() {
      if (window.innerWidth < SMOOTH_MIN_WIDTH) {
        stop();
      }
      target = clamp(target, 0, maxScroll());
    }

    try {
      window.addEventListener("wheel", onWheel, { passive: false });
      window.addEventListener("scroll", onNativeScroll, { passive: true });
      window.addEventListener("resize", onResize, { passive: true });
    } catch (err) {
      logError("smooth scroll listeners", err);
    }

    // Keep the frame loop honest if the tab was backgrounded mid-glide.
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) {
        stop();
        current = scrollTopNow();
        target = current;
      }
    });
  }

  /* ------------------------------------------------------------------------
     5. Scroll-linked visuals: progress bar, ambient drift, header state
     ---------------------------------------------------------------------- */
  function initScrollVisuals() {
    var root = document.documentElement;
    var header = document.getElementById("siteHeader");
    var frame = null;

    function paint() {
      frame = null;

      var scrollY = scrollTopNow();
      var limit = maxScroll();
      var progress = limit > 0 ? clamp(scrollY / limit, 0, 1) : 0;

      // Unitless scroll distance consumed by calc() in the ambient layer.
      root.style.setProperty("--sy", scrollY.toFixed(2));
      root.style.setProperty("--progress", progress.toFixed(4));

      if (header) {
        header.classList.toggle("is-scrolled", scrollY > 14);
      }
    }

    function schedule() {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(paint);
    }

    paint();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    window.addEventListener("load", schedule);
  }

  /* ------------------------------------------------------------------------
     6. Scroll reveal
     ---------------------------------------------------------------------- */
  function initReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window) || reduceMotion) {
      for (var i = 0; i < items.length; i += 1) {
        items[i].classList.add("is-visible");
      }
      return;
    }

    try {
      var observer = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
      );

      for (var j = 0; j < items.length; j += 1) {
        observer.observe(items[j]);
      }

      // Anything already painted above the fold should not wait for a scroll.
      window.requestAnimationFrame(function () {
        for (var k = 0; k < items.length; k += 1) {
          var rect = items[k].getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
            items[k].classList.add("is-visible");
          }
        }
      });
    } catch (err) {
      logError("scroll reveal", err);
      for (var m = 0; m < items.length; m += 1) {
        items[m].classList.add("is-visible");
      }
    }
  }

  /* ------------------------------------------------------------------------
     7. Active navigation
     ---------------------------------------------------------------------- */
  function initActiveNav() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".nav-link"));
    if (!links.length || !("IntersectionObserver" in window)) return;

    var sections = links
      .map(function (link) {
        var id = link.getAttribute("href");
        return id && id.charAt(0) === "#" ? document.querySelector(id) : null;
      })
      .filter(Boolean);

    if (!sections.length) return;

    function activate(id) {
      links.forEach(function (link) {
        var isActive = link.getAttribute("href") === "#" + id;
        link.classList.toggle("is-active", isActive);
        if (isActive) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    try {
      var observer = new IntersectionObserver(
        function (entries) {
          var best = null;
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            if (!best || entry.intersectionRatio > best.intersectionRatio) best = entry;
          });
          if (best && best.target.id) activate(best.target.id);
        },
        { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
      );
      sections.forEach(function (section) {
        observer.observe(section);
      });
    } catch (err) {
      logError("active nav observer", err);
    }
  }

  /* ------------------------------------------------------------------------
     8. Image fallbacks (drop-in friendly)
     ---------------------------------------------------------------------- */
  function markMissing(img) {
    img.classList.add("is-missing");
    var media = img.closest ? img.closest("[data-media]") : null;
    if (media) media.classList.add("is-placeholder");
  }

  function initImageFallbacks() {
    var images = document.querySelectorAll("img[data-fallback]");

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
     9. Subtle pointer tilt on the shop-front frame
     ---------------------------------------------------------------------- */
  function initTilt() {
    if (reduceMotion) return;

    var finePointer = isFinePointer();
    if (!finePointer) return;

    var targets = document.querySelectorAll("[data-tilt]");

    for (var i = 0; i < targets.length; i += 1) {
      (function (el) {
        var frame = null;

        function onMove(event) {
          if (frame) return;
          frame = window.requestAnimationFrame(function () {
            frame = null;
            var rect = el.getBoundingClientRect();
            if (!rect.width || !rect.height) return;
            var px = (event.clientX - rect.left) / rect.width - 0.5;
            var py = (event.clientY - rect.top) / rect.height - 0.5;
            var rotateY = px * 5;
            var rotateX = py * -5;
            el.style.transform =
              "perspective(1100px) rotateX(" + rotateX.toFixed(2) + "deg) rotateY(" + rotateY.toFixed(2) + "deg)";
          });
        }

        function onLeave() {
          if (frame) {
            window.cancelAnimationFrame(frame);
            frame = null;
          }
          el.style.transform = "";
        }

        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);
      })(targets[i]);
    }
  }

  /* ------------------------------------------------------------------------
     10. Pointer bloom + trust-card spotlight
     ---------------------------------------------------------------------- */
  function initPointerGlow() {
    if (reduceMotion || !isFinePointer()) return;

    var root = document.documentElement;
    var frame = null;
    var lastX = 0;
    var lastY = 0;

    function paint() {
      frame = null;
      var width = window.innerWidth || 1;
      var height = window.innerHeight || 1;
      root.style.setProperty("--mx", ((lastX / width) * 100).toFixed(2) + "%");
      root.style.setProperty("--my", ((lastY / height) * 100).toFixed(2) + "%");
    }

    window.addEventListener(
      "mousemove",
      function (event) {
        lastX = event.clientX;
        lastY = event.clientY;
        if (frame !== null) return;
        frame = window.requestAnimationFrame(paint);
      },
      { passive: true }
    );

    // Per-card spotlight for the trust grid (gold radial follows the cursor).
    var cards = document.querySelectorAll("[data-spotlight]");
    for (var i = 0; i < cards.length; i += 1) {
      (function (card) {
        var raf = null;
        var px = 50;
        var py = 0;

        function apply() {
          raf = null;
          card.style.setProperty("--cx", px.toFixed(2) + "%");
          card.style.setProperty("--cy", py.toFixed(2) + "%");
        }

        card.addEventListener(
          "pointermove",
          function (event) {
            var rect = card.getBoundingClientRect();
            if (!rect.width || !rect.height) return;
            px = ((event.clientX - rect.left) / rect.width) * 100;
            py = ((event.clientY - rect.top) / rect.height) * 100;
            if (raf !== null) return;
            raf = window.requestAnimationFrame(apply);
          },
          { passive: true }
        );

        card.addEventListener("pointerleave", function () {
          px = 50;
          py = 0;
          if (raf !== null) {
            window.cancelAnimationFrame(raf);
            raf = null;
          }
          apply();
        });
      })(cards[i]);
    }
  }

  /* ------------------------------------------------------------------------
     11. Hero parallax layers
     ---------------------------------------------------------------------- */
  function initParallax() {
    var layers = document.querySelectorAll("[data-parallax]");
    if (!layers.length) return;

    var parallaxEnabled = !reduceMotion;
    try {
      parallaxEnabled =
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
        window.matchMedia("(min-width: 781px)").matches;
    } catch (err) {
      parallaxEnabled = !reduceMotion;
    }
    if (!parallaxEnabled) return;

    var frame = null;

    function apply() {
      frame = null;
      var scrollY = scrollTopNow();

      for (var i = 0; i < layers.length; i += 1) {
        var layer = layers[i];
        var factor = parseFloat(layer.getAttribute("data-parallax"));
        if (isNaN(factor)) factor = 0;
        // Clamp travel so the glow never runs away on very long pages.
        var offset = clamp(scrollY * factor, -160, 160);
        layer.style.setProperty("--parallax-y", offset.toFixed(2) + "px");
      }
    }

    function onScroll() {
      if (frame) return;
      frame = window.requestAnimationFrame(apply);
    }

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
  }

  /* ------------------------------------------------------------------------
     12. Footer year
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
      ["smooth scroll", initSmoothScroll],
      ["scroll visuals", initScrollVisuals],
      ["status", initStatus],
      ["carousel", initCarousel],
      ["mobile menu", initMobileMenu],
      ["reveal", initReveal],
      ["active nav", initActiveNav],
      ["image fallbacks", initImageFallbacks],
      ["pointer glow", initPointerGlow],
      ["tilt", initTilt],
      ["parallax", initParallax],
      ["year", initYear]
    ];

    for (var i = 0; i < tasks.length; i += 1) {
      try {
        tasks[i][1]();
      } catch (err) {
        logError(tasks[i][0] + " init", err);
      }
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
