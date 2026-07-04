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

  var hMount = document.getElementById("header-mount");
  var fMount = document.getElementById("footer-mount");
  if (hMount) hMount.outerHTML = HEADER;
  if (fMount) fMount.outerHTML = FOOTER;

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
