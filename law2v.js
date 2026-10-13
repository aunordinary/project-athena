/* CPA Answer · กฎหมาย 2 รุ่นภาพ (law2v) — ของกลางที่ทุกบทใช้: ไอคอนเส้น · ปุ่มเลือก · โจทย์แบบกดตรวจ
 * บทหนึ่งบทเป็นหน้า HTML ของตัวเอง (ภาพวาดอยู่ในหน้า) เกณฑ์และตัวเลขทางกฎหมายอยู่ในหน้าของบท ไม่อยู่ในไฟล์นี้ */
(function () {
  var P = {
    check: 'M5 12.5l4.5 4.5L19 7.5', x: 'M6 6l12 12M18 6L6 18', lock: 'M7 11V8a5 5 0 0110 0v3M5.5 11h13v9h-13z',
    cap: 'M2.5 9.5L12 5l9.5 4.5L12 14zM6.5 11.8V16c1.5 1.4 3.4 2 5.5 2s4-.6 5.5-2v-4.2M21.5 9.5V15',
    bag: 'M4 8h16v11H4zM9 8V6a1 1 0 011-1h4a1 1 0 011 1v2M4 13h16', shield: 'M12 3l7.5 3v5.5c0 4.6-3.1 8-7.5 9.5-4.4-1.500-7.500-4.900-7.500-9.500V6z',
    book: 'M5 4.500h10.500a3 3 0 013 3V20H8a3 3 0 01-3-3zM5 17a3 3 0 013-3h10.500', card: 'M3.500 6h17v12h-17zM7 10.500h4M7 14h6M15.500 10.500h2',
    star: 'M12 3.500l2.600 5.300 5.900.900-4.300 4.100 1 5.800-5.200-2.700-5.200 2.700 1-5.800-4.300-4.100 5.900-.900z', mail: 'M3.500 6h17v12h-17zM3.500 7l8.500 6 8.500-6',
    clock: 'M12 3.500a8.500 8.500 0 100 17 8.500 8.500 0 000-17zM12 7.500V12l3 2', info: 'M12 3.500a8.500 8.500 0 100 17 8.500 8.500 0 000-17zM12 11v5M12 7.600v.300',
    flag: 'M6 21V4M6 5h11l-2 3.500 2 3.500H6', pen: 'M4 20l1-4L16.500 4.500l3 3L8 19zM14 7l3 3'
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
    var nav = document.querySelector(navSel); if (!nav || !('IntersectionObserver' in window)) return;
    var links = [].slice.call(nav.querySelectorAll('a[href^="#"]')), map = {};
    links.forEach(function (a) { map[a.getAttribute('href').slice(1)] = a; });
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (!e.isIntersecting) return; links.forEach(function (a) { a.removeAttribute('aria-current'); }); var a = map[e.target.getAttribute('data-step')]; if (a) a.setAttribute('aria-current', 'step'); }); }, { rootMargin: '-35% 0px -55% 0px' });
    [].forEach.call(document.querySelectorAll('[data-step]'), function (s) { io.observe(s); });
  }
  window.LAW2V = { icon: icon, pick: pick, quiz: quiz, face: face, togs: togs, spy: spy };
})();
