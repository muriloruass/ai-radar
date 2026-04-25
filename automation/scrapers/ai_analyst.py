import os
import json
import google.generativeai as genai
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

# Configurações
genai.configure(api_key=os.environ.get("GOOGLE_API_KEY"))
supabase_url = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
supabase_key = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")
supabase: Client = create_client(supabase_url, supabase_key)

def get_ai_analysis():
    print("🤖 Gemini está analisando o mercado de IA...")
    
    model = genai.GenerativeModel('gemini-1.5-pro')
    
    prompt = """
    Você é o analista chefe do 'AI Radar'. Sua tarefa é definir o ranking atual das melhores IAs em 3 categorias.
    Baseie-se no conhecimento mais atual de Abril de 2026. Considere lançamentos da OpenAI (como o4/o3/GPT-4.5), 
    Anthropic (Claude 3.7), Google (Gemini 2.5) e DeepSeek.

    Categorias:
    1. Geração de Código
    2. Raciocínio / Lógica
    3. Pesquisa e Busca

    Para cada categoria, forneça os 3 melhores modelos.
    Responda APENAS em formato JSON estrito, seguindo esta estrutura:
    {
      "Geração de Código": [{"name": "Nome", "version": "Versão"}],
      "Raciocínio / Lógica": [{"name": "Nome", "version": "Versão"}],
      "Pesquisa e Busca": [{"name": "Nome", "version": "Versão"}]
    }
    """

    response = model.generate_content(prompt)
    
    # Limpar a resposta para garantir que seja apenas JSON
    content = response.text.replace('```json', '').replace('```', '').strip()
    return json.loads(content)

def update_db(rankings):
    for category_name, models in rankings.items():
        print(f"Atualizando {category_name} no Supabase...")
        
        cat_query = supabase.table("categories").select("id").eq("name", category_name).execute()
        if not cat_query.data:
            continue
            
        cat_id = cat_query.data[0]['id']
        
        for i, m in enumerate(models):
            supabase.table("ai_models").update({
                "name": m['name'],
                "version": m['version']
            }).eq("category_id", cat_id).eq("rank_position", i + 1).execute()

if __name__ == "__main__":
    try:
        rankings = get_ai_analysis()
        update_db(rankings)
        print("🚀 Análise de IA concluída e banco atualizado!")
    except Exception as e:
        print(f"❌ Erro na análise: {e}")
