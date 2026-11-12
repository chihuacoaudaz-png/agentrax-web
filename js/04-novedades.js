  /* Novedades y Preguntas frecuentes */
  (() => {
    // Novedades: para publicar una, agregar un elemento a NEWS
    // { tipo: 'prensa' | 'eventos' | 'logros', fecha: 'Nov 2026', titulo: '', linea: '', enlace: '', imagen: '' }
    const NEWS = [];
    const grid = document.getElementById('news-grid'), empty = document.getElementById('news-empty');
    const LABEL = { prensa: 'Prensa', eventos: 'Evento', logros: 'Logro' };
    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
    function renderNews(kind) {
      const list = NEWS.filter(n => kind === 'all' || n.tipo === kind);
      grid.innerHTML = list.map(n => `<a class="ncard" href="${esc(n.enlace || '#novedades')}"${n.enlace ? ' target="_blank" rel="noopener"' : ''}>
        <span class="ncard__img"${n.imagen ? ` style="background-image:url('${esc(n.imagen)}')"` : ''}></span>
        <span class="ncard__body"><span class="eq-tag">${esc(LABEL[n.tipo] || '')} · ${esc(n.fecha)}</span><h3>${esc(n.titulo)}</h3><p>${esc(n.linea)}</p></span></a>`).join('');
      grid.hidden = !list.length; empty.hidden = !!list.length;
    }
    const filters = [...document.querySelectorAll('[data-news]')];
    filters.forEach(b => b.addEventListener('click', () => { filters.forEach(o => o.classList.toggle('is-on', o === b)); renderNews(b.dataset.news); }));
    renderNews('all');

  })();
