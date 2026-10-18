/* CPA Answer · กฎหมาย 2 รุ่นภาพ — ตัววาดกลางของบทที่มาจากชุดเนื้อหา (WHT · SBT) เริ่ม 13 ต.ค. 2569
 * หน้า law2v-c.html?c=<รหัสบท> โหลด law2v-data/toc.js และ law2v-data/<รหัส>.js แล้วเรียกไฟล์นี้
 * ตัววาดไม่มีกฎหรือตัวเลขทางกฎหมายของตัวเอง ผลทุกกรณีมาจากข้อมูลของบท (ช่อง outs) */
(function () {
  var V = window.LAW2V, D = window.LAW2V_CH, TOC = window.LAW2V_TOC || {}, root = document.getElementById('app');
  if (!D) { root.innerHTML = '<p class="ve-load">ไม่พบบทนี้ <a href="law2v-index.html">กลับหน้ารวม</a></p>'; return; }
  var SUBJ = D.code.charAt(0), NUM = (window.LAW2V_TOC && window.LAW2V_TOC[D.code] && window.LAW2V_TOC[D.code].no != null) ? window.LAW2V_TOC[D.code].no : +D.code.slice(1);
  var SNAME = { R: 'วิชาชีพบัญชี', W: 'ภาษีหัก ณ ที่จ่าย', S: 'ภาษีธุรกิจเฉพาะ', C: 'ภาษีเงินได้นิติบุคคล', V: 'ภาษีมูลค่าเพิ่ม', A: 'พ.ร.บ.การบัญชี', F: 'ธุรกิจของคนต่างด้าว', B: 'หลักทรัพย์และตลาดหลักทรัพย์', P: 'บริษัทจำกัดและบริษัทมหาชน', H: 'ห้างหุ้นส่วน' }[SUBJ] || '';
  var HOME = { A: 'law1v-index.html', F: 'law1v-index.html', B: 'law1v-index.html', P: 'law1v-index.html', H: 'law1v-index.html' }[SUBJ] || 'law2v-index.html';   /* สายของ LA1 กลับหน้ารวมของ LA1 */
  document.body.className += ' ve-' + SUBJ;
  document.title = D.title + ' | CPA Answer';

  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }
  function href(c) { return 'law2v-c.html?c=' + c; }
  /* ข้อความของบท: กันอักขระพิเศษ ทำรหัสบทเป็นลิงก์ชื่อบท */
  function tx(s) {
    return esc(s).replace(/⟦([A-Z]\d\d)⟧/g, function (m, c) {
      if (!TOC[c]) return c;
      /* สถานีที่อยู่ในแผนแต่ยังไม่ได้สร้าง: บอกชื่อ ไม่ทำเป็นลิงก์ */
      return TOC[c].soon ? 'สถานี “' + esc(TOC[c].t) + '” ซึ่งกำลังสร้าง' : '<a href="' + href(c) + '">สถานี “' + esc(TOC[c].t) + '”</a>';
    });
  }
  /* เหมือน tx แต่ทำตัวเลขให้เด่น ใช้กับหัวของผล */
  function big(s) {
    return tx(s).replace(/(\d[\d,]*(?:\.\d+)?%?)(?![^<]*>)/g, function (m, n, at, all) {
      var pre = all.slice(Math.max(0, at - 2), at), post = all.charAt(at + m.length);
      if (/[\u0E00-\u0E7F]\.$/.test(pre) || /[\/\d]$/.test(pre) || post === '/') return m;
      return '<span class="ve-n">' + m + '</span>';
    });
  }
  function laws(ids, max) {
    var seen = {}, out = [];
    (ids || []).forEach(function (id) { var l = D.cites[id]; if (l && !seen[l]) { seen[l] = 1; out.push(l); } });
    out = out.filter(function (l) { return !out.some(function (m) { return m !== l && m.indexOf(l) === 0; }); });
    return out.slice(0, max || 2).map(function (l) { return '<span class="law">' + esc(l) + '</span>'; }).join(' ');
  }

  /* ภาพหน้าตัวละครที่ law2v.js ยังไม่มี: วาดแบบเดียวกัน เปลี่ยนผม เสื้อ และพื้น */
  var fid = 0;
  function portrait(o) {
    fid++; var id = 'vef' + fid, skin = '#F2CDB3', sk2 = '#E3B598';
    return '<svg viewBox="0 0 120 120" aria-hidden="true"><defs><clipPath id="' + id + '"><circle cx="60" cy="60" r="60"/></clipPath></defs><g clip-path="url(#' + id + ')">' +
      '<rect width="120" height="120" fill="' + o.bg + '"/>' + (o.back || '') +
      '<path d="M20 124c2-21 15-29 40-29s38 8 40 29z" fill="' + o.top + '"/>' + (o.collar || '') +
      '<path d="M52 78h16v15c0 5-16 5-16 0z" fill="' + sk2 + '"/><ellipse cx="60" cy="55" rx="20.5" ry="25" fill="' + skin + '"/>' + o.hair +
      '<ellipse cx="50" cy="56" rx="2.8" ry="3" fill="#2E1D14"/><ellipse cx="70" cy="56" rx="2.8" ry="3" fill="#2E1D14"/>' +
      '<path d="M45 50q5-4 10-1M65 49q5-3 10 1" fill="none" stroke="#2A1B15" stroke-width="1.7" stroke-linecap="round"/>' +
      '<path d="M54 71c4 3 8 3 12 0" fill="none" stroke="#A8483F" stroke-width="2" stroke-linecap="round"/>' + (o.extra || '') + '</g></svg>';
  }
  var MY = {
    'พริ้ง': function () { return portrait({ bg: '#FCE7DF', top: '#D9634A', back: '<path d="M30 56c-4 26 0 46 9 66h42c9-20 13-40 9-66z" fill="#5A3322"/>', hair: '<path d="M38 58c-4-24 6-36 22-36s26 12 22 36c-2-11-7-18-14-21-8 5-18 7-26 7-2 4-3 8-4 14z" fill="#5A3322"/>', collar: '<path d="M50 95l10 12 10-12" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>' }); },
    'พีท': function () { return portrait({ bg: '#E3EEF7', top: '#F4F6F8', hair: '<path d="M39 50c-2-18 8-28 21-28s23 10 21 28c-3-8-7-12-12-14-8 3-18 3-24 1-3 3-5 7-6 13z" fill="#1F1A17"/>', collar: '<path d="M52 96l8 8 8-8M60 104v16" fill="none" stroke="#2F6B8A" stroke-width="4" stroke-linecap="round"/>' }); },
    'พี่แพม': function () { return portrait({ bg: '#E8EFE9', top: '#1C4257', back: '<circle cx="60" cy="22" r="11" fill="#2B1D16"/>', hair: '<path d="M38 56c-3-22 6-33 22-33s25 11 22 33c-2-10-6-16-13-19-7 5-18 7-27 6-2 3-3 8-4 13z" fill="#2B1D16"/>', collar: '<path d="M50 95l10 14 10-14 4 2-14 23-14-23z" fill="#FDFDFB"/>', extra: '<g fill="none" stroke="#1B1B1B" stroke-width="1.6"><rect x="42" y="50" width="15" height="12" rx="5"/><rect x="63" y="50" width="15" height="12" rx="5"/><path d="M57 55h6"/></g>' }); }
  };
  function face(name) {
    if (MY[name]) return MY[name]();
    var k = { 'แพร': 'prae2', 'พราว': 'praw' }[name];
    return k ? V.face(k) : '<svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="60" fill="#E9E6DD"/><circle cx="60" cy="48" r="18" fill="#9AA6A6"/><path d="M24 112c4-24 18-34 36-34s32 10 36 34z" fill="#9AA6A6"/></svg>';
  }

  var HERO = {
    R: '<svg viewBox="0 0 340 120" role="img" aria-label="ภาพทางเดินเป็นจุด มีจุดใหญ่สี่จุดไปถึงดาว"><path d="M24 96 C 90 96, 96 66, 150 62 S 230 34, 300 26" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="8" stroke-linecap="round" stroke-dasharray="1 16"/><g fill="#F0C84B"><circle cx="60" cy="90" r="11"/><circle cx="128" cy="66" r="11"/><circle cx="200" cy="48" r="11"/><circle cx="264" cy="32" r="11"/></g><path d="M312 8l4.200 8.600 9.500 1.400-6.900 6.700 1.600 9.400-8.400-4.400-8.400 4.400 1.600-9.400-6.900-6.700 9.500-1.400z" fill="#fff"/></svg>',
    C: '<svg viewBox="0 0 340 120" role="img" aria-label="ใบคำนวณภาษีของบริษัท ไล่จากกำไรตามบัญชีไปถึงภาษีที่ต้องชำระ"><rect x="34" y="8" width="156" height="106" rx="12" fill="#fff"/><g stroke="#CFCBBF" stroke-width="5" stroke-linecap="round"><path d="M50 30h66M50 48h50M50 66h66"/></g><g fill="#E9B79F"><rect x="138" y="25" width="38" height="10" rx="5"/><rect x="138" y="43" width="38" height="10" rx="5"/><rect x="138" y="61" width="38" height="10" rx="5"/></g><rect x="46" y="82" width="132" height="22" rx="9" fill="#F0C84B"/><g stroke="#F0C84B" stroke-width="5" stroke-linecap="round" fill="none"><path d="M206 62h38"/><path d="M234 50l14 12-14 12"/></g><circle cx="292" cy="62" r="32" fill="rgba(255,255,255,.14)"/><text x="292" y="73" text-anchor="middle" font-family="Anuphan,sans-serif" font-weight="800" font-size="30" fill="#fff">%</text></svg>',
    W: '<svg viewBox="0 0 340 120" role="img" aria-label="เงินก้อนหนึ่งถูกแบ่งเป็นสองส่วน ส่วนใหญ่ไปผู้รับ ส่วนเล็กนำส่งเป็นภาษี"><rect x="20" y="42" width="110" height="40" rx="20" fill="#F0C84B"/><circle cx="46" cy="62" r="9" fill="#0E4A41"/><path d="M66 56h44M66 68h30" stroke="#0E4A41" stroke-width="5" stroke-linecap="round"/><path d="M140 62h34M168 52l10 10-10 10" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><rect x="194" y="18" width="126" height="40" rx="20" fill="#fff"/><rect x="194" y="70" width="60" height="34" rx="17" fill="rgba(255,255,255,.28)"/><path d="M214 32h70M214 44h50" stroke="#1F7A6B" stroke-width="5" stroke-linecap="round"/><path d="M212 87h24" stroke="#fff" stroke-width="5" stroke-linecap="round"/></svg>',
    S: '<svg viewBox="0 0 340 120" role="img" aria-label="กิจการหนึ่งมีรายรับหลายก้อน บางก้อนเข้าฐานภาษีธุรกิจเฉพาะ"><path d="M24 54 60 22h76l36 32z" fill="#F0C84B"/><rect x="38" y="54" width="120" height="50" rx="6" fill="#fff"/><rect x="54" y="68" width="26" height="36" rx="4" fill="#6B4E9B"/><rect x="96" y="68" width="46" height="20" rx="4" fill="#ECE6F6"/><path d="M178 78h30M202 68l10 10-10 10" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/><rect x="226" y="18" width="94" height="26" rx="13" fill="rgba(255,255,255,.28)"/><rect x="226" y="50" width="94" height="26" rx="13" fill="#fff"/><rect x="226" y="82" width="94" height="26" rx="13" fill="rgba(255,255,255,.28)"/><circle cx="242" cy="63" r="6" fill="#6B4E9B"/><path d="M254 63h50" stroke="#6B4E9B" stroke-width="5" stroke-linecap="round"/></svg>'
  };
  var ICO = { path: 'flag', timeline: 'clock', who_does_what: 'bag', grid: 'card', gate: 'shield', calc: 'pen', gauge: 'pen' };

  /* ───── หัวบท แถบส่วน ภาพหลัก ───── */
  var h = '';
  h += '<header class="hero"><div class="top"><a href="' + HOME + '#' + SUBJ + '">สาย' + SNAME + '</a><span>ตัวอย่าง · รอตรวจเนื้อหา</span></div>' +
    '<p class="kick">' + SNAME + ' · สถานี ' + NUM + '</p><h1>' + tx(D.title) + '</h1><p class="sub">' + tx(D.answer) + '</p>' + (HERO[SUBJ] || '') + '</header>';
  h += '<nav class="steps" id="steps" aria-label="ส่วนของบท">' + D.steps.map(function (s, i) { return '<a href="#s' + (i + 1) + '"><i>' + (i + 1) + '</i>' + tx(s.lab) + '</a>'; }).join('') + '</nav>';

  var sid = {}; D.steps.forEach(function (s, i) { sid[s.id] = 's' + (i + 1); });
  /* ผู้ก่อตั้ง 14 ต.ค. 2569: “อยากให้ตั้งต้นจากผู้เรียนจะได้อะไร” หน้าตาแบบ ก จึงเปิดสถานีด้วยสิ่งที่ผู้เรียนทำได้เมื่ออ่านจบ แล้วจึงเป็นผังภาพรวม */
  var canHTML = D.can.length ? '<h3>อ่านจบแล้วทำได้</h3><ul class="ve-can">' + D.can.map(function (c) { return '<li>' + V.icon('check') + '<span>' + tx(c) + '</span></li>'; }).join('') + '</ul>' : '';
  var GETFIRST = SUBJ === 'R';
  if (GETFIRST && canHTML) h += '<section class="fig ve-get" aria-labelledby="fg"><span class="fno">สถานีนี้ให้อะไร</span><h2 id="fg">อ่านจบแล้วทำได้</h2><ul class="ve-can">' + D.can.map(function (c) { return '<li>' + V.icon('check') + '<span>' + tx(c) + '</span></li>'; }).join('') + '</ul></section>';
  h += '<section class="fig" aria-labelledby="f0"><span class="fno">ภาพรวมของบท</span><h2 id="f0">' + tx(D.main.h) + '</h2>';
  h += '<div class="map">';
  D.main.nodes.forEach(function (n, i) {
    D.main.where.filter(function (w) { return w.at === n.id; }).forEach(function (w) { h += '<span class="pinp"><span>' + face(w.n) + '</span>' + esc(w.n) + ' ' + tx(w.tag) + '</span>'; });
    h += '<a class="nd" href="#' + (sid[n.id] || 's1') + '"><span class="num">' + (i + 1) + '</span><b>' + tx(n.l) + '</b><small>' + tx(n.s) + '</small>' + laws(n.c, 1) + '</a>';
    if (i < D.main.nodes.length - 1) h += '<span class="ln"></span>';
  });
  h += '</div>';
  if (D.cast.length) h += '<h3>ใครเป็นใครในบทนี้</h3><div class="ve-cast">' + D.cast.map(function (c) { return '<div>' + face(c.n) + '<span><b>' + esc(c.n) + '</b><small>' + tx(c.w) + '</small></span></div>'; }).join('') + '</div>';
  if (!GETFIRST) h += canHTML;
  if (D.terms.length && { R01: 1 }[D.code]) h += '<h3>คำที่จะเจอในสถานีนี้</h3><dl class="ve-termo">' + D.terms.map(function (t) { return '<div><dt>' + tx(t.k) + '</dt><dd>' + tx(t.p) + '</dd></div>'; }).join('') + '</dl>';
  else if (D.terms.length) h += '<details class="ve-terms"><summary>คำที่ใช้ในบทนี้ (' + D.terms.length + ' คำ)</summary><dl>' + D.terms.map(function (t) { return '<dt>' + tx(t.k) + '</dt><dd>' + tx(t.p) + '</dd>'; }).join('') + '</dl></details>';
  h += '</section>';

  /* ───── ส่วนของบท ───── */
  function itemsHTML(s) {
    if (!s.items.length) return '';
    var two = s.kind === 'grid' && s.items.length > 1 && s.items.every(function (it) { return (it.l + it.t).length < 70; });
    var long = s.items.length >= 7;
    return (long ? '<details class="ve-fold"><summary>ดูครบทั้ง ' + s.items.length + ' รายการ</summary>' : '') + '<ul class="ve-items ve-k-' + s.kind + (two ? ' ve-two' : '') + '">' + s.items.map(function (it, i) {
      var m = /^(\d+)\s+(.*)$/.exec(it.l), lab = m ? m[2] : it.l, badge = m ? m[1] : (s.kind === 'path' || s.kind === 'timeline' ? String(i + 1) : V.icon(ICO[s.kind] || 'info'));
      return '<li' + (lab ? '' : ' class="plain"') + '><i>' + badge + '</i><div>' + (lab ? '<b>' + tx(lab) + '</b>' : '') + '<span>' + tx(it.t) + '</span> ' + laws(it.c, 1) + '</div></li>';
    }).join('') + '</ul>' + (long ? '</details>' : '');
  }
  function factsHTML(fs, title) {
    if (!fs.length) return '';
    return '<div class="ve-facts"><small>' + title + '</small>' + fs.map(function (f) { return f.l ? '<div><b>' + tx(f.l) + '</b><span>' + tx(f.t) + '</span></div>' : '<div class="one"><span>' + tx(f.t) + '</span></div>'; }).join('') + '</div>';
  }
  function groupsHTML(s) {
    return s.groups.map(function (g) {
      var x = '<div class="ve-grp"><h3>' + tx(g.h) + '</h3>';
      if (g.f.length) x += '<div class="ve-now">' + g.f.map(function (f) { return '<span>' + tx(f) + '</span>'; }).join('') + '</div>';
      if (g.cond.length) x += '<ul class="cond">' + g.cond.map(function (c) { return '<li>' + tx(c) + '</li>'; }).join('') + '</ul>';
      if (g.rows.length) {
        if (s.cols) x += '<div class="row hd"><span>' + esc(s.cols.situation || '') + '</span><span>' + esc(s.cols.result || '') + '</span></div>';
        x += g.rows.map(function (r) { return '<div class="row"><span>' + tx(r.a) + '</span><b>' + big(r.b) + '</b></div>'; }).join('');
      }
      if (g.res) x += '<div class="res">' + tx(g.res) + '</div>';
      if (g.other) x += '<div class="row"><span>' + tx(g.other.a) + '</span><b>' + tx(g.other.b) + '</b></div>';
      return x + '</div>';
    }).join('');
  }
  /* ใบคำนวณ: ดึงสมการ “ยอด × อัตรา% = ผล” จากข้อความของผล แล้ววาดเป็นตัวเลขใหญ่กับแถบสัดส่วน ไม่คำนวณเอง */
  function eqHTML(o) {
    var re = /(\d[\d,]*(?:\.\d+)?)\s*×\s*(\d+(?:\.\d+)?)\s*%\s*=\s*(\d[\d,]*(?:\.\d+)?)/g, src = o.h + ' ' + o.r + ' ' + o.t, m, rows = [], seen = {};
    while ((m = re.exec(src)) && rows.length < 3) { if (!seen[m[0]]) { seen[m[0]] = 1; rows.push(m); } }
    if (!rows.length) return '';
    var a = parseFloat(rows[0][1].replace(/,/g, '')), c = parseFloat(rows[0][3].replace(/,/g, '')), pct = a > 0 ? Math.max(2, Math.min(100, c / a * 100)) : 0;
    return '<div class="ve-eq" aria-hidden="true">' + rows.map(function (r) {
      return '<div class="row"><span>' + r[1] + '<small>ยอดที่นำมาคูณ</small></span><em>×</em><span>' + r[2] + '%<small>อัตรา</small></span><em>=</em><span class="res">' + r[3] + '<small>ผลคูณ</small></span></div>';
    }).join('') + '<div class="ve-bar"><i style="width:' + pct.toFixed(1) + '%"></i></div><small>ส่วนสีเหลืองคือ ' + rows[0][3] + ' จาก ' + rows[0][1] + '</small></div>';
  }
  /* ───── ภาพเฉพาะเรื่อง: วาดจากช่อง draw ของข้อมูล ตัวเลขทุกตัวมาจากข้อมูล ตัววาดไม่คำนวณเอง (ยกเว้นความกว้างของแถบ) ───── */
  function num(v) { var m = /-?\d[\d,]*(?:\.\d+)?/.exec(String(v)); return m ? parseFloat(m[0].replace(/,/g, '')) : 0; }
  var SW = [], PT = [];   /* ข้อมูลของรายการสวิตช์ และของทางเลือก */
  var YR = [];   /* ข้อมูลของเส้นเวลารายปีแต่ละภาพ */
  var WT = [];   /* ข้อมูลของเส้นเวลารอแต่ละภาพ (ผูกด้วยลำดับใน data-wt) */
  var DR = {
    split: function (d) {
      var tot = num(d.total) || d.parts.reduce(function (a, p) { return a + num(p.v); }, 0) || 1;
      return '<div class="ve-d ve-split">' + (d.title ? '<h4>' + tx(d.title) + '</h4>' : '') +
        '<div class="tot"><span>' + tx(d.totalLabel || 'ทั้งก้อน') + '</span><b>' + tx(d.total) + (d.unit ? ' <small>' + tx(d.unit) + '</small>' : '') + '</b></div>' +
        '<div class="bar">' + d.parts.map(function (p) { return '<i class="t-' + (p.tone || 'main') + '" style="width:' + Math.max(4, num(p.v) / tot * 100).toFixed(1) + '%"></i>'; }).join('') + '</div>' +
        '<div class="parts">' + d.parts.map(function (p) { return '<div><i class="t-' + (p.tone || 'main') + '"></i><span>' + tx(p.l) + '</span><b>' + tx(p.v) + '</b></div>'; }).join('') + '</div></div>';
    },
    slip: function (d) {
      return '<div class="ve-d ve-slip">' + (d.title ? '<h4>' + tx(d.title) + '</h4>' : '') + d.rows.map(function (r) {
        return '<div class="r' + (r.k ? ' ' + r.k : '') + '"><span>' + tx(r.l) + '</span><b>' + tx(r.v) + '</b></div>';
      }).join('') + '</div>';
    },
    timeline: function (d) {
      var a = d.span ? d.span.from : -1, b = d.span ? d.span.to : -1;
      return '<div class="ve-d">' + (d.title ? '<h4>' + tx(d.title) + '</h4>' : '') + '<div class="ve-tl">' + d.points.map(function (p, i) {
        return '<div class="p' + (p.tone ? ' ' + p.tone : '') + (i > a && i <= b ? ' in' : '') + '"><i></i><div><b>' + tx(p.l) + '</b>' + (p.s ? '<span>' + tx(p.s) + '</span>' : '') + '</div></div>';
      }).join('') + '</div>' + (d.span && d.span.l ? '<span class="span">' + tx(d.span.l) + '</span>' : '') + '</div>';
    },
    table: function (d) {
      var n = (d.cols || (d.rows[0] && d.rows[0].c) || []).length || 2, g = 'grid-template-columns:' + (n === 2 ? 'minmax(0,1.4fr) minmax(0,1fr)' : 'repeat(' + n + ',minmax(0,1fr))');
      return '<div class="ve-d">' + (d.title ? '<h4>' + tx(d.title) + '</h4>' : '') + '<div class="ve-tb">' +
        (d.cols ? '<div class="row hd" style="' + g + '">' + d.cols.map(function (c) { return '<span>' + tx(c) + '</span>'; }).join('') + '</div>' : '') +
        d.rows.map(function (r) { return '<div class="row' + (r.tone ? ' ' + r.tone : '') + '" style="' + g + '">' + r.c.map(function (c, i) { return i === 0 ? '<span>' + tx(c) + '</span>' : '<b>' + tx(c) + '</b>'; }).join('') + '</div>'; }).join('') + '</div></div>';
    },
    flow: function (d) {
      var x = '<div class="ve-d">' + (d.title ? '<h4>' + tx(d.title) + '</h4>' : '') + '<div class="ve-flow">';
      d.nodes.forEach(function (n, i) {
        x += node(n);
        var l = (d.links || [])[i]; if (i < d.nodes.length - 1) x += '<div class="a">' + (l && l.l ? tx(l.l) : '') + (l && l.v ? ' <b>' + tx(l.v) + '</b>' : '') + '</div>';
      });
      return x + '</div></div>';
    },
    branch: function (d) {
      return '<div class="ve-d">' + (d.title ? '<h4>' + tx(d.title) + '</h4>' : '') + '<div class="ve-flow">' + node(d.from) +
        '<svg class="ve-fork" viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true"><path d="M150 0V8M150 8C150 16 75 10 75 20M150 8C150 16 225 10 225 20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>' +
        '<div class="ve-br">' + d.to.map(function (n) { return '<div class="n ' + (n.tone || '') + '">' + (n.v ? '<b class="v">' + tx(n.v) + '</b>' : '') + '<b>' + tx(n.l) + '</b>' + (n.s ? '<span>' + tx(n.s) + '</span>' : '') + '</div>'; }).join('') + '</div></div></div>';
    },
    compare: function (d) {
      return '<div class="ve-d">' + (d.title ? '<h4>' + tx(d.title) + '</h4>' : '') + '<div class="ve-cmp">' + d.cols.map(function (c, i) {
        return '<div class="' + (c.tone || (i ? 'b' : 'a')) + (c.hl ? ' hl' : '') + '"><h5>' + tx(c.h) + '</h5>' + (c.rows || []).map(function (r) { return '<p>' + tx(r) + '</p>'; }).join('') + '</div>';
      }).join('') + '</div></div>';
    },
    gauge: function (d) {
      var left = { below: 30, at: 60, above: 82 }[d.side] || 30;
      return '<div class="ve-d ve-gz">' + (d.title ? '<h4>' + tx(d.title) + '</h4>' : '') + '<span class="val">' + tx(d.value) + '</span>' +
        '<div class="track"><span class="line"></span><span class="dot" style="left:' + left + '%"></span></div>' +
        '<div class="lab"><span>' + tx(d.below || '') + '</span><span>' + tx(d.above || '') + '</span></div><small>เส้นดำคือ ' + tx(d.line) + '</small></div>';
    },
    /* เส้นเวลารอ (ผู้ก่อตั้ง 14 ต.ค. 2569: “ทำเป็น timeline … เพิกมาแล้วกี่ปี แล้วมี slider ปีให้เลือก … ละวาดเป็น flow หลังการเพิกถอน”)
       ผู้เรียนเลื่อนว่าผ่านมาแล้วกี่ปี แต่ละแถวคือโทษหนึ่งแบบ มีหมุดที่ปีขั้นต่ำของตัวเอง (need มาจากข้อมูล) ถึงหมุดแล้วจึงยื่นได้ (ไม่น้อยกว่า = ถึงพอดีก็นับ)
       ใต้เส้นเวลาเป็นผังว่ายื่นแล้วเกิดอะไรต่อ */
    wait: function (d) {
      var n = WT.indexOf(d); if (n < 0) { WT.push(d); n = WT.length - 1; }
      var at = d._at == null ? d.at : d._at, span = d.max - d.min, pos = function (v) { return ((v - d.min) / span * 100).toFixed(2); }, u = d.unit || 'ปี', ticks = '';
      for (var y = d.min; y <= d.max; y++) ticks += '<span' + (y === at ? ' class="on"' : '') + ' style="left:' + pos(y) + '%">' + y + '</span>';
      return '<div class="ve-d ve-wt" data-wt="' + n + '">' + (d.title ? '<h4>' + tx(d.title) + '</h4>' : '') +
        '<div class="wq"><span>' + tx(d.q) + '</span><div class="ws"><button type="button" data-wts="-1" aria-label="ลดหนึ่ง' + u + '"' + (at <= d.min ? ' disabled' : '') + '>−</button><output>' + at + ' ' + u + '</output><button type="button" data-wts="1" aria-label="เพิ่มหนึ่ง' + u + '"' + (at >= d.max ? ' disabled' : '') + '>+</button></div></div>' +
        '<input type="range" min="' + d.min + '" max="' + d.max + '" step="1" value="' + at + '" data-wtr aria-label="' + esc(d.q) + '"><div class="wr" aria-hidden="true">' + ticks + '</div>' +
        d.tracks.map(function (t) { var ok = t.cap ? at <= t.need : at >= t.need;   /* cap = กำหนดแบบ “ภายใน / ไม่เกิน” ถึงหมุดพอดียังทัน */
          return '<div class="wtk ' + (ok ? 'ok' : 'no') + '"><div class="hd"><i>' + V.icon(t.icon || 'clock') + '</i><span><b>' + tx(t.l) + '</b>' + (t.s ? '<small>' + tx(t.s) + '</small>' : '') + '</span></div>' +
            '<div class="bar' + (t.cap ? ' cap' : '') + '" style="--need:' + pos(t.need) + '%"><span class="mk" style="left:' + pos(t.need) + '%"><em>' + (t.cap ? 'ภายใน ' : 'ครบ ') + t.need + ' ' + u + '</em></span><span class="dot" style="left:' + pos(at) + '%"></span></div>' +
            '<p class="st">' + V.icon(ok ? 'check' : 'x') + '<span><b>' + tx(ok ? (t.yes || d.yes) : (t.no || d.no)) + '</b>' + (t.cap ? (ok ? (at < t.need ? ' เหลืออีก ' + (t.need - at) + ' ' + u : ' วันสุดท้ายพอดี') : ' เกินมา ' + (at - t.need) + ' ' + u) : (ok ? '' : ' ขาดอีก ' + (t.need - at) + ' ' + u)) + '</span></p></div>'; }).join('') +
        (d.after ? '<div class="wa"><h5>' + tx(d.after.title) + '</h5><div class="ve-flow">' + d.after.nodes.map(function (nd, i) { var l = (d.after.links || [])[i];
          return node(nd) + (i < d.after.nodes.length - 1 ? '<div class="a">' + (l && l.l ? tx(l.l) : '') + '</div>' : ''); }).join('') + '</div></div>' : '') + '</div>';
    },
    /* เส้นเวลาเป็นช่องรายปี (ผู้ก่อตั้ง 14 ต.ค. 2569 ดูส่วนฝึกงานของ 1.1: “อยากได้แบบ grocery list … ว่าแต่ละปีต้องทำไรบ้าง เป็น interactive game”
       แล้วปรับเป็น “เอาเป็น timeline ว่า 5 ปี ปีไหนเขียวไม่เขียว ยื่นไม่ยื่น … ตอนสอนก็บอกว่าเขียว 3 ใน 5 และรวมกันได้ 3000 ขึ้นไป”)
       ผู้เรียนแตะปีเพื่อสลับเขียวกับไม่เขียว ตัววาดนับจำนวนปีที่เขียวกับชั่วโมงรวมของปีที่เขียว (h ของแต่ละปีมาจากข้อมูล) เทียบกับ need และ needH */
    years: function (d) {
      var n = YR.indexOf(d); if (n < 0) { YR.push(d); n = YR.length - 1; }
      /* lock = ภาพของผลหนึ่งกรณี (ไม่ให้แตะ) ใช้รูปเดียวกับภาพที่แตะได้ ผลของทุกตัวเลือกจึงออกมาหน้าตาเดียวกัน */
      var lock = !!d.lock, st = lock ? d.years.map(function (y) { return !!y.on; }) : d._st || (d._st = d.years.map(function (y) { return !!y.on; })), got = 0, hrs = 0, fmt = function (v) { return String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ','); };
      d.years.forEach(function (y, i) { if (st[i]) { got++; hrs += y.h; } });
      var okY = got >= d.need, okH = hrs >= d.needH, ok = okY && okH, off = d.years.some(function (y, i) { return y.on && !st[i]; });
      return '<div class="ve-d ve-yr" data-yrn="' + n + '">' + (d.title ? '<h4>' + tx(d.title) + '</h4>' : '') + (d.hint ? '<p class="yh">' + tx(d.hint) + '</p>' : '') +
        '<div class="yl"><span>' + V.icon('flag') + tx(d.start || '') + '</span><span>' + tx(d.end || '') + '</span></div>' +
        '<div class="yg" style="--n:' + d.years.length + '">' + d.years.map(function (y, i) {
          var inner = '<b>' + tx(y.l) + '</b><small>' + tx(y.s || '') + '</small><i>' + V.icon(st[i] ? 'check' : 'x') + '</i><em>' + (st[i] ? fmt(y.h) : '–') + '</em>';
          return lock ? '<div class="yb' + (st[i] ? ' on' : '') + '">' + inner + '</div>'
            : '<button type="button" aria-pressed="' + (st[i] ? 'true' : 'false') + '" data-yr="' + i + '" aria-label="' + esc(y.l + ' ' + (st[i] ? d.onLabel : d.offLabel)) + '">' + inner + '</button>'; }).join('') + '</div>' +
        '<p class="yk"><span><i class="on"></i>' + tx(d.onLabel) + '</span><span><i class="off"></i>' + tx(d.offLabel) + '</span></p>' +
        '<div class="yc"><div class="' + (okY ? 'ok' : 'no') + '"><span>' + tx(d.sumY) + '</span><b>' + got + ' <i>ต้องถึง ' + d.need + '</i></b></div><div class="' + (okH ? 'ok' : 'no') + '"><span>' + tx(d.sumH) + '</span><b>' + fmt(hrs) + ' <i>ต้องถึง ' + fmt(d.needH) + '</i></b></div></div>' +
        ((off || lock) && d.miss ? '<p class="ym">' + tx(d.miss) + '</p>' : '') + (d.note ? '<p class="yh">' + tx(d.note) + '</p>' : '') +
        '<p class="tv ' + (ok ? 'ok' : 'no') + '">' + V.icon(ok ? 'check' : 'x') + '<span>' + tx(ok ? d.yes : d.no) + '</span></p></div>';
    },
    /* รายการเงื่อนไขเป็นสวิตช์ (ผู้ก่อตั้ง 14 ต.ค. 2569: “อันไหนเป็น requirement เยอะๆ ก็ทำเป็น tablet แบบปุ่มใน iphone settings ละข้างล่างตอบ result”
       และ “tablet checklist ว่าแต่ละปีต้องทำไรบ้าง ละกดครบ = ครบแล้ว”) ทุกแถวเปิดหรือปิดได้ ผลอยู่ใต้รายการ: เปิดครบ = yes · ปิดข้อไหน = no พร้อมเหตุของข้อนั้น (miss จากข้อมูล) */
    switches: function (d) {
      var n = SW.indexOf(d); if (n < 0) { SW.push(d); n = SW.length - 1; }
      var st = d._st || (d._st = d.rows.map(function (r) { return r.on !== false; })), miss = d.rows.filter(function (r, i) { return !st[i]; }), ok = !miss.length;
      return '<div class="ve-d ve-sw" data-swn="' + n + '">' + (d.title ? '<h4>' + tx(d.title) + '</h4>' : '') + (d.hint ? '<p class="swh">' + tx(d.hint) + '</p>' : '') +
        '<div class="swl">' + d.rows.map(function (r, i) {
          return (r.head ? '<div class="swg">' + tx(r.head) + '</div>' : '') + '<button type="button" role="switch" aria-checked="' + (st[i] ? 'true' : 'false') + '" data-sw="' + i + '"><span><b>' + tx(r.l) + '</b>' + (r.s ? '<small>' + tx(r.s) + '</small>' : '') + '</span><i aria-hidden="true"></i></button>'; }).join('') + '</div>' +
        '<div class="swr ' + (ok ? 'ok' : 'no') + '">' + V.icon(ok ? 'check' : 'x') + '<div><b>' + tx(ok ? d.yes : d.no) + '</b>' + (ok ? (d.yesText ? '<span>' + tx(d.yesText) + '</span>' : '') : '<ul>' + miss.map(function (r) { return '<li>' + tx(r.miss || r.l) + '</li>'; }).join('') + '</ul>') + '</div></div></div>';
    },
    /* ทางเลือก: หลายทางไปถึงผลเดียวกัน เลือกทางแล้วเห็นภาพของทางนั้น (เช่น ฝึกครบสามปี กับหลักสูตรของสภาฯ) */
    paths: function (d) {
      var n = PT.indexOf(d); if (n < 0) { PT.push(d); n = PT.length - 1; }
      var k = d._k || 0;
      return '<div class="ve-d ve-pt" data-ptn="' + n + '">' + (d.title ? '<h4>' + tx(d.title) + '</h4>' : '') + '<div class="ptt" role="tablist">' + d.tabs.map(function (t, i) {
        return '<button type="button" role="tab" aria-selected="' + (i === k ? 'true' : 'false') + '" data-pt="' + i + '"><b>' + tx(t.l) + '</b>' + (t.s ? '<small>' + tx(t.s) + '</small>' : '') + '</button>'; }).join('') + '</div><div class="ptb">' + drawHTML(d.tabs[k].draw) + '</div></div>';
    },
    /* กราฟแท่งมีเส้นผ่าน: แต่ละแท่งวัดเทียบเกณฑ์ของตัวเอง เส้นประเส้นเดียวคือเกณฑ์ของทุกแท่ง
       ค่า เกณฑ์ และผ่านหรือไม่ มาจากข้อมูล ตัววาดคิดเฉพาะความสูงของแท่ง (cap = เกณฑ์แบบ “ไม่เกิน”) */
    bars: function (d) {
      return '<div class="ve-d ve-pb">' + (d.title ? '<h4>' + tx(d.title) + '</h4>' : '') + '<div class="plot" style="--n:' + d.bars.length + '"><span class="pl"><em>' + tx(d.line || 'เส้นผ่าน') + '</em></span>' +
        d.bars.map(function (b) { var h = b.need > 0 ? Math.max(5, Math.min(100, b.v / b.need * 62)) : 5;
          return '<div class="c ' + (b.ok ? 'ok' : 'no') + '"><b>' + tx(b.show) + '</b><i style="height:' + h.toFixed(1) + '%"></i></div>'; }).join('') + '</div>' +
        '<div class="lab" style="--n:' + d.bars.length + '">' + d.bars.map(function (b) {
          return '<span class="' + (b.ok ? 'ok' : 'no') + '"><b>' + tx(b.l) + '</b><small>' + (b.cap ? 'ไม่เกิน ' : 'เกณฑ์ ') + tx(b.needShow) + '</small><em>' + V.icon(b.ok ? 'check' : 'x') + tx(b.st || (b.cap ? (b.ok ? 'ยังไม่เกิน' : 'เกินแล้ว') : (b.ok ? 'ถึงแล้ว' : 'ยังไม่ถึง'))) + '</em></span>'; }).join('') + '</div>' +
        (d.note ? '<p class="nt">' + tx(d.note) + '</p>' : '') + '</div>';
    },
    /* ช่องให้ตก: ประเภทหรือกลุ่มวางเป็นช่อง ตัวละครตกลงช่องไหน เพราะอะไร (at = ลำดับช่อง, -1 = ยังไม่เข้าช่องไหน) */
    bins: function (d) {
      var hit = d.at >= 0 && d.at < d.bins.length;
      return '<div class="ve-d">' + (d.title ? '<h4>' + tx(d.title) + '</h4>' : '') +
        '<div class="ve-bn-who' + (hit ? '' : ' out') + '">' + (d.who ? face(d.who) : '') + '<span><b>' + tx(d.who || '') + '</b>' + (d.fact ? '<small>' + tx(d.fact) + '</small>' : '') + '</span></div>' +
        '<div class="ve-bn" style="--n:' + d.bins.length + ';--at:' + (hit ? d.at : 0) + '">' + (hit ? '<svg class="arw" viewBox="0 0 20 22" aria-hidden="true"><path d="M10 1v17M3 12l7 8 7-8" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>' : '') +
        d.bins.map(function (b, k) { return '<div class="b c' + k + (hit && k === d.at ? ' on' : '') + '"><i>' + V.icon(b.icon || 'star') + '</i><b>' + tx(b.l) + '</b>' + (b.s ? '<small>' + tx(b.s) + '</small>' : '') + '</div>'; }).join('') + '</div>' +
        (d.why ? '<p class="ve-bn-why' + (hit ? ' c' + d.at : ' out') + '">' + tx(d.why) + '</p>' : '') + '</div>';
    },
    checks: function (d) {
      var ic = { ok: V.icon('check'), no: V.icon('x'), unknown: '?' };
      return '<div class="ve-d">' + (d.title ? '<h4>' + tx(d.title) + '</h4>' : '') + '<div class="ve-ck">' + d.rows.map(function (r) {
        return '<div class="' + (r.state || '') + '"><i>' + (ic[r.state] || V.icon('info')) + '</i><span>' + tx(r.l) + (r.s ? '<small>' + tx(r.s) + '</small>' : '') + '</span></div>';
      }).join('') + '</div></div>';
    }
  };
  function node(n) { return '<div class="n ' + (n.tone || '') + (n.face ? '' : ' solo') + '">' + (n.face ? face(n.face) : '') + '<div><b>' + tx(n.l) + '</b>' + (n.s ? '<span>' + tx(n.s) + '</span>' : '') + '</div></div>'; }
  function drawHTML(d) {
    if (!d) return '';
    return (Array.isArray(d) ? d : [d]).map(function (x) { try { return DR[x.type] ? DR[x.type](x) : ''; } catch (e) { return ''; } }).join('');
  }
  var TAG = { need_more_info: 'ยังตอบไม่ได้ ต้องรู้เพิ่ม', no_change: 'เปลี่ยนแล้ว ผลเท่าเดิม', fail: 'ไม่เข้าเงื่อนไข' };
  /* นำร่อง 13 ต.ค. 2569 (รีวิวของผู้ก่อตั้ง สถานี 1.1): ผลของการลองอยู่ใต้ปุ่มทันที แล้วภาพตามหลัง
     เปิดเฉพาะสถานีในรายการนี้ สถานีอื่นยังเป็นภาพก่อนผลตามเดิม */
  var OUT_FIRST = { R01: 1 }[D.code] === 1;
  /* ผู้ก่อตั้ง 14 ต.ค. 2569 (หลังดู 1.1): “ไม่ต้องทำ pareto หมดก็ได้ เอาพวก visualisation เก่าๆ มาใช้ก็ได้ กลับไปทำให้มันกลับมาเวิค และไม่ฝืน เหมือนเดิม”
     ลำดับใหม่จึงเหลือแค่การสลับที่: ① ดูตัวอย่าง ② หลักที่ใช้ตัดสิน ③ ลองเปลี่ยนดู (กล่องผลกับภาพขึ้นทันทีแบบเดิม) ④ ลองเอง ใช้ชื่อขั้นที่ผู้ก่อตั้งกำหนด
     ลำดับการเล่าแบบใหม่ (ผู้ก่อตั้งกับ GPT 14 ต.ค. 2569): เห็น → เข้าใจเหตุผล → จำเป็นหลัก → ลองเปลี่ยน → ทำเอง
     ส่วนหนึ่งจึงเรียงเป็น ① ดูตัวอย่างก่อน (ข้อเท็จจริง วิธีคิด ผล พร้อมภาพ เห็นได้โดยยังไม่กด) ② หลักที่ใช้ตัดสิน ③ ลองเปลี่ยนหนึ่งข้อ ④ ทำเอง
     (กล่อง “จุดที่คนมักคิดผิด” ผู้ก่อตั้งสั่งลบ 14 ต.ค. 2569 ความเข้าใจผิดยังอยู่ในเหตุผลของผลลองเปลี่ยนและคำตอบของทำเอง)
     เริ่มที่สถานีเดียวก่อน สถานีอื่นยังเรียงแบบเดิม */
  var LOOP = { R01: 1 }[D.code] === 1;
  var PAGE_MAX = 3;   /* มากกว่าสามส่วนจึงแบ่งหน้า: 4 = 2 + 2 · 5 = 3 + 2 · 6 = 3 + 3 */
  function outHTML(o, live, own) {
    var pic = (o.f.length && !o['case'] ? '<div class="ve-now">' + o.f.map(function (f) { return '<span>' + tx(f) + '</span>'; }).join('') + '</div>' : '') + (o.draw ? drawHTML(o.draw) : (own ? '' : eqHTML(o)));
    var box = '<div class="ve-out k-' + o.k + (o.tone ? ' t-' + o.tone : '') + (live ? ' pop' : '') + '">' + (o.tag ? '<span class="tag big">' + tx(o.tag) + '</span>' : '') + (TAG[o.k] ? '<span class="tag">' + TAG[o.k] + '</span>' : '') +
      '<b class="h">' + big(o.h) + '</b>' + (o.r ? '<p>' + tx(o.r) + '</p>' : '') +
      (o.t ? '<div class="then">' + V.icon('flag') + '<span>' + tx(o.t) + '</span></div>' : '') + '<div>' + laws(o.c, 2) + '</div></div>';
    return OUT_FIRST ? box + pic : pic + box;
  }
  function find(s, st) {
    var best = null, bn = -1;
    s.outs.forEach(function (o) {
      var ks = Object.keys(o.w), ok = ks.every(function (k) { return st[k] === o.w[k]; });
      if (ok && ks.length > bn) { best = o; bn = ks.length; }
    });
    return best || s.outs[0];
  }

  /* ข้อย่อยของการ์ด: เลือกรูปตามเนื้อหา ไม่ฝืนเป็นแผ่นไอคอนทุกครั้ง
     (ผู้ก่อตั้ง 14 ต.ค. 2569 ดูสถานี 1.8: “ไม่ชอบที่คุณฝืนใช้ design นี้อะ อะไรที่ฝืนก็ไม่ต้อง ไปคิดวิธีอื่นมา”)
     · รายชื่อล้วน (รายละเอียดไม่ได้บอกอะไรเพิ่มจากหัว) → ป้ายเรียงกัน ไม่ต้องแตะ
     · ข้อสั้น ๆ ทุกข้อ หรือเกินหกข้อ → รายการเป็นแถว ข้อสั้นเห็นรายละเอียดเลย ข้อยาวกดเปิดใต้แถวของตัวเอง
     · ไม่เกินหกข้อและมีรายละเอียดจริง → แผ่นไอคอนแตะดูรายละเอียดใต้กลุ่ม
     เนื้อหากำหนดเองได้ด้วย as: 'chips' | 'rows' | 'tiles' ของการ์ด · ไม่เปิดหน้าตาแบบ ก ใช้แผ่นไอคอนตามเดิม */
  function tilesHTML(r) {
    var T = r.tiles, heavy = function (t) { return !!(t.b && t.b.length) || (t.d || '').length > 44; },
      names = T.every(function (t) { return !heavy(t) && (t.d || '').replace(/\s/g, '').length <= (t.l || '').replace(/\s/g, '').length + 6; }),
      mode = r.as || 'bullets';
    /* ผู้ก่อตั้ง 14 ต.ค. 2569 (ชี้การ์ดของสาย CIT): “ชอบแบบนี้มากกว่าอะ text ยาวๆหน่อยก็เน้น bullets เอา”
       ข้อย่อยจึงเป็นหัวข้อย่อยในการ์ดสีแบบเดิม: หัวข้อตัวหนา ตามด้วยรายละเอียด ข้อที่มี b แตกเป็นหัวข้อย่อยชั้นใน ไม่ต้องแตะ
       แผ่นไอคอน ป้ายเรียง และแถว ยังเรียกได้ด้วย as ของการ์ด เมื่อเนื้อหาต้องการจริง (ป้ายเรียงกับแถวมีสไตล์เฉพาะตอนเปิดหน้าตาแบบ ก) */
    if (mode === 'rows' || mode === 'chips') mode = 'bullets';
    if (mode === 'bullets') return '<div class="rm rb"><ul>' + T.map(function (t) {
      var same = (t.d || '').replace(/\s/g, '') === (t.l || '').replace(/\s/g, '');
      return '<li' + (t.tone ? ' class="' + t.tone + '"' : '') + '><b>' + tx(t.l) + '</b>' + (t.b && t.b.length ? '<ul>' + t.b.map(function (x) { return '<li>' + tx(x) + '</li>'; }).join('') + '</ul>' : same ? '' : ' <span>' + tx(t.d) + '</span>') + '</li>'; }).join('') + '</ul></div>';
    if (mode === 'chips') return '<div class="rchips">' + T.map(function (t) { return '<span' + (t.tone ? ' class="' + t.tone + '"' : '') + '><i>' + V.icon(t.icon || 'check') + '</i>' + tx(t.l) + '</span>'; }).join('') + '</div>';
    if (mode === 'rows') return '<ul class="rrows">' + T.map(function (t) {
      var body = t.b && t.b.length ? '<ul>' + t.b.map(function (x) { return '<li>' + tx(x) + '</li>'; }).join('') + '</ul><details><summary>ถ้อยคำเต็ม</summary><p>' + tx(t.d) + '</p></details>' : '<p>' + tx(t.d) + '</p>';
      return heavy(t) ? '<li class="x' + (t.tone ? ' ' + t.tone : '') + '"><button type="button" aria-expanded="false"><i>' + V.icon(t.icon || 'check') + '</i><span>' + tx(t.l) + '</span><em aria-hidden="true">' + V.icon('next') + '</em></button><div class="rd" hidden>' + body + '</div></li>'
        : '<li' + (t.tone ? ' class="' + t.tone + '"' : '') + '><i>' + V.icon(t.icon || 'check') + '</i><span><b>' + tx(t.l) + '</b>' + ((t.d || '').replace(/\s/g, '') !== (t.l || '').replace(/\s/g, '') ? '<small>' + tx(t.d) + '</small>' : '') + '</span></li>'; }).join('') + '</ul>';
    return '<div class="rt"><div class="rtg">' + r.tiles.map(function (t, k) {
            return '<button type="button" aria-expanded="false" data-d="' + esc(t.d || '').replace(/"/g, '&quot;') + '"' + (t.b && t.b.length ? ' data-b="' + esc(t.b.join('|')).replace(/"/g, '&quot;') + '"' : '') + (t.tone ? ' class="' + t.tone + '"' : '') + '><i>' + V.icon(t.icon || 'check') + '</i><span>' + tx(t.l) + '</span></button>'; }).join('') +
            '</div><div class="rtd" role="status" aria-live="polite">แตะแผ่นเพื่อดูรายละเอียด</div></div>';
  }
  D.steps.forEach(function (s, i) {
    var n = i + 1;
    h += '<section class="fig" id="s' + n + '" data-step="s' + n + '" aria-labelledby="h' + n + '"><div class="sechd"><i>' + n + '</i><div><small>ส่วนที่ ' + n + ' · ' + tx(s.lab) + '</small><h2 id="h' + n + '">' + tx(s.h) + '</h2></div></div>';
    h += '<p class="cap">' + tx(s.lead) + '</p>';
    var loop = !!(s.rule || s.example);
    var hKeep = h, cks = [], st0 = {}; h = ''; s.ctl.forEach(function (c) { st0[c.id] = c.def; });
    if (s.rule) {
      h += '<p class="lp"><i>1</i>แม่บทบอกว่า</p>';
      /* ตารางเทียบของแม่บท (ไม่บังคับ): หัวเป็นประเภทมีไอคอน แถวเป็นเรื่องที่เทียบ ใช้เมื่อกฎเป็น “ประเภทไหน ต้องมีอะไร” */
      if (s.rule.matrix) {
        var MX = s.rule.matrix;
        h += '<div class="ve-mx" style="--n:' + MX.cols.length + '">' + (MX.title ? '<h4>' + tx(MX.title) + '</h4>' : '') +
          '<div class="mh">' + MX.cols.map(function (c, k) { return '<div class="c' + k + '"><i>' + V.icon(c.icon || 'star') + '</i><b>' + tx(c.label) + '</b></div>'; }).join('') + '</div>' +
          MX.rows.map(function (r) { return '<div class="mt"><span>' + tx(r.l) + '</span></div><div class="mr">' + r.c.map(function (x, k) { return '<div class="c' + k + (r.strong ? ' st' : '') + '">' + tx(x) + '</div>'; }).join('') + '</div>'; }).join('') +
          (MX.laws ? '<div class="mr lw">' + MX.laws.map(function (x, k) { return '<div class="c' + k + '"><span class="law">' + tx(x) + '</span></div>'; }).join('') + '</div>' : '') +
          /* หมายเหตุใต้ตาราง: ช่องของตารางเขียนสั้น ข้อยกเว้นติดดอกจันแล้วอธิบายใต้ตาราง (ผู้ก่อตั้ง 14 ต.ค. 2569: “เขียน ไทย / ตปท. แล้ว * ข้างล่างเอา”) */
          (MX.foot ? '<p class="mf">' + tx(MX.foot) + '</p>' : '') +
          (MX.notes && MX.notes.length ? '<div class="mn"><span>รายละเอียดของแต่ละประเภท</span><ul>' + MX.notes.map(function (m) {
            return '<li class="c' + m.of + '"><b>' + tx(MX.cols[m.of].label) + '</b><strong>' + tx(m.l) + '</strong>' + (m.b && m.b.length ? '<ul>' + m.b.map(function (x) { return '<li>' + tx(x) + '</li>'; }).join('') + '</ul>' : ' ' + tx(m.t)) + '</li>'; }).join('') +
            '</ul></div>' : '') + '</div>';
      }
      h += '<ol class="rule' + (s.rule.join === 'and' ? ' need-all" aria-label="ต้องครบทุกข้อ' : '') + '">' + (s.rule.items || []).map(function (r) {
        return '<li' + (r.fold ? ' class="fold"' : '') + '><span class="ri' + (/^[ก-ฮ]$/.test(r.icon || '') ? ' lt">' + r.icon : '">' + V.icon(r.icon || 'book')) + '</span><div><b>' + tx(r.label) + '</b>' +
          (r.fold ? '<button type="button" class="fbtn" aria-expanded="false">' + tx(r.fold) + '</button>' : '') +
          (r.keys && r.keys.length ? '<span class="rk">' + r.keys.map(function (k) { return '<em>' + tx(k) + '</em>'; }).join('') + '</span>' : '') +
          (r.text ? '<small>' + tx(r.text) + '</small>' : '') +
          /* แผ่นไอคอน: ข้อย่อยของการ์ดเป็นแผ่นเล็ก ไอคอนกับคำพูดสั้น ๆ แตะแล้วรายละเอียดของแผ่นนั้นขึ้นใต้แผ่น ทีละเรื่อง (แทนบรรทัด “นอกจากนี้”) */
          (r.tiles && r.tiles.length ? tilesHTML(r) : '') +
          /* ภาพของการ์ด (ไม่บังคับ): เรื่องที่เป็นลำดับหรือเส้นเวลา วาดเป็นภาพในการ์ดแทนแผ่นไอคอน */
          (r.draw ? '<div class="rdraw">' + drawHTML(r.draw) + '</div>' : '') +
          (r.miss ? '<span class="rx">' + tx(r.miss) + '</span>' : '') +
          /* จุดเช็กของการ์ด: คำถามสองทาง (ใช่หรือไม่ · อันนี้หรืออันนั้น) ตอบแล้วขึ้นคำตัดสินกับเหตุผล ไม่มีคะแนน */
          (r.check && LOOP ? (cks.push({ c: r.check, of: r.check.of || r.label }), '') : '') +
          (r.check && !LOOP ? '<div class="ck" data-ok="' + r.check.ok + '"><small>' + V.icon('flag') + 'เช็กก่อนไปต่อ</small><p class="ckq">' + tx(r.check.q) + '</p><div class="ckb">' +
            r.check.o.map(function (o, k) { return '<button type="button" aria-pressed="false" data-k="' + k + '">' + tx(o) + '</button>'; }).join('') +
            '</div><div class="ckr" role="status" aria-live="polite" data-why="' + esc(r.check.why || '').replace(/"/g, '&quot;') + '"></div></div>' : '') +
          (r.more && r.more.length ? '<div class="rm"><span>นอกจากนี้</span><ul>' + r.more.map(function (m) { return '<li>' + tx(m) + '</li>'; }).join('') + '</ul></div>' : '') +
          (r.law ? '<span class="law">' + tx(r.law) + '</span>' : '') + '</div></li>'; }).join('') + '</ol>';
    }
    var ruleH = h; h = '';
    if (s.example && LOOP) {
      var ex0 = s.example;
      h += '<p class="lp"><i>1</i>ดูตัวอย่าง' + (ex0.who ? ' · ' + tx(ex0.who) : '') + '</p><div class="walk"><div><small>ข้อเท็จจริง</small><span>' + tx(ex0.fact) + '</span></div>' +
        '<div><small>วิธีคิด</small><span>' + tx(ex0.match) + '</span></div><div class="res"><small>ผล</small><span>' + tx(ex0.result) + '</span></div></div>';
      h = hKeep + h + ruleH.replace('<p class="lp"><i>1</i>แม่บทบอกว่า</p>', '<p class="lp"><i>2</i>หลักที่ใช้ตัดสิน</p>'); hKeep = ''; ruleH = '';
    }
    if (s.example && !LOOP) {
      var ex = s.example;
      h += '<p class="lp"><i>2</i>ตัวอย่าง' + (ex.who ? ' · ' + tx(ex.who) : '') + '</p><div class="walk"><div><small>ข้อเท็จจริง</small><span>' + tx(ex.fact) + '</span></div>' +
        '<div><small>เทียบกับแม่บท</small><span>' + tx(ex.match) + '</span></div><div class="res"><small>ผล</small><span>' + tx(ex.result) + '</span></div></div>';
    }
    h = hKeep + ruleH + h;
    h += '<div class="ve-pic">';
    /* ส่วนที่มีตัวเลือก: ให้ตัวอย่างกับผลมาก่อน รายการรายละเอียดอยู่ใต้ผล */
    var late = s.ctl.length && s.items.length > 2;
    /* ส่วนภาพนิ่งที่มีสามภาพขึ้นไป: ภาพแรกกับคำตอบมาก่อน ภาพที่เหลือพับเป็นหัวข้อให้เปิดดูทีละเรื่อง */
    var dl = s.draw ? (Array.isArray(s.draw) ? s.draw : [s.draw]) : [], top = dl, rest = '';
    if (!s.ctl.length && dl.length >= 3) {
      top = []; var lead1 = true;
      dl.forEach(function (x) {
        if (lead1 || !x.title) { top.push(x); lead1 = false; return; }
        var y = {}; for (var k in x) if (k !== 'title') y[k] = x[k];
        rest += '<details class="ve-fold"><summary>' + tx(x.title) + '</summary>' + drawHTML(y) + '</details>';
      });
      if (rest) rest = '<p class="ve-foldh">แตะหัวข้อเพื่อดูเรื่องนั้น</p>' + rest;
    }
    var LIVE = { switches: 1, paths: 1, years: 1, wait: 1 }, liveTop = !s.ctl.length && top.some(function (x) { return LIVE[x.type]; });
    h += factsHTML(s.facts, 'ข้อเท็จจริงของเรื่อง') + groupsHTML(s) + (late ? '' : itemsHTML(s)) + (liveTop && loop ? '<p class="lp"><i>3</i>ลองเปลี่ยนดู</p>' : '') + drawHTML(top);
    if (loop && s.ctl.length) h += LOOP && s.example ? '<p class="lp"><i>3</i>ลองเปลี่ยนดู</p>' : '<p class="lp"><i>3</i>ลองเปลี่ยนดู</p>';
    if (s.fill) {
      h += '<p class="lp"><i>3</i>ลองเติมเอง</p><div class="ve-fill" id="fill' + n + '"><b>' + tx(s.fill.title) + '</b>' + (s.fill.hint ? '<small>' + tx(s.fill.hint) + '</small>' : '') +
        '<div class="acts" data-togs="fill' + n + '">' + s.fill.items.map(function (it) {
          return '<button type="button" data-k="' + esc(it.id) + '" aria-pressed="' + (s.fill.on.indexOf(it.id) >= 0 ? 'true' : 'false') + '"><span>' + tx(it.label) + '</span><em>' + it.hours + '</em></button>'; }).join('') +
        '</div><div class="mt" role="status" aria-live="polite"></div></div>';
    }
    /* รูปแบบโจทย์อยู่บน (ผู้ก่อตั้ง 14 ต.ค. 2569: “fact เต็มเป็นโจทย์ และมี decision rule … judgment box ล่าง adapt ตาม facts”)
       เปิดเมื่อผลของส่วนนั้นมี case: โจทย์เต็มเปลี่ยนตามตัวเลือก → หลักที่ใช้ตัดสิน → ตัวเลือก → ภาพ → กล่องผล */
    var CASE = s.ctl.length && s.outs.some(function (z) { return z['case']; });
    if (CASE) h += '<div class="ve-case"><small>' + V.icon('flag') + 'โจทย์</small><p id="q' + n + '" aria-live="polite"></p></div>' +
      (s.decide && s.decide.length ? '<div class="ve-dec"><small>หลักที่ใช้ตัดสิน</small><ol>' + s.decide.map(function (x) { return '<li><b>' + tx(x.l) + '</b>' + (x.s ? '<span>' + tx(x.s) + '</span>' : '') + '</li>'; }).join('') + '</ol></div>' : '');
    s.ctl.forEach(function (c, j) {
      /* ผู้ก่อตั้ง 14 ต.ค. 2569: “ไม่ต้องฝืนใช้ slider ก็ได้” ตัวเลือกจึงเป็นปุ่มตามที่เนื้อหากำหนด แถบเลื่อน (มีปุ่มลบกับบวก) ใช้เฉพาะส่วนที่เนื้อหาระบุ style: slider */
      /* แถบเลื่อน: ตัวเลือกที่เป็นตัวเลขเรียงกัน ให้ลองทีละรอบ (ปุ่มใต้แถบยังกดได้ และเป็นตัวที่เก็บค่า) */
      var di = 0; c.o.forEach(function (o, k) { if (o.v === c.def) di = k; });
      h += '<div class="ve-ctl' + (c.style === 'tabs' ? ' ve-tabs' : c.style === 'slider' ? ' ve-slider' : '') + '"><b>' + tx(c.l) + '</b>' + (c.d ? '<small>' + tx(c.d) + '</small>' : '') +
        (c.style === 'slider' ? '<div class="ve-rng"><span class="ve-round" data-round="' + i + ':' + j + '">ลองแล้ว 1 จาก ' + c.o.length + ' แบบ' + '</span><output data-now="' + i + ':' + j + '">' + tx(c.o[di].l) + '</output>' +
          '<input type="range" min="0" max="' + (c.o.length - 1) + '" step="1" value="' + di + '" data-rng="' + i + ':' + j + '" aria-label="' + esc(c.l) + '">' +
          '</div>' : '') +
        '<div class="chips" data-pick="ve' + i + '_' + j + '" data-ctl="' + i + ':' + j + '">' +
        c.o.map(function (o) { return '<button type="button" data-v="' + esc(o.v) + '" aria-pressed="' + (o.v === c.def ? 'true' : 'false') + '">' + tx(o.l) + '</button>'; }).join('') + '</div></div>';
    });
    if (s.kind === 'gate' && s.items.length && !late && !s.draw) h += '<svg class="ve-join" viewBox="0 0 300 22" preserveAspectRatio="none" aria-hidden="true"><path d="M40 0C40 14 150 6 150 22M260 0C260 14 150 6 150 22M150 0V22" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>';
    h += '<div id="o' + n + '" role="status" aria-live="polite" class="ve-pic"' + (s.example && !s.ctl.length ? ' hidden' : '') + '></div>' + (late ? itemsHTML(s) : '') + rest + '</div>';
    /* ทำเอง: จุดเช็กของส่วน อยู่หลังลองเปลี่ยน ใช้เฉพาะเรื่องที่ส่วนนี้สอนแล้ว */
    if (LOOP && cks.length) h += '<p class="lp"><i>4</i>ลองเอง</p><div class="ve-cks">' + cks.map(function (z) { var c = z.c;
      return '<div class="ck" data-ok="' + c.ok + '"><small>' + V.icon('flag') + tx(z.of) + '</small><p class="ckq">' + tx(c.q) + '</p><div class="ckb">' +
        c.o.map(function (o, k) { return '<button type="button" aria-pressed="false" data-k="' + k + '">' + tx(o) + '</button>'; }).join('') +
        '</div><div class="ckr" role="status" aria-live="polite" data-why="' + esc(c.why || '').replace(/"/g, '&quot;') + '" data-miss="' + esc(c.miss || '').replace(/"/g, '&quot;') + '"></div></div>'; }).join('') + '</div>';
    if (s.note) h += '<p class="note">' + V.icon('info') + '<span>' + tx(s.note) + ' ' + laws((s.noteC || []).filter(function (c) { return !s.outs.some(function (o) { return (o.c || []).slice(0, 2).indexOf(c) >= 0; }); }), 2) + '</span></p>';
    h += '</section>';
  });

  /* ───── ลองดู สรุป ชื่อกฎหมาย บทถัดไป ───── */
  h += '<section class="fig" aria-labelledby="fq"><span class="fno">ลองดู</span><h2 id="fq">' + ['', 'หนึ่ง', 'สอง', 'สาม', 'สี่', 'ห้า'][D.quiz.length] + 'คำถาม ตอบจากภาพข้างบน</h2><p class="cap">ตอบผิดตอบใหม่ได้ ไม่มีคะแนน</p><div id="quiz" style="display:grid;gap:12px"></div></section>';
  h += '<section class="fig" aria-labelledby="fk"><span class="fno">สรุปบทนี้</span><h2 id="fk">จำจากภาพ</h2><ul class="keep">' + D.summary.map(function (x) { return '<li><span class="ico">' + V.icon('check') + '</span><span>' + tx(x) + '</span></li>'; }).join('') + '</ul></section>';
  /* สารบัญเงินได้ของทั้งวิชา (มีเฉพาะบทเปิด): อยู่ท้ายบท หลังสรุป ไม่ขวางก่อนถึงส่วนแรก */
  if (D.main.index.length) {
    h += '<section class="fig" aria-labelledby="fi"><span class="fno">ไปต่อ</span><h2 id="fi">เงินได้แต่ละประเภท อยู่บทไหน</h2><ul class="ve-idx">' + D.main.index.map(function (x) { return '<li><b>' + tx(x.l) + '</b><span>' + tx(x.d) + '</span></li>'; }).join('') + '</ul></section>';
  }
  h += '<details class="src"><summary>ชื่อเต็มของกฎหมายในหน้านี้</summary><ul>' + D.laws.map(function (l) { return '<li>' + (l.s !== l.f ? '<b>' + tx(l.s) + '</b> คือ ' : '') + tx(l.f) + '</li>'; }).join('') + '<li>ตัวละครและบริษัทในบทนี้เป็นกรณีสมมติ</li></ul></details>';
  if (D.nextHref) h += '<section class="next"><small>สถานีถัดไป</small><b>' + esc(D.nextTitle) + '</b><a class="btn" href="' + esc(D.nextHref) + '">ไปสถานีถัดไป</a></section>';
  else if (D.next && TOC[D.next] && !TOC[D.next].soon) h += '<section class="next"><small>สถานีถัดไป</small><b>' + esc(TOC[D.next].t) + '</b><a class="btn" href="' + href(D.next) + '">ไปสถานีถัดไป</a></section>';
  else h += '<section class="next"><small>' + (D.next && TOC[D.next] && TOC[D.next].soon ? 'สาย' : 'จบสาย') + SNAME + '</small><b>' + (D.next && TOC[D.next] && TOC[D.next].soon ? 'สถานีถัดไปกำลังสร้าง' : 'ถึงสถานีสุดท้ายของสายนี้แล้ว') + '</b><a class="btn" href="law2v-index.html#' + SUBJ + '">กลับผังสาย</a></section>';
  root.innerHTML = h;

  /* แผ่นไอคอนของการ์ดแม่บท: แตะแล้วรายละเอียดขึ้นใต้แผ่น */
  [].forEach.call(root.querySelectorAll('.rt'), function (box) {
    var bs = [].slice.call(box.querySelectorAll('button')), out = box.querySelector('.rtd');
    bs.forEach(function (b) { b.onclick = function () {
      var on = b.getAttribute('aria-expanded') === 'true';
      bs.forEach(function (x) { x.setAttribute('aria-expanded', 'false'); });
      if (on) { out.textContent = 'แตะแผ่นเพื่อดูรายละเอียด'; out.classList.remove('on'); }
      else { b.setAttribute('aria-expanded', 'true'); out.innerHTML = '<b>' + b.querySelector('span').textContent + '</b> ' + tx(b.getAttribute('data-d')); out.classList.add('on'); }
    }; });
  });
  /* รายการเป็นแถว: กดแถวที่มีรายละเอียดยาวเพื่อเปิดหรือปิดใต้แถวนั้น */
  [].forEach.call(root.querySelectorAll('.rrows li.x > button'), function (b) { b.onclick = function () {
    var on = b.getAttribute('aria-expanded') !== 'true'; b.setAttribute('aria-expanded', on ? 'true' : 'false'); b.nextElementSibling.hidden = !on; }; });
  /* การ์ดรองที่พับไว้: กดปุ่มของการ์ดเพื่อเปิดหรือปิดเนื้อหาของการ์ดนั้น */
  [].forEach.call(root.querySelectorAll('.rule li.fold .fbtn'), function (b) { var t0 = b.textContent; b.onclick = function () {
    var li = b.closest('li'), on = li.classList.toggle('open'); b.setAttribute('aria-expanded', on ? 'true' : 'false'); b.textContent = on ? 'ปิด' : t0; }; });
  /* เส้นเวลารอ: ปุ่มลบกับบวกและแถบเลื่อนเปลี่ยนจำนวนปี แล้ววาดภาพนั้นใหม่ทั้งภาพ */
  function wtSet(el, v, focusSel) {
    var d = WT[+el.getAttribute('data-wt')]; if (!d) return; d._at = Math.max(d.min, Math.min(d.max, v));
    var box = document.createElement('div'); box.innerHTML = DR.wait(d); var nw = box.firstChild; el.parentNode.replaceChild(nw, el);
    var f = focusSel && nw.querySelector(focusSel); if (f && !f.disabled) f.focus(); else if (focusSel) { var o = nw.querySelector('[data-wtr]'); if (o) o.focus(); }
  }
  root.addEventListener('click', function (e) { var b = e.target.closest && e.target.closest('[data-wts]'); if (!b) return; var el = b.closest('.ve-wt'), d = WT[+el.getAttribute('data-wt')];
    wtSet(el, (d._at == null ? d.at : d._at) + +b.getAttribute('data-wts'), '[data-wts="' + b.getAttribute('data-wts') + '"]'); });
  root.addEventListener('input', function (e) { if (!e.target.matches || !e.target.matches('[data-wtr]')) return; wtSet(e.target.closest('.ve-wt'), +e.target.value, '[data-wtr]'); });
  /* เส้นเวลาเป็นช่องรายปี: แตะปีเพื่อสลับเขียวกับไม่เขียว แล้ววาดภาพนั้นใหม่ */
  root.addEventListener('click', function (e) { var b = e.target.closest && e.target.closest('[data-yr]'); if (!b) return;
    var el = b.closest('.ve-yr'), d = YR[+el.getAttribute('data-yrn')], k = +b.getAttribute('data-yr'); if (!d) return;
    d._st[k] = !d._st[k];
    var box = document.createElement('div'); box.innerHTML = DR.years(d); var nw = box.firstChild; el.parentNode.replaceChild(nw, el);
    var f = nw.querySelector('[data-yr="' + k + '"]'); if (f) f.focus(); });
  /* สวิตช์กับทางเลือก: กดแล้ววาดภาพนั้นใหม่ */
  root.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('[data-sw]');
    if (b) { var el = b.closest('.ve-sw'), d = SW[+el.getAttribute('data-swn')], k = +b.getAttribute('data-sw'); if (!d) return; d._st[k] = !d._st[k];
      var box = document.createElement('div'); box.innerHTML = DR.switches(d); var nw = box.firstChild; el.parentNode.replaceChild(nw, el); var f = nw.querySelector('[data-sw="' + k + '"]'); if (f) f.focus(); return; }
    b = e.target.closest && e.target.closest('[data-pt]');
    if (b) { var el2 = b.closest('.ve-pt'), d2 = PT[+el2.getAttribute('data-ptn')], k2 = +b.getAttribute('data-pt'); if (!d2) return; d2._k = k2;
      var box2 = document.createElement('div'); box2.innerHTML = DR.paths(d2); var nw2 = box2.firstChild; el2.parentNode.replaceChild(nw2, el2); var f2 = nw2.querySelector('[data-pt="' + k2 + '"]'); if (f2) f2.focus(); } });
  /* จุดเช็ก: เลือกหนึ่งในสองทาง แล้วขึ้นคำตัดสินกับเหตุผล ตอบใหม่ได้ ไม่มีคะแนน */
  [].forEach.call(root.querySelectorAll('.ck'), function (ck) {
    var ok = +ck.getAttribute('data-ok'), bs = [].slice.call(ck.querySelectorAll('.ckb button')), res = ck.querySelector('.ckr');
    bs.forEach(function (b, k) { b.onclick = function () {
      bs.forEach(function (x, j) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); x.classList.toggle('right', j === ok); });
      ck.classList.add('done'); ck.classList.toggle('hit', k === ok);
      res.innerHTML = '<b>' + (k === ok ? 'ถูกใจใช่เลย' : 'อาจจะยัง') + '</b>' + (k !== ok && res.getAttribute('data-miss') ? '<em>' + tx(res.getAttribute('data-miss')) + '</em>' : '') + '<span>' + tx(res.getAttribute('data-why')) + '</span>';
    }; });
  });
  /* ───── ทำงาน ───── */
  D.steps.forEach(function (s, i) {
    var st = {}, box = document.getElementById('o' + (i + 1));
    s.ctl.forEach(function (c) { st[c.id] = c.def; });
    var qbox = document.getElementById('q' + (i + 1));
    function paint(live) { var o = find(s, st); box.innerHTML = outHTML(o, live, !!s.draw || s.outs.some(function (z) { return z.draw; }));
      if (qbox) { qbox.innerHTML = tx(o['case'] || '').replace(/\*\*(.+?)\*\*/g, '<b>$1</b>'); if (live) { qbox.parentNode.classList.remove('pop'); void qbox.offsetWidth; qbox.parentNode.classList.add('pop'); } } }
    s.ctl.forEach(function (c, j) {
      var bs = [].slice.call(root.querySelectorAll('[data-ctl="' + i + ':' + j + '"] button'));
      var rng = root.querySelector('[data-rng="' + i + ':' + j + '"]'), now = root.querySelector('[data-now="' + i + ':' + j + '"]'), rd = root.querySelector('[data-round="' + i + ':' + j + '"]'), tried = {};
      bs.forEach(function (b, k) {
        b.onclick = function () {
          st[c.id] = b.getAttribute('data-v');
          bs.forEach(function (x) { x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
          if (rng) { rng.value = k; now.textContent = b.textContent; tried[k] = 1; b.setAttribute('data-tried', '1'); rd.textContent = 'ลองแล้ว ' + Object.keys(tried).length + ' จาก ' + bs.length + ' แบบ'; }
          paint(true);
        };
        if (rng && b.getAttribute('aria-pressed') === 'true') { tried[k] = 1; b.setAttribute('data-tried', '1'); }
      });
      if (rng) { rd.textContent = 'ลองแล้ว 1 จาก ' + bs.length + ' แบบ'; rng.oninput = function () { bs[+rng.value].onclick(); }; }
    });
    paint(false);
  });
  V.quiz(document.getElementById('quiz'), D.quiz);
  /* ภาพเติมชั่วโมง: รวมชั่วโมงของกิจกรรมที่เลือก เทียบกับเกณฑ์จากข้อมูล (bars · subs · total) ส่วนเกินของแถบหนึ่งนับรวมให้อีกแถบได้เมื่อข้อมูลระบุ carryFrom */
  D.steps.forEach(function (s, i) {
    if (!s.fill) return;
    var F = s.fill, box = document.getElementById('fill' + (i + 1)), bs = [].slice.call(box.querySelectorAll('.acts button')), mt = box.querySelector('.mt'), u = F.unit || '';
    function draw() {
      var sum = {}, sub = {}, tot = 0;
      F.items.forEach(function (it, k) { if (bs[k].getAttribute('aria-pressed') !== 'true') return; sum[it.cat] = (sum[it.cat] || 0) + it.hours; if (it.tag) sub[it.tag] = (sub[it.tag] || 0) + it.hours; tot += it.hours; });
      var miss = [], x = '';
      F.bars.forEach(function (b) {
        var own = sum[b.id] || 0, extra = b.carryFrom ? Math.max(0, (sum[b.carryFrom] || 0) - F.bars.filter(function (z) { return z.id === b.carryFrom; })[0].need) : 0, v = own + extra, ok = v >= b.need;
        if (!ok) miss.push(tx(b.label) + 'ขาดอีก ' + (b.need - v) + ' ' + u);
        x += '<div class="m' + (ok ? ' ok' : '') + '"><div class="top"><span>' + tx(b.label) + '</span><b>' + v + ' <i>จาก ' + b.need + '</i></b></div><div class="bar"><i style="width:' + Math.min(100, own / b.need * 100) + '%"></i>' +
          (extra ? '<i class="x" style="width:' + Math.min(100 - Math.min(100, own / b.need * 100), extra / b.need * 100) + '%"></i>' : '') + '</div>' + (extra ? '<small>ของตัวเอง ' + own + ' รวมส่วนที่เกินของ' + tx(F.bars.filter(function (z) { return z.id === b.carryFrom; })[0].label) + ' ' + extra + '</small>' : '') + '</div>';
        (F.subs || []).filter(function (z) { return z.cat === b.id; }).forEach(function (z) {
          var sv = sub[z.tag] || 0, sok = sv >= z.need; if (!sok) miss.push(tx(z.label) + (sv ? 'ขาดอีก ' + (z.need - sv) + ' ' + u : 'ยังไม่มี'));
          x += '<div class="sb' + (sok ? ' ok' : '') + '">' + V.icon(sok ? 'check' : 'x') + '<span>' + tx(z.label) + ' ' + sv + ' จาก ' + z.need + '</span></div>';
        });
      });
      var good = !miss.length;
      x += '<div class="tot"><span>' + tx(F.total.label) + '</span><b>' + tot + ' <i>จาก ' + F.total.need + ' ' + u + '</i></b></div>';
      x += '<div class="ve-out ' + (good ? 't-yes' : 't-no') + '"><span class="tag big">' + tx(good ? F.ok : F.no) + '</span><b class="h">' + (good ? tx(F.okText) : miss.join(' · ')) + '</b>' +
        (!good && tot >= F.total.need ? '<p>' + tx(F.overText) + '</p>' : '') + '</div>';
      mt.innerHTML = x;
    }
    bs.forEach(function (b) { b.onclick = function () { b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); draw(); }; });
    draw();
  });
  /* ───── หลายหน้าในสถานีเดียว (ผู้ก่อตั้ง 13 ต.ค. 2569 ดึก: “ถ้ามันเลยสามหรือสี่ส่วน ให้กด next ไปหน้าถัดไปได้ แต่สถานีเดิม”)
     สถานีที่มีไม่เกินสี่ส่วนเป็นหน้าเดียวตามเดิม · ห้าส่วน = 3 + 2 · หกส่วน = 3 + 3 · ภาพรวมอยู่หน้าแรก โจทย์กับสรุปอยู่หน้าสุดท้าย ───── */
  /* 18 ต.ค. 2569 (blind test): บอกเวลาอ่านโดยประมาณของหน้าที่เห็นอยู่ · นับตัวอักษรที่มองเห็น ราว 700 ตัวต่อนาที */
  var readMin = function () { var n = 0; [].forEach.call(root.querySelectorAll('main > *, #app > *'), function (e) { if (e.tagName === 'HEADER' || e.classList.contains('ve-off') || !e.offsetParent) return; n += (e.innerText || '').replace(/\s+/g, '').length; }); return n ? Math.max(1, Math.round(n / 700)) : 0; };
  var NS = D.steps.length, NP = NS > PAGE_MAX ? Math.ceil(NS / 3) : 1, PER = Math.ceil(NS / NP);
  if (NP > 1) {
    var pSecs = [].slice.call(root.querySelectorAll('section[data-step]')), pNav = [].slice.call(root.querySelectorAll('#steps a')),
      pFirst = root.querySelector('section[aria-labelledby="f0"]'), pGet = root.querySelector('section.ve-get'),
      pLast = [].slice.call(root.querySelectorAll('section[aria-labelledby="fq"], section[aria-labelledby="fk"], section[aria-labelledby="fi"], details.src, section.next')),
      hero = root.querySelector('header.hero'), kick = hero.querySelector('.kick'), kick0 = kick.textContent, pager = document.createElement('nav');
    pager.className = 've-pager'; pager.setAttribute('aria-label', 'หน้าของสถานีนี้'); pSecs[NS - 1].parentNode.insertBefore(pager, pSecs[NS - 1].nextSibling);
    var range = function (p) { var a = (p - 1) * PER + 1, b = Math.min(NS, p * PER); return a === b ? 'ส่วนที่ ' + a : 'ส่วนที่ ' + a + ' ถึง ' + b; };
    var show = function (p, top) {
      p = Math.max(1, Math.min(NP, p));
      pSecs.forEach(function (x, i) { x.classList.toggle('ve-off', Math.floor(i / PER) + 1 !== p); });
      pNav.forEach(function (a) { var m = /^#s(\d+)$/.exec(a.getAttribute('href') || ''); if (m) a.classList.toggle('ve-off', Math.floor((+m[1] - 1) / PER) + 1 !== p); });
      if (pFirst) pFirst.classList.toggle('ve-off', p !== 1); if (pGet) pGet.classList.toggle('ve-off', p !== 1);
      pLast.forEach(function (e) { e.classList.toggle('ve-off', p !== NP); });
      hero.classList.toggle('slim', p !== 1); var rm = readMin(); kick.textContent = kick0 + ' · หน้า ' + p + ' จาก ' + NP + (rm ? ' · ราว ' + rm + ' นาที' : '');
      pager.innerHTML = '<small>หน้า ' + p + ' จาก ' + NP + ' ของสถานีนี้</small><div>' +
        (p < NP ? '<button type="button" class="btn" data-p="' + (p + 1) + '">ไปหน้าถัดไป · ' + range(p + 1) + '</button>' : '') +
        (p > 1 ? '<button type="button" class="btn ghost" data-p="' + (p - 1) + '">กลับหน้าก่อน · ' + range(p - 1) + '</button>' : '') + '</div>';
      [].forEach.call(pager.querySelectorAll('button'), function (b) { b.onclick = function () { show(+b.getAttribute('data-p'), true); }; });
      try { var u = new URL(location.href); if (p > 1) u.searchParams.set('p', p); else u.searchParams.delete('p'); if (top) u.hash = ''; history.replaceState(null, '', u); } catch (e) {}
      if (top) window.scrollTo(0, 0);
    };
    var hm = /^#s(\d+)$/.exec(location.hash || ''), qp = /[?&]p=(\d+)/.exec(location.search || '');
    show(hm ? Math.floor((+hm[1] - 1) / PER) + 1 : qp ? +qp[1] : 1, false);
  } else { var k1 = root.querySelector('header.hero .kick'), rm1 = readMin(); if (k1 && rm1) k1.textContent += ' · ราว ' + rm1 + ' นาที'; }
  V.spy('#steps');
  if (location.hash) { var t = document.getElementById(location.hash.slice(1)); if (t) t.scrollIntoView(); }
})();
