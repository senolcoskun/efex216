/* EFEX216 — ortak header, menü ve footer (tüm sayfalar, TR/EN) */
(function () {
  "use strict";

  // Dil: kök = EN, tr/ = TR. Alt klasördeki sayfalar <body data-root="../"> ile site kökünü verir.
  var LANG = document.documentElement.lang === "tr" ? "tr" : "en";
  var ROOT = document.body.getAttribute("data-root") || "";
  var BASE = ROOT + (LANG === "tr" ? "tr/" : ""); // bu dilin sayfa kökü
  // Aşağıdaki linkler TR adlarıyla yazılır; EN sayfalarda İngilizce adreslere çevrilir
  var EN_URLS = {
    "bizkimiz.html": "about-us.html",
    "neleryapiyoruz.html": "services.html",
    "projeler.html": "projects.html",
    "isortakliklarimiz.html": "partners.html",
    "iletisim.html": "contact.html"
  };
  function langPath(p) {
    if (LANG !== "en") return p;
    if (p.indexOf("projeler/") === 0) return "projects/" + p.slice(9);
    var m = p.match(/^([^#?]*)(.*)$/);
    return (EN_URLS[m[1]] || m[1]) + m[2];
  }
  // Görseller site kökünden, sayfa linkleri aynı dilin kökünden
  function withRoot(html) {
    return html
      .replace(/src="(?!https?:|data:|\/)/g, 'src="' + ROOT)
      .replace(/href="(?!https?:|mailto:|tel:|#|\/)([^"]*)"/g, function (_, p) {
        return 'href="' + BASE + langPath(p) + '"';
      });
  }
  // EN/TR: karşı dildeki sayfanın adresi <head> içindeki hreflang etiketinden alınır
  function altHref(lang) {
    var l = document.querySelector('link[rel="alternate"][hreflang="' + lang + '"]');
    var p = l ? l.getAttribute("href").replace(/^https?:\/\/[^\/]+\//, "") : (lang === "tr" ? "tr/" : "");
    if (p === "" || p.slice(-1) === "/") p += "index.html";
    return ROOT + p;
  }
  var LANG_SWITCH =
    '<a href="' + altHref("en") + '" lang="en" hreflang="en"' + (LANG === "en" ? ' class="active" aria-current="true"' : "") + '>EN</a>' +
    "<span>/</span>" +
    '<a href="' + altHref("tr") + '" lang="tr" hreflang="tr"' + (LANG === "tr" ? ' class="active" aria-current="true"' : "") + '>TR</a>';
  // Metinler: t("Türkçe", "English") — sayfanın diline göre seçilir
  function t(tr, en) { return LANG === "tr" ? tr : en; }

  var refLogos = "";
  for (var r = 1; r <= 12; r++) {
    refLogos += '<a href="isortakliklarimiz.html"><img src="img/r' + r + '.png" alt="' + t("İş ortağı logosu", "Partner logo") + '" loading="lazy" /></a>';
  }
  var li = function (items, delay) {
    return items.map(function (it, i) {
      return '<li' + (i === 0 ? ' class="h"' : "") + ' style="transition-delay:' + (delay + i * 0.04).toFixed(2) + 's">' + it + "</li>";
    }).join("");
  };
  var HEADER =
    '<header class="td-header" id="header">' +
      '<a href="index.html" class="td-logo" aria-label="' + t("EFEX216 ana sayfa", "EFEX216 home") + '"><img src="img/logo-2026.svg" alt="' + t("EFEX216 Mimarlık Hizmetleri", "EFEX216 Architecture Services") + '" /></a>' +
      '<div class="td-head-right">' +
      '<div class="td-lang nav-lang" aria-label="' + t("Dil seçimi", "Language") + '">@@LANG@@</div>' +
      '<button class="td-theme" id="tdTheme" type="button" aria-label="' + t("Açık / koyu tema", "Light / dark theme") + '" title="' + t("Açık / koyu tema", "Light / dark theme") + '">' +
        '<svg class="sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6"/></svg>' +
        '<svg class="moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.6A8 8 0 0 1 9.4 4a8 8 0 1 0 10.6 10.6z"/></svg>' +
      "</button>" +
      '<button class="td-menu-btn" id="tdMenuBtn" aria-label="' + t("Menü", "Menu") + '" aria-expanded="false" aria-controls="tdMenu" data-hover>' +
        '<span class="lbl"><span>' + "MENU" + '</span><span>' + t("KAPAT", "CLOSE") + '</span></span>' +
        '<span class="td-burger" aria-hidden="true"><i></i><i></i></span>' +
      "</button>" +
      "</div>" +
    "</header>" +
    '<nav class="td-menu" id="tdMenu" aria-label="' + t("Ana menü", "Main menu") + '">' +
      '<div class="td-menu-inner">' +
        '<div class="td-menu-top">' +
          '<ul class="td-menu-list">' + li([
            '<a href="projeler.html">' + t("PROJELER", "PROJECTS") + '</a>',
            '<a href="projeler/mmz-boru-ve-profil-wire-tube-2026.html">MMZ Boru — Wire Tube 2026</a>',
            '<a href="projeler/gurbetciler-plastik-yapi-2026.html">' + t("Gurbetçiler — Yapı 2026", "Gurbetçiler — Turkey Build 2026") + '</a>',
            '<a href="projeler/daty-car-detailing-ticari-mekan-2026.html">Daty Car Detailing</a>',
            '<a href="projeler/aydin-dag-evi-celik-yapi-2026.html">' + t("Aydın Dağ Evi", "Aydın Chalet") + '</a>',
            '<a href="projeler.html">' + t("Tüm Projeler", "All Projects") + '</a>'
          ], 0.25) + "</ul>" +
          '<ul class="td-menu-list">' + li([
            '<a href="neleryapiyoruz.html">' + t("NELER YAPIYORUZ?", "WHAT ARE WE DOING?") + '</a>',
            '<a href="neleryapiyoruz.html#stant">' + t("Stant Tasarım &amp; Uygulama", "Stand Design &amp; Implementation") + '</a>',
            '<a href="neleryapiyoruz.html#kurumsal">' + t("Kurumsal Mimari", "Corporate Architecture") + '</a>',
            '<a href="neleryapiyoruz.html#urun">' + t("Özel Ürün Çözümleri", "Custom Product Solutions") + '</a>',
            '<a href="neleryapiyoruz.html#yonetim">' + t("Proje Yönetimi &amp; Uygulama", "Project Management &amp; Implementation") + '</a>'
          ], 0.32) + "</ul>" +
          '<ul class="td-menu-list">' + li([
            '<a href="bizkimiz.html">' + t("BİZ KİMİZ?", "WHO ARE WE?") + '</a>',
            '<a href="bizkimiz.html">' + t("Hakkımızda", "About Us") + '</a>',
            '<a href="isortakliklarimiz.html">' + t("İş Ortaklıklarımız", "Business Partnerships") + '</a>',
            '<a href="iletisim.html">' + t("Teklif Al", "Get a Quote") + '</a>'
          ], 0.39) + "</ul>" +
          '<ul class="td-menu-list">' + li([
            '<a href="iletisim.html">' + t("DESTEK VE İLETİŞİM", "SUPPORT AND CONTACT") + '</a>',
            '<a href="mailto:info@efex216.com">info@efex216.com</a>',
            '<a href="tel:+905322864250">' + t("Satış", "Sales") + ': +90 532 286 42 50</a>',
            '<a href="tel:+905301135050">' + t("7/24 Destek", "24/7 Support") + ': +90 530 113 50 50</a>',
            '<a href="https://www.instagram.com/efex216" target="_blank" rel="noopener">Instagram</a>',
            '<a href="https://www.linkedin.com/company/efex216" target="_blank" rel="noopener">LinkedIn</a>'
          ], 0.46) + "</ul>" +
        "</div>" +
        '<div class="td-menu-sep"></div>' +
        '<div class="td-menu-logos">' + refLogos + "</div>" +
      "</div>" +
    "</nav>";
  var FOOTER =
    '<footer class="td-footer">' +
      "<span>© <span id=\"year\"></span> " + t("EFEX216 Mimarlık Hizmetleri", "EFEX216 Architecture Services") + "</span>" +
      "<nav>" +
        '<a href="https://www.instagram.com/efex216" target="_blank" rel="noopener">Instagram</a>' +
        '<a href="https://www.facebook.com/efex216" target="_blank" rel="noopener">Facebook</a>' +
        '<a href="https://www.linkedin.com/company/efex216" target="_blank" rel="noopener">LinkedIn</a>' +
        '<a href="https://www.youtube.com/channel/UCXNI2Lc4kJvVno724NoRoqg" target="_blank" rel="noopener">YouTube</a>' +
      "</nav>" +
      '<span>Developed by <a href="https://senolcoskun.com" target="_blank" rel="noopener">Şenol Coşkun</a></span>' +
    "</footer>" +
    '<a class="td-wa" href="https://wa.me/905322864250?text=' + encodeURIComponent(t("Merhaba, EFEX216 web sitesinden ulaşıyorum.", "Hello, I am reaching out from the EFEX216 website.")) + '" target="_blank" rel="noopener" aria-label="' + t("WhatsApp üzerinden yazın", "Message us on WhatsApp") + '">' +
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>' +
      '<span class="td-wa-label">' + t("WhatsApp\'tan yazın", "Message us on WhatsApp") + '</span>' +
    "</a>";

  var hMount = document.getElementById("header-mount");
  var fMount = document.getElementById("footer-mount");
  if (hMount) hMount.outerHTML = withRoot(HEADER).replace("@@LANG@@", LANG_SWITCH);
  if (fMount) fMount.outerHTML = withRoot(FOOTER);

  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
