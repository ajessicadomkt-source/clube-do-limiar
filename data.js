// ============================================================
// DATA.JS — Arquivo de conteúdo do Clube do Limiar
// Edite apenas este arquivo para atualizar o site.
// Não é necessário mexer em nenhum outro arquivo.
// ============================================================

// ------------------------------------------------------------
// SUPABASE
// ------------------------------------------------------------
const SUPABASE_URL      = "https://ijwtilovakdmjhgxsach.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlqd3RpbG92YWtkbWpoZ3hzYWNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyMzUwNTQsImV4cCI6MjA5NzgxMTA1NH0.sP3IjyrSE52G3Zi1sj7DoD0KaDANNeXzZvg9wjPi8KU";

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
  webhookCadastroRede: "", // cole aqui o webhook do N8N quando estiver configurado
};

// ------------------------------------------------------------
// AFIRMAÇÕES DA SEMANA
// Troca automaticamente a cada semana — sem precisar editar.
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
  numero: "02",
  tema: "Tudo ao Seu Tempo",
  subtema: "O que culturas milenares sabem sobre o tempo que nós esquecemos",

  perguntaGerminativa:
    "O que você perdeu por estar sempre correndo para o próximo momento?",

  simbolo: {
    nome: "A ampulheta virada",
    descricao:
      "A ampulheta normal representa Chronos — o tempo escorrendo, finito, inevitável. A ampulheta virada é o Kairós — o momento em que o tempo se suspende. Não porque parou de existir, mas porque você está tão presente que ele deixa de importar. E Aion é o que existe além das duas — o que a ampulheta não consegue medir.",
  },

  encontro: {
    data: "",
    diaSemana: "",
    horario: "",
    local: "",
    tema: "Tudo ao Seu Tempo",
  },

  curadoria: [
    {
      tipo: "atividade",
      titulo: "Midnight in Paris",
      autor: "Woody Allen, 2011",
      disponivel: "Disponível na Netflix",
      trailer: true,
      trailerUrl: "https://www.youtube.com/watch?v=CgMMUoXui9M",
      trailerThumb: "https://img.youtube.com/vi/CgMMUoXui9M/hqdefault.jpg",
      descricao:
        "Gil Pender é um escritor obcecado com Paris dos anos 20 — incapaz de viver o presente porque está apaixonado por um passado que não foi o seu. O filme é uma meditação sobre nostalgia, presença e o que perdemos quando recusamos o tempo em que vivemos. Gil vive em Chronos, toca o Kairós — e há uma leitura de Aion na cena final que o grupo vai descobrir.",
      indicacao: "Enquanto assiste, observe: em qual momento Gil estava mais vivo — no passado que buscava ou no presente que ignorava?",
    },
    {
      tipo: "episódio complementar",
      titulo: "Explicando — A Mente: Ansiedade",
      autor: "Netflix, 2019 · 20 min",
      disponivel: "Disponível na Netflix",
      descricao:
        "Em 20 minutos, mostra como a ansiedade é neurologicamente uma prisão no tempo — a mente incapaz de sair do passado ou do futuro. A conexão com Chronos é direta e visualmente poderosa.",
      indicacao: "Assista depois do filme.",
    },
    {
      tipo: "leitura opcional",
      titulo: "O Poder do Agora",
      autor: "Eckhart Tolle",
      descricao:
        "A versão contemporânea mais popular de Kairós. Tolle não usa o termo, mas todo o livro é sobre habitar o tempo que não pertence ao relógio — e tem passagens que tocam Aion sem nomear.",
      indicacao: "Leia os três primeiros capítulos e traga o que ressoou — ou o que irritou.",
    },
  ],

  atividades: [
    {
      titulo: "Registro de um Kairós",
      descricao:
        "Durante o mês, observe momentos em que algo importante aconteceu fora do planejamento, do controle ou do tempo esperado. Anote pelo menos um momento em que a vida pareceu se organizar sem que você pudesse controlar totalmente. O que aconteceu no tempo de Kairós, e não no tempo de Chronos?",
    },
    {
      titulo: "Inicie o caderno da Gratidão",
      descricao:
        "Escolha um caderno especial para este ciclo — um que você ache bonito e tenha vontade de abrir. Todas as noites, antes de dormir, escreva pelo menos três coisas pelas quais você foi grata naquele dia. A prática é sobre treinar o olhar para reconhecer onde a vida ainda está oferecendo presença, cuidado e sentido.",
    },
  ],

  roteiro: [],
};

// ------------------------------------------------------------
// ARQUIVO — meses anteriores
// ------------------------------------------------------------
const ARQUIVO = [
  {
    numero: "01",
    tema: "Propósito: a vida que adiamos",
    subtema: "Toda jornada começa com um limiar.",
    perguntaGerminativa: "O que você faria se soubesse que já é suficiente?",
    data: "14 de junho de 2026",
    simbolo: {
      nome: "A porta",
      descricao:
        "Joe Gardner perseguiu uma porta específica — Carnegie Hall — durante toda a sua vida, quase perdendo tudo por isso. Neste mês, a pergunta não é qual porta você quer abrir, mas quem escolheu essa porta para você.",
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
          "Uma narrativa sobre propósito que questiona a validade das perguntas que fazemos — sem oferecer respostas diretas.",
        indicacao: "Em qual personagem você se reconhece? E qual porta do filme ressoa com alguma porta sua?",
      },
      {
        tipo: "leitura opcional",
        titulo: "Ikigai",
        autor: "Héctor García e Francesc Miralles",
        descricao:
          "O conceito japonês que define propósito como a interseção entre paixão, competência, o que o mundo precisa e o que te remunera.",
        indicacao: "Leitura opcional. Traga suas dúvidas e divergências.",
      },
    ],
    atividades: [],
    roteiro: [
      { tempo: "0:00", momento: "Abertura", descricao: "" },
      { tempo: "0:15", momento: "Roda de apresentação", descricao: "" },
      { tempo: "0:50", momento: "Debate — A vida que adiamos", descricao: "" },
      { tempo: "1:20", momento: "Experiência do Mês — Cerâmica Fria: A porta que você quer abrir", descricao: "" },
      { tempo: "2:00", momento: "O clube que queremos criar juntos", descricao: "" },
      { tempo: "2:15", momento: "Fechamento — A palavra que fica", descricao: "" },
    ],
  },
];

// ------------------------------------------------------------
// AGENDA — todos os encontros do ano
// ------------------------------------------------------------
const AGENDA = [
  {
    numero: "01",
    tema: "Propósito: a vida que adiamos",
    data: "14 de junho de 2026",
    diaSemana: "Domingo",
    horario: "15h",
    local: "Rua João Paul, 280. Apto 2601. Bairro Floresta.",
    confirmado: true,
    proximo: false,
  },
  {
    numero: "02",
    tema: "Tudo ao Seu Tempo",
    subtema: "O que culturas milenares sabem sobre o tempo que nós esquecemos",
    data: "",
    diaSemana: "",
    horario: "",
    local: "",
    confirmado: false,
    proximo: true,
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
// ------------------------------------------------------------
const MEMBROS = [];
