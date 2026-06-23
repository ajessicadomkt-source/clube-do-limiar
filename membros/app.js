// app.js — Lógica principal da plataforma Clube do Limiar

(function () {
  "use strict";

  // ------ SUPABASE CLIENT ------
  const _sb = (typeof supabase !== "undefined" && typeof SUPABASE_URL !== "undefined" && typeof SUPABASE_ANON_KEY !== "undefined")
    ? supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

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
      initRedeForm();
      loadMembrosData();
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
    // Atualiza a URL com o hash da seção
    history.replaceState(null, "", "#" + id);
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
    // Abre a seção indicada pelo hash da URL, ou Início por padrão
    const hash = window.location.hash.replace("#", "");
    const secoes = ["inicio", "mes", "arquivo", "agenda", "moai"];
    showSection(secoes.includes(hash) ? hash : "inicio");
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
        <p class="card-body">${proximo.data || "Data em breve"}</p>
        ${proximo.local ? `<p class="card-detail">${proximo.local}</p>` : ""}
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

    // Aniversariantes são preenchidos por loadMembrosData() após busca no Supabase
    const anivEl = document.getElementById("inicio-aniversariantes");
    if (anivEl) anivEl.innerHTML = "";
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
          ${item.subtema ? `<p class="agenda-subtema">${item.subtema}</p>` : ""}
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

  // ------ SIGNO ------
  function calcularSigno(dia, mes) {
    if ((mes === 12 && dia >= 22) || (mes === 1 && dia <= 19)) return { nome: "Capricórnio", simbolo: "♑" };
    if ((mes === 1 && dia >= 20) || (mes === 2 && dia <= 18)) return { nome: "Aquário",      simbolo: "♒" };
    if ((mes === 2 && dia >= 19) || (mes === 3 && dia <= 20)) return { nome: "Peixes",       simbolo: "♓" };
    if ((mes === 3 && dia >= 21) || (mes === 4 && dia <= 19)) return { nome: "Áries",        simbolo: "♈" };
    if ((mes === 4 && dia >= 20) || (mes === 5 && dia <= 20)) return { nome: "Touro",        simbolo: "♉" };
    if ((mes === 5 && dia >= 21) || (mes === 6 && dia <= 20)) return { nome: "Gêmeos",       simbolo: "♊" };
    if ((mes === 6 && dia >= 21) || (mes === 7 && dia <= 22)) return { nome: "Câncer",       simbolo: "♋" };
    if ((mes === 7 && dia >= 23) || (mes === 8 && dia <= 22)) return { nome: "Leão",         simbolo: "♌" };
    if ((mes === 8 && dia >= 23) || (mes === 9 && dia <= 22)) return { nome: "Virgem",       simbolo: "♍" };
    if ((mes === 9 && dia >= 23) || (mes === 10 && dia <= 22)) return { nome: "Libra",       simbolo: "♎" };
    if ((mes === 10 && dia >= 23) || (mes === 11 && dia <= 21)) return { nome: "Escorpião",  simbolo: "♏" };
    if ((mes === 11 && dia >= 22) || (mes === 12 && dia <= 21)) return { nome: "Sagitário",  simbolo: "♐" };
    return { nome: "Capricórnio", simbolo: "♑" };
  }

  // ------ REDE DE PROSPERIDADE ------
  function renderMembros() {
    const grid = document.getElementById("membros-grid");
    if (grid) grid.innerHTML = `<p class="rede-vazia">Carregando...</p>`;
  }

  async function loadMembrosData() {
    const grid   = document.getElementById("membros-grid");
    const anivEl = document.getElementById("inicio-aniversariantes");
    const nomeMes = ["","janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"];

    if (!_sb) {
      if (grid)   grid.innerHTML   = `<p class="rede-vazia">Os cadastros aparecerão aqui em breve.</p>`;
      if (anivEl) anivEl.innerHTML = "";
      return;
    }

    const { data } = await _sb
      .from("membros_rede")
      .select("*")
      .eq("aprovado", true)
      .order("nome");

    const membros = data || [];

    // Renderiza o grid da Rede
    if (grid) {
      if (!membros.length) {
        grid.innerHTML = `<p class="rede-vazia">Os cadastros aparecerão aqui em breve.</p>`;
      } else {
        grid.innerHTML = "";
        membros.forEach((m) => {
          const card = el("div", "membro-card");
          const links = [
            m.instagram ? `<a href="${m.instagram}" target="_blank" rel="noopener" class="membro-link">Instagram</a>` : "",
            m.whatsapp  ? `<a href="https://wa.me/55${m.whatsapp.replace(/\D/g,"")}" target="_blank" rel="noopener" class="membro-link">WhatsApp</a>` : "",
            m.site      ? `<a href="${m.site}" target="_blank" rel="noopener" class="membro-link">Site</a>` : "",
          ].filter(Boolean).join("");

          const aniversarioHtml = (() => {
            if (!m.aniversario_dia || !m.aniversario_mes) return "";
            const signo = calcularSigno(m.aniversario_dia, m.aniversario_mes);
            return `<p class="membro-aniversario">${signo.simbolo} ${signo.nome} · ${m.aniversario_dia} de ${nomeMes[m.aniversario_mes]}</p>`;
          })();

          card.innerHTML = `
            ${m.atendimento ? `<span class="membro-atendimento">${m.atendimento}</span>` : ""}
            <span class="membro-negocio">${m.negocio}</span>
            ${m.categoria ? `<span class="membro-categoria">${m.categoria}</span>` : ""}
            <span class="membro-nome">${m.nome}</span>
            <p class="membro-faz">${m.oquefaz}</p>
            ${m.paraquem ? `<p class="membro-para"><span>Para:</span> ${m.paraquem}</p>` : ""}
            ${aniversarioHtml}
            ${links ? `<div class="membro-contatos">${links}</div>` : ""}
          `;
          grid.appendChild(card);
        });
      }
    }

    // Renderiza aniversariantes na seção Início
    if (anivEl) {
      const mesAtual = new Date().getMonth() + 1;
      const aniversariantes = membros
        .filter((m) => m.aniversario_mes === mesAtual)
        .sort((a, b) => a.aniversario_dia - b.aniversario_dia);

      if (aniversariantes.length) {
        const itens = aniversariantes.map((m) => {
          const signo = calcularSigno(m.aniversario_dia, m.aniversario_mes);
          return `
            <div class="aniversariante-item">
              <span class="aniversariante-signo">${signo.simbolo}</span>
              <div class="aniversariante-info">
                <span class="aniversariante-nome">${m.nome}</span>
                <span class="aniversariante-detalhe">dia ${m.aniversario_dia} · ${signo.nome}</span>
              </div>
            </div>`;
        }).join("");

        anivEl.innerHTML = `
          <div class="inner-divider">
            <div class="inner-divider-line"></div>
            <span class="inner-divider-dot">✦</span>
            <div class="inner-divider-line"></div>
          </div>
          <span class="section-eyebrow">Aniversariantes de ${nomeMes[mesAtual]}</span>
          <div class="aniversariantes-list">${itens}</div>`;
      } else {
        anivEl.innerHTML = "";
      }
    }
  }

  function initRedeForm() {
    const btnAbrir    = document.getElementById("btn-abrir-cadastro");
    const btnVoltar   = document.getElementById("btn-voltar-rede");
    const btnVoltaPos = document.getElementById("btn-volta-apos-envio");
    const listaView   = document.getElementById("rede-lista");
    const formView    = document.getElementById("rede-form");
    const form        = document.getElementById("form-cadastro-rede");
    const sucesso     = document.getElementById("form-sucesso");
    const camposConj  = document.getElementById("campos-conjuge");

    if (!btnAbrir || !formView || !listaView) return;

    function mostrarLista() {
      formView.style.display = "none";
      listaView.style.display = "";
      window.scrollTo(0, 0);
    }
    function mostrarForm() {
      listaView.style.display = "none";
      formView.style.display = "";
      const titulo = formView.querySelector(".rede-form-titulo");
      const sub    = formView.querySelector(".rede-form-sub");
      if (btnVoltar) btnVoltar.style.display = "";
      if (titulo) titulo.style.display = "";
      if (sub)    sub.style.display    = "";
      if (form)   form.style.display   = "";
      if (sucesso) sucesso.style.display = "none";
      window.scrollTo(0, 0);
    }

    btnAbrir.addEventListener("click", mostrarForm);
    if (btnVoltar)   btnVoltar.addEventListener("click", mostrarLista);
    if (btnVoltaPos) btnVoltaPos.addEventListener("click", mostrarLista);

    document.querySelectorAll('input[name="tipoCadastro"]').forEach((r) => {
      r.addEventListener("change", () => {
        if (camposConj) camposConj.style.display = r.value === "conjuge" ? "" : "none";
      });
    });

    if (form) {
      form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const btn = form.querySelector(".btn-form-submit");
        if (btn) { btn.disabled = true; btn.textContent = "Enviando..."; }

        const fd = Object.fromEntries(new FormData(form).entries());
        if (_sb) {
          await _sb.from("membros_rede").insert({
            tipo_cadastro:    fd.tipoCadastro || "proprio",
            membro_clube_nome: fd.membroClubeNome || null,
            divulgado_nome:   fd.divulgadoNome   || null,
            relacao:          fd.relacao          || null,
            nome:             fd.nome,
            negocio:          fd.negocio,
            categoria:        fd.categoria        || null,
            oquefaz:          fd.oquefaz,
            paraquem:         fd.paraquem         || null,
            atendimento:      fd.atendimento      || null,
            instagram:        fd.instagram        || null,
            whatsapp:         fd.whatsapp         || null,
            site:             fd.site             || null,
            aniversario_dia:  fd.aniversarioDia  ? parseInt(fd.aniversarioDia,  10) : null,
            aniversario_mes:  fd.aniversarioMes  ? parseInt(fd.aniversarioMes,  10) : null,
            aprovado:         true,
          });
        }

        const titulo = formView.querySelector(".rede-form-titulo");
        const sub    = formView.querySelector(".rede-form-sub");
        if (btnVoltar) btnVoltar.style.display = "none";
        if (titulo) titulo.style.display = "none";
        if (sub)    sub.style.display    = "none";
        if (form)   form.style.display   = "none";
        if (sucesso) sucesso.style.display = "";
        window.scrollTo(0, 0);
      });
    }
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
