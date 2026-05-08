// ============================================================
// DATA.JS — Arquivo de conteúdo do Clube do Limiar
// Edite apenas este arquivo para atualizar o site.
// Não é necessário mexer em nenhum outro arquivo.
// ============================================================

// ------------------------------------------------------------
// SENHA DE ACESSO
// Troque apenas o valor entre as aspas para mudar a senha.
// Avise os membros da nova senha após a troca.
// ------------------------------------------------------------
const SENHA_ACESSO = "limiar2025";

// ------------------------------------------------------------
// INFORMAÇÕES GERAIS
// ------------------------------------------------------------
const CONFIG = {
  nomeClube: "Clube do Limiar",
  subtitulo: "investigação simbólica da vida interior",
  facilitadora: "Jessica",
  // Cole aqui o link do calendário compartilhado após criá-lo no Google.
  // Deixe null enquanto o calendário não estiver pronto.
  calendarUrl: "https://calendar.google.com/calendar/u/0?cid=Y2YzMWYzMDllMjkzMDIxYTUxNTU1ZTQ2OWExZDkyODI2YjE4Njc4OGUxMWExZDI1NTE0NjMzZGI2YzZjZTdmNkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t",
};

// ------------------------------------------------------------
// SEMENTE DA SEMANA
// Atualizada pela facilitadora toda semana.
// "data" no formato: "07 de maio de 2026"
// ------------------------------------------------------------
const SEMENTE_SEMANA = {
  data: "08 de maio de 2026",
  texto:
    "O símbolo não explica — ele convida. Antes de nomear o que você sentiu, pergunte: que imagem veio primeiro?",
  autor: "Jessica",
};

// ------------------------------------------------------------
// MÊS ATUAL
// Atualize no início de cada novo ciclo mensal.
// ------------------------------------------------------------
const MES_ATUAL = {
  // Número do mês no ciclo do clube (não o mês do ano)
  numero: "01",

  // Nome do tema principal
  tema: "Como viemos parar aqui?",

  // Subtítulo opcional
  subtema: "Curiosidade, pertencimento e o primeiro passo juntos",

  // Pergunta para reflexão ao longo do mês
  perguntaGerminativa:
    “O que em mim sempre soube que existia algo mais — e ainda não sabia nomear?”,

  // Símbolo escolhido para o mês
  simbolo: {
    nome: "A porta",
    descricao:
      "Toda porta é um limiar — existe entre dois mundos. Atravessá-la muda algo, mesmo que sutilmente. Este mês vocês estão atravessando uma porta juntos. O que está do outro lado ainda não se sabe.",
  },

  // Datas do encontro presencial
  encontro: {
    data: "em breve",
    diaSemana: "em breve",
    horario: "em breve",
    local: "em breve",
    tema: "Como viemos parar aqui?",
  },

  // Curadoria: filmes, livros e textos recomendados
  // Tipo pode ser: "filme", "livro", "texto", "podcast"
  curadoria: [
    {
      tipo: "filme",
      titulo: "Soul",
      autor: "Pixar,2020"
        
      descricao:
        "Uma animação sobre o que nos torna quem somos antes mesmo de vivermos. Leve, acessível e com camadas de profundidade para quem quiser ir além.",
      
          indicacao: "Assista prestando atenção nos espelhos.",
    },
    {
      tipo: "livro",
      titulo: "O Homem e Seus Símbolos",
      autor: "Carl Gustav Jung",
      descricao:
        "A obra mais acessível de Jung. O capítulo de Marie-Louise von Franz sobre individuação é especialmente relevante para este mês.",
      indicacao: "Leia com caderno ao lado.",

    },
  ],

  // Atividades para fazer em casa antes do encontro
  // Numeradas automaticamente pela interface
  atividades: [
    {
      titulo: "Diário da Sombra",
      descricao:
        "Durante uma semana, anote toda vez que você reagir de forma intensa a algo em outra pessoa — irritação, inveja, admiração excessiva. Escreva: o que essa pessoa mostra que me perturba? Isso é material bruto da sombra.",
    },
    {
      titulo: "A cena que volta",
      descricao:
        "Escolha uma lembrança de vergonha — algo que você fez e preferia não ter feito. Escreva sobre ela na terceira pessoa, como se fosse personagem de um conto. O que esse personagem precisava naquele momento?",
    },
    {
      titulo: "O herói e o vilão",
      descricao:
        "Pense num personagem de ficção que você ama e num que você odeia. Liste três qualidades de cada um. Depois leia a lista e pergunte: onde cada uma dessas qualidades vive em mim — reconhecida ou não?",
    },
  ],

  // Roteiro do encontro (expandível na interface)
  roteiro: [
    {
      tempo: "15min",
      momento: "Chegada e presença",
      descricao: "Silêncio coletivo de dois minutos. Cada um anota uma palavra do que trouxe consigo.",
    },
    {
      tempo: "20min",
      momento: "Acolhimento do mês",
      descricao: "Facilitadora apresenta o símbolo e a pergunta germinativa. Breve fala sobre a Sombra em Jung.",
    },
    {
      tempo: "40min",
      momento: "Roda de escuta",
      descricao: "Cada membro compartilha o que viveu com as atividades. Sem comentários, apenas presença.",
    },
    {
      tempo: "30min",
      momento: "Aprofundamento",
      descricao: "Conversa aberta sobre Cisne Negro — a sombra como recurso, não como problema.",
    },
    {
      tempo: "15min",
      momento: "Fechamento",
      descricao: "Cada um escolhe uma palavra para levar. Combinados do próximo mês.",
    },
  ],
};

