import { categories } from "@/data/categories";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Header */}
      <header className="bg-[#0f172a] text-white py-12 px-6 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight mb-2">AI RADAR</h1>
          <p className="text-blue-300 text-lg font-medium mb-4">
            Inteligência Sobre Inteligência Artificial
          </p>
          <div className="h-1 w-20 bg-blue-500 rounded-full mb-6"></div>
          <p className="text-gray-300 max-w-2xl text-lg italic">
            "Para o que estou fazendo agora, qual é a melhor IA disponível?"
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl">{category.icon}</span>
                <h2 className="text-xl font-bold text-gray-800">{category.name}</h2>
              </div>
              
              <p className="text-gray-600 text-sm mb-6 flex-grow">
                {category.description}
              </p>

              <div className="space-y-3">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Top Rankings
                </h3>
                <div className="space-y-2">
                  {category.topModels.map((model, index) => (
                    <div 
                      key={model.name + index}
                      className={`flex items-center justify-between p-2 rounded-lg ${
                        index === 0 
                          ? "bg-blue-50 border border-blue-100" 
                          : "bg-gray-50 border border-gray-50"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-bold ${index === 0 ? "text-blue-600" : "text-gray-500"}`}>
                          #{index + 1}
                        </span>
                        <span className={`text-sm font-semibold ${index === 0 ? "text-blue-900" : "text-gray-700"}`}>
                          {model.name}
                        </span>
                      </div>
                      {model.version && (
                        <span className="text-[10px] bg-white px-2 py-0.5 rounded border border-gray-200 text-gray-500 font-mono">
                          {model.version}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto py-12 px-6 border-t border-gray-200 mt-12 text-center">
        <p className="text-gray-500 text-sm">
          AI Radar • Documento de Visão v1.0 • Abril 2026
        </p>
      </footer>
    </div>
  );
}
