/* FullForce fitment checker v3 (Oct 28 2026). One file, used by every lander and the store.
   Always open, tap to choose. Routes each vehicle to the product that truly fits it.
   10 Speed list = owner fitment table. V8 & V6 list = fact checked: only engines with AFM or DFM, 2007 to 2022. */
(function () {
  if (window.FFFit) return;
  var TEN_URL = 'https://www.tryfullforce.com/products/fullforce-10-speed';
  var OLD_URL = 'https://www.tryfullforce.com/products/fullforce%E2%84%A2-afm-dfm-disabler';
  var SUPPORT = 'support@tryfullforce.com';

  // V8 & V6 product, fact checked Oct 28 2026 against GM bulletin 20-NA-038 and engine records.
  // Each entry: [engine, from, to, status]. y = fits, n = engine has no AFM/DFM, x = not supported, c = confirm with support.
  function e(name, a, b, s) { return [name, a, b, s || 'y']; }
  var TRUCK_OLD = [
    e('5.3L V8', 2007, 2022), e('6.2L V8', 2014, 2022), e('6.2L V8', 2007, 2013, 'n'),
    e('4.3L V6', 2014, 2021), e('4.3L V6', 2007, 2013, 'n'), e('6.0L V8', 2007, 2013), e('4.8L V8', 2007, 2013, 'n'),
    e('2.7L Turbo 4 cyl', 2019, 2022, 'x'), e('3.0L Duramax diesel', 2020, 2022, 'n')
  ];
  var OLD = {
    Chevrolet: {
      'Silverado 1500': TRUCK_OLD,
      'Silverado 1500 LD': [e('5.3L V8', 2019, 2019), e('4.3L V6', 2019, 2019)],
      'Tahoe': [e('5.3L V8', 2007, 2020), e('6.2L V8', 2015, 2020), e('6.2L V8', 2007, 2009, 'n'), e('6.0L V8 Hybrid', 2008, 2013), e('4.8L V8', 2007, 2009, 'n')],
      'Suburban': [e('5.3L V8', 2007, 2020), e('6.2L V8', 2015, 2020), e('6.0L V8 (2500 HD)', 2007, 2013, 'n')],
      'Avalanche': [e('5.3L V8', 2007, 2013)],
      'Express 1500': [e('5.3L V8', 2007, 2014, 'c')],
      'Colorado': [e('3.6L V6', 2017, 2022), e('3.6L V6', 2015, 2016, 'n')],
      'Camaro': [e('3.6L V6', 2016, 2022), e('3.6L V6', 2010, 2015, 'n'), e('6.2L V8 SS automatic', 2010, 2022), e('6.2L V8 SS manual', 2010, 2022, 'n'), e('6.2L V8 supercharged ZL1', 2012, 2022, 'n')],
      'Corvette': [e('6.2L V8', 2014, 2022), e('6.2L V8 supercharged ZR1', 2019, 2019, 'n')],
      'Caprice PPV': [e('6.0L V8', 2011, 2017)],
      'Impala': [e('5.3L V8 SS', 2007, 2009), e('3.9L V6', 2007, 2008), e('3.9L V6', 2009, 2011, 'n'), e('3.5L V6', 2007, 2011, 'n')],
      'Monte Carlo': [e('5.3L V8 SS', 2007, 2007), e('3.5L V6', 2007, 2007, 'n')],
      'Blazer': [e('3.6L V6', 2019, 2022)],
      'Trailblazer': [e('5.3L V8', 2007, 2009), e('6.0L V8 SS', 2007, 2009, 'n'), e('4.2L 6 cyl', 2007, 2009, 'n')]
    },
    GMC: {
      'Sierra 1500': TRUCK_OLD,
      'Sierra Denali 1500': [e('6.2L V8', 2014, 2022), e('6.2L V8', 2007, 2013, 'n'), e('5.3L V8', 2014, 2022), e('3.0L Duramax diesel', 2020, 2022, 'n')],
      'Yukon': [e('5.3L V8', 2007, 2020), e('6.2L V8', 2015, 2020), e('6.2L V8', 2007, 2009, 'n'), e('6.0L V8 Hybrid', 2008, 2013), e('4.8L V8', 2007, 2009, 'n')],
      'Yukon XL': [e('5.3L V8', 2007, 2020), e('6.2L V8', 2015, 2020), e('6.0L V8 (2500 HD)', 2007, 2013, 'n')],
      'Yukon Denali': [e('6.2L V8', 2010, 2020), e('6.2L V8', 2007, 2009, 'n')],
      'Yukon Denali XL': [e('6.2L V8', 2010, 2020), e('6.2L V8', 2007, 2009, 'n')],
      'Canyon': [e('3.6L V6', 2017, 2022), e('3.6L V6', 2015, 2016, 'n')],
      'Acadia': [e('3.6L V6', 2017, 2022), e('3.6L V6', 2007, 2016, 'n')],
      'Envoy': [e('5.3L V8 (Denali)', 2007, 2009), e('4.2L 6 cyl', 2007, 2009, 'n')]
    },
    Cadillac: {
      'Escalade / ESV': [e('6.2L V8', 2010, 2020), e('6.2L V8', 2007, 2009, 'n'), e('6.0L V8 Hybrid', 2009, 2013)],
      'Escalade EXT': [e('6.2L V8', 2010, 2013), e('6.2L V8', 2007, 2009, 'n')],
      'CT6': [e('3.6L V6', 2016, 2020), e('3.0L Twin Turbo V6', 2016, 2020), e('4.2L Twin Turbo V8', 2019, 2020)],
      'CTS': [e('3.6L V6', 2016, 2019), e('3.6L V6', 2008, 2015, 'n'), e('6.2L V8 supercharged (CTS-V)', 2016, 2019), e('6.2L V8 supercharged (CTS-V)', 2009, 2015, 'n')],
      'ATS': [e('3.6L V6', 2016, 2019), e('3.6L V6', 2013, 2015, 'n')],
      'XT5': [e('3.6L V6', 2017, 2022)],
      'XT6': [e('3.6L V6', 2020, 2022)]
    },
    Buick: {
      'LaCrosse': [e('5.3L V8 (Super)', 2008, 2009), e('3.6L V6', 2017, 2019), e('3.6L V6', 2007, 2016, 'n')],
      'Regal GS': [e('3.6L V6', 2018, 2020)],
      'Rainier': [e('5.3L V8', 2007, 2007), e('4.2L 6 cyl', 2007, 2007, 'n')]
    },
    Holden: {
      'Commodore (VE / VF)': [e('6.0L V8 automatic', 2009, 2017), e('3.6L V6', 2007, 2017, 'n')],
      'Calais / Statesman / Caprice': [e('6.0L V8 automatic', 2009, 2017), e('3.6L V6', 2007, 2017, 'n')],
      'Ute': [e('6.0L V8 automatic', 2009, 2017), e('3.6L V6', 2007, 2017, 'n')]
    },
    Pontiac: {
      'G8': [e('6.0L V8 (GT)', 2008, 2009), e('3.6L V6', 2008, 2009, 'n'), e('6.2L V8 (GXP)', 2009, 2009, 'n')],
      'Grand Prix': [e('5.3L V8 (GXP)', 2007, 2008), e('3.8L V6', 2007, 2008, 'n')]
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
      } else if (y === 2007 && TRUCK[md]) {
        out.push({ v: '2007', t: '2007 (new body)' });
        out.push({ v: '2006.5', t: '2007 Classic (older body)' });
      } else out.push({ v: String(y), t: String(y) });
    });
    return out;
  }
  function inTen(mk, md, y) { var g = TEN[mk] && TEN[mk][md]; return !!(g && y >= g[0] && y <= g[1]); }
  function inGap(mk, md, y) { var g = GAP[mk] && GAP[mk][md]; return !!(g && y >= g[0] && y <= g[1]); }
  function engines(mk, md, y) {
    if (inTen(mk, md, y)) return TRUCK[md] ? ['5.3L V8', '6.2L V8', '2.7L TurboMax', '3.0L Duramax diesel'] : ['5.3L V8', '6.2L V8', '3.0L Duramax diesel'];
    if (inGap(mk, md, y)) return [];
    if (y === 2006.5) return [];
    var out = [];
    (OLD[mk] && OLD[mk][md] || []).forEach(function (x) { if (y >= x[1] && y <= x[2] && out.indexOf(x[0]) < 0) out.push(x[0]); });
    if (out.length) out.push('Other engine');
    return out;
  }
  function oldStatus(mk, md, y, eng) {
    var s = '';
    (OLD[mk] && OLD[mk][md] || []).forEach(function (x) { if (!s && x[0] === eng && y >= x[1] && y <= x[2]) s = x[3]; });
    return s || 'c';
  }
  var CONFIRM = { k: 'no', h: 'Let’s confirm your vehicle', b: 'Email ' + SUPPORT + ' with your year, model and engine and we’ll tell you which FullForce™ fits it. Every order has a 60 day money back guarantee.' };
  function verdict(mk, md, y, eng) {
    var car = (y === 2022.5 ? '2022 (new body)' : y === 2006.5 ? '2007 Classic' : y) + ' ' + mk + ' ' + md;
    if (inGap(mk, md, y)) return { k: 'no', h: 'Not supported yet', b: 'We don’t support the ' + car + ' yet. Email ' + SUPPORT + ' and we’ll let you know when we do.' };
    if (inTen(mk, md, y)) {
      if (!/5\.3L|6\.2L/.test(eng)) return { k: 'no', h: 'Engine not supported', b: 'The 10 Speed supports the 5.3L and 6.2L V8 only. The ' + eng + ' is not supported.' };
      return { k: 'ten', h: 'Fits FullForce™ 10 Speed', b: 'Your <b>' + car + '</b> with the <b>' + eng + '</b> is on the 10 Speed fitment list. It keeps DFM (AFM) off and turns auto start stop off every start.', u: TEN_URL, c: 'Get FullForce™ 10 Speed' };
    }
    if (y === 2006.5) return CONFIRM;
    var st = eng === 'Other engine' ? 'c' : oldStatus(mk, md, y, eng);
    if (st === 'c') return CONFIRM;
    if (st === 'n') return { k: 'no', h: 'No AFM on this engine', b: 'The <b>' + eng + '</b> in the ' + car + ' doesn’t use AFM or DFM, so there’s nothing for FullForce™ to turn off. Questions? Email ' + SUPPORT + '.' };
    if (st === 'x') return { k: 'no', h: 'Engine not supported', b: 'FullForce™ doesn’t support the <b>' + eng + '</b>. Questions? Email ' + SUPPORT + '.' };
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
