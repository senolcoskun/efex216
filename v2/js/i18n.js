/* EFEX216 — TR/EN toggle (matches source Turkish text, no HTML changes needed) */
(function () {
  "use strict";

  var DICT = {
    // Nav
    "ANA SAYFA": "HOME", "KURUMSAL": "ABOUT", "HİZMETLERİMİZ": "SERVICES",
    "PROJELER": "PROJECTS", "REFERANSLAR": "REFERENCES", "İLETİŞİM": "CONTACT",
    // Hero (home)
    "Markanızı sahnenin merkezine taşıyoruz.": "We bring your brand to center stage.",
    "Yurt içi ve yurt dışı fuarlar için yaratıcı standlar, kongre kurguları ve kurumsal mekân tasarımları. Fikirden uygulamaya, tek elden çözüm ortağınız.":
      "Creative stands, congress setups and corporate interiors for domestic and international fairs. From idea to execution, your single-source partner.",
    "Hizmetlerimiz": "Our Services", "Projeleri Gör": "View Projects", "Projelerimiz": "Our Projects",
    // Highlights
    "Hibrit Sunum Mimarisi": "Hybrid Presentation Architecture",
    "Özel üretimin yaratıcılığını, modüler sistemlerin hız ve pratikliğiyle birleştirerek markanıza özgü sergileme çözümleri kurgularız.":
      "We combine the creativity of custom production with the speed and practicality of modular systems to build display solutions unique to your brand.",
    "Sürdürülebilir & Doğa Dostu": "Sustainable & Eco-Friendly",
    "Projelerimizde çevreye duyarlı malzemeler ve yenilikçi üretim yöntemleri kullanır; markalara değer katan, doğa dostu çözümler üretiriz.":
      "We use eco-friendly materials and innovative production methods, creating sustainable solutions that add value to brands.",
    "Uluslararası Yetkinlik": "International Expertise",
    "Tasarım, üretim ve uygulama kapasitemizle dünyanın her yerinde projeler gerçekleştirir; kalite ve zamanında teslimi garanti ederiz.":
      "With our design, production and implementation capacity we deliver projects worldwide, guaranteeing quality and on-time delivery.",
    // About / Kurumsal
    "KURUMSAL": "CORPORATE", "HAKKIMIZDA": "ABOUT US", "YAKLAŞIMIMIZ": "OUR APPROACH",
    "Sergilemenin mimarisini kuruyoruz.": "We build the architecture of exhibitions.",
    "Sergilemenin mimarisini kuruyoruz": "We build the architecture of exhibitions",
    "Fikirden uygulamaya, tek elden.": "From idea to execution, single-source.",
    "EFEX216 Mimarlık Hizmetleri; fuar standı tasarımı ve kurumsal mimari alanında çözüm odaklı, yenilikçi projeler geliştiren bir tasarım ve uygulama firmasıdır. Markaların hikâyesini üç boyutlu mekânlara taşıyoruz.":
      "EFEX216 Architecture Services is a design and implementation firm developing solution-focused, innovative projects in exhibition stand design and corporate architecture. We carry brands' stories into three-dimensional spaces.",
    "EFEX216 Mimarlık Hizmetleri; fuar standı tasarımı ve kurumsal mimari alanında çözüm odaklı, yenilikçi projeler geliştiren bir tasarım ve uygulama firmasıdır. Yurt içi ve yurt dışındaki fuarlarda, kongrelerde ve etkinliklerde markaların hikâyesini üç boyutlu mekânlara taşıyoruz.":
      "EFEX216 Architecture Services is a design and implementation firm developing solution-focused, innovative projects in exhibition stand design and corporate architecture. We carry brands' stories into three-dimensional spaces at fairs, congresses and events at home and abroad.",
    "Konsept geliştirmeden görselleştirmeye, üretimden sahadaki kuruluma kadar tüm süreci tek elden yönetiyor; her projeye kalite, estetik ve zamanında teslim disiplinini birlikte katıyoruz.":
      "From concept development to visualization, from production to on-site installation, we manage the entire process single-handedly, bringing quality, aesthetics and on-time delivery discipline to every project.",
    "Fuar Standı Tasarımı": "Exhibition Stand Design", "Kurumsal İç Mimarlık": "Corporate Interior Design",
    "Kongre & Etkinlik Standı": "Congress & Event Stands", "Ürün & Lansman Tasarımı": "Product & Launch Design",
    "Kurumsal": "About", "İletişime Geçin": "Get in Touch",
    "Bizi biz yapan değerler.": "The values that define us.",
    "Yaratıcı Tasarım": "Creative Design",
    "Her markanın hikâyesine özel, özgün ve dikkat çeken konseptler geliştiririz.":
      "We develop original, eye-catching concepts unique to each brand's story.",
    "Sürdürülebilirlik": "Sustainability",
    "Çevreye duyarlı malzemeler ve yenilikçi üretim yöntemleriyle doğa dostu çözümler üretiriz.":
      "We create eco-friendly solutions with sustainable materials and innovative production methods.",
    "Zamanında Teslim": "On-Time Delivery",
    "Uluslararası uygulama kapasitemizle kalite ve zamanında teslimi garanti ederiz.":
      "With our international capacity we guarantee quality and on-time delivery.",
    // Stats
    "Yıllık Deneyim": "Years of Experience", "Tamamlanan Proje": "Completed Projects",
    "Ülkede Uygulama": "Countries Served", "Mutlu Marka": "Happy Brands",
    // Services
    "UZMANLIK ALANLARIMIZ": "OUR EXPERTISE", "Sunduğumuz hizmetler.": "The services we offer.",
    "Fikirden uygulamaya, uçtan uca çözümler.": "End-to-end solutions, from idea to execution.",
    "Fuar, kongre ve kurumsal mekânlarda; konsept geliştirmeden üretime, kurulumdan sökümüne kadar tüm süreci tek elden yönetiyoruz.":
      "For fairs, congresses and corporate spaces, we manage the entire process single-handedly, from concept development to production, installation and dismantling.",
    "Yurt içi ve yurt dışı fuarlar için markanıza özel, dikkat çeken ve işlevsel stand tasarımları ve anahtar teslim uygulama.":
      "Custom, eye-catching and functional stand designs and turnkey implementation for domestic and international fairs.",
    "Kongre & Etkinlik Standları": "Congress & Event Stands",
    "Kongre, sempozyum ve kurumsal etkinlikler için sahne, karşılama ve sergileme alanlarının kurgusu.":
      "Design of stage, reception and display areas for congresses, symposiums and corporate events.",
    "AVM & Mağaza Standları": "Mall & Store Stands",
    "Alışveriş merkezleri ve perakende alanlar için ürün lansmanı, tanıtım adası ve satış noktası tasarımları.":
      "Product launch, promotion island and point-of-sale designs for shopping malls and retail spaces.",
    "Ofis, showroom ve ticari alanlar için markanızın kimliğini yansıtan iç mekân tasarımı ve uygulaması.":
      "Interior design and implementation reflecting your brand identity for offices, showrooms and commercial spaces.",
    "Sahne & Lansman Tasarımı": "Stage & Launch Design",
    "Ürün lansmanları, bayi toplantıları ve sahne kurguları için etkileyici, akılda kalıcı sahne mimarisi.":
      "Impressive, memorable stage architecture for product launches, dealer meetings and stage setups.",
    "Otel & Ticari Alan Tasarımı": "Hotel & Commercial Space Design",
    "Otel, restoran ve ticari mekânlar için konsept geliştirme, tasarım ve uygulama hizmetleri.":
      "Concept development, design and implementation services for hotels, restaurants and commercial spaces.",
    "Projeniz için size özel bir çözüm kuralım.": "Let us build a solution tailored to your project.",
    "Teklif Alın": "Get a Quote", "Teklif Al": "Get a Quote",
    // Projects
    "PORTFÖY": "PORTFOLIO", "Tüm projelerimiz.": "All our projects.", "Görünüm": "View",
    "Hayata geçirdiğimiz seçkin çalışmalar.": "Distinguished works we have realized.",
    "Fuar Standı": "Exhibition Stand", "Bir sonraki projenizi birlikte hayata geçirelim.": "Let's realize your next project together.",
    "Standın hikâyesi.": "The story of the stand.", "Marka": "Brand", "Fuar": "Fair", "Konum": "Location",
    "Yıl": "Year", "Alan": "Area", "Hizmet": "Service", "Tasarım & Uygulama": "Design & Implementation",
    "Benzer bir proje mi planlıyorsunuz?": "Planning a similar project?",
    "MMZ Boru için Wire Tube Eurasia 2025 fuarında tasarlayıp uyguladığımız 210 m²'lik stand; markanın endüstriyel gücünü modern ve ferah bir sergileme diliyle buluşturuyor. Ürün teşhir alanları, karşılama ve görüşme bölümleri tek bir bütün içinde kurgulandı.":
      "The 210 m² stand we designed and built for MMZ Boru at Wire Tube Eurasia 2025 merges the brand's industrial strength with a modern, spacious display language. Product display areas, reception and meeting sections were composed as a single whole.",
    // References
    "İŞ ORTAKLARIMIZ": "OUR PARTNERS", "Bize güven duyan markalar.": "Brands that trust us.",
    "Birlikte çalıştığımız markalar.": "Brands we work with.",
    "Fuar, kongre ve kurumsal projelerimizde birlikte çalıştığımız markalardan bazıları.":
      "Some of the brands we work with on our fair, congress and corporate projects.",
    // Contact
    "BİZE ULAŞIN": "GET IN TOUCH", "Yeni projeleri konuşalım.": "Let's talk about new projects.",
    "Fikirlerinizi dinleyelim.": "Let's hear your ideas.",
    "Bir sonraki fuarınız, kongreniz ya da kurumsal mekânınız için fikirlerinizi bize anlatın.":
      "Tell us your ideas for your next fair, congress or corporate space.",
    "Bir sonraki fuarınız, kongreniz ya da kurumsal mekânınız için bize yazın; size özel çözümü birlikte kuralım.":
      "Write to us for your next fair, congress or corporate space; let's build a tailored solution together.",
    "Adres": "Address", "E-posta": "Email", "Telefon": "Phone", "Sosyal": "Social",
    "Ad Soyad": "Full Name", "Konu": "Subject", "Mesajınız": "Your Message", "Gönder": "Send",
    "Doğrulama:": "Verification:",
    // Footer
    "Menü": "Menu", "Takip Edin": "Follow Us",
    "Mimarlık Hizmetleri — Exhibition Solutions. Fuar, kongre ve kurumsal mekânlarda tasarım ve uygulama çözüm ortağınız.":
      "Architecture Services — Exhibition Solutions. Your design and implementation partner for fairs, congresses and corporate spaces.",
    "Gizlilik": "Privacy", "Çerezler": "Cookies", "Aydınlatma Metni": "Disclosure",
    "Hakkımızda": "About Us", "Hizmetlerimiz": "Services", "Projeler": "Projects", "Referanslar": "References",
    // Breadcrumb
    "Ana Sayfa": "Home"
  };

  var BR = /<br\s*\/?>/gi;
  function keyOf(el) {
    return el.innerHTML.replace(BR, " ").replace(/\s+/g, " ").trim();
  }
  function translatable(el) {
    for (var i = 0; i < el.children.length; i++) {
      if (el.children[i].tagName !== "BR") return false;
    }
    return true;
  }
  function apply(lang) {
    var els = document.querySelectorAll(
      "h1,h2,h3,h4,h5,p,a,span,strong,button,label,li,th,td"
    );
    Array.prototype.forEach.call(els, function (el) {
      if (!translatable(el)) return;
      var orig = el.getAttribute("data-tr-html");
      if (orig === null) {
        orig = el.innerHTML;
        el.setAttribute("data-tr-html", orig);
      }
      if (lang === "en") {
        var t = DICT[keyOf(el)];
        if (t !== undefined) el.textContent = t;
      } else {
        el.innerHTML = orig;
      }
    });
    document.documentElement.setAttribute("lang", lang === "en" ? "en" : "tr");
    document.querySelectorAll(".nav-lang a").forEach(function (a) {
      var isEn = a.textContent.trim().toUpperCase() === "EN";
      a.classList.toggle("active", isEn === (lang === "en"));
    });
    try { localStorage.setItem("efex_lang", lang); } catch (e) {}
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest(".nav-lang a");
    if (!a) return;
    e.preventDefault();
    apply(a.textContent.trim().toUpperCase() === "EN" ? "en" : "tr");
  });

  // apply saved preference on load (header is injected by layout.js beforehand)
  var saved = null;
  try { saved = localStorage.getItem("efex_lang"); } catch (e) {}
  if (saved === "en") apply("en");
})();
