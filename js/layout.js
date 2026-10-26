/* EFEX216 — shared header & footer (single source for all pages) */
(function () {
  "use strict";

  var NAV = [
    { href: "index.html", label: "ANA SAYFA", key: "home" },
    { href: "bizkimiz.html", label: "BİZ KİMİZ?", key: "kurumsal" },
    { href: "neleryapiyoruz.html", label: "NELER YAPIYORUZ?", key: "hizmetler" },
    { href: "projeler.html", label: "PROJELER", key: "projeler" },
    { href: "isortakliklarimiz.html", label: "İŞ ORTAKLIKLARIMIZ", key: "referanslar" },
    { href: "iletisim.html", label: "İLETİŞİM", key: "iletisim" }
  ];

  var page = document.body.getAttribute("data-page") || "home";

  var navLinks = NAV.map(function (n) {
    var active = n.key === page ? " active" : "";
    return '<a href="' + n.href + '" class="nav-link' + active + '">' + n.label + "</a>";
  }).join("");

  var HEADER =
    '<header class="site-header" id="header">' +
      '<div class="container header-inner">' +
        '<a href="index.html" class="brand" aria-label="EFEX216 ana sayfa">' +
          '<img src="img/logo-2026.svg" alt="EFEX216 Exhibition Solutions" class="logo-img" />' +
        "</a>" +
        '<nav class="nav" id="nav">' + navLinks +
          '<span class="nav-lang"><a href="#" class="active">TR</a><span>/</span><a href="#">EN</a></span>' +
        "</nav>" +
        '<button class="nav-toggle" id="navToggle" aria-label="Menü" aria-expanded="false">' +
          "<span></span><span></span><span></span>" +
        "</button>" +
      "</div>" +
    "</header>";

  var FOOTER =
    '<footer class="site-footer">' +
      '<div class="container footer-grid">' +
        '<div class="footer-brand">' +
          '<img src="img/logo-2026.svg" alt="EFEX216 Exhibition Solutions" class="footer-logo" />' +
          "<p>Mimarlık Hizmetleri — Exhibition Solutions. Fuar, kongre ve kurumsal mekânlarda tasarım ve uygulama çözüm ortağınız.</p>" +
        "</div>" +
        '<div class="footer-col"><h4>Menü</h4>' +
          '<a href="bizkimiz.html">Biz Kimiz?</a>' +
          '<a href="neleryapiyoruz.html">Neler Yapıyoruz?</a>' +
          '<a href="projeler.html">Projeler</a>' +
          '<a href="isortakliklarimiz.html">İş Ortaklıklarımız</a>' +
        "</div>" +
        '<div class="footer-col"><h4>İletişim</h4>' +
          '<a href="mailto:info@efex216.com">info@efex216.com</a>' +
          '<a href="tel:+905322864250">+90 532 286 42 50</a>' +
          '<a href="iletisim.html">Teklif Al</a>' +
        "</div>" +
        '<div class="footer-col"><h4>Takip Edin</h4>' +
          '<a href="https://www.instagram.com/efex216" target="_blank" rel="noopener">Instagram</a>' +
          '<a href="https://www.facebook.com/efex216" target="_blank" rel="noopener">Facebook</a>' +
          '<a href="https://www.linkedin.com/company/efex216" target="_blank" rel="noopener">LinkedIn</a>' +
          '<a href="https://www.youtube.com/channel/UCXNI2Lc4kJvVno724NoRoqg" target="_blank" rel="noopener">YouTube</a>' +
        "</div>" +
      "</div>" +
      '<div class="container footer-bottom">' +
        "<span>© <span id=\"year\"></span> EFEX216 Mimarlık Hizmetleri. Tüm hakları saklıdır.</span>" +
        '<span class="footer-legal"><a href="#">Gizlilik</a> · <a href="#">Çerezler</a> · <a href="#">Aydınlatma Metni</a></span>' +
        '<span class="footer-credit">Developed by <a href="https://senolcoskun.com" target="_blank" rel="noopener">Şenol Coşkun</a></span>' +
      "</div>" +
    "</footer>";

  /* Tüm sayfalar: terminaldesign tarzı header + tam ekran menü + sade footer */
  if (document.body.classList.contains("td")) {
    var refLogos = "";
    for (var r = 1; r <= 12; r++) {
      refLogos += '<a href="isortakliklarimiz.html"><img src="img/v2/refs/r' + r + '.png" alt="İş ortağı logosu" loading="lazy" /></a>';
    }
    var li = function (items, delay) {
      return items.map(function (it, i) {
        return '<li' + (i === 0 ? ' class="h"' : "") + ' style="transition-delay:' + (delay + i * 0.04).toFixed(2) + 's">' + it + "</li>";
      }).join("");
    };
    HEADER =
      '<header class="td-header" id="header">' +
        '<a href="index.html" class="td-logo" aria-label="EFEX216 ana sayfa"><img src="img/logo-2026.svg" alt="EFEX216 Mimarlık Hizmetleri" /></a>' +
        '<div class="td-head-right">' +
        '<div class="td-lang nav-lang" aria-label="Dil seçimi"><a href="#" class="active" lang="tr">TR</a><span>/</span><a href="#" lang="en">EN</a></div>' +
        '<button class="td-menu-btn" id="tdMenuBtn" aria-label="Menü" aria-expanded="false" aria-controls="tdMenu" data-hover>' +
          '<span class="lbl"><span>MENU</span><span>KAPAT</span></span>' +
          '<span class="td-burger" aria-hidden="true"><i></i><i></i></span>' +
        "</button>" +
        "</div>" +
      "</header>" +
      '<nav class="td-menu" id="tdMenu" aria-label="Ana menü">' +
        '<div class="td-menu-inner">' +
          '<div class="td-menu-top">' +
            '<ul class="td-menu-list">' + li([
              '<a href="projeler.html">PROJELER</a>',
              '<a href="proje_efex216_1.html">MMZ Boru — Wire Tube 2026</a>',
              '<a href="proje_efex216_2.html">Gurbetçiler — Yapı 2026</a>',
              '<a href="proje_efex216_7.html">Daty Car Detailing</a>',
              '<a href="proje_efex216_36.html">Aydın Dağ Evi</a>',
              '<a href="projeler.html">Tüm Projeler</a>'
            ], 0.25) + "</ul>" +
            '<ul class="td-menu-list">' + li([
              '<a href="neleryapiyoruz.html">NELER YAPIYORUZ?</a>',
              '<a href="neleryapiyoruz.html#stant">Stant Tasarım &amp; Uygulama</a>',
              '<a href="neleryapiyoruz.html#kurumsal">Kurumsal Mimari</a>',
              '<a href="neleryapiyoruz.html#urun">Özel Ürün Çözümleri</a>',
              '<a href="neleryapiyoruz.html#yonetim">Proje Yönetimi &amp; Uygulama</a>'
            ], 0.32) + "</ul>" +
            '<ul class="td-menu-list">' + li([
              '<a href="bizkimiz.html">BİZ KİMİZ?</a>',
              '<a href="bizkimiz.html">Hakkımızda</a>',
              '<a href="isortakliklarimiz.html">İş Ortaklıklarımız</a>',
              '<a href="iletisim.html">Teklif Al</a>'
            ], 0.39) + "</ul>" +
            '<ul class="td-menu-list">' + li([
              '<a href="iletisim.html">DESTEK VE İLETİŞİM</a>',
              '<a href="mailto:info@efex216.com">info@efex216.com</a>',
              '<a href="tel:+905322864250">Satış: +90 532 286 42 50</a>',
              '<a href="tel:+905301135050">7/24 Destek: +90 530 113 50 50</a>',
              '<a href="https://www.instagram.com/efex216" target="_blank" rel="noopener">Instagram</a>',
              '<a href="https://www.linkedin.com/company/efex216" target="_blank" rel="noopener">LinkedIn</a>'
            ], 0.46) + "</ul>" +
          "</div>" +
          '<div class="td-menu-sep"></div>' +
          '<div class="td-menu-logos">' + refLogos + "</div>" +
        "</div>" +
      "</nav>";
    FOOTER =
      '<footer class="td-footer">' +
        "<span>© <span id=\"year\"></span> EFEX216 Mimarlık Hizmetleri</span>" +
        "<nav>" +
          '<a href="https://www.instagram.com/efex216" target="_blank" rel="noopener">Instagram</a>' +
          '<a href="https://www.facebook.com/efex216" target="_blank" rel="noopener">Facebook</a>' +
          '<a href="https://www.linkedin.com/company/efex216" target="_blank" rel="noopener">LinkedIn</a>' +
          '<a href="https://www.youtube.com/channel/UCXNI2Lc4kJvVno724NoRoqg" target="_blank" rel="noopener">YouTube</a>' +
        "</nav>" +
        '<span>Developed by <a href="https://senolcoskun.com" target="_blank" rel="noopener">Şenol Coşkun</a></span>' +
      "</footer>";
  }

  var hMount = document.getElementById("header-mount");
  var fMount = document.getElementById("footer-mount");
  if (hMount) hMount.outerHTML = HEADER;
  if (fMount) fMount.outerHTML = FOOTER;

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
