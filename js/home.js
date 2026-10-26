/* EFEX216 — ana sayfa: tam ekran menü, hero slider, reveal, imleç */
(function () {
  "use strict";

  /* --- Tam ekran menü --- */
  var btn = document.getElementById("tdMenuBtn");
  var menu = document.getElementById("tdMenu");
  function setMenu(open) {
    menu.classList.toggle("open", open);
    btn.classList.toggle("open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.classList.toggle("no-scroll", open);
  }
  if (btn && menu) {
    btn.addEventListener("click", function () { setMenu(!menu.classList.contains("open")); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("open")) setMenu(false);
    });
  }

  /* --- Hero slider --- */
  var slider = document.querySelector(".td-slider");
  if (slider) {
    var slides = slider.querySelectorAll(".td-slide");
    var dotsWrap = slider.querySelector(".td-dots");
    var countEl = slider.querySelector(".td-count");
    var DUR = 5000;
    var idx = 0, timer = null, remaining = DUR, startedAt = 0;
    slider.style.setProperty("--td-dur", DUR / 1000 + "s");

    var dots = [];
    Array.prototype.forEach.call(slides, function (_, i) {
      var d = document.createElement("button");
      d.type = "button";
      d.setAttribute("aria-label", "Slayt " + (i + 1));
      d.addEventListener("click", function () { go(i); });
      dotsWrap.appendChild(d);
      dots.push(d);
    });

    function pad(n) { return (n < 10 ? "0" : "") + n; }
    function loadImg(s) {
      var img = s.querySelector("img[data-src]");
      if (img) { img.src = img.getAttribute("data-src"); img.removeAttribute("data-src"); }
    }
    function schedule(ms) {
      clearTimeout(timer);
      startedAt = Date.now();
      remaining = ms;
      timer = setTimeout(function () { go(idx + 1); }, ms);
    }
    function go(n) {
      n = (n + slides.length) % slides.length;
      slides[idx].classList.remove("active");
      dots[idx].classList.remove("active");
      idx = n;
      loadImg(slides[idx]);
      loadImg(slides[(idx + 1) % slides.length]);
      // restart progress + text animations
      void dots[idx].offsetWidth;
      void slides[idx].offsetWidth;
      slides[idx].classList.add("active");
      dots[idx].classList.add("active");
      if (countEl) countEl.textContent = pad(idx + 1) + " / " + pad(slides.length);
      slider.classList.remove("paused");
      schedule(DUR);
    }

    slider.querySelector(".td-prev").addEventListener("click", function () { go(idx - 1); });
    slider.querySelector(".td-next").addEventListener("click", function () { go(idx + 1); });

    // Hover: duraklat
    slider.addEventListener("mouseenter", function () {
      clearTimeout(timer);
      remaining = Math.max(400, remaining - (Date.now() - startedAt));
      slider.classList.add("paused");
    });
    slider.addEventListener("mouseleave", function () {
      slider.classList.remove("paused");
      schedule(remaining);
    });

    // Klavye
    document.addEventListener("keydown", function (e) {
      if (menu && menu.classList.contains("open")) return;
      if (e.key === "ArrowRight") go(idx + 1);
      else if (e.key === "ArrowLeft") go(idx - 1);
    });

    // Dokunmatik kaydırma
    var x0 = null;
    slider.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    slider.addEventListener("touchend", function (e) {
      if (x0 === null) return;
      var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 40) go(idx + (dx < 0 ? 1 : -1));
      x0 = null;
    });

    // Sekme gizliyken dur
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) clearTimeout(timer);
      else schedule(DUR);
    });

    // İlk slayt yükleyici kapanınca başlasın ki animasyon görünsün
    var started = false;
    function start() {
      if (started) return;
      started = true;
      go(0);
    }
    var loader = document.getElementById("loader");
    if (loader) {
      var mo = new MutationObserver(function () {
        if (loader.classList.contains("done")) { mo.disconnect(); setTimeout(start, 150); }
      });
      mo.observe(loader, { attributes: true, attributeFilter: ["class"] });
      setTimeout(start, 5000);
    } else {
      start();
    }
  }

  /* --- Reveal --- */
  var rev = document.querySelectorAll(".td-reveal, .td-item");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    rev.forEach(function (el) { io.observe(el); });
  } else {
    rev.forEach(function (el) { el.classList.add("in"); });
  }

  /* --- Özel imleç --- */
  if (window.matchMedia("(hover:hover) and (pointer:fine)").matches) {
    var c = document.createElement("div");
    c.className = "td-cursor";
    document.body.appendChild(c);
    var tx = 0, ty = 0, cx = 0, cy = 0;
    document.addEventListener("mousemove", function (e) {
      tx = e.clientX; ty = e.clientY;
      c.classList.add("on");
      var t = e.target.closest ? e.target.closest("a,button,[data-hover]") : null;
      c.classList.toggle("big", !!t);
    });
    document.addEventListener("mouseleave", function () { c.classList.remove("on"); });
    (function loop() {
      cx += (tx - cx) * 0.2; cy += (ty - cy) * 0.2;
      c.style.transform = "translate3d(" + cx + "px," + cy + "px,0)";
      requestAnimationFrame(loop);
    })();
  }
})();
