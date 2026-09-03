/* ============================================
   Bruce Liao 个人简历 - 主交互脚本
   依赖: window.PROFILE, window.PROJECTS, window.CATEGORIES
   ============================================ */

(function () {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const PROFILE = window.PROFILE || {};
  const PROJECTS = window.PROJECTS || [];
  const CATEGORIES = window.CATEGORIES || [];

  // ============== Hero Meta ==============
  if ($('#meta-years')) $('#meta-years').textContent = `从业 ${PROFILE.years || 10} 年`;
  if ($('#meta-city')) $('#meta-city').textContent = PROFILE.city || '深圳 · 罗湖';
  if ($('#meta-cat')) $('#meta-cat').textContent = '高端住宅 / 样板间 / 商业';

  // ============== About ==============
  const bio = $('#bio');
  if (bio) {
    bio.textContent = PROFILE.bio || '';
  }
  const tags = $('#tags');
  if (tags && PROFILE.evaluation && PROFILE.evaluation.keywords) {
    tags.innerHTML = PROFILE.evaluation.keywords.map((k, i) =>
      `<span class="tag ${i % 2 ? 'magenta' : ''}">#${k}</span>`
    ).join('');
  }

  // ============== Education ==============
  const edu = PROFILE.education || {};
  const eduEl = $('#edu-card');
  if (eduEl) {
    eduEl.innerHTML = `
      <h4>${edu.school || '—'}</h4>
      <div class="meta">专业 / <span>${edu.major || '—'}</span></div>
      <div class="meta">时间 / <span>${edu.period || '—'}</span></div>
    `;
  }

  // ============== Experience Timeline ==============
  const tl = $('#timeline');
  if (tl && PROFILE.experience) {
    tl.innerHTML = PROFILE.experience.map(exp => `
      <div class="timeline-item ${exp.current ? 'current' : ''} reveal">
        <div class="timeline-head">
          <div>
            <div class="timeline-company">${exp.company}</div>
            <div class="timeline-role">${exp.role}</div>
          </div>
          <div class="timeline-period">${exp.period}</div>
        </div>
        <div class="timeline-desc">${exp.desc}</div>
        ${exp.stats && exp.stats.length ? `<div class="timeline-stats">${exp.stats.map(s => `
          <div class="stat">
            <div class="stat-value">${s.value}</div>
            <div class="stat-label">${s.label}</div>
          </div>`).join('')}</div>` : ''}
      </div>
    `).join('');
  }

  // ============== Skills ==============
  const skillList = $('#skill-list');
  if (skillList && PROFILE.skills && PROFILE.skills.software) {
    skillList.innerHTML = PROFILE.skills.software.map(sk => `
      <div class="skill-item">
        <div class="skill-head">
          <span class="skill-name">${sk.name}</span>
          <span class="skill-level">${sk.level}%</span>
        </div>
        <div class="skill-bar"><div class="skill-bar-fill" data-level="${sk.level}"></div></div>
      </div>
    `).join('');
  }

  const abilities = $('#abilities');
  if (abilities && PROFILE.skills && PROFILE.skills.abilities) {
    abilities.innerHTML = PROFILE.skills.abilities.map(a => `<div class="ability">${a}</div>`).join('');
  }

  const certs = $('#certs');
  if (certs && PROFILE.skills && PROFILE.skills.certificates) {
    certs.innerHTML = PROFILE.skills.certificates.map(c => `<div class="cert">${c}</div>`).join('');
  }

  // ============== Portfolio Filter + Cards ==============
  let activeFilter = 'all';

  function buildFilter() {
    const bar = $('#filter-bar');
    if (!bar) return;
    const items = [{ key: 'all', label: '全部 ALL', count: PROJECTS.length }];
    CATEGORIES.forEach(c => {
      items.push({ key: c.key, label: c.label, count: c.count });
    });
    bar.innerHTML = items.map(it => `
      <button class="filter-btn ${it.key === activeFilter ? 'active' : ''}" data-filter="${it.key}">
        ${it.label}<span class="count">(${it.count})</span>
      </button>
    `).join('');
    $$('.filter-btn', bar).forEach(btn => {
      btn.addEventListener('click', () => {
        activeFilter = btn.dataset.filter;
        $$('.filter-btn', bar).forEach(b => b.classList.toggle('active', b === btn));
        renderPortfolio();
      });
    });
  }

  function renderPortfolio() {
    const grid = $('#portfolio-grid');
    if (!grid) return;
    const filtered = activeFilter === 'all'
      ? PROJECTS
      : PROJECTS.filter(p => p.categoryKey === activeFilter);

    grid.innerHTML = filtered.map(p => {
      const imgCount = p.imageCount || 0;
      const hasVR = !!p.vrLink;
      const hasVideo = p.videos && p.videos.length;
      const badges = [
        hasVR ? `<span class="badge">360° VR</span>` : '',
        hasVideo ? `<span class="badge cyan">VIDEO</span>` : '',
      ].filter(Boolean).join('');

      return `
      <div class="project-card" data-id="${p.id}">
        ${badges ? `<div class="project-badges">${badges}</div>` : ''}
        <img class="project-thumb" src="${p.thumb}" alt="${p.name}" loading="lazy">
        <div class="project-info">
          <div class="project-meta">
            <span class="project-cat">${p.categoryLabel}</span>
            <span class="project-city">${p.city} · ${p.year}</span>
          </div>
          <div class="project-name">${p.name}</div>
          <div class="project-stats">
            <span>${p.area || '—'}</span>
            <span>${p.style}</span>
            <span>${imgCount} 图</span>
          </div>
        </div>
        <div class="project-overlay">
          <div class="project-overlay-btn">查看详情 →</div>
        </div>
      </div>
    `;
    }).join('');

    $$('.project-card', grid).forEach(card => {
      card.addEventListener('click', () => openProject(card.dataset.id));
    });
  }

  buildFilter();
  renderPortfolio();

  // ============== Hobbies ==============
  const hobbiesGrid = $('#hobbies-grid');
  if (hobbiesGrid && PROFILE.hobbies) {
    hobbiesGrid.innerHTML = PROFILE.hobbies.map(h => `
      <div class="hobby-card reveal">
        <div class="hobby-icon">${h.icon}</div>
        <div class="hobby-name">${h.name}</div>
        <div class="hobby-desc">${h.desc}</div>
      </div>
    `).join('');
  }

  // ============== Contact ==============
  if ($('#contact-email')) $('#contact-email').textContent = PROFILE.email || '';
  if ($('#contact-wechat')) $('#contact-wechat').textContent = PROFILE.wechat || '';

  // ============== Modal ==============
  const modal = $('#modal');
  const modalClose = $('#modal-close');
  const modalTitle = $('#modal-title');
  const modalMeta = $('#modal-meta');
  const modalDesc = $('#modal-desc');
  const modalExtra = $('#modal-extra');
  const modalTabs = $('#modal-tabs');
  const modalGallery = $('#modal-gallery');
  let currentProject = null;
  let currentTab = 'render';

  function openProject(id) {
    const p = PROJECTS.find(x => x.id === id);
    if (!p) return;
    currentProject = p;
    currentTab = (p.images.render && p.images.render.length) ? 'render'
              : (p.images.real && p.images.real.length) ? 'real'
              : 'plan';

    modalTitle.textContent = p.name;
    modalMeta.innerHTML = `
      <span class="chip">${p.categoryLabel}</span>
      <span class="chip">${p.city}</span>
      <span class="chip">${p.area}</span>
      <span class="chip">${p.year}</span>
      <span class="chip">${p.style}</span>
      <span class="chip">${p.role}</span>
    `;
    modalDesc.textContent = p.description || '';

    // extra (VR / Video)
    let extra = '';
    if (p.vrLink) extra += `<a href="${p.vrLink}" target="_blank" class="btn btn-primary" style="font-size:12px;">VIEW 360° VR →</a>`;
    if (p.videos && p.videos.length) {
      p.videos.forEach(v => {
        extra += `<video controls preload="metadata" src="${v.src}" style="max-width:100%;max-height:300px;border:1px solid var(--cyan);"></video>`;
      });
    }
    modalExtra.innerHTML = extra;

    // tabs
    const tabs = [
      { key: 'render', label: '效果图 RENDERS', count: p.images.render.length },
      { key: 'real', label: '实景图 PHOTOS', count: p.images.real.length },
      { key: 'plan', label: '平面图 PLANS', count: p.images.plan.length },
    ];
    modalTabs.innerHTML = tabs.map(t => `
      <button class="tab-btn ${t.key === currentTab ? 'active' : ''}" data-tab="${t.key}">
        ${t.label}<span class="count">(${t.count})</span>
      </button>
    `).join('');
    $$('.tab-btn', modalTabs).forEach(btn => {
      btn.addEventListener('click', () => {
        currentTab = btn.dataset.tab;
        $$('.tab-btn', modalTabs).forEach(b => b.classList.toggle('active', b === btn));
        renderGallery();
      });
    });

    renderGallery();
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function renderGallery() {
    if (!currentProject) return;
    const imgs = currentProject.images[currentTab] || [];
    modalGallery.innerHTML = imgs.map((img, i) => `
      <div class="gallery-item" data-idx="${i}">
        <img src="${img.src}" alt="${currentProject.name} ${currentTab} ${i + 1}" loading="lazy">
      </div>
    `).join('') || `<div style="grid-column:1/-1;padding:40px;text-align:center;color:var(--text-dim);font-family:var(--font-mono);">暂无图片 / NO IMAGES</div>`;
    $$('.gallery-item', modalGallery).forEach(item => {
      item.addEventListener('click', () => openLightbox(parseInt(item.dataset.idx, 10)));
    });
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    modalGallery.innerHTML = '';
    modalExtra.innerHTML = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modal) modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); closeLightbox(); } });

  // ============== Lightbox ==============
  const lightbox = $('#lightbox');
  const lbImg = $('#lightbox-img');
  const lbPrev = $('#lb-prev');
  const lbNext = $('#lb-next');
  const lbCounter = $('#lb-counter');
  let lbIndex = 0;
  let lbList = [];

  function openLightbox(idx) {
    if (!currentProject) return;
    lbList = currentProject.images[currentTab] || [];
    if (!lbList.length) return;
    lbIndex = idx;
    updateLightbox();
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  }
  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  }
  function updateLightbox() {
    const item = lbList[lbIndex];
    if (!item) return;
    lbImg.src = item.src;
    lbCounter.textContent = `${lbIndex + 1} / ${lbList.length}`;
  }
  if (lbPrev) lbPrev.addEventListener('click', e => { e.stopPropagation(); lbIndex = (lbIndex - 1 + lbList.length) % lbList.length; updateLightbox(); });
  if (lbNext) lbNext.addEventListener('click', e => { e.stopPropagation(); lbIndex = (lbIndex + 1) % lbList.length; updateLightbox(); });
  if (lightbox) lightbox.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'ArrowLeft') lbPrev.click();
    if (e.key === 'ArrowRight') lbNext.click();
  });

  // ============== Reveal on scroll ==============
  const revealEls = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add('visible');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  // ============== Animate skill bars ==============
  const skillFills = $$('.skill-bar-fill');
  if ('IntersectionObserver' in window) {
    const io2 = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          const lvl = en.target.dataset.level || 0;
          en.target.style.width = lvl + '%';
          io2.unobserve(en.target);
        }
      });
    }, { threshold: 0.4 });
    skillFills.forEach(el => {
      el.style.width = '0';
      io2.observe(el);
    });
  } else {
    skillFills.forEach(el => { el.style.width = (el.dataset.level || 0) + '%'; });
  }

  // ============== Glitch on hero name (subtle) ==============
  const heroName = $('.hero-name .zh');
  if (heroName) heroName.classList.add('glitch');

})();