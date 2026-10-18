/* CPA Answer · กฎหมาย 2 รุ่นภาพ (law2v) — ของกลางที่ทุกบทใช้: ไอคอนเส้น · ปุ่มเลือก · โจทย์แบบกดตรวจ
 * บทหนึ่งบทเป็นหน้า HTML ของตัวเอง (ภาพวาดอยู่ในหน้า) เกณฑ์และตัวเลขทางกฎหมายอยู่ในหน้าของบท ไม่อยู่ในไฟล์นี้ */
/* 18 ต.ค. 2569 ชั้นหน้าตา liquid (law2v-liquid.css) ถอดได้: ?liquid=0 ปิด ?liquid=1 เปิด (จำในเครื่องผู้ดู) */
(function () {
  try {
    var q = location.search.match(/[?&]liquid=([01])/);
    if (q) localStorage.setItem('cpa-answer:liquid', q[1]);
    if ((q ? q[1] : localStorage.getItem('cpa-answer:liquid')) === '0') return;
  } catch (e) {}
  if (document.querySelector('link[href$="law2v-liquid.css"]')) return;
  var l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'law2v-liquid.css'; document.head.appendChild(l);
})();
(function () {
  var P = {
    check: 'M5 12.5l4.5 4.5L19 7.5', x: 'M6 6l12 12M18 6L6 18', lock: 'M7 11V8a5 5 0 0110 0v3M5.5 11h13v9h-13z',
    cap: 'M2.5 9.5L12 5l9.5 4.5L12 14zM6.5 11.8V16c1.5 1.4 3.4 2 5.5 2s4-.6 5.5-2v-4.2M21.5 9.5V15',
    bag: 'M4 8h16v11H4zM9 8V6a1 1 0 011-1h4a1 1 0 011 1v2M4 13h16', shield: 'M12 3l7.5 3v5.5c0 4.6-3.1 8-7.5 9.5-4.4-1.500-7.500-4.900-7.500-9.500V6z',
    book: 'M5 4.500h10.500a3 3 0 013 3V20H8a3 3 0 01-3-3zM5 17a3 3 0 013-3h10.500', card: 'M3.500 6h17v12h-17zM7 10.500h4M7 14h6M15.500 10.500h2',
    star: 'M12 3.500l2.600 5.300 5.900.900-4.300 4.100 1 5.800-5.200-2.700-5.200 2.700 1-5.800-4.300-4.100 5.900-.900z', mail: 'M3.500 6h17v12h-17zM3.500 7l8.500 6 8.500-6',
    clock: 'M12 3.500a8.500 8.500 0 100 17 8.500 8.500 0 000-17zM12 7.500V12l3 2', info: 'M12 3.500a8.500 8.500 0 100 17 8.500 8.500 0 000-17zM12 11v5M12 7.600v.300',
    flag: 'M6 21V4M6 5h11l-2 3.500 2 3.500H6', pen: 'M4 20l1-4L16.500 4.500l3 3L8 19zM14 7l3 3',
    /* เพิ่ม 13 ต.ค. 2569 สำหรับแผ่นไอคอนของการ์ดแม่บท */
    user: 'M12 12a4 4 0 100-8 4 4 0 000 8zM4.500 20c0-4 3.500-6 7.500-6s7.500 2 7.500 6',
    users: 'M9 11a3.500 3.500 0 100-7 3.500 3.500 0 000 7zM2.500 20c0-3.500 3-5.500 6.500-5.500s6.500 2 6.500 5.500M16 4.300a3.500 3.500 0 010 6.600M18 14.800c2.200.700 3.500 2.300 3.500 5.200',
    globe: 'M12 20.500a8.500 8.500 0 100-17 8.500 8.500 0 000 17zM3.500 12h17M12 3.500c-3.200 3-3.200 14 0 17M12 3.500c3.200 3 3.200 14 0 17',
    calendar: 'M5 6h14v14H5zM5 10.500h14M9 3.500V8M15 3.500V8', doc: 'M7 3.500h7l4 4V20.500H7zM14 3.500v4h4M10 12.500h5M10 16h5',
    coin: 'M12 20.500a8.500 8.500 0 100-17 8.500 8.500 0 000 17zM14.500 9.800c-.500-1-1.400-1.500-2.500-1.500-1.500 0-2.500.800-2.500 1.900s1 1.600 2.500 1.900 2.500.800 2.500 1.900-1 1.900-2.500 1.900c-1.200 0-2.100-.500-2.600-1.500M12 6.500v1.800M12 15.900v1.800',
    bank: 'M4 10l8-5 8 5M5 10h14M7 10v7M12 10v7M17 10v7M4 20h16', scale: 'M12 4v16M7.500 20h9M5.500 7h13M5.500 7l-2.500 6a2.700 2.700 0 005 0zM18.500 7L16 13a2.700 2.700 0 005 0z',
    ban: 'M12 20.500a8.500 8.500 0 100-17 8.500 8.500 0 000 17zM6 6l12 12', heart: 'M12 20s-7.500-4.400-7.500-9.700A4.200 4.200 0 0112 7.800a4.200 4.200 0 017.500 2.500C19.500 15.600 12 20 12 20z',
    home: 'M4 11l8-7 8 7M6 9.500V20h12V9.500', id: 'M3.500 6h17v12h-17zM8.500 13a2 2 0 100-4 2 2 0 000 4zM5.500 16c.500-1.400 1.700-2 3-2s2.500.600 3 2M14 10h4M14 13.500h4',
    search: 'M11 18a7 7 0 100-14 7 7 0 000 14zM16 16l5 5', percent: 'M6 18L18 6M8 9.500a1.500 1.500 0 100-3 1.500 1.500 0 000 3zM16 17.500a1.500 1.500 0 100-3 1.500 1.500 0 000 3z',
    vote: 'M5 11.500h14V20H5zM9 11.500V5h6v6.500M9.800 8.200l1.600 1.600 3-3', chat: 'M5 5h14v10H10l-5 4z', building: 'M5 21V5h9v16M14 10h5v11M8 9h3M8 13h3M8 17h3',
    gavel: 'M13 5l6 6M10 8l6 6M11.500 6.500l-5 5 6 6 5-5M4 20.500h8', hand: 'M8 12V6.500a1.500 1.500 0 013 0V11M11 11V5a1.500 1.500 0 013 0v6M14 11V6.500a1.500 1.500 0 013 0V14c0 4-2.500 6.500-6 6.500-3 0-4.500-1.500-6-4.500l-1.300-2.800a1.400 1.400 0 012.400-1.400L8 13.500',
    plane: 'M3 12l18-8-6 17-3.500-7zM11.500 14L21 4', key: 'M14.500 14a5 5 0 10-4.300-2.500L3.500 18v2.500H7V18h2.500v-2.500h2z', tool: 'M14.500 6.500a4 4 0 005 5L10 21l-3-3 9.500-9.500zM14.500 6.500L17 4a4 4 0 00-5 5'
  };
  function icon(n) { return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="' + (P[n] || P.info) + '"/></svg>'; }
  [].forEach.call(document.querySelectorAll('[data-ico]'), function (e) { e.innerHTML = icon(e.getAttribute('data-ico')); });

  /* ปุ่มเลือกหนึ่งจากหลายปุ่ม: <div data-pick="ชื่อ"><button data-v="0">…</button></div> */
  function pick(name, onChange) {
    var box = document.querySelector('[data-pick="' + name + '"]'), bs = [].slice.call(box.querySelectorAll('button[data-v]'));
    function set(v, quiet) { bs.forEach(function (b) { b.setAttribute('aria-pressed', b.getAttribute('data-v') === String(v) ? 'true' : 'false'); }); if (!quiet) onChange(v); }
    bs.forEach(function (b) { b.type = 'button'; b.onclick = function () { set(+b.getAttribute('data-v')); }; });
    var first = bs.filter(function (b) { return b.getAttribute('aria-pressed') === 'true'; })[0] || bs[0];
    set(+first.getAttribute('data-v'));
  }

  /* โจทย์: เลือกก่อน แล้วกด “ตรวจคำตอบ” · คำตอบรับของเว็บ “ถูกใจใช่เลย” / “อาจจะยัง” */
  function quiz(root, items) {
    items.forEach(function (it, n) {
      var sec = document.createElement('section'), sel = [], done = false; sec.className = 'q' + (it.tiles ? ' tiles' : '');
      var h = '<p class="small muted">ข้อ ' + (n + 1) + ' จาก ' + items.length + '</p><p class="f">' + it.f + '</p><p class="qq">' + it.q + '</p><div class="opts">';
      it.o.forEach(function (o, i) { h += '<button type="button" data-i="' + i + '">' + o[0] + '</button>'; });
      sec.innerHTML = h + '</div><button type="button" class="btn go" aria-disabled="true">ตรวจคำตอบ</button><div class="fb" role="status" hidden></div>';
      root.appendChild(sec);
      var bs = [].slice.call(sec.querySelectorAll('.opts button')), go = sec.querySelector('.go'), fb = sec.querySelector('.fb');
      function paint() { bs.forEach(function (b, i) { b.className = sel.indexOf(i) >= 0 ? 'sel' : ''; b.setAttribute('aria-pressed', sel.indexOf(i) >= 0 ? 'true' : 'false'); }); go.setAttribute('aria-disabled', sel.length ? 'false' : 'true'); }
      bs.forEach(function (b, i) { b.onclick = function () { if (done) return; if (it.multi) { var k = sel.indexOf(i); if (k >= 0) sel.splice(k, 1); else sel.push(i); } else sel = [i]; paint(); }; });
      go.onclick = function () {
        if (done) { done = false; sel = []; fb.hidden = true; go.textContent = 'ตรวจคำตอบ'; go.className = 'btn go'; paint(); return; }
        if (!sel.length) return;
        var right = it.o.every(function (o, i) { return !!o[1] === (sel.indexOf(i) >= 0); }), why;
        if (right) why = it.ex || it.o[sel[0]][2];
        else if (it.multi) { var bad = it.o.map(function (o, i) { return (!!o[1] !== (sel.indexOf(i) >= 0)) ? i : -1; }).filter(function (i) { return i >= 0; })[0]; why = it.o[bad][0] + ': ' + it.o[bad][2]; }
        else why = it.o[sel[0]][2];
        bs.forEach(function (b, i) { if (sel.indexOf(i) >= 0) b.className = it.o[i][1] ? 'ok' : 'no'; });
        fb.className = 'fb ' + (right ? 'ok' : 'no'); fb.innerHTML = '<b>' + (right ? 'ถูกใจใช่เลย' : 'อาจจะยัง') + '</b> ' + why; fb.hidden = false;
        done = true; go.textContent = 'ตอบใหม่'; go.className = 'btn go ghost'; go.setAttribute('aria-disabled', 'false');
      };
    });
  }

  /* ตัวละครประจำสาย: วาดครั้งเดียว ใช้ทุกบท <span data-face="prae"></span> */
  var SKIN = '#F2CDB3', SK2 = '#E3B598';
  function eyes(y, c) { return '<g>' +
      '<ellipse cx="50" cy="' + y + '" rx="5.2" ry="3.4" fill="#fff"/><ellipse cx="70" cy="' + y + '" rx="5.2" ry="3.4" fill="#fff"/>' +
      '<circle cx="50.4" cy="' + y + '" r="2.9" fill="' + c + '"/><circle cx="69.600" cy="' + y + '" r="2.9" fill="' + c + '"/>' +
      '<circle cx="51.300" cy="' + (y - 1) + '" r=".9" fill="#fff"/><circle cx="70.500" cy="' + (y - 1) + '" r=".9" fill="#fff"/>' +
      '<path d="M44.300 ' + (y - 1.5) + 'q5.700-4.600 11.400-.300M64.300 ' + (y - 1.800) + 'q5.700-4.300 11.400.300" fill="none" stroke="#2A1B15" stroke-width="1.700" stroke-linecap="round"/></g>'; }
  var FACE = {
    /* แพร: นักศึกษาบัญชี ผมยาวรวบ เสื้อนักศึกษา */
    prae: '<svg viewBox="0 0 120 120" aria-hidden="true"><defs><clipPath id="fcA"><circle cx="60" cy="60" r="60"/></clipPath></defs><g clip-path="url(#fcA)">' +
      '<rect width="120" height="120" fill="#DCEBF3"/>' +
      '<path d="M30 58c-3 24 0 44 8 62h44c8-18 11-38 8-62z" fill="#231712"/>' +
      '<path d="M22 124c2-20 14-29 38-29s36 9 38 29z" fill="#FDFDFB"/><path d="M48 96l12 13 12-13 6 4-18 18-18-18z" fill="#EEF1F2"/>' +
      '<circle cx="60" cy="112" r="1.800" fill="#B9C2C1"/>' +
      '<path d="M52 78h16v15c0 5-16 5-16 0z" fill="' + SK2 + '"/>' +
      '<ellipse cx="60" cy="55" rx="20.500" ry="25" fill="' + SKIN + '"/><ellipse cx="39.500" cy="57" rx="3" ry="5" fill="' + SKIN + '"/><ellipse cx="80.500" cy="57" rx="3" ry="5" fill="' + SKIN + '"/>' +
      '<path d="M38.500 56c-4-22 6-33 22-33 15 0 25 9 21.500 33-2-10-6-17-13-20-7 6-18 8-26 8-2 3-3.500 7-4.500 12z" fill="#231712"/>' +
      '<path d="M46 31c7-4 17-4 24 0" fill="none" stroke="#4A332A" stroke-width="1.500" stroke-linecap="round" opacity=".7"/>' +
      eyes(56, '#3B2418') +
      '<path d="M60 58c-1 4-2 6-1 8h2.500" fill="none" stroke="#C99A7E" stroke-width="1.400" stroke-linecap="round"/>' +
      '<path d="M53.500 71c4 3.200 9 3.200 13 0" fill="none" stroke="#B4534B" stroke-width="2" stroke-linecap="round"/>' +
      '<ellipse cx="46.500" cy="64.500" rx="4" ry="2.500" fill="#EFA69A" opacity=".45"/><ellipse cx="73.500" cy="64.500" rx="4" ry="2.500" fill="#EFA69A" opacity=".45"/>' +
      '</g></svg>',
    /* พราว: ผู้ฝึกหัดงาน ผมบ๊อบ แว่น เสื้อสูท */
    praw: '<svg viewBox="0 0 120 120" aria-hidden="true"><defs><clipPath id="fcB"><circle cx="60" cy="60" r="60"/></clipPath></defs><g clip-path="url(#fcB)">' +
      '<rect width="120" height="120" fill="#FBF6E4"/>' +
      '<path d="M33 52c-3 14-2 26 3 34h48c5-8 6-20 3-34z" fill="#3E271C"/>' +
      '<path d="M20 124c2-21 15-29 40-29s38 8 40 29z" fill="#16314A"/><path d="M50 95l10 14 10-14 4 2-14 23-14-23z" fill="#FDFDFB"/>' +
      '<path d="M46 97l14 24M74 97L60 121" stroke="#0E2235" stroke-width="2" fill="none"/>' +
      '<path d="M52 78h16v15c0 5-16 5-16 0z" fill="' + SK2 + '"/>' +
      '<ellipse cx="60" cy="55" rx="20.500" ry="25" fill="' + SKIN + '"/>' +
      '<path d="M37 62c-5-25 5-39 23-39s28 14 23 39c-1-12-4-21-10-25-9 4-20 4-27 2-5 5-8 13-9 23z" fill="#3E271C"/>' +
      '<path d="M37 62c0 9 2 16 5 21l3-4c-3-7-4-13-4-22zM83 62c0 9-2 16-5 21l-3-4c3-7 4-13 4-22z" fill="#3E271C"/>' +
      eyes(57, '#2E1D14') +
      '<g fill="none" stroke="#1B1B1B" stroke-width="1.800"><rect x="41.500" y="50.500" width="16.500" height="13" rx="6"/><rect x="62" y="50.500" width="16.500" height="13" rx="6"/><path d="M58 56h4M41.500 55l-3.500-1.500M78.500 55l3.500-1.500"/></g>' +
      '<path d="M60 59c-1 4-2 6-1 8h2.500" fill="none" stroke="#C99A7E" stroke-width="1.400" stroke-linecap="round"/>' +
      '<path d="M54 72c3.500 2.600 8.500 2.600 12 0" fill="none" stroke="#A8483F" stroke-width="2" stroke-linecap="round"/>' +
      '<ellipse cx="46" cy="66" rx="3.800" ry="2.300" fill="#EFA69A" opacity=".4"/><ellipse cx="74" cy="66" rx="3.800" ry="2.300" fill="#EFA69A" opacity=".4"/>' +
      '</g></svg>'
  };
  /* แพรหลายปีต่อมา: หน้าเดิม เปลี่ยนเป็นเสื้อสูท ใช้ในบทที่แพรทำงานแล้ว */
  FACE.prae2 = FACE.prae.replace('#DCEBF3', '#E3F3E8')
    .replace('fill="#FDFDFB"/><path d="M48 96l12 13 12-13 6 4-18 18-18-18z" fill="#EEF1F2"/>', 'fill="#1C4257"/><path d="M50 95l10 14 10-14 4 2-14 23-14-23z" fill="#FDFDFB"/><path d="M46 97l14 24M74 97L60 121" stroke="#12303F" stroke-width="2" fill="none"/>')
    .replace('<circle cx="60" cy="112" r="1.800" fill="#B9C2C1"/>', '');
  var faceN = 0;
  function face(n) { faceN++; return (FACE[n] || '').replace(/fc([AB])/g, 'fc$1' + faceN); }
  [].forEach.call(document.querySelectorAll('[data-face]'), function (e) { e.innerHTML = face(e.getAttribute('data-face')); });

  /* ประตู: ปิด/เปิดตาม class "open" ของกล่อง .gate */
  var DOOR = '<svg viewBox="0 0 96 110" aria-hidden="true"><rect x="14" y="8" width="68" height="96" rx="8" fill="#fff"/><rect class="door-glow" x="22" y="16" width="52" height="88" rx="4" fill="#F0C84B"/><g class="door-leaf"><rect x="22" y="16" width="52" height="88" rx="4" fill="currentColor" opacity=".85"/><circle cx="64" cy="62" r="3.500" fill="#fff"/></g><rect x="6" y="102" width="84" height="6" rx="3" fill="currentColor" opacity=".35"/></svg>';
  [].forEach.call(document.querySelectorAll('[data-door]'), function (e) { e.innerHTML = DOOR; });

  /* สวิตช์เปิดปิดหลายตัว: <div data-togs="ชื่อ"><button data-k="a" aria-pressed="false">…</button></div> → onChange({a:true,…}) */
  function togs(name, onChange) {
    var box = document.querySelector('[data-togs="' + name + '"]'), bs = [].slice.call(box.querySelectorAll('button[data-k]'));
    function state() { var o = {}; bs.forEach(function (b) { o[b.getAttribute('data-k')] = b.getAttribute('aria-pressed') === 'true'; }); return o; }
    bs.forEach(function (b) { b.type = 'button'; b.onclick = function () { b.setAttribute('aria-pressed', b.getAttribute('aria-pressed') === 'true' ? 'false' : 'true'); onChange(state()); }; });
    onChange(state());
  }

  /* แถบขั้นด้านบน: ไฮไลต์ขั้นที่กำลังอ่าน */
  function spy(navSel) {
    var nav = document.querySelector(navSel); if (!nav) return;
    /* ปุ่มกลับผังของสาย: อยู่ในแถบที่ติดขอบบนตลอด กลับได้จากทุกตำแหน่งของหน้า */
    if (!nav.querySelector('.home')) {
      var mm = /law2v-r\d\d\.html/.test(location.pathname) ? 'R' : ((/[?&]c=([A-Z])\d\d\b/.exec(location.search) || [])[1] || '');
      var hm = document.createElement('a'); hm.className = 'home'; hm.href = 'law2v-index.html' + (mm ? '#' + mm : ''); hm.setAttribute('aria-label', 'กลับไปผังสถานีของสายนี้');
      hm.innerHTML = '<i><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 11.500l8-7 8 7M6.500 10v9.500h11V10"/></svg></i>ผังสาย';
      nav.insertBefore(hm, nav.firstChild);
    }
    if (!('IntersectionObserver' in window)) return;
    var links = [].slice.call(nav.querySelectorAll('a[href^="#"]')), map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (!e.isIntersecting) return; links.forEach(function (a) { a.removeAttribute('aria-current'); }); var a = map[e.target.getAttribute('data-step')]; if (a) a.setAttribute('aria-current', 'step'); }); }, { rootMargin: '-35% 0px -55% 0px' });
    [].forEach.call(document.querySelectorAll('section[data-step]'), function (s) { io.observe(s); });
  }
  /* จุดเช็กระหว่างทาง: คำถามสั้นหนึ่งข้อท้ายส่วน แตะตัวเลือกแล้วเห็นผลกับเหตุผลทันที ตอบใหม่ได้ ไม่มีคะแนน
     V.check('id ของกล่องว่าง', { f: 'ข้อเท็จจริงสั้น ๆ (ไม่ใส่ก็ได้)', q: 'คำถาม', o: [['ตัวเลือก', 1, 'เหตุผล'], ['ตัวเลือก', 0, 'ตอบคนที่เลือกข้อนี้ว่าพลาดตรงไหน']] })
     สองตัวเลือกวางคู่กัน สามตัวเลือกขึ้นไปเรียงลง */
  function check(root, it) {
    if (typeof root === 'string') root = document.getElementById(root);
    if (!root) return;
    root.className = (root.className ? root.className + ' ' : '') + 'ckp';
    var h = '<small>' + icon('check') + 'ลองเอง</small>' + (it.f ? '<p class="ckf">' + it.f + '</p>' : '') + '<p class="ckq">' + it.q + '</p><div class="ckb' + (it.o.length > 2 ? ' col' : '') + '">';
    it.o.forEach(function (o, i) { h += '<button type="button" data-i="' + i + '" aria-pressed="false">' + o[0] + '</button>'; });
    root.innerHTML = h + '</div><div class="ckr" role="status" aria-live="polite"></div>';
    var bs = [].slice.call(root.querySelectorAll('.ckb button')), r = root.querySelector('.ckr');
    bs.forEach(function (b, i) { b.onclick = function () {
      var ok = !!it.o[i][1];
      bs.forEach(function (x, j) { x.setAttribute('aria-pressed', j === i ? 'true' : 'false'); x.className = it.o[j][1] ? 'right' : ''; });
      root.className = root.className.replace(/ ?\b(done|hit)\b/g, '') + ' done' + (ok ? ' hit' : '');
      r.innerHTML = '<b>' + (ok ? 'ถูกใจใช่เลย' : 'อาจจะยัง') + '</b><span>' + it.o[i][2] + '</span>';
    }; });
  }
  /* แถบเลื่อนตัวเลขมีปุ่ม − + : ใช้เมื่อข้อเท็จจริงที่ผู้เรียนเปลี่ยนเป็นตัวเลข (ชั่วโมง ปี วัน บาท จำนวนคน)
     <div class="nums" data-nums="ชื่อ"><div data-k="a" data-min="0" data-max="40" data-step="1" data-v="14" data-unit="ชั่วโมง">ป้าย<small>คำอธิบายสั้น (ไม่ใส่ก็ได้)</small></div>…</div>
     V.nums('ชื่อ', function (s) { s.a … }) เรียกครั้งแรกทันที และทุกครั้งที่ค่าเปลี่ยน · คืน { set: function (k, v) } ไว้ตั้งค่าจากปุ่มอื่น */
  function nums(name, onChange) {
    var box = document.querySelector('[data-nums="' + name + '"]'), st = {}, ins = {};
    function fmt(v) { return String(v).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
    [].forEach.call(box.querySelectorAll('[data-k]'), function (el) {
      var k = el.getAttribute('data-k'), min = +el.getAttribute('data-min') || 0, max = +el.getAttribute('data-max'), step = +el.getAttribute('data-step') || 1,
        unit = el.getAttribute('data-unit') || '', sm = el.querySelector('small'), note = sm ? sm.outerHTML : '';
      if (sm) el.removeChild(sm);
      var label = el.innerHTML.replace(/^\s+|\s+$/g, ''), plain = label.replace(/<[^>]+>/g, '');
      st[k] = Math.min(max, Math.max(min, +el.getAttribute('data-v') || min));
      el.className = (el.className ? el.className + ' ' : '') + 'nm';
      el.innerHTML = '<div class="nmh"><span>' + label + '</span><output></output></div><div class="nmc"><button type="button" aria-label="ลด ' + plain + '">−</button>' +
        '<input type="range" min="' + min + '" max="' + max + '" step="' + step + '" aria-label="' + plain + '"><button type="button" aria-label="เพิ่ม ' + plain + '">+</button></div>' + note;
      var inp = el.querySelector('input'), out = el.querySelector('output'), bs = el.querySelectorAll('.nmc button');
      function paint() { inp.value = st[k]; out.innerHTML = fmt(st[k]) + (unit ? '<i>' + unit + '</i>' : ''); inp.style.setProperty('--p', (max > min ? 100 * (st[k] - min) / (max - min) : 0) + '%');
        inp.setAttribute('aria-valuetext', fmt(st[k]) + ' ' + unit); bs[0].disabled = st[k] <= min; bs[1].disabled = st[k] >= max; }
      function to(v, quiet) { v = Math.min(max, Math.max(min, Math.round(v / step) * step)); if (v === st[k] && !quiet) return; st[k] = v; paint(); if (!quiet) onChange(st); }
      inp.oninput = function () { to(+inp.value); }; bs[0].onclick = function () { to(st[k] - step); }; bs[1].onclick = function () { to(st[k] + step); };
      ins[k] = to; paint();
    });
    onChange(st);
    return { set: function (k, v) { if (ins[k]) { ins[k](v, true); onChange(st); } } };
  }
  /* ลองเอง ห้ารอบ: โจทย์เดิมบิดทีละนิด ผู้เรียนปรับตัวควบคุมของภาพให้ตรงกับโจทย์รอบนั้น เมื่อตรงครบ ผลขึ้นพร้อมบอกว่าอะไรเปลี่ยน
     var R = V.rounds('id', { title, rounds: [{ case: 'html', want: { k: ค่า }, note: 'อะไรเปลี่ยน อะไรคงเดิม' }], show: function (k, v) { return 'ป้ายของค่า' } })
     แล้วเรียก R.update(state, 'ผลตอนนี้ (html)') ทุกครั้งที่ตัวควบคุมของภาพเปลี่ยน */
  function rounds(root, cfg) {
    if (typeof root === 'string') root = document.getElementById(root);
    var k = 0, done = [], last = null, verdict = '', N = cfg.rounds.length;
    root.className = (root.className ? root.className + ' ' : '') + 'rnd';
    root.innerHTML = '<div class="rnh"><b>' + (cfg.title || 'ลองเอง ' + N + ' รอบ') + '</b><span class="rnd-dots">' + cfg.rounds.map(function () { return '<i></i>'; }).join('') + '</span></div>' +
      '<div class="case" role="status" aria-live="polite"><small></small><p></p></div><p class="lbl">ปรับภาพข้างบนให้ตรงกับโจทย์รอบนี้</p><ul class="rnd-todo"></ul><div class="rnd-res" role="status"></div><button type="button" class="btn" hidden></button>';
    var dots = root.querySelectorAll('.rnd-dots i'), cs = root.querySelector('.case'), todo = root.querySelector('.rnd-todo'), res = root.querySelector('.rnd-res'), nx = root.querySelector('button');
    function same(a, b) { return String(a) === String(b); }
    function paint() {
      [].forEach.call(dots, function (d, i) { d.className = done[i] ? 'ok' : (i === k ? 'on' : ''); });
      if (k >= N) {
        cs.hidden = true; todo.innerHTML = ''; root.querySelector('.lbl').hidden = true; nx.hidden = true;
        res.innerHTML = '<b>ครบ ' + N + ' รอบ</b><table><tr><th>รอบ</th><th>โจทย์</th><th>ผล</th></tr>' + done.map(function (d, i) { return '<tr><td>' + (i + 1) + '</td><td>' + cfg.rounds[i].case + '</td><td>' + d + '</td></tr>'; }).join('') + '</table>';
        return;
      }
      var r = cfg.rounds[k]; cs.hidden = false; root.querySelector('.lbl').hidden = false;
      cs.querySelector('small').textContent = 'โจทย์รอบ ' + (k + 1) + ' จาก ' + N; cs.querySelector('p').innerHTML = r.case;
      var keys = Object.keys(r.want), ok = 0;
      todo.innerHTML = keys.map(function (q) { var m = last && same(last[q], r.want[q]); if (m) ok++; return '<li class="' + (m ? 'ok' : '') + '"><i></i><span>' + cfg.show(q, r.want[q]) + (m || !last ? '' : ' · ตอนนี้ ' + cfg.show(q, last[q])) + '</span></li>'; }).join('');
      if (last && ok === keys.length) { res.innerHTML = verdict + (r.note ? '<em>' + r.note + '</em>' : ''); nx.hidden = false; nx.textContent = k < N - 1 ? 'รอบถัดไป' : 'ดูผลทั้ง ' + N + ' รอบ'; }
      else { res.innerHTML = ''; nx.hidden = true; }
    }
    nx.onclick = function () { done[k] = verdict.replace(/<em>[\s\S]*$/, ''); k++; paint(); };
    paint();
    return { update: function (state, v) { last = {}; for (var q in state) last[q] = state[q]; verdict = v; paint(); } };
  }
  window.LAW2V = { icon: icon, pick: pick, quiz: quiz, face: face, togs: togs, spy: spy, check: check, nums: nums, rounds: rounds };

  /* จำสถานีที่เปิดไว้ในเครื่องนี้ เพื่อให้หน้ารวมแสดงว่ามาถึงสถานีไหนแล้ว (ไม่ส่งออกไปที่ใด) */
  try {
    var m = /law2v-r(\d\d)\.html/.exec(location.pathname), c = m ? 'R' + m[1] : (/[?&]c=([A-Z]\d\d)\b/.exec(location.search) || [])[1];
    if (c) { var sn = JSON.parse(localStorage.getItem('law2v:seen') || '{}') || {}; sn[c] = 1; localStorage.setItem('law2v:seen', JSON.stringify(sn)); localStorage.setItem('law2v:last', c); }
  } catch (e) {}

  /* โหมดรีวิว: เปิดด้วย ?rv=1 ปิดด้วย ?rv=0 (จำไว้ในเครื่องนี้) แสดงที่อยู่ของแต่ละจอ แตะเพื่อคัดลอก ผู้เรียนทั่วไปไม่เห็น
     LA2.<สาย>.<สถานี>.<ส่วน> เช่น LA2.1.3.4 = สาย 1 สถานี 3 ส่วนที่ 4 · ต่อท้าย a แม่บท · b ตัวอย่าง · c ลองเปลี่ยน
     .0 ภาพรวมของบท · .Q2 คำถามข้อ 2 · .S สรุปบทนี้ */
  try {
    var rq = /[?&]rv=([01])\b/.exec(location.search);
    if (rq) { if (rq[1] === '1') localStorage.setItem('law2v:rv', '1'); else localStorage.removeItem('law2v:rv'); }
    if (localStorage.getItem('law2v:rv') === '1') window.addEventListener('load', function () {
      var LN = { R: 1, W: 2, S: 3, C: 4, V: 5, A: 1, F: 2, B: 4, P: 3, H: 5 }, SUBJECT = { A: 'LA1.', F: 'LA1.', B: 'LA1.', P: 'LA1.', H: 'LA1.' };   /* A F = สายของ LA1 */
      function ad(code, no) { var t = window.LAW2V_TOC && window.LAW2V_TOC[code]; return (SUBJECT[code.charAt(0)] || 'LA2.') + LN[code.charAt(0)] + '.' + (no != null ? no : (t && t.no != null ? t.no : +code.slice(1))); }
      function copy(t) {
        if (navigator.clipboard && navigator.clipboard.writeText) { navigator.clipboard.writeText(t).catch(function () {}); return; }
        var ta = document.createElement('textarea'); ta.value = t; document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (e) {} document.body.removeChild(ta);
      }
      function tag(host, a, first) {
        var b = document.createElement('span'); b.className = 'rv-ad'; b.setAttribute('role', 'button'); b.setAttribute('tabindex', '0'); b.setAttribute('aria-label', 'คัดลอกที่อยู่ ' + a); b.textContent = a;
        b.onclick = function (ev) { ev.preventDefault(); ev.stopPropagation(); copy(a); b.textContent = 'คัดลอกแล้ว'; setTimeout(function () { b.textContent = a; }, 900); };
        if (first) host.insertBefore(b, host.firstChild); else host.appendChild(b);
      }
      var st = document.createElement('style');
      st.textContent = '.rv-ad{display:inline-block;float:right;margin:0 0 8px 10px;padding:6px 9px;border-radius:7px;background:#16283A;color:#fff;font:600 13px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.02em;cursor:pointer;position:relative;z-index:2}' +
        '.lp .rv-ad,.q .rv-ad{float:none;margin:0 0 0 8px;vertical-align:middle}a .rv-ad{float:none;margin:0 0 0 8px;padding:4px 7px;vertical-align:middle}' +
        '.rv-bar{position:fixed;left:12px;bottom:12px;z-index:50;padding:8px 12px;border-radius:999px;background:#16283A;color:#fff;font:600 13px/1.2 Anuphan,sans-serif;box-shadow:0 4px 14px rgba(0,0,0,.25)}.rv-bar a{color:#F2C94C;margin-left:10px}';
      document.head.appendChild(st);
      var m = /law2v-r(\d\d)\.html/.exec(location.pathname), code = m ? 'R' + m[1] : (/[?&]c=([A-Z]\d\d)\b/.exec(location.search) || [])[1];
      if (code && LN[code.charAt(0)]) {
        var base = ad(code);
        var f0 = document.querySelector('section[aria-labelledby="f0"]'); if (f0) tag(f0, base + '.0', true);
        [].forEach.call(document.querySelectorAll('section[data-step]'), function (sec) {
          var n = sec.getAttribute('data-step').replace(/^s/, ''); tag(sec, base + '.' + n, true);
          [].forEach.call(sec.querySelectorAll('.lp'), function (lp) { var i = lp.querySelector('i'), k = i ? 'abc'.charAt(+i.textContent - 1) : ''; if (k) tag(lp, base + '.' + n + k); });
        });
        [].forEach.call(document.querySelectorAll('#quiz > .q'), function (q, i) { var p = q.querySelector('p') || q; tag(p, base + '.Q' + (i + 1)); });
        var fk = document.querySelector('section[aria-labelledby="fk"]'); if (fk) tag(fk, base + '.S', true);
      }
      [].forEach.call(document.querySelectorAll('a[data-code]'), function (a) { var c = a.getAttribute('data-code'); var w = /สถานี (\d+)/.exec(a.getAttribute('data-where') || ''); if (LN[c.charAt(0)]) tag(a.querySelector('small') || a, ad(c, w ? +w[1] : null)); });
      var bar = document.createElement('div'); bar.className = 'rv-bar';
      bar.innerHTML = 'โหมดรีวิว · แตะรหัสเพื่อคัดลอก<a href="' + location.pathname + location.search.replace(/([?&])rv=[01]&?/, '$1').replace(/[?&]$/, '') + (location.search.replace(/([?&])rv=[01]&?/, '$1').replace(/[?&]$/, '') ? '&' : '?') + 'rv=0">ปิด</a>';
      document.body.appendChild(bar);
    });
  } catch (e) {}
})();
