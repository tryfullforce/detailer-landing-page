/* FullForce fitment checker v2. One file, used by every lander and the store.
   Always open, tap to choose. Routes each vehicle to the product that truly fits it.
   10 Speed list = owner fitment table. V8 & V6 list = store list, real model years, 2007 to 2022. */
(function () {
  if (window.FFFit) return;
  var TEN_URL = 'https://www.tryfullforce.com/products/fullforce-10-speed';
  var OLD_URL = 'https://www.tryfullforce.com/products/fullforce%E2%84%A2-afm-dfm-disabler';
  var SUPPORT = 'support@tryfullforce.com';

  // V8 & V6 product: [engine, from, to]. Years are the model's real years, capped at 2022.
  function r(a, b, engines) { return engines.map(function (e) { return [e, a, b]; }); }
  var OLD = {
    Chevrolet: {
      'Silverado 1500': r(2007, 2022, ['4.3L V6', '5.3L V8', '6.0L V8', '6.2L V8']),
      'Silverado 1500 LD': r(2019, 2022, ['5.3L V8']),
      'Tahoe': r(2007, 2020, ['5.3L V8', '6.0L V8', '6.2L V8']),
      'Suburban': r(2007, 2020, ['5.3L V8', '6.0L V8', '6.2L V8']),
      'Avalanche': r(2007, 2013, ['5.3L V8', '6.0L V8', '6.2L V8']),
      'Express 1500': r(2007, 2014, ['5.3L V8']),
      'Colorado': r(2017, 2022, ['3.6L V6']),
      'Camaro': r(2010, 2022, ['3.6L V6', '6.2L V8']),
      'Corvette': r(2014, 2022, ['6.2L V8']),
      'SS': r(2014, 2017, ['6.2L V8']),
      'Caprice PPV': r(2011, 2017, ['6.0L V8']),
      'Impala': r(2007, 2011, ['3.9L V6', '5.3L V8']),
      'Malibu': r(2007, 2012, ['3.6L V6', '3.9L V6']),
      'Monte Carlo': r(2007, 2007, ['5.3L V8']),
      'Blazer': r(2019, 2022, ['3.6L V6']),
      'Equinox': r(2010, 2017, ['3.6L V6']),
      'Trailblazer': r(2007, 2009, ['5.3L V8']),
      'Uplander': r(2007, 2008, ['3.9L V6'])
    },
    GMC: {
      'Sierra 1500': r(2007, 2022, ['4.3L V6', '5.3L V8', '6.0L V8', '6.2L V8']),
      'Sierra Denali 1500': r(2007, 2022, ['6.2L V8', '5.3L V8']),
      'Yukon': r(2007, 2020, ['5.3L V8', '6.0L V8', '6.2L V8']),
      'Yukon XL': r(2007, 2020, ['5.3L V8', '6.0L V8', '6.2L V8']),
      'Yukon Denali': r(2007, 2020, ['6.2L V8']),
      'Yukon Denali XL': r(2007, 2020, ['6.2L V8']),
      'Canyon': r(2017, 2022, ['3.6L V6']),
      'Acadia': r(2007, 2022, ['3.6L V6']),
      'Envoy': r(2007, 2009, ['5.3L V8'])
    },
    Cadillac: {
      'Escalade / ESV': r(2007, 2020, ['6.0L V8', '6.2L V8']),
      'Escalade EXT': r(2007, 2013, ['6.2L V8']),
      'CT6': r(2016, 2020, ['3.0L V6', '3.6L V6']),
      'CTS': r(2008, 2019, ['3.6L V6', '6.2L V8']),
      'ATS': r(2013, 2019, ['3.6L V6']),
      'XT5': r(2017, 2022, ['3.6L V6']),
      'XTS': r(2013, 2019, ['3.6L V6']),
      'SRX': r(2010, 2016, ['3.6L V6']),
      'STS': r(2007, 2011, ['3.6L V6'])
    },
    Buick: {
      'Enclave': r(2008, 2022, ['3.6L V6']),
      'LaCrosse': r(2007, 2019, ['3.6L V6', '5.3L V8']),
      'Regal GS': r(2018, 2020, ['3.6L V6']),
      'Envision': r(2016, 2022, ['2.5L 4 cyl']),
      'Rainier': r(2007, 2007, ['5.3L V8']),
      'Rendezvous': r(2007, 2007, ['3.5L / 3.6L V6']),
      'Terraza': r(2007, 2007, ['3.9L V6'])
    },
    Holden: {
      'Commodore (VE / VF)': r(2007, 2017, ['3.6L V6', '6.0L V8']),
      'Calais / Statesman / Caprice': r(2007, 2017, ['3.6L V6', '6.0L V8']),
      'Crewman / UTE': r(2007, 2017, ['3.6L V6']),
      'Colorado': r(2012, 2017, ['3.6L V6'])
    },
    Pontiac: {
      'G8': r(2008, 2009, ['3.6L V6', '6.0L V8']),
      'G6': r(2007, 2010, ['3.6L V6', '3.9L V6']),
      'Grand Prix': r(2007, 2008, ['3.8L V6', '5.3L V8']),
      'Montana': r(2007, 2009, ['3.9L V6']),
      'Torrent': r(2007, 2009, ['3.6L V6'])
    }
  };
  // 10 Speed product: owner fitment table. 5.3L and 6.2L V8 only.
  var TEN = {
    Chevrolet: { 'Silverado 1500': [2022.5, 2026], 'Tahoe': [2021, 2024], 'Suburban': [2021, 2024] },
    GMC: { 'Sierra 1500': [2022.5, 2026], 'Sierra Denali 1500': [2022.5, 2026], 'Yukon': [2021, 2024], 'Yukon XL': [2021, 2024], 'Yukon Denali': [2021, 2024], 'Yukon Denali XL': [2021, 2024] }
  };
  // Newer years of these models that neither product covers yet (shown so nobody gets a false yes).
  var GAP = {
    Chevrolet: { 'Tahoe': [2025, 2026], 'Suburban': [2025, 2026] },
    GMC: { 'Yukon': [2025, 2026], 'Yukon XL': [2025, 2026], 'Yukon Denali': [2025, 2026], 'Yukon Denali XL': [2025, 2026] },
    Cadillac: { 'Escalade / ESV': [2021, 2026] }
  };
  var TRUCK = { 'Silverado 1500': 1, 'Sierra 1500': 1, 'Sierra Denali 1500': 1 };
  var MAKES = ['Chevrolet', 'GMC', 'Cadillac', 'Buick', 'Pontiac', 'Holden'];

  function models(mk) {
    var s = {}, out = [];
    [OLD, TEN, GAP].forEach(function (d) { Object.keys(d[mk] || {}).forEach(function (m) { if (!s[m]) { s[m] = 1; out.push(m); } }); });
    return out;
  }
  // Year chips: {v: value, t: label}. 2022 trucks split into the refreshed body and the Limited body.
  function years(mk, md) {
    var set = {};
    (OLD[mk] && OLD[mk][md] || []).forEach(function (x) { for (var y = x[1]; y <= x[2]; y++) set[y] = 1; });
    [TEN, GAP].forEach(function (d) { var g = d[mk] && d[mk][md]; if (g) for (var y = Math.ceil(g[0]); y <= g[1]; y++) set[y] = 1; });
    var ys = Object.keys(set).map(Number).sort(function (a, b) { return b - a; }), out = [];
    ys.forEach(function (y) {
      if (y === 2022 && TRUCK[md] && TEN[mk] && TEN[mk][md]) {
        out.push({ v: '2022.5', t: '2022 (new body, big center screen)' });
        out.push({ v: '2022', t: '2022 Limited (older body)' });
      } else out.push({ v: String(y), t: String(y) });
    });
    return out;
  }
  function inTen(mk, md, y) { var g = TEN[mk] && TEN[mk][md]; return !!(g && y >= g[0] && y <= g[1]); }
  function inGap(mk, md, y) { var g = GAP[mk] && GAP[mk][md]; return !!(g && y >= g[0] && y <= g[1]); }
  function engines(mk, md, y) {
    if (inTen(mk, md, y)) return TRUCK[md] ? ['5.3L V8', '6.2L V8', '2.7L TurboMax', '3.0L Duramax diesel'] : ['5.3L V8', '6.2L V8', '3.0L Duramax diesel'];
    if (inGap(mk, md, y)) return [];
    var out = [];
    (OLD[mk] && OLD[mk][md] || []).forEach(function (x) { if (y >= x[1] && y <= x[2] && out.indexOf(x[0]) < 0) out.push(x[0]); });
    if (out.length) out.push('Other engine');
    return out;
  }
  function verdict(mk, md, y, eng) {
    var car = (y === 2022.5 ? '2022 (new body)' : y) + ' ' + mk + ' ' + md;
    if (inGap(mk, md, y)) return { k: 'no', h: 'Not supported yet', b: 'We don’t support the ' + car + ' yet. Email ' + SUPPORT + ' and we’ll let you know when we do.' };
    if (inTen(mk, md, y)) {
      if (!/5\.3L|6\.2L/.test(eng)) return { k: 'no', h: 'Engine not supported', b: 'The 10 Speed supports the 5.3L and 6.2L V8 only. The ' + eng + ' is not supported.' };
      var yk = (/5\.3L/.test(eng) && y <= 2022.5) ? '<span class="fff-note">Quick check: if your glovebox label shows RPO code YK9, your truck was built without DFM or auto start stop.</span>' : '';
      return { k: 'ten', h: 'Fits FullForce™ 10 Speed', b: 'Your <b>' + car + '</b> with the <b>' + eng + '</b> is on the 10 Speed fitment list. It keeps DFM (AFM) off and turns auto start stop off every start.' + yk, u: TEN_URL, c: 'Get FullForce™ 10 Speed' };
    }
    if (eng === 'Other engine') return { k: 'no', h: 'Engine not supported', b: 'That engine doesn’t use cylinder deactivation, so there’s nothing for FullForce to turn off. Not sure? Email ' + SUPPORT + '.' };
    return { k: 'old', h: 'Fits FullForce™ V8 & V6', b: 'Your <b>' + car + '</b> with the <b>' + eng + '</b> is on the fitment list for the original FullForce™ AFM/DFM Disabler.', u: OLD_URL, c: 'Get FullForce™ V8 & V6' };
  }
  function pass(u) { // carry ad params (fbclid, utm) to the store
    var q = (location.search || '').replace(/^\?/, '');
    return q && location.hostname !== 'www.tryfullforce.com' ? u + (u.indexOf('?') > -1 ? '&' : '?') + q : u;
  }

  var CSS = '.fff{font:inherit;color:#0f1726;background:#fff;border:1px solid #dde1e7;border-top:4px solid #2a5cd8;border-radius:14px;padding:22px 20px 18px;margin:22px 0;box-shadow:0 2px 10px rgba(16,42,76,.06);text-align:left}' +
    '.fff *{box-sizing:border-box}.fff-top{display:flex;align-items:center;gap:10px;margin:0 0 4px}' +
    '.fff-badge{color:#2a5cd8;font-size:12px;font-weight:800;letter-spacing:.1em;text-transform:uppercase}' +
    '.fff h3{font-size:22px;line-height:1.25;margin:4px 0 4px;font-weight:800;color:#0f1726;letter-spacing:-.01em}.fff-sub{font-size:14.5px;color:#5b6170;margin:0 0 16px;line-height:1.5}' +
    '.fff-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px 12px;margin:4px 0 12px}@media(max-width:520px){.fff-grid{grid-template-columns:1fr}}' +
    '.fff-f{display:block;margin:0}.fff-f span{display:block;font-size:13px;font-weight:700;color:#1f2933;margin:0 0 6px}' +
    '.fff-f select{width:100%;appearance:none;-webkit-appearance:none;font:inherit;font-size:16px;color:#0f1726;background:#fff url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%278%27%3E%3Cpath d=%27M1 1l5 5 5-5%27 fill=%27none%27 stroke=%27%232a5cd8%27 stroke-width=%272%27/%3E%3C/svg%3E") no-repeat right 14px center;border:1.5px solid #cfd5e0;border-radius:10px;padding:12px 36px 12px 12px;min-height:48px;cursor:pointer;margin:0}' +
    '.fff-f select:focus{outline:none;border-color:#2a5cd8;box-shadow:0 0 0 3px rgba(42,92,216,.15)}.fff-f select:disabled{background-color:#f4f6fa;color:#9aa1ad;cursor:not-allowed}' +
    '.fff-btn{display:block;width:100%;border:0;background:#2a5cd8;color:#fff;font:inherit;font-weight:800;font-size:16px;padding:14px;border-radius:10px;cursor:pointer}.fff-btn:hover{background:#2149b3}' +
    '.fff-res{margin-top:14px;border-radius:12px;padding:16px;display:none}.fff-res.on{display:block}' +
    '.fff-res.ten,.fff-res.old{background:#ecfdf3;border:1.5px solid #16a34a}.fff-res.no{background:#fff7ed;border:1.5px solid #f59e0b}' +
    '.fff-rh{display:flex;align-items:center;gap:9px;font-weight:800;font-size:17px;margin:0 0 6px}' +
    '.fff-ic{width:26px;height:26px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;color:#fff;font-size:15px;flex:none}' +
    '.ten .fff-ic,.old .fff-ic{background:#16a34a}.no .fff-ic{background:#f59e0b}' +
    '.fff-rb{font-size:15px;line-height:1.55;margin:0;color:#1f2933}.fff-note{display:block;margin-top:8px;font-size:13.5px;color:#4a505c}' +
    '.fff-go{display:block;margin-top:12px;text-align:center;background:#16a34a;color:#fff!important;font-weight:800;font-size:16px;padding:14px;border-radius:10px;text-decoration:none!important}' +
    '.fff-go:hover{background:#12873d}.fff-foot{font-size:12.5px;color:#6b7280;margin:12px 0 0}';

  function addCss(root) {
    var host = root.head || root; if (host.querySelector && host.querySelector('style[data-fff]')) return;
    var s = document.createElement('style'); s.setAttribute('data-fff', '1'); s.textContent = CSS; host.appendChild(s);
  }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }

  function build(opts) {
    opts = opts || {};
    var w = el('div', 'fff'); w.setAttribute('data-fff-widget', '1');
    w.innerHTML = '<div class="fff-top"><span class="fff-badge">Fitment check</span></div>' +
      '<h3>' + (opts.title || 'Will it fit my vehicle?') + '</h3><p class="fff-sub">Pick your vehicle and we’ll match it to the FullForce™ that fits it.</p>' +
      '<div class="fff-grid">' +
      '<label class="fff-f"><span>Make</span><select data-k="mk"></select></label>' +
      '<label class="fff-f"><span>Model</span><select data-k="md" disabled></select></label>' +
      '<label class="fff-f"><span>Year</span><select data-k="yr" disabled></select></label>' +
      '<label class="fff-f"><span>Engine</span><select data-k="en" disabled></select></label>' +
      '</div><button type="button" class="fff-btn">Check fit</button>';
    var res = el('div', 'fff-res'); res.setAttribute('aria-live', 'polite'); w.appendChild(res);
    w.appendChild(el('p', 'fff-foot', 'Not sure? Email ' + SUPPORT + '. Every order has a 60 day money back guarantee.'));
    var S = {}; [].forEach.call(w.querySelectorAll('select'), function (x) { S[x.getAttribute('data-k')] = x; });
    function opts_(sel, items, ph) {
      sel.innerHTML = '<option value="">' + ph + '</option>' + items.map(function (it) { return '<option value="' + it.v + '">' + it.t + '</option>'; }).join('');
      sel.disabled = !items.length;
    }
    function clear() { res.className = 'fff-res'; res.innerHTML = ''; }
    function show(v) {
      res.className = 'fff-res on ' + v.k;
      res.innerHTML = '<div class="fff-rh"><span class="fff-ic">' + (v.k === 'no' ? '!' : '✓') + '</span>' + v.h + '</div><p class="fff-rb">' + v.b + '</p>' + (v.u ? '<a class="fff-go" href="' + pass(v.u) + '">' + v.c + ' &rarr;</a>' : '');
    }
    function L(a) { return a.map(function (x) { return { v: x, t: x }; }); }
    opts_(S.mk, L(MAKES), 'Select make');
    opts_(S.md, [], 'Select make first'); opts_(S.yr, [], 'Select model first'); opts_(S.en, [], 'Select year first');
    S.mk.addEventListener('change', function () { clear(); opts_(S.md, S.mk.value ? L(models(S.mk.value)) : [], S.mk.value ? 'Select model' : 'Select make first'); opts_(S.yr, [], 'Select model first'); opts_(S.en, [], 'Select year first'); });
    S.md.addEventListener('change', function () { clear(); opts_(S.yr, S.md.value ? years(S.mk.value, S.md.value) : [], S.md.value ? 'Select year' : 'Select model first'); opts_(S.en, [], 'Select year first'); });
    S.yr.addEventListener('change', function () {
      clear(); var y = parseFloat(S.yr.value);
      if (!S.yr.value) { opts_(S.en, [], 'Select year first'); return; }
      var en = engines(S.mk.value, S.md.value, y);
      if (!en.length) { opts_(S.en, [], 'Not available'); show(verdict(S.mk.value, S.md.value, y, '')); return; }
      opts_(S.en, L(en), 'Select engine');
    });
    S.en.addEventListener('change', function () { if (S.en.value) show(verdict(S.mk.value, S.md.value, parseFloat(S.yr.value), S.en.value)); else clear(); });
    w.querySelector('.fff-btn').addEventListener('click', function () {
      if (!S.mk.value || !S.md.value || !S.yr.value) { show({ k: 'no', h: 'Pick your vehicle', b: 'Choose your make, model, year and engine above, then tap Check fit.' }); return; }
      var y = parseFloat(S.yr.value), en = engines(S.mk.value, S.md.value, y);
      if (en.length && !S.en.value) { show({ k: 'no', h: 'Pick your engine', b: 'Choose your engine above to finish the check.' }); return; }
      show(verdict(S.mk.value, S.md.value, y, S.en.value || ''));
    });
    return w;
  }

  function mount(target, opts) {
    if (!target || target.getAttribute && target.getAttribute('data-fff-widget')) return null;
    addCss(target.getRootNode ? target.getRootNode() : document);
    var w = build(opts);
    if (target.id) w.id = target.id;
    // If the old checker sat inside a collapsed <details>, replace the whole thing so it is always open.
    var d = target.closest && target.closest('details.fitd'); if (d) target = d;
    target.parentNode.replaceChild(w, target);
    return w;
  }
  function scan(root) {
    [].forEach.call(root.querySelectorAll('.svfit, [data-fffit]'), function (t) { if (!t.closest('[data-fff-widget]')) mount(t); });
  }
  function auto() {
    scan(document);
    // Store product pages render inside a shadow root (#ff10, #fftx); check those too.
    ['ff10', 'fftx'].forEach(function (id) { var h = document.getElementById(id); if (h && h.shadowRoot) scan(h.shadowRoot); });
  }
  window.FFFit = { mount: mount, verdict: verdict, years: years, engines: engines, models: models, scan: auto };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', auto); else auto();
  window.addEventListener('load', auto); setTimeout(auto, 1200); setTimeout(auto, 3000);
})();
