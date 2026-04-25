-- Criação da tabela de categorias
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Criação da tabela de modelos vinculada às categorias
CREATE TABLE ai_models (
  id SERIAL PRIMARY KEY,
  category_id INTEGER REFERENCES categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  version TEXT,
  rank_position INTEGER NOT NULL, -- 1, 2 ou 3
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Inserção dos dados iniciais (Seed)
INSERT INTO categories (id, name, description, icon) VALUES
(1, 'Geração de Código', 'Qualidade, velocidade e precisão na escrita e refatoração de código.', '💻'),
(2, 'Raciocínio / Lógica', 'Capacidade de resolver problemas complexos, matemática e planejamento.', '🧠'),
(3, 'Pesquisa e Busca', 'Acesso a informações atuais, síntese de conteúdo web.', '🔍'),
(4, 'Análise de Código / QA', 'Revisão, detecção de bugs, segurança e qualidade de código.', '🛡️'),
(5, 'Documentação', 'Geração e leitura de docs técnicos, resumos, explicações.', '📄'),
(6, 'Geração de Imagens', 'Criação de logos, ícones, ilustrações e arte conceitual.', '🎨'),
(7, 'Geração de Vídeo', 'Criação de vídeos a partir de texto ou imagens.', '🎬'),
(8, 'Voz e Áudio', 'Text-to-speech, transcrição, clonagem de voz.', '🎙️'),
(9, 'Dados e Análise', 'SQL, visualização, análise estatística, planilhas.', '📊'),
(10, 'Agentes Autônomos', 'Tarefas longas, multi-step, sem supervisão constante.', '🤖');

-- Inserção dos modelos iniciais (Seed)
INSERT INTO ai_models (category_id, name, version, rank_position) VALUES
(1, 'Claude', '3.7', 1), (1, 'GPT', '4.1', 2), (1, 'Gemini', '2.5 Pro', 3),
(2, 'o3', NULL, 1), (2, 'Gemini', '2.5 Pro', 2), (2, 'DeepSeek', 'R1', 3),
(3, 'Perplexity', NULL, 1), (3, 'Gemini', NULL, 2), (3, 'Grok', NULL, 3),
(4, 'Claude', NULL, 1), (4, 'GPT-4o', NULL, 2), (4, 'Gemini', NULL, 3),
(5, 'Claude', NULL, 1), (5, 'GPT-4o', NULL, 2), (5, 'Gemini', NULL, 3),
(6, 'Midjourney', NULL, 1), (6, 'Flux', NULL, 2), (6, 'DALL-E 3', NULL, 3),
(7, 'Sora', NULL, 1), (7, 'Runway', NULL, 2), (7, 'Kling', NULL, 3),
(8, 'ElevenLabs', NULL, 1), (8, 'Whisper', NULL, 2), (8, 'Gemini', NULL, 3),
(9, 'GPT-4o', NULL, 1), (9, 'Claude', NULL, 2), (9, 'Gemini', NULL, 3),
(10, 'Claude', NULL, 1), (10, 'Gemini', NULL, 2), (10, 'OpenAI Agents', NULL, 3);
