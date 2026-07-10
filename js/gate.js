/* EFEX216 — cyber-style entry gate (client-side password overlay)
 *
 * NOT: Bu istemci tarafı bir kapıdır, gerçek bir güvenlik katmanı değildir.
 * Şifre SHA-256 ile hash'lenerek saklanır (düz metin görünmez), ancak
 * kararlı bir erişim kısıtlaması için sunucu tarafı koruma gerekir.
 *
 * Şifreyi değiştirmek için: yeni şifrenin SHA-256 hash'ini üretip
 * aşağıdaki PASS_HASH değerini güncelleyin.
 *   Terminal:  printf '%s' 'yeni-sifre' | shasum -a 256
 */
(function () {
  "use strict";

  var PASS_HASH = "e42517923bac22696b64f946b75335129371ec30d5a414bb496f6039edaff7ee"; // efex216
  var STORE_KEY = "efex216_gate";
  var store = window.sessionStorage; // tarayıcı kapanana kadar hatırla

  // Zaten doğrulanmışsa hiçbir şey yapma
  try {
    if (store.getItem(STORE_KEY) === PASS_HASH) return;
  } catch (e) {}

  // İçeriğin şifre girilmeden görünmesini engelle
  var htmlEl = document.documentElement;
  var lockStyle = document.createElement("style");
  lockStyle.id = "gate-lock";
  lockStyle.textContent = "body{visibility:hidden!important}#efex-gate{visibility:visible!important}";
  (document.head || htmlEl).appendChild(lockStyle);

  async function sha256(str) {
    var buf = new TextEncoder().encode(str);
    var hash = await crypto.subtle.digest("SHA-256", buf);
    return Array.prototype.map
      .call(new Uint8Array(hash), function (b) {
        return b.toString(16).padStart(2, "0");
      })
      .join("");
  }

  var CSS =
    "#efex-gate{position:fixed;inset:0;z-index:2147483647;display:flex;align-items:center;" +
    "justify-content:center;background:#05060a;font-family:'Montserrat',system-ui,sans-serif;" +
    "overflow:hidden}" +
    "#efex-gate .grid{position:absolute;inset:0;background-image:" +
    "linear-gradient(rgba(0,240,255,.07) 1px,transparent 1px)," +
    "linear-gradient(90deg,rgba(0,240,255,.07) 1px,transparent 1px);" +
    "background-size:44px 44px;animation:gateGrid 12s linear infinite}" +
    "@keyframes gateGrid{to{background-position:0 44px,44px 0}}" +
    "#efex-gate .glow{position:absolute;width:60vw;height:60vw;max-width:640px;max-height:640px;" +
    "border-radius:50%;background:radial-gradient(circle,rgba(0,240,255,.18),transparent 70%);" +
    "filter:blur(30px);animation:gatePulse 5s ease-in-out infinite}" +
    "@keyframes gatePulse{0%,100%{transform:scale(1);opacity:.6}50%{transform:scale(1.15);opacity:1}}" +
    "#efex-gate .box{position:relative;width:min(90vw,380px);padding:38px 32px 34px;text-align:center;" +
    "background:rgba(10,14,22,.72);border:1px solid rgba(0,240,255,.35);border-radius:14px;" +
    "box-shadow:0 0 0 1px rgba(0,240,255,.08),0 0 40px rgba(0,240,255,.15);backdrop-filter:blur(6px)}" +
    "#efex-gate .logo{width:120px;height:auto;margin:0 auto 22px;display:block;opacity:.95}" +
    "#efex-gate h1{margin:0 0 6px;color:#e7fbff;font-size:15px;font-weight:700;letter-spacing:3px;text-transform:uppercase}" +
    "#efex-gate p{margin:0 0 22px;color:#5f8794;font-size:11px;letter-spacing:1.5px}" +
    "#efex-gate .field{position:relative}" +
    "#efex-gate input{width:100%;padding:14px 16px;background:rgba(0,0,0,.45);color:#e7fbff;" +
    "border:1px solid rgba(0,240,255,.35);border-radius:8px;font-size:14px;letter-spacing:2px;" +
    "text-align:center;outline:none;transition:border-color .2s,box-shadow .2s;box-sizing:border-box}" +
    "#efex-gate input:focus{border-color:#00f0ff;box-shadow:0 0 16px rgba(0,240,255,.35)}" +
    "#efex-gate button{width:100%;margin-top:14px;padding:13px 16px;background:linear-gradient(135deg,#00f0ff,#0088aa);" +
    "color:#04121a;border:0;border-radius:8px;font-size:12px;font-weight:800;letter-spacing:2px;" +
    "text-transform:uppercase;cursor:pointer;transition:filter .2s,transform .05s}" +
    "#efex-gate button:hover{filter:brightness(1.12)}#efex-gate button:active{transform:translateY(1px)}" +
    "#efex-gate .err{min-height:16px;margin-top:12px;color:#ff5470;font-size:11px;letter-spacing:1px;opacity:0;transition:opacity .2s}" +
    "#efex-gate.shake .box{animation:gateShake .4s}" +
    "@keyframes gateShake{0%,100%{transform:translateX(0)}20%,60%{transform:translateX(-9px)}40%,80%{transform:translateX(9px)}}";

  function build() {
    var style = document.createElement("style");
    style.textContent = CSS;
    document.head.appendChild(style);

    var gate = document.createElement("div");
    gate.id = "efex-gate";
    gate.innerHTML =
      '<div class="grid"></div><div class="glow"></div>' +
      '<div class="box">' +
      '<img class="logo" src="img/logo-2026.svg" alt="EFEX216" onerror="this.style.display=\'none\'"/>' +
      "<h1>Erişim Kısıtlı</h1>" +
      "<p>Devam etmek için şifreyi girin</p>" +
      '<form class="field" autocomplete="off">' +
      '<input type="password" id="efex-gate-input" placeholder="••••••••" autofocus />' +
      '<button type="submit">Giriş</button>' +
      "</form>" +
      '<div class="err" id="efex-gate-err">Hatalı şifre</div>' +
      "</div>";
    document.body.appendChild(gate);

    var form = gate.querySelector("form");
    var input = gate.querySelector("#efex-gate-input");
    var err = gate.querySelector("#efex-gate-err");
    input.focus();

    form.addEventListener("submit", async function (ev) {
      ev.preventDefault();
      var val = input.value;
      var hash = await sha256(val);
      if (hash === PASS_HASH) {
        try {
          store.setItem(STORE_KEY, PASS_HASH);
        } catch (e) {}
        var lock = document.getElementById("gate-lock");
        if (lock) lock.remove();
        gate.remove();
      } else {
        err.style.opacity = "1";
        gate.classList.add("shake");
        input.value = "";
        input.focus();
        setTimeout(function () {
          gate.classList.remove("shake");
        }, 400);
      }
    });
  }

  if (document.body) build();
  else document.addEventListener("DOMContentLoaded", build);
})();
