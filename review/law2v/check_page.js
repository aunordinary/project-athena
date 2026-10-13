/* ตัวตรวจหน้ารุ่นภาพ (ชั่วคราว ลบหลังใช้): โหลดหน้าในกรอบ 375 และ 1280 กดทุกปุ่มเลือก ทุกสวิตช์ ทุกตัวเลือกของโจทย์ แล้วรายงานจอล้นกับข้อผิดพลาด */
window.__chkV = async function (files, widths) {
  const W = ms => new Promise(r => setTimeout(r, ms)), out = [];
  for (const file of files) { const rec = { file, issues: [], picks: 0, togs: 0, quiz: 0 }; out.push(rec);
    for (const w of (widths || [375])) {
      const f = document.createElement('iframe'); f.style.cssText = 'position:fixed;left:-9999px;top:0;height:900px;width:' + w + 'px'; f.src = file + '?t=' + Date.now(); document.body.appendChild(f);
      const errs = []; await new Promise(r => f.onload = r); const d = f.contentDocument, win = f.contentWindow; win.addEventListener('error', e => errs.push(e.message)); await W(350);
      if (!win.LAW2V) { rec.issues.push('โหลด law2v.js ไม่ขึ้น @' + w); f.remove(); continue; }
      const over = where => { const sw = d.documentElement.scrollWidth; if (sw > w + 1) rec.issues.push(where + '@' + w + ': ล้นจอ ' + sw); const m = d.body.innerText.match(/undefined|NaN|\[object/); if (m) rec.issues.push(where + '@' + w + ': พบ ' + m[0]); };
      over('ตั้งต้น');
      for (const box of d.querySelectorAll('[data-pick]')) { const bs = [...box.querySelectorAll('button[data-v]')]; if (w === (widths || [375])[0]) rec.picks += bs.length; for (const b of bs) { try { b.click(); } catch (e) { rec.issues.push('pick ' + box.getAttribute('data-pick') + ': ' + e.message); } await W(15); over('pick ' + box.getAttribute('data-pick') + '=' + b.getAttribute('data-v')); } bs[0] && bs[0].click(); }
      for (const box of d.querySelectorAll('[data-togs]')) { const bs = [...box.querySelectorAll('button[data-k]')]; if (w === (widths || [375])[0]) rec.togs += bs.length; for (const b of bs) { b.click(); await W(15); over('tog ' + b.getAttribute('data-k')); } }
      const qs = [...d.querySelectorAll('#quiz section, .q')].filter(q => q.querySelector('.go')); if (w === (widths || [375])[0]) rec.quiz = qs.length;
      for (const [qi, q] of qs.entries()) { const bs = [...q.querySelectorAll('.opts button')], go = q.querySelector('.go'); let ok = 0;
        for (const b of bs) { b.click(); go.click(); await W(10); const fb = q.querySelector('.fb'); if (!fb || fb.hidden || fb.textContent.trim().length < 12) rec.issues.push('โจทย์ ' + (qi + 1) + ': ไม่มีคำอธิบาย'); else if (fb.classList.contains('ok')) ok++; over('โจทย์ ' + (qi + 1)); go.click(); }
        if (!q.classList.contains('tiles') && ok !== 1 && bs.length && !/แตะทุก|เลือกทุก|หลายข้อ/.test(q.textContent)) rec.issues.push('โจทย์ ' + (qi + 1) + ': เลือกทีละตัวแล้วถูก ' + ok + ' ตัว'); }
      const dup = {}; d.querySelectorAll('[id]').forEach(e => dup[e.id] = (dup[e.id] || 0) + 1); const dd = Object.keys(dup).filter(k => dup[k] > 1); if (dd.length) rec.issues.push('id ซ้ำ: ' + dd.join(','));
      const links = [...d.querySelectorAll('a[href]')].map(a => a.getAttribute('href')).filter(h => /^law2[uv]/.test(h)); rec.links = [...new Set(links)].join(' ');
      { const lum = c => { const m = (c.match(/[\d.]+/g) || []).map(Number); if (m.length < 3) return null; const al = m[3] === undefined ? 1 : m[3]; return (0.299 * m[0] + 0.587 * m[1] + 0.114 * m[2]) * al + 255 * (1 - al); };
        const bgOf = e => { for (let n = e; n && n.nodeType === 1; n = n.parentElement) { const c = win.getComputedStyle(n).backgroundColor; const m = (c.match(/[\d.]+/g) || []).map(Number); if (m.length >= 3 && (m[3] === undefined || m[3] > 0.5)) return c; } return 'rgb(247,245,239)'; };
        const low = new Set(); for (const e of d.querySelectorAll('.law')) { if (!e.textContent.trim() || !e.getClientRects().length) continue; const s = win.getComputedStyle(e); const a = lum(s.color), b2 = lum(bgOf(e)); if (a !== null && b2 !== null && Math.abs(a - b2) < 70) low.add((e.className || e.tagName) + ': ' + e.textContent.trim().slice(0, 24)); }
        if (low.size && w === (widths || [375])[0]) rec.issues.push('ตัวอักษรกลืนพื้น: ' + [...low].slice(0, 6).join(' | ')); }
      rec.h = d.documentElement.scrollHeight; if (errs.length) rec.issues.push('ข้อผิดพลาด @' + w + ': ' + errs[0]); f.remove(); } }
  return out; };
