"use client";

import { useState } from "react";
import { categories as initialCategories, AICategory } from "@/data/categories";
import Link from "next/link";

export default function AdminPage() {
  const [categories, setCategories] = useState<AICategory[]>(initialCategories);

  // Função simples para simular salvamento (até integrarmos com Supabase)
  const handleSave = () => {
    console.log("Salvando novas configurações:", categories);
    alert("Configurações salvas localmente (Simulação). Próximo passo: Integração com Supabase!");
  };

  const updateModel = (catId: number, modelIndex: number, field: "name" | "version", value: string) => {
    const updated = categories.map(cat => {
      if (cat.id === catId) {
        const newModels = [...cat.topModels];
        newModels[modelIndex] = { ...newModels[modelIndex], [field]: value };
        return { ...cat, topModels: newModels };
      }
      return cat;
    });
    setCategories(updated);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      {/* Admin Header */}
      <header className="bg-slate-800 text-white py-6 px-8 shadow-md flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Painel de Controle - AI Radar</h1>
          <p className="text-slate-400 text-sm">Gerencie os rankings e categorias manualmente</p>
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
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-bold transition-colors shadow-lg"
          >
            Salvar Alterações
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
                  {category.topModels.map((model, idx) => (
                    <div key={idx} className="space-y-3">
                      <label className="block text-xs font-bold text-gray-400 uppercase">
                        Posição #{idx + 1}
                      </label>
                      <div className="space-y-2">
                        <input
                          type="text"
                          value={model.name}
                          onChange={(e) => updateModel(category.id, idx, "name", e.target.value)}
                          placeholder="Nome da IA"
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        />
                        <input
                          type="text"
                          value={model.version || ""}
                          onChange={(e) => updateModel(category.id, idx, "version", e.target.value)}
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
        AI Radar Admin • Modo Manual (MVP)
      </footer>
    </div>
  );
}
