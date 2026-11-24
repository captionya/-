addConcept({
  id: 'cognitive-dissonance',
  subject: 'psychology',
  zh: '认知失调',
  en: 'Cognitive Dissonance',
  zhDesc: '当两个认知互相矛盾时（比如“我很自律”和“我又熬夜了”），人会感到不适，并本能地想消除这种张力。常见方式有三种：改变行为、改变想法、或者加入一个新的解释。',
  enDesc: 'Mental discomfort felt when two cognitions conflict. People are motivated to reduce it by changing behavior, changing a belief, or adding a justifying thought.',
  parts: ['self-concept'],
  render(el, api) {
    const {ctx, w: W, h: H} = api.canvas(el, 220);
    let ax = W * 0.2, bx = W * 0.8, mid = 0, mode = '';
    const btn = (t, fn) => { const b = document.createElement('button'); b.textContent = t; b.onclick = fn; el.appendChild(b); };
    btn('制造冲突', () => { ax = W * 0.2; bx = W * 0.8; mid = 0; mode = ''; });
    btn('改变行为', () => mode = 'behavior');
    btn('改变想法', () => mode = 'belief');
    btn('找个借口', () => mode = 'excuse');
    api.loop(t => {
      if (mode === 'behavior') bx += (ax + 40 - bx) * 0.03;
      if (mode === 'belief') ax += (bx - 40 - ax) * 0.03;
      if (mode === 'excuse') mid += (1 - mid) * 0.04;
      const tension = Math.min(1, (bx - ax) / (W * 0.6)) * (1 - 0.7 * mid);
      const col = `rgb(${Math.round(110 + 145 * tension)},${Math.round(168 - 46 * tension)},${Math.round(255 - 166 * tension)})`;
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = col; ctx.lineWidth = 3; ctx.beginPath();
      for (let x = ax; x <= bx; x += 3) {
        const y = H / 2 + Math.sin(x * 0.09 - t * 14) * 20 * tension;
        x === ax ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.fillStyle = col;
      [ax, bx].forEach(x => { ctx.beginPath(); ctx.arc(x, H / 2, 24, 0, 7); ctx.fill(); });
      if (mid > 0.01) {
        ctx.fillStyle = api.color.accent;
        ctx.beginPath(); ctx.arc((ax + bx) / 2, H / 2, 14 * mid, 0, 7); ctx.fill();
      }
      ctx.fillStyle = api.color.text; ctx.font = '13px sans-serif'; ctx.textAlign = 'center';
      ctx.fillText('我很自律', ax, H / 2 - 38);
      ctx.fillText('我又熬夜了', bx, H / 2 + 52);
      if (mid > 0.5) ctx.fillText('就这一次', (ax + bx) / 2, H / 2 - 38);
      ctx.fillStyle = api.color.dim;
      ctx.fillText('不适感 ' + Math.round(tension * 100) + '%', W / 2, H - 10);
    });
  }
});
