// ============================================================
// DATA.JS — Arquivo de conteúdo do Clube do Limiar
// Edite apenas este arquivo para atualizar o site.
// Não é necessário mexer em nenhum outro arquivo.
// ============================================================

// ------------------------------------------------------------
// SENHA DE ACESSO
// ------------------------------------------------------------
const SENHA_ACESSO = "limiar2025";

// ------------------------------------------------------------
// INFORMAÇÕES GERAIS
// ------------------------------------------------------------
const CONFIG = {
  nomeClube: "Clube do Limiar",
  subtitulo: "investigação simbólica da vida interior",
  facilitadora: "Jessica",
  calendarUrl: "https://calendar.google.com/calendar/u/0?cid=Y2YzMWYzMDllMjkzMDIxYTUxNTU1ZTQ2OWExZDkyODI2YjE4Njc4OGUxMWExZDI1NTE0NjMzZGI2YzZjZTdmNkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t",
};

// ------------------------------------------------------------
// SEMENTE DA SEMANA
// ------------------------------------------------------------
const SEMENTE_SEMANA = {
  data: "08 de maio de 2026",
  texto:
    "O símbolo não explica — ele convida. Antes de nomear o que você sentiu, pergunte: que imagem veio primeiro?",
  autor: "Jessica",
};

// ------------------------------------------------------------
// MÊS ATUAL
// ------------------------------------------------------------
const MES_ATUAL = {
  numero: "01",
  tema: "A Travessia",
  subtema: "Toda jornada começa com um limiar.",

  perguntaGerminativa:
    "O que me trouxe até aqui — e o que isso diz sobre mim?",

  simbolo: {
    nome: "A porta",
    descricao:
      "Toda porta é um limiar — existe entre dois mundos. Atravessá-la transforma, mesmo que sutilmente. Este mês vocês estão atravessando uma porta juntos. O que está do outro lado ainda não se sabe.",
  },

  encontro: {
    data: "17 de maio de 2026",
    diaSemana: "Domingo",
    horario: "15h",
    local: "Casa da Jessica — Av. das Araucárias, 210",
    tema: "Como viemos parar aqui?",
  },

  curadoria: [
    {
      tipo: "atividade",
      titulo: "Soul",
      autor: "Pixar, 2020",
      disponivel: "Disponível na Disney+",
      trailer: true,
      trailerUrl: "https://www.youtube.com/watch?v=Sz-jdlM_YGk",
      trailerThumb: "https://img.youtube.com/vi/Sz-jdlM_YGk/hqdefault.jpg",
      descricao:
        "Uma animação sobre o que nos torna quem somos antes mesmo de vivermos. Assista sem celular ou pausas, com atenção plena.",
      indicacao: "Enquanto assiste, observe: em qual personagem você se reconhece? E qual porta do filme ressoa com alguma porta sua?",
    },
  ],

  atividades: [],

  // Roteiro do encontro — os descritivos ficam aqui como referência da facilitadora
  // mas não aparecem na interface para os membros
  roteiro: [
    {
      tempo: "0:00",
      momento: "Limiar — Abertura ritualística",
      descricao: "",
    },
    {
      tempo: "0:15",
      momento: "Roda de apresentação",
      descricao: "",
    },
    {
      tempo: "0:50",
      momento: "Debate sobre Soul",
      descricao: "",
    },
    {
      tempo: "1:20",
      momento: "Experiência do Mês — Cerâmica Fria: A porta que você quer abrir",
      descricao: "",
    },
    {
      tempo: "2:00",
      momento: "O clube que queremos criar juntos",
      descricao: "",
    },
    {
      tempo: "2:15",
      momento: "Fechamento — A palavra que fica",
      descricao: "",
    },
  ],
};

// ------------------------------------------------------------
// ARQUIVO — meses anteriores
// Após o encerramento de cada encontro, copie o conteúdo do
// MES_ATUAL para cá (adicione no início do array).
// O site detecta automaticamente encontros passados e os exibe
// aqui mesmo que o conteúdo completo ainda não tenha sido adicionado.
// ------------------------------------------------------------
const ARQUIVO = [
  // Os meses concluídos aparecerão aqui automaticamente após a data do encontro.
  // Para adicionar conteúdo completo, copie a estrutura abaixo:
  // {
  //   numero: "01",
  //   tema: "...",
  //   subtema: "...",
  //   perguntaGerminativa: "...",
  //   data: "17 de maio de 2026",
  //   simbolo: { nome: "...", descricao: "..." },
  //   curadoria: [...],
  //   atividades: [...],
  //   roteiro: [],
  // },
];

// ------------------------------------------------------------
// AGENDA — todos os encontros do ano
// ------------------------------------------------------------
const AGENDA = [
  {
    numero: "01",
    tema: "A Travessia",
    data: "em breve mais informações",
    diaSemana: "",
    horario: "",
    local: "",
    confirmado: false,
    proximo: true,
  },
  {
    numero: "02",
    tema: "Anima e Animus",
    data: "21 de junho de 2026",
    diaSemana: "Domingo",
    horario: "15h",
    local: "A confirmar",
    confirmado: false,
    proximo: false,
  },
  {
    numero: "03",
    tema: "O Self",
    data: "19 de julho de 2026",
    diaSemana: "Domingo",
    horario: "15h",
    local: "A confirmar",
    confirmado: false,
    proximo: false,
  },
  {
    numero: "04",
    tema: "Sonhos como linguagem",
    data: "16 de agosto de 2026",
    diaSemana: "Domingo",
    horario: "15h",
    local: "A confirmar",
    confirmado: false,
    proximo: false,
  },
];

// ------------------------------------------------------------
// MEMBROS — temporariamente desativado
// Será reativado em breve com fotos e frases dos membros.
// ------------------------------------------------------------
const MEMBROS = [];
