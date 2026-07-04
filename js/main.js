/* EFEX216 — interactions (runs after layout.js injects header/footer) */
(function () {
  "use strict";

  /* --- Loader --- */
  var loader = document.getElementById("loader");
  if (loader) {
    var startTime = Date.now();
    // First visit in this session shows a full 3s intro; later page loads are brief.
    var firstVisit = false;
    try {
      firstVisit = !sessionStorage.getItem("efex_visited");
      sessionStorage.setItem("efex_visited", "1");
    } catch (e) {}
    var MIN_SHOW = firstVisit ? 3000 : 450;
    document.body.classList.add("no-scroll");
    var hideLoader = function () {
      var wait = Math.max(0, MIN_SHOW - (Date.now() - startTime));
      setTimeout(function () {
        loader.classList.add("done");
        document.body.classList.remove("no-scroll");
        setTimeout(function () {
          if (loader && loader.parentNode) loader.parentNode.removeChild(loader);
        }, 800);
      }, wait);
    };
    window.addEventListener("load", hideLoader);
    setTimeout(hideLoader, 4500);
  }

  var header = document.getElementById("header");
  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");

  /* --- Sticky header --- */
  function onScroll() {
    if (window.scrollY > 20) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  if (header) {
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* --- Mobile menu --- */
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* --- Hero video: skip first 2 seconds (also on loop) --- */
  var heroVid = document.querySelector(".hero-video");
  if (heroVid) {
    var START = 6;
    var seekStart = function () {
      if (heroVid.currentTime < START) {
        try { heroVid.currentTime = START; } catch (e) {}
      }
    };
    heroVid.addEventListener("loadedmetadata", seekStart);
    heroVid.addEventListener("timeupdate", seekStart);
    if (heroVid.readyState >= 1) seekStart();
  }

  /* --- Reveal on scroll --- */
  var items = document.querySelectorAll(
    ".hl-card,.about-media,.about-body,.svc-card,.ref-marquee,.ref-grid,.section-head,.projects-content,.contact-info,.contact-form,.stat,.page-lead,.intro-inner,.value-card,.proj-card"
  );
  items.forEach(function (el, i) {
    el.classList.add("reveal");
    el.style.transitionDelay = (i % 6) * 70 + "ms";
  });
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );
  items.forEach(function (el) {
    io.observe(el);
  });

  /* --- Animated counters --- */
  var counters = document.querySelectorAll(".stat-num");
  var counted = false;
  if (counters.length) {
    var statsObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting && !counted) {
            counted = true;
            counters.forEach(function (el) {
              var target = parseInt(el.getAttribute("data-count"), 10) || 0;
              var duration = 1500;
              var startT = null;
              function step(ts) {
                if (!startT) startT = ts;
                var p = Math.min((ts - startT) / duration, 1);
                var eased = 1 - Math.pow(1 - p, 3);
                el.textContent = Math.round(target * eased);
                if (p < 1) requestAnimationFrame(step);
              }
              requestAnimationFrame(step);
            });
          }
        });
      },
      { threshold: 0.4 }
    );
    statsObserver.observe(counters[0].closest(".stats"));
  }

  /* --- Lightbox with prev/next (reference logos & project images) --- */
  var lb = null, lbImg = null, lbList = [], lbIndex = 0;
  function lbRender() {
    var it = lbList[lbIndex];
    if (it) { lbImg.src = it.src; lbImg.alt = it.alt || ""; }
    lb.classList.toggle("single", lbList.length <= 1);
  }
  function lbNav(dir) {
    if (lbList.length < 2) return;
    lbIndex = (lbIndex + dir + lbList.length) % lbList.length;
    lbRender();
  }
  function closeLightbox() {
    if (lb) {
      lb.classList.remove("open");
      document.body.classList.remove("no-scroll");
    }
  }
  function ensureLb() {
    if (lb) return;
    lb = document.createElement("div");
    lb.className = "lightbox";
    lb.innerHTML =
      '<button class="lb-close" aria-label="Kapat">&times;</button>' +
      '<button class="lb-nav lb-prev" aria-label="Önceki">&#8249;</button>' +
      '<button class="lb-nav lb-next" aria-label="Sonraki">&#8250;</button>' +
      '<img alt="" />';
    document.body.appendChild(lb);
    lbImg = lb.querySelector("img");
    lb.addEventListener("click", function (e) {
      if (e.target === lb || e.target.classList.contains("lb-close")) closeLightbox();
    });
    lb.querySelector(".lb-prev").addEventListener("click", function (e) { e.stopPropagation(); lbNav(-1); });
    lb.querySelector(".lb-next").addEventListener("click", function (e) { e.stopPropagation(); lbNav(1); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") lbNav(-1);
      else if (e.key === "ArrowRight") lbNav(1);
    });
  }
  function openLightbox(img) {
    ensureLb();
    var group = img.closest(".gallery, .ref-track, .ref-page-grid");
    var imgs = group ? group.querySelectorAll("img") : [img];
    var clicked = img.getAttribute("src"), seen = {};
    lbList = [];
    Array.prototype.forEach.call(imgs, function (im) {
      var s = im.getAttribute("src");
      if (seen[s]) return;
      seen[s] = 1;
      lbList.push({ src: s, alt: im.getAttribute("alt") });
    });
    lbIndex = 0;
    for (var i = 0; i < lbList.length; i++) { if (lbList[i].src === clicked) { lbIndex = i; break; } }
    lbRender();
    document.body.classList.add("no-scroll");
    void lb.offsetWidth;
    lb.classList.add("open");
  }
  document.addEventListener("click", function (e) {
    var img = e.target.closest(".ref-item img, .g-item img");
    if (!img) return;
    e.preventDefault();
    openLightbox(img);
  });

  /* --- Projects view toggle (2 / 4 columns) --- */
  var projGrid = document.getElementById("projGrid");
  var projToolbar = document.querySelector(".proj-toolbar");
  if (projGrid && projToolbar) {
    projToolbar.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-cols]");
      if (!b) return;
      projGrid.className = "proj-page-grid cols-" + b.getAttribute("data-cols");
      var btns = projToolbar.querySelectorAll("button");
      Array.prototype.forEach.call(btns, function (x) { x.classList.toggle("active", x === b); });
    });
  }

  /* --- Page transition: show logo loader before navigating --- */
  function isInternalLink(a) {
    var href = a.getAttribute("href");
    if (!href) return false;
    if (a.target === "_blank" || a.hasAttribute("download")) return false;
    if (href.charAt(0) === "#") return false;
    if (/^(mailto:|tel:|https?:|\/\/)/i.test(href)) return false;
    return /\.html(\?.*)?(#.*)?$/i.test(href);
  }
  function showTransition(onReady) {
    var d = document.createElement("div");
    d.className = "loader done";
    d.id = "page-transition";
    d.setAttribute("role", "status");
    d.innerHTML =
      '<div class="loader-box"><img src="img/logo-2026.svg" alt="EFEX216" class="loader-mark" />' +
      '<span class="loader-shine" aria-hidden="true"></span></div>';
    document.body.appendChild(d);
    // force reflow, then fade in
    void d.offsetWidth;
    d.classList.remove("done");
    if (onReady) setTimeout(onReady, 1150);
  }
  document.addEventListener("click", function (e) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    var a = e.target.closest ? e.target.closest("a") : null;
    if (!a || !isInternalLink(a)) return;
    e.preventDefault();
    var url = a.href;
    showTransition(function () {
      window.location.href = url;
    });
  });

  /* --- Contact form + math captcha (only where present) --- */
  var form = document.getElementById("contactForm");
  if (form) {
    var status = document.getElementById("formStatus");
    var captchaQ = document.getElementById("captchaQ");
    var a, b;
    function newCaptcha() {
      a = 2 + Math.floor(Math.random() * 8);
      b = 1 + Math.floor(Math.random() * 6);
      captchaQ.textContent = a + " + " + b + " = ?";
    }
    newCaptcha();
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      status.className = "form-status";
      var name = form.name.value.trim();
      var email = form.email.value.trim();
      var message = form.message.value.trim();
      var captcha = parseInt(form.captcha.value.trim(), 10);
      if (!name || !email || !message) {
        status.textContent = "Lütfen zorunlu alanları doldurun.";
        status.classList.add("err");
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        status.textContent = "Geçerli bir e-posta adresi girin.";
        status.classList.add("err");
        return;
      }
      if (captcha !== a + b) {
        status.textContent = "Doğrulama yanıtı hatalı. Tekrar deneyin.";
        status.classList.add("err");
        newCaptcha();
        form.captcha.value = "";
        return;
      }
      var subject = form.subject.value.trim() || "Web Sitesi İletişim Formu";
      var body =
        "Ad Soyad: " + name + "\n" +
        "E-posta: " + email + "\n\n" +
        message + "\n";
      window.location.href =
        "mailto:info@efex216.com?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
      status.textContent = "Teşekkürler! E-posta uygulamanız mesajınızla açılıyor; göndererek tamamlayın.";
      status.classList.add("ok");
      form.reset();
      newCaptcha();
    });
  }
})();
