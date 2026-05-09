// app.js — Lógica principal da plataforma Clube do Limiar

(function () {
  "use strict";

  // ----------------------------------------------------------
  // CURSOR PERSONALIZADO
  // ----------------------------------------------------------
  const cursor = document.getElementById("cursor");
  const ring = document.getElementById("cursorRing");
  let mx = 0, my = 0, rx = 0, ry = 0;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX; my = e.clientY;
    if (cursor) { cursor.style.left = mx + "px"; cursor.style.top = my + "px"; }
  });

  (function animRing() {
    rx += (mx - rx) * 0.1;
    ry += (my - ry) * 0.1;
    if (ring) { ring.style.left = rx + "px"; ring.style.top = ry + "px"; }
    requestAnimationFrame(animRing);
  })();

  function bindCursorHover(selector) {
    document.querySelectorAll(selector).forEach((el) => {
      el.addEventListener("mouseenter", () => {
        if (cursor) { cursor.style.width = "10px"; cursor.style.height = "10px"; }
        if (ring) { ring.style.width = "44px"; ring.style.height = "44px"; }
      });
      el.addEventListener("mouseleave", () => {
        if (cursor) { cursor.style.width = "5px"; cursor.style.height = "5px"; }
        if (ring) { ring.style.width = "26px"; ring.style.height = "26px"; }
      });
    });
  }

  // ----------------------------------------------------------
  // AUTENTICAÇÃO
  // ----------------------------------------------------------
  const STORAGE_KEY = "limiar_auth";
  const loginScreen = document.getElementById("login-screen");
  const app = document.getElementById("app");

  function isAuthenticated() {
    return localStorage.getItem(STORAGE_KEY) === "true";
  }

  function doLogin(senha) {
    if (senha === SENHA_ACESSO) {
      localStorage.setItem(STORAGE_KEY, "true");
      showApp();
      return true;
    }
    return false;
  }

  function doLogout() {
    localStorage.removeItem(STORAGE_KEY);
    location.reload();
  }

  function showApp() {
    if (loginScreen) {
      loginScreen.classList.add("fade-out");
      setTimeout(() => { loginScreen.style.display = "none"; }, 650);
    }
    if (app) {
      app.classList.add("visible");
      renderAll();
      initRoteiroToggle();
    }
    setTimeout(() => bindCursorHover("a, button, .arquivo-card, .nav-link"), 100);
  }

  // Formulário de login
  const loginForm = document.getElementById("login-form");
  const loginError = document.getElementById("login-error");

  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("senha-input");
      const ok = doLogin(input.value.trim());
      if (!ok) {
        loginError.textContent = "Senha incorreta. Tente novamente.";
        input.value = "";
        input.focus();
      }
    });
  }

  const btnSair = document.getElementById("btn-sair");
  if (btnSair) btnSair.addEventListener("click", doLogout);

  // ----------------------------------------------------------
  // NAVEGAÇÃO
  // ----------------------------------------------------------
  const navLinks = document.querySelectorAll(".nav-link[data-section]");
  const sections = document.querySelectorAll(".section");
  const navToggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("nav");

  function showSection(id) {
    sections.forEach((s) => s.classList.remove("active"));
    navLinks.forEach((l) => l.classList.remove("active"));
    const target = document.getElementById("section-" + id);
    if (target) target.classList.add("active");
    const link = document.querySelector(`.nav-link[data-section="${id}"]`);
    if (link) link.classList.add("active");
    // Fecha nav mobile ao navegar
    if (nav && nav.classList.contains("open")) toggleNav();
    // Scroll ao topo
    window.scrollTo(0, 0);
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      showSection(link.dataset.section);
    });
  });

  // Toggle menu mobile
  function toggleNav() {
    if (!nav || !navToggle) return;
    nav.classList.toggle("open");
    navToggle.classList.toggle("open");
  }

  if (navToggle) navToggle.addEventListener("click", toggleNav);

  // Fechar ao clicar fora (mobile)
  document.addEventListener("click", (e) => {
    if (!nav || !nav.classList.contains("open")) return;
    if (!nav.contains(e.target) && !navToggle.contains(e.target)) toggleNav();
  });

  // ----------------------------------------------------------
  // RENDERIZAÇÃO DO CONTEÚDO
  // ----------------------------------------------------------
  function renderAll() {
    renderInicio();
    renderMesAtual();
    renderArquivo();
    renderAgenda();
    renderMembros();
    showSection("inicio");
  }

  // Helpers
  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function clear(id) {
    const container = document.getElementById(id);
    if (container) container.innerHTML = "";
    return container;
  }

  // ------ INÍCIO ------
  function renderInicio() {
    // Próximo encontro
    const proximo = AGENDA.find((a) => a.proximo) || AGENDA[0];
    const encontroEl = document.getElementById("inicio-encontro");
    if (encontroEl && proximo) {
      encontroEl.innerHTML = `
        <span class="card-tag">Próximo encontro</span>
        <p class="card-body">${proximo.data}</p>
        <p class="card-detail">${proximo.local}</p>
      `;
    }

    // Mês atual resumo
    const mesEl = document.getElementById("inicio-mes");
    if (mesEl) {
      mesEl.innerHTML = `
        <span class="card-tag">Mês ${MES_ATUAL.numero} · em curso</span>
        <h3 class="card-title">${MES_ATUAL.tema}</h3>
        <p class="card-body" style="font-style:italic;color:var(--text-dim)">${MES_ATUAL.subtema}</p>
      `;
    }

    // Afirmação da semana — troca automaticamente a cada 7 dias
    const sementeEl = document.getElementById("inicio-semente");
    if (sementeEl) {
      const semanaAtual = Math.floor(Date.now() / (7 * 24 * 60 * 60 * 1000));
      const afirmacao = AFIRMACOES[semanaAtual % AFIRMACOES.length];
      sementeEl.innerHTML = `
        <p class="semente-texto">"${afirmacao}"</p>
      `;
    }
  }

  // ------ MÊS ATUAL ------
  function renderMesAtual() {
    const container = document.getElementById("section-mes");
    if (!container) return;

    // Título
    document.getElementById("mes-titulo").textContent = MES_ATUAL.tema;
    document.getElementById("mes-sub").textContent = MES_ATUAL.subtema;
    document.getElementById("mes-num").textContent = "Mês " + MES_ATUAL.numero;

    // Pergunta
    const pergEl = document.getElementById("mes-pergunta");
    if (pergEl) {
      pergEl.querySelector(".pergunta-texto").textContent = MES_ATUAL.perguntaGerminativa;
    }

    // Símbolo
    const simEl = document.getElementById("mes-simbolo");
    if (simEl) {
      simEl.innerHTML = `
        <div class="simbolo-glyph">◯</div>
        <div>
          <span class="simbolo-nome">${MES_ATUAL.simbolo.nome}</span>
          <span class="simbolo-desc">${MES_ATUAL.simbolo.descricao}</span>
        </div>
      `;
    }

    // Curadoria + Atividades (agregadas numa única seção)
    const curEl = document.getElementById("mes-curadoria");
    if (curEl) {
      curEl.innerHTML = "";

      // Itens de curadoria
      MES_ATUAL.curadoria.forEach((item) => {
        const div = el("div", "curadoria-item");
        div.innerHTML = `
          <span class="curadoria-tipo">${item.tipo}</span>
          <span class="curadoria-titulo">${item.titulo}</span>
          <span class="curadoria-autor">${item.autor}${item.disponivel ? ` · <em>${item.disponivel}</em>` : ""}</span>
          ${item.trailer ? `
            <a class="curadoria-trailer" href="${item.trailerUrl}" target="_blank" rel="noopener" aria-label="Assistir trailer no YouTube">
              <img src="${item.trailerThumb}" alt="Trailer ${item.titulo}" loading="lazy">
              <div class="curadoria-trailer-play">▶</div>
            </a>` : ""}
          <p class="curadoria-desc">${item.descricao}</p>
          ${item.indicacao ? `<p class="curadoria-indicacao">→ ${item.indicacao}</p>` : ""}
        `;
        curEl.appendChild(div);
      });

      // Atividades para casa — aparecem na sequência, sem seção separada
      MES_ATUAL.atividades.forEach((a) => {
        const div = el("div", "curadoria-item");
        div.innerHTML = `
          <span class="curadoria-tipo">atividade</span>
          <span class="curadoria-titulo">${a.titulo}</span>
          <span class="curadoria-autor"></span>
          <p class="curadoria-desc">${a.descricao}</p>
        `;
        curEl.appendChild(div);
      });
    }

    // Atividades — seção separada desativada (agregada à curadoria acima)
    const atEl = document.getElementById("mes-atividades");
    if (atEl) atEl.innerHTML = "";

    // Roteiro
    const roteiroContent = document.getElementById("roteiro-content");
    if (roteiroContent) {
      roteiroContent.innerHTML = "";
      MES_ATUAL.roteiro.forEach((r) => {
        const row = el("div", "roteiro-row");
        row.innerHTML = `
          <span class="roteiro-tempo">${r.tempo}</span>
          <div>
            <span class="roteiro-momento">${r.momento}</span>
          </div>
        `;
        roteiroContent.appendChild(row);
      });
    }
  }

  // ------ ARQUIVO ------
  // Converte data em português ("17 de maio de 2026") para objeto Date
  function parsePtDate(str) {
    const meses = {
      "janeiro": 0, "fevereiro": 1, "março": 2, "abril": 3,
      "maio": 4, "junho": 5, "julho": 6, "agosto": 7,
      "setembro": 8, "outubro": 9, "novembro": 10, "dezembro": 11
    };
    if (!str) return null;
    const partes = str.toLowerCase().split(" de ");
    if (partes.length < 3) return null;
    const dia = parseInt(partes[0]);
    const mes = meses[partes[1]];
    const ano = parseInt(partes[2]);
    if (isNaN(dia) || mes === undefined || isNaN(ano)) return null;
    return new Date(ano, mes, dia);
  }

  function renderArquivo() {
    const grid = document.getElementById("arquivo-grid");
    if (!grid) return;
    grid.innerHTML = "";

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    // Encontros da agenda cujas datas já passaram
    const numerosNoArquivo = ARQUIVO.map((m) => m.numero);
    const passados = AGENDA.filter((a) => {
      const d = parsePtDate(a.data);
      return d && d < hoje && !numerosNoArquivo.includes(a.numero);
    });

    // Combina arquivo manual + passados automáticos
    const tudo = [
      ...ARQUIVO,
      ...passados.map((a) => ({
        numero: a.numero,
        tema: a.tema,
        subtema: a.data,
        data: a.data,
        _pendente: true,
      })),
    ];

    if (tudo.length === 0) {
      grid.innerHTML = `<p style="padding:2rem;color:var(--text-dim);font-style:italic;font-size:0.9rem;">O arquivo crescerá a cada mês concluído.</p>`;
      return;
    }

    tudo.forEach((mes) => {
      const card = el("div", "arquivo-card" + (mes._pendente ? " arquivo-pendente" : ""));
      card.innerHTML = `
        <span class="arquivo-num">${mes.numero}</span>
        <span class="arquivo-tema">${mes.tema}</span>
        <span class="arquivo-subtema">${mes._pendente ? "" : mes.subtema}</span>
        <span class="arquivo-data">${mes.data || ""}</span>
      `;
      if (!mes._pendente) {
        card.addEventListener("click", () => openModal(mes));
      }
      grid.appendChild(card);
    });
  }

  // Modal do arquivo
  const modalOverlay = document.getElementById("modal-overlay");
  const modalBody = document.getElementById("modal-body");

  function openModal(mes) {
    if (!modalOverlay || !modalBody) return;

    let curadoriaHtml = "";
    if (mes.curadoria && mes.curadoria.length) {
      curadoriaHtml = `
        <div class="inner-divider"><div class="inner-divider-line"></div><span class="inner-divider-dot">✦</span><div class="inner-divider-line"></div></div>
        <span class="tag">Curadoria</span>
        <div class="curadoria-list">
          ${mes.curadoria.map((c) => `
            <div class="curadoria-item">
              <span class="curadoria-tipo">${c.tipo}</span>
              <span class="curadoria-titulo">${c.titulo}</span>
              <span class="curadoria-autor">${c.autor}</span>
              <p class="curadoria-desc">${c.descricao}</p>
              ${c.indicacao ? `<p class="curadoria-indicacao">→ ${c.indicacao}</p>` : ""}
            </div>
          `).join("")}
        </div>
      `;
    }

    let atividadesHtml = "";
    if (mes.atividades && mes.atividades.length) {
      atividadesHtml = `
        <div class="inner-divider"><div class="inner-divider-line"></div><span class="inner-divider-dot">✦</span><div class="inner-divider-line"></div></div>
        <span class="tag">Atividades</span>
        <div class="atividades-list">
          ${mes.atividades.map((a, i) => `
            <div class="atividade-item">
              <span class="atividade-num">0${i + 1}</span>
              <div>
                <span class="atividade-titulo">${a.titulo}</span>
                <p class="atividade-desc">${a.descricao}</p>
              </div>
            </div>
          `).join("")}
        </div>
      `;
    }

    modalBody.innerHTML = `
      <span class="section-eyebrow">Mês ${mes.numero} · ${mes.data || ""}</span>
      <h2 class="section-title">${mes.tema}</h2>
      <p class="section-sub">${mes.subtema}</p>
      <div class="pergunta-box">
        <span class="pergunta-label">Pergunta germinativa</span>
        <p class="pergunta-texto">${mes.perguntaGerminativa}</p>
      </div>
      <div class="simbolo-row">
        <div class="simbolo-glyph">◯</div>
        <div>
          <span class="simbolo-nome">${mes.simbolo.nome}</span>
          <span class="simbolo-desc">${mes.simbolo.descricao}</span>
        </div>
      </div>
      ${curadoriaHtml}
      ${atividadesHtml}
    `;

    modalOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  const modalClose = document.getElementById("modal-close");
  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  // ------ AGENDA ------
  function renderAgenda() {
    const list = document.getElementById("agenda-list");
    if (!list) return;
    list.innerHTML = "";

    AGENDA.forEach((item) => {
      const div = el("div", "agenda-item" + (item.proximo ? " proximo" : ""));
      div.innerHTML = `
        <span class="agenda-num">${item.numero}</span>
        <div class="agenda-corpo">
          ${item.proximo ? `<span class="agenda-badge">Próximo encontro</span>` : ""}
          <span class="agenda-tema">${item.tema}</span>
          ${item.data ? `<p class="agenda-detalhe">
            <span class="agenda-data-hora">${[item.diaSemana, item.data].filter(Boolean).join(", ")}${item.horario ? " · " + item.horario : ""}</span>
            ${item.local ? `<br><span class="${item.confirmado ? "" : "agenda-a-confirmar"}">${item.local}</span>` : ""}
          </p>` : ""}
        </div>
      `;
      list.appendChild(div);
    });

    // Botão único do calendário do clube — aparece abaixo da lista
    const calBtn = document.getElementById("agenda-cal-btn");
    if (calBtn) {
      if (CONFIG.calendarUrl) {
        calBtn.href = CONFIG.calendarUrl;
        calBtn.style.display = "inline-flex";
      } else {
        calBtn.style.display = "none";
      }
    }
  }

  // ------ MEMBROS ------
  function renderMembros() {
    const grid = document.getElementById("membros-grid");
    if (!grid) return;
    grid.innerHTML = "";

    MEMBROS.forEach((m) => {
      const card = el("div", "membro-card");
      const avatar = m.foto
        ? `<div class="membro-foto-wrap"><img src="${m.foto}" alt="${m.nome}" class="membro-foto" loading="lazy"></div>`
        : `<div class="membro-inicial">${m.nome.charAt(0).toUpperCase()}</div>`;
      card.innerHTML = `
        ${avatar}
        <span class="membro-nome">${m.nome}</span>
        <p class="membro-frase">${m.frase}</p>
      `;
      grid.appendChild(card);
    });
  }

  // ------ ROTEIRO TOGGLE ------
  function initRoteiroToggle() {
    const toggle = document.getElementById("roteiro-toggle");
    const content = document.getElementById("roteiro-content");
    if (!toggle || !content) return;
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("open");
      content.classList.toggle("open");
    });
  }

  // ----------------------------------------------------------
  // INICIALIZAÇÃO
  // Login temporariamente desativado — acesso direto ao conteúdo
  // ----------------------------------------------------------
  showApp();
})();
