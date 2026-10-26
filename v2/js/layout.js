/* EFEX216 — shared header & footer (single source for all pages) */
(function () {
  "use strict";

  var NAV = [
    { href: "index.html", label: "ANA SAYFA", key: "home" },
    { href: "kurumsal.html", label: "KURUMSAL", key: "kurumsal" },
    { href: "hizmetlerimiz.html", label: "HİZMETLERİMİZ", key: "hizmetler" },
    { href: "projeler.html", label: "PROJELER", key: "projeler" },
    { href: "referanslar.html", label: "REFERANSLAR", key: "referanslar" },
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
          '<img src="../img/logo-2026.svg" alt="EFEX216 Exhibition Solutions" class="logo-img" />' +
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
          '<img src="../img/logo-2026.svg" alt="EFEX216 Exhibition Solutions" class="footer-logo" />' +
          "<p>Mimarlık Hizmetleri — Exhibition Solutions. Fuar, kongre ve kurumsal mekânlarda tasarım ve uygulama çözüm ortağınız.</p>" +
        "</div>" +
        '<div class="footer-col"><h4>Menü</h4>' +
          '<a href="kurumsal.html">Kurumsal</a>' +
          '<a href="hizmetlerimiz.html">Hizmetlerimiz</a>' +
          '<a href="projeler.html">Projeler</a>' +
          '<a href="referanslar.html">Referanslar</a>' +
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
    var REFS = ["sixt", "fsm", "eurasia", "votek", "arpek", "caliskan", "coldmar", "ikiel", "okur", "otantik", "reya"];
    var refLogos = REFS.map(function (r) {
      return '<a href="referanslar.html"><img src="../img/reference/r_' + r + '.png" alt="' + r + '" loading="lazy" /></a>';
    }).join("");
    var li = function (items, delay) {
      return items.map(function (it, i) {
        return '<li' + (i === 0 ? ' class="h"' : "") + ' style="transition-delay:' + (delay + i * 0.04).toFixed(2) + 's">' + it + "</li>";
      }).join("");
    };
    HEADER =
      '<header class="td-header" id="header">' +
        '<a href="index.html" class="td-logo" aria-label="EFEX216 ana sayfa"><img src="../img/logo-2026.svg" alt="EFEX216 Mimarlık Hizmetleri" /></a>' +
        '<button class="td-menu-btn" id="tdMenuBtn" aria-label="Menü" aria-expanded="false" aria-controls="tdMenu" data-hover>' +
          '<span class="lbl"><span>MENU</span><span>KAPAT</span></span>' +
          '<span class="td-burger" aria-hidden="true"><i></i><i></i></span>' +
        "</button>" +
      "</header>" +
      '<nav class="td-menu" id="tdMenu" aria-label="Ana menü">' +
        '<div class="td-menu-inner">' +
          '<div class="td-menu-lang nav-lang"><a href="#" class="active">TR</a><span>/</span><a href="#">EN</a></div>' +
          '<div class="td-menu-top">' +
            '<ul class="td-menu-list">' + li([
              '<a href="projeler.html">PROJELER</a>',
              '<a href="proje-mmz-boru.html">MMZ Boru</a>',
              '<a href="projeler.html">Sixt</a>',
              '<a href="projeler.html">Ford</a>',
              '<a href="projeler.html">YEO</a>',
              '<a href="projeler.html">Tüm Projeler</a>'
            ], 0.25) + "</ul>" +
            '<ul class="td-menu-list">' + li([
              '<a href="hizmetlerimiz.html">HİZMETLERİMİZ</a>',
              '<a href="hizmetlerimiz.html">Fuar Standı Tasarımı</a>',
              '<a href="hizmetlerimiz.html">Kongre &amp; Etkinlik</a>',
              '<a href="hizmetlerimiz.html">AVM &amp; Mağaza</a>',
              '<a href="hizmetlerimiz.html">Kurumsal İç Mimarlık</a>',
              '<a href="hizmetlerimiz.html">Sahne &amp; Lansman</a>'
            ], 0.32) + "</ul>" +
            '<ul class="td-menu-list">' + li([
              '<a href="kurumsal.html">KURUMSAL</a>',
              '<a href="kurumsal.html">Hakkımızda</a>',
              '<a href="referanslar.html">Referanslar</a>',
              '<a href="iletisim.html">Teklif Al</a>'
            ], 0.39) + "</ul>" +
            '<ul class="td-menu-list">' + li([
              '<a href="iletisim.html">İLETİŞİM</a>',
              '<a href="mailto:info@efex216.com">info@efex216.com</a>',
              '<a href="tel:+905322864250">+90 532 286 42 50</a>',
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
