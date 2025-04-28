"use client";

import { useState } from 'react';

export default function Home() {
  const [step, setStep] = useState<
    'inicio' | 'cadastro' | 'autoconhecimento' | 'resultado' | 'boasVindas' | 'home' | 'trilhas' |
    'sessaoPsicologos' | 'mensagensDiarias' | 'comunidade' | 'conteudosPersonalizados'
  >('inicio'); // Corrigi aqui também: 'Iniciar Jornada' não existia no tipo, deve começar em 'inicio'

  const [history, setHistory] = useState<string[]>([]);
  const [respostas, setRespostas] = useState<number[]>(Array(8).fill(0));
  const [perfil, setPerfil] = useState<string | null>(null);
  const [sugestao, setSugestao] = useState('');

  const navigate = (nextStep: typeof step) => {
    setHistory((prev) => [...prev, step]);
    setStep(nextStep);
  };

  const goBack = () => {
    setHistory((prev) => {
      const newHistory = [...prev];
      const previousStep = newHistory.pop();
      if (previousStep) setStep(previousStep as typeof step);
      return newHistory;
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-6 text-white">
      {history.length > 0 && (
        <button onClick={goBack} className="absolute top-4 left-4 bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-4 rounded transition">
          Voltar
        </button>
      )}

      {step === 'inicio' && (
        <section className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-green-400">Bem-vindo à Jovify</h1>
          <p className="text-zinc-300">Descubra seu perfil e desbloqueie funções exclusivas para o seu desenvolvimento!</p>
          <button onClick={() => navigate('cadastro')} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-6 rounded transition">
            Começar
          </button>
        </section>
      )}

      {step === 'conteudosPersonalizados' && perfil && (
        <section className="page space-y-6">
          <h2 className="title">Conteúdos Personalizados para {perfil}</h2>

          <div className="space-y-4">
            <div className="card cursor-pointer" onClick={() => setSugestao('Evite a autossabotagem praticando o autoconhecimento e celebrando pequenas conquistas.')}>
              Como evitar a autossabotagem
            </div>

            <div className="card cursor-pointer" onClick={() => setSugestao('Questione falsas crenças buscando evidências reais e reforçando pensamentos positivos.')}>
              Como reciclar falsas crenças
            </div>

            <div className="card cursor-pointer" onClick={() => setSugestao('Aceite que a perfeição é inalcançável e que o progresso importa mais que a perfeição.')}>
              Como lidar com a necessidade de perfeição
            </div>
          </div>

          {sugestao && (
            <div className="bg-green-600 text-black p-4 rounded-xl shadow-md mt-4">
              <p className="text-center font-semibold">{sugestao}</p>
            </div>
          )}
        </section>
      )}
    </main>
  );
}
