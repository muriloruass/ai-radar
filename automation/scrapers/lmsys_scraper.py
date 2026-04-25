import os
import requests
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

# Configuração Supabase
url: str = os.environ.get("NEXT_PUBLIC_SUPABASE_URL")
key: str = os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY")
supabase: Client = create_client(url, key)

def get_lmsys_rankings():
    """
    Simula a obtenção de dados do LMSYS. 
    Nota: Em produção, este script pode precisar de ajustes se a API do Gradio mudar.
    """
    print("Iniciando coleta de dados do LMSYS Chatbot Arena...")
    
    # Para este MVP de automação, vamos simular a extração que seria feita via API/Scraping
    # No futuro, usaremos bibliotecas como 'gradio_client' para dados reais em tempo real
    
    # Exemplo de lógica de decisão baseada nos dados capturados
    rankings = {
        "Geração de Código": [
            {"name": "Claude 3.7 Sonnet", "version": "Latest"},
            {"name": "GPT-4o", "version": "2024-11-20"},
            {"name": "o3-mini", "version": "High Reasoning"}
        ],
        "Raciocínio / Lógica": [
            {"name": "o3", "version": "Full"},
            {"name": "Claude 3.7 Sonnet", "version": "Thinking Mode"},
            {"name": "Gemini 2.0 Flash", "version": "Thinking"}
        ]
    }
    return rankings

def update_supabase_rankings(category_name, models):
    # 1. Achar o ID da categoria pelo nome
    category_query = supabase.table("categories").select("id").eq("name", category_name).execute()
    
    if not category_query.data:
        print(f"Categoria {category_name} não encontrada.")
        return

    cat_id = category_query.data[0]['id']

    # 2. Atualizar os modelos para as posições 1, 2 e 3
    for index, model in enumerate(models):
        rank = index + 1
        supabase.table("ai_models").update({
            "name": model['name'],
            "version": model['version']
        }).eq("category_id", cat_id).eq("rank_position", rank).execute()
        
    print(f"Ranking da categoria '{category_name}' atualizado com sucesso!")

if __name__ == "__main__":
    try:
        data = get_lmsys_rankings()
        for category, models in data.items():
            update_supabase_rankings(category, models)
        print("Automação concluída com sucesso.")
    except Exception as e:
        print(f"Erro na automação: {e}")
