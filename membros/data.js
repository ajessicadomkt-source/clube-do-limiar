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
// AFIRMAÇÕES DA SEMANA
// Troca automaticamente a cada semana — sem precisar editar.
// Adicione ou remova frases à vontade; a rotação se ajusta sozinha.
// ------------------------------------------------------------
const AFIRMACOES = [
  "Eu não preciso me tornar nada. Já sou o que preciso ser para começar.",
  "Minha vida não começa quando eu encontrar meu propósito. Ela já está acontecendo.",
  "Eu não estou atrasado. Estou exatamente onde preciso estar.",
  "Eu tenho permissão para atravessar a porta — mesmo sem saber o que está do outro lado.",
  "Cada passo que dou já é a travessia. Não existe ponto de chegada antes de começar.",
  "Eu confio no que em mim já sabe o caminho, mesmo quando minha mente não sabe.",
  "Eu sou suficiente hoje. O amanhã se constrói a partir disso.",
  "Eu paro de adiar a vida que quero viver. Ela começa agora.",
  "Eu escolho estar presente na vida que tenho enquanto construo a que quero.",
];

// ------------------------------------------------------------
// MÊS ATUAL
// ------------------------------------------------------------
const MES_ATUAL = {
  numero: "01",
  tema: "Propósito: A Vida que Adiamos",
  subtema: "Toda jornada começa com um limiar.",

  perguntaGerminativa:
    "O que você faria se soubesse que já é suficiente?",

  simbolo: {
    nome: "A porta",
    descricao:
      "Joe Gardner perseguiu uma porta específica — Carnegie Hall — durante toda a sua vida, quase perdendo tudo por isso. Neste mês, a pergunta não é qual porta você quer abrir, mas quem escolheu essa porta para você.",
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
        "Uma narrativa sobre propósito que questiona a validade das perguntas que fazemos — sem oferecer respostas diretas. Assista sem distrações (celular desligado, sem pausas). Ao terminar, anote uma frase, cena ou imagem que ficou — sem precisar explicar. Traga o registro ao encontro.",
      indicacao: "Enquanto assiste, observe: em qual personagem você se reconhece? E qual porta do filme ressoa com alguma porta sua?",
    },
    {
      tipo: "leitura opcional",
      titulo: "Ikigai",
      autor: "Héctor García e Francesc Miralles",
      descricao:
        "O conceito japonês que define propósito como a interseção entre paixão, competência, o que o mundo precisa e o que te remunera. Uma perspectiva radicalmente diferente da do filme — e exatamente por isso vale a comparação.",
      indicacao: "Leitura opcional. Traga suas dúvidas e divergências para enriquecer o debate.",
    },
  ],

  atividades: [],

  // Roteiro do encontro — os descritivos ficam aqui como referência da facilitadora
  // mas não aparecem na interface para os membros
  roteiro: [
    {
      tempo: "0:00",
      momento: "Abertura",
      descricao: "",
    },
    {
      tempo: "0:15",
      momento: "Roda de apresentação",
      descricao: "",
    },
    {
      tempo: "0:50",
      momento: "Debate — A vida que adiamos",
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
    tema: "Propósito: A Vida que Adiamos",
    data: "em breve mais informações",
    diaSemana: "",
    horario: "",
    local: "",
    confirmado: false,
    proximo: true,
  },
  {
    numero: "02",
    tema: "Em breve",
    data: "",
    diaSemana: "",
    horario: "",
    local: "",
    confirmado: false,
    proximo: false,
  },
  {
    numero: "03",
    tema: "Em breve",
    data: "",
    diaSemana: "",
    horario: "",
    local: "",
    confirmado: false,
    proximo: false,
  },
  {
    numero: "04",
    tema: "Em breve",
    data: "",
    diaSemana: "",
    horario: "",
    local: "",
    confirmado: false,
    proximo: false,
  },
];

// ------------------------------------------------------------
// MEMBROS — temporariamente desativado
// Será reativado em breve com fotos e frases dos membros.
// ------------------------------------------------------------
const MEMBROS = [];
