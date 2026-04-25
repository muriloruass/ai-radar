"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface AIModel {
  id?: number;
  category_id: number;
  name: string;
  version: string | null;
  rank_position: number;
}

interface AICategory {
  id: number;
  name: string;
  description: string;
  icon: string;
  ai_models: AIModel[];
}

export default function AdminPage() {
  const [categories, setCategories] = useState<AICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const { data, error } = await supabase
      .from('categories')
      .select(`
        id,
        name,
        description,
        icon,
        ai_models (
          id,
          category_id,
          name,
          version,
          rank_position
        )
      `)
      .order('id', { ascending: true });

    if (error) {
      console.error("Erro ao buscar dados:", error);
    } else {
      const formattedData = data.map((cat: any) => ({
        ...cat,
        ai_models: cat.ai_models.sort((a: any, b: any) => a.rank_position - b.rank_position)
      }));
      setCategories(formattedData);
    }
    setLoading(false);
  }

  const handleSave = async () => {
    setSaving(true);
    
    // Preparar todos os modelos para atualização
    const allModels = categories.flatMap(cat => cat.ai_models);
    
    for (const model of allModels) {
      const { error } = await supabase
        .from('ai_models')
        .update({ 
          name: model.name, 
          version: model.version 
        })
        .match({ id: model.id });

      if (error) {
        console.error(`Erro ao atualizar modelo ${model.name}:`, error);
      }
    }

    setSaving(false);
    alert("Alterações salvas no banco de dados com sucesso!");
    fetchData(); // Recarregar para garantir sincronia
  };

  const updateModelField = (catId: number, modelIdx: number, field: keyof AIModel, value: string) => {
    setCategories(prev => prev.map(cat => {
      if (cat.id === catId) {
        const newModels = [...cat.ai_models];
        newModels[modelIdx] = { ...newModels[modelIdx], [field]: value };
        return { ...cat, ai_models: newModels };
      }
      return cat;
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center font-sans">
        <div className="text-xl font-semibold text-slate-600 animate-pulse">Carregando Painel...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      {/* Admin Header */}
      <header className="bg-slate-800 text-white py-6 px-8 shadow-md flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Painel de Controle - AI Radar</h1>
          <p className="text-slate-400 text-sm">Gerencie os rankings e categorias no banco de dados</p>
        </div>
        <div className="flex gap-4">
          <Link 
            href="/" 
            className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm transition-colors"
          >
            Ver Dashboard
          </Link>
          <button 
            onClick={handleSave}
            disabled={saving}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors shadow-lg ${
              saving ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-500"
            }`}
          >
            {saving ? "Salvando..." : "Salvar no Banco"}
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-10 px-6">
        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex items-center gap-3">
                <span className="text-2xl">{category.icon}</span>
                <h2 className="font-bold text-gray-800">{category.name}</h2>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {category.ai_models.map((model, idx) => (
                    <div key={idx} className="space-y-3">
                      <label className="block text-xs font-bold text-gray-400 uppercase">
                        Posição #{idx + 1}
                      </label>
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={model.name}
                          onChange={(e) => updateModelField(category.id, idx, "name", e.target.value)}
                          placeholder="Nome da IA"
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                        <input
                          type="text"
                          value={model.version || ""}
                          onChange={(e) => updateModelField(category.id, idx, "version", e.target.value)}
                          placeholder="Versão (ex: 3.5, Pro)"
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="py-10 text-center text-gray-400 text-xs">
        AI Radar Admin • Conectado ao Supabase
      </footer>
    </div>
  );
}