// ------------------------------------------------------------
// ARQUIVO — meses anteriores
// Adicione um objeto novo ao início do array a cada mês concluído.
// Copie a estrutura de MES_ATUAL como base.
// ------------------------------------------------------------
const ARQUIVO = [
  // Exemplo de mês arquivado — substitua pelos reais quando existirem
  {
    numero: "00",
    tema: "Encontro Zero",
    subtema: "quem somos, por que estamos aqui",
    perguntaGerminativa: "O que me faz voltar para dentro?",
    data: "março de 2026",
    simbolo: {
      nome: "O Limiar",
      descricao: "A soleira entre o conhecido e o desconhecido.",
    },
    curadoria: [
      {
        tipo: "filme",
        titulo: "A Viagem de Chihiro",
        autor: "Hayao Miyazaki, 2001",
        descricao: "Uma menina atravessa o limiar para um mundo desconhecido e só volta quando aprende quem ela é.",
        indicacao: "",
      },
    ],
    atividades: [
      {
        titulo: "Carta de apresentação para si mesmo",
        descricao: "Escreva uma carta de apresentação não para o clube, mas para a parte de você que ainda não conhece.",
      },
    ],
    roteiro: [],
  },
];

// ------------------------------------------------------------
// AGENDA — todos os encontros do ano
// Adicione novas datas conforme o clube avança.
// "confirmado": true/false — se false, o local aparece como "a confirmar"
// ------------------------------------------------------------
const AGENDA = [
  {
    numero: "01",
    tema: "A Sombra",
    data: "17 de maio de 2026",
    diaSemana: "Domingo",
    horario: "15h",
    local: "Casa da Jessica — Av. das Araucárias, 210",
    confirmado: true,
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
// MEMBROS
// Cada membro tem nome e uma frase curta escolhida por eles.
// foto: caminho relativo para a imagem dentro da pasta membros/
//   Exemplo: "fotos/jessica.jpg"
//   Deixe null ou "" para exibir a inicial no lugar da foto.
// As fotos devem ser salvas na pasta membros/fotos/ do repositório.
// Tamanho ideal: 400x400px, formato JPG ou PNG.
// ------------------------------------------------------------
const MEMBROS = [
  { nome: "Jessica", frase: "Facilitadora — curiosa compulsiva sobre o interior humano.", foto: null },
  { nome: "Ana", frase: "Busco o que está entre o sonho e o acorde.", foto: null },
  { nome: "Bruno", frase: "Chegando devagar ao que sempre esteve aqui.", foto: null },
  { nome: "Clara", frase: "Mitologia, cinema e café às três da manhã.", foto: null },
  { nome: "Daniel", frase: "Engenheiro que aprendeu a respeitar o irracional.", foto: null },
  { nome: "Fernanda", frase: "Escritora em pausa. Leitora de símbolos.", foto: null },
  { nome: "Gabriel", frase: "Psicólogo em formação. Aprendiz de sonhador.", foto: null },
  { nome: "Helena", frase: "Vivo entre a dança e o silêncio.", foto: null },
  { nome: "Isabela", frase: "Professora que estuda o que os livros não ensinam.", foto: null },
  { nome: "João", frase: "Médico. Aprendo a ouvir o que o corpo sussurra.", foto: null },
  { nome: "Luiza", frase: "Arquiteta de espaços internos e externos.", foto: null },
  { nome: "Marcos", frase: "Em investigação permanente.", foto: null },
];
