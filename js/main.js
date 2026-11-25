/* EFEX216 — yükleyici, header, görsel büyütme, sayfa geçişi, iletişim formu
   (layout.js header/footer'ı yerleştirdikten sonra çalışır) */
(function () {
  "use strict";

  var TR = document.documentElement.lang === "tr";
  function t(tr, en) { return TR ? tr : en; }

  /* --- Yükleyici --- */
  var loader = document.getElementById("loader");
  if (loader) {
    var startTime = Date.now();
    // Oturumdaki ilk ziyaret 3 sn'lik açılışı gösterir; sonraki sayfalar kısa sürer.
    var firstVisit = false;
    try {
      firstVisit = !sessionStorage.getItem("efex_visited");
      sessionStorage.setItem("efex_visited", "1");
    } catch (e) {}
    var MIN_SHOW = firstVisit ? 3000 : 450;
    var hidden = false;
    document.body.classList.add("no-scroll");
    var hideLoader = function () {
      if (hidden) return;
      hidden = true;
      var wait = Math.max(0, MIN_SHOW - (Date.now() - startTime));
      setTimeout(function () {
        loader.classList.add("done");
        document.body.classList.remove("no-scroll");
        setTimeout(function () {
          if (loader.parentNode) loader.parentNode.removeChild(loader);
        }, 800);
      }, wait);
    };
    window.addEventListener("load", hideLoader);
    setTimeout(hideLoader, 4500);
  }

  /* --- Kaydırınca header alt çizgisi --- */
  var header = document.getElementById("header");
  if (header) {
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 20); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* --- Görsel büyütme (proje galerileri), önceki/sonraki ile --- */
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
    if (!lb) return;
    lb.classList.remove("open");
    document.body.classList.remove("no-scroll");
  }
  function ensureLb() {
    if (lb) return;
    lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.innerHTML =
      '<button class="lb-close" type="button" aria-label="' + t("Kapat", "Close") + '">&times;</button>' +
      '<button class="lb-nav lb-prev" type="button" aria-label="' + t("Önceki", "Previous") + '">&#8249;</button>' +
      '<button class="lb-nav lb-next" type="button" aria-label="' + t("Sonraki", "Next") + '">&#8250;</button>' +
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
    var group = img.closest(".gallery");
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
    var img = e.target.closest(".g-item img");
    if (!img) return;
    e.preventDefault();
    openLightbox(img);
  });

  /* --- Sayfa geçişi: başka sayfaya giderken logo perdesi --- */
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
    d.setAttribute("aria-label", t("Yükleniyor", "Loading"));
    d.innerHTML =
      '<div class="loader-box"><img src="' + (document.body.getAttribute("data-root") || "") + 'img/logo-2026.svg" alt="EFEX216" class="loader-mark" />' +
      '<span class="loader-shine" aria-hidden="true"></span></div>';
    document.body.appendChild(d);
    void d.offsetWidth; // önce çiz, sonra görünür yap
    d.classList.remove("done");
    if (onReady) setTimeout(onReady, 1150);
  }
  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    var a = e.target.closest ? e.target.closest("a") : null;
    if (!a || !isInternalLink(a)) return;
    // Aynı sayfadaki bir bölüme gidiliyorsa sayfa yenilenmez; perde açılırsa hiç kapanmaz
    if (a.hash && a.pathname === location.pathname && a.search === location.search) return;
    e.preventDefault();
    var url = a.href;
    showTransition(function () { window.location.href = url; });
  });
  // Tarayıcının "geri" tuşu sayfayı önbellekten açınca perde ekranda kalmasın
  window.addEventListener("pageshow", function (e) {
    if (!e.persisted) return;
    var pt = document.getElementById("page-transition");
    if (pt) pt.parentNode.removeChild(pt);
  });

  /* --- İletişim formu --- */
  var form = document.getElementById("contactForm");
  if (form) {
    // Web3Forms: sunucusuz form gönderimi. Mesajlar, erişim anahtarının kayıtlı
    // olduğu e-posta adresine gelir. Anahtar herkese açık olacak şekilde tasarlanmıştır.
    var MAIL = "info@efex216.com"; // gönderim başarısız olursa yedek e-posta
    var ENDPOINT = "https://api.web3forms.com/submit";
    var ACCESS_KEY = "25d4e0f5-ab5b-4364-a33b-196e571c19fa";
    var MSG = {
      required: t("Lütfen zorunlu alanları doldurun.", "Please fill in the required fields."),
      email: t("Geçerli bir e-posta adresi girin.", "Please enter a valid email address."),
      captcha: t("Doğrulama yanıtı hatalı. Tekrar deneyin.", "The verification answer is incorrect. Please try again."),
      sending: t("GÖNDERİLİYOR…", "SENDING…"),
      ok: t("Teşekkürler! Mesajınız bize ulaştı; en kısa sürede dönüş yapacağız.", "Thank you! Your message has reached us; we will get back to you shortly."),
      fail: t("Mesaj şu an gönderilemedi.", "Your message could not be sent right now."),
      mailLink: t("E-posta ile gönderin →", "Send it by email →"),
      defaultSubject: t("Web sitesi iletişim formu", "Website contact form")
    };
    var f = form.elements;
    var status = document.getElementById("formStatus");
    var submitBtn = form.querySelector('button[type="submit"]');
    var btnText = submitBtn.textContent;
    var captchaQ = document.getElementById("captchaQ");
    var ca = 0, cb = 0;

    var newCaptcha = function () {
      ca = 2 + Math.floor(Math.random() * 8);
      cb = 1 + Math.floor(Math.random() * 6);
      captchaQ.textContent = ca + " + " + cb + " = ?";
    };
    var setStatus = function (text, kind, mailtoHref) {
      status.className = "form-status" + (kind ? " " + kind : "");
      status.textContent = text;
      if (mailtoHref) {
        var a = document.createElement("a");
        a.href = mailtoHref;
        a.textContent = " " + MSG.mailLink;
        status.appendChild(a);
      }
    };
    var setBusy = function (busy) {
      submitBtn.disabled = busy;
      submitBtn.textContent = busy ? MSG.sending : btnText;
    };
    newCaptcha();

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = f.name.value.trim();
      var email = f.email.value.trim();
      var subject = f.subject.value.trim() || MSG.defaultSubject;
      var message = f.message.value.trim();

      if (!name || !email || !message) return setStatus(MSG.required, "err");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setStatus(MSG.email, "err");
      if (parseInt(f.captcha.value.trim(), 10) !== ca + cb) {
        setStatus(MSG.captcha, "err");
        newCaptcha();
        f.captcha.value = "";
        return;
      }
      // Bot tuzağı: görünmeyen alan doluysa gönderme, başarılı gibi davran
      if (f.botcheck && f.botcheck.value) {
        setStatus(MSG.ok, "ok");
        form.reset();
        return;
      }

      var mailto = "mailto:" + MAIL + "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(t("Ad Soyad", "Name") + ": " + name + "\n" + t("E-posta", "Email") + ": " + email + "\n\n" + message + "\n");
      var ctrl = typeof AbortController === "function" ? new AbortController() : null;
      var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 15000);
      setBusy(true);
      setStatus("", "");

      fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: "EFEX216 — " + subject,
          from_name: "EFEX216 Web Sitesi",
          name: name,
          email: email,
          message: message,
          page: location.href
        }),
        signal: ctrl ? ctrl.signal : undefined
      })
        .then(function (r) {
          return r.json().catch(function () { return {}; }).then(function (d) {
            if (!r.ok || String(d.success) !== "true") throw new Error(d.message || "HTTP " + r.status);
          });
        })
        .then(function () {
          setStatus(MSG.ok, "ok");
          form.reset();
          newCaptcha();
        })
        .catch(function () {
          setStatus(MSG.fail, "err", mailto);
        })
        .then(function () {
          clearTimeout(timer);
          setBusy(false);
        });
    });
  }
})();
