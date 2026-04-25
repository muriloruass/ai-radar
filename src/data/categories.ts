export interface AIModel {
  name: string;
  version?: string;
}

export interface AICategory {
  id: number;
  name: string;
  description: string;
  topModels: AIModel[];
  icon: string;
}

export const categories: AICategory[] = [
  {
    id: 1,
    name: "Geração de Código",
    description: "Qualidade, velocidade e precisão na escrita e refatoração de código.",
    icon: "💻",
    topModels: [
      { name: "Claude", version: "3.7" },
      { name: "GPT", version: "4.1" },
      { name: "Gemini", version: "2.5 Pro" }
    ]
  },
  {
    id: 2,
    name: "Raciocínio / Lógica",
    description: "Capacidade de resolver problemas complexos, matemática e planejamento.",
    icon: "🧠",
    topModels: [
      { name: "o3" },
      { name: "Gemini", version: "2.5 Pro" },
      { name: "DeepSeek", version: "R1" }
    ]
  },
  {
    id: 3,
    name: "Pesquisa e Busca",
    description: "Acesso a informações atuais, síntese de conteúdo web.",
    icon: "🔍",
    topModels: [
      { name: "Perplexity" },
      { name: "Gemini" },
      { name: "Grok" }
    ]
  },
  {
    id: 4,
    name: "Análise de Código / QA",
    description: "Revisão, detecção de bugs, segurança e qualidade de código.",
    icon: "🛡️",
    topModels: [
      { name: "Claude" },
      { name: "GPT-4o" },
      { name: "Gemini" }
    ]
  },
  {
    id: 5,
    name: "Documentação",
    description: "Geração e leitura de docs técnicos, resumos, explicações.",
    icon: "📄",
    topModels: [
      { name: "Claude" },
      { name: "GPT-4o" },
      { name: "Gemini" }
    ]
  },
  {
    id: 6,
    name: "Geração de Imagens",
    description: "Criação de logos, ícones, ilustrações e arte conceitual.",
    icon: "🎨",
    topModels: [
      { name: "Midjourney" },
      { name: "Flux" },
      { name: "DALL-E 3" }
    ]
  },
  {
    id: 7,
    name: "Geração de Vídeo",
    description: "Criação de vídeos a partir de texto ou imagens.",
    icon: "🎬",
    topModels: [
      { name: "Sora" },
      { name: "Runway" },
      { name: "Kling" }
    ]
  },
  {
    id: 8,
    name: "Voz e Áudio",
    description: "Text-to-speech, transcrição, clonagem de voz.",
    icon: "🎙️",
    topModels: [
      { name: "ElevenLabs" },
      { name: "Whisper" },
      { name: "Gemini" }
    ]
  },
  {
    id: 9,
    name: "Dados e Análise",
    description: "SQL, visualização, análise estatística, planilhas.",
    icon: "📊",
    topModels: [
      { name: "GPT-4o" },
      { name: "Claude" },
      { name: "Gemini" }
    ]
  },
  {
    id: 10,
    name: "Agentes Autônomos",
    description: "Tarefas longas, multi-step, sem supervisão constante.",
    icon: "🤖",
    topModels: [
      { name: "Claude" },
      { name: "Gemini" },
      { name: "OpenAI Agents" }
    ]
  }
];
