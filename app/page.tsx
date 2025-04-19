'use client'
import { useState } from "react";

export default function Home() {
  const [step, setStep] = useState<null | string>(null);

  const voltarEtapa = () => setStep(null);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {!step && (
        <section className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-green-500">Bem-vindo ao Jofivy</h1>
          <p className="text-zinc-300">Escolha uma das opções abaixo para começar sua jornada:</p>

          <div className="space-y-4">
            <button onClick={() => setStep("autoconhecimento")} className="bg-zinc-800 hover:bg-zinc-700 text-white py-2 px-6 rounded-lg">
              Autoconhecimento
            </button>
            <button onClick={() => setStep("trilhas")} className="bg-zinc-800 hover:bg-zinc-700 text-white py-2 px-6 rounded-lg">
              Trilhas de Desenvolvimento
            </button>
            <button onClick={() => setStep("motivacional")} className="bg-zinc-800 hover:bg-zinc-700 text-white py-2 px-6 rounded-lg">
              Mensagens Motivacionais
            </button>
            <button onClick={() => setStep("psicologos")} className="bg-zinc-800 hover:bg-zinc-700 text-white py-2 px-6 rounded-lg">
              Fale com um Especialista
            </button>
            <button onClick={() => setStep("trilhaNova")} className="bg-zinc-800 hover:bg-zinc-700 text-white py-2 px-6 rounded-lg">
              Nova Trilha
            </button>
          </div>
        </section>
      )}

      {step === "autoconhecimento" && (
        <section className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-green-400">Autoconhecimento</h2>
          <p className="text-zinc-300">Conteúdo sobre autoconhecimento em breve.</p>
          <button onClick={voltarEtapa} className="bg-zinc-800 hover:bg-zinc-700 text-white py-2 px-6 rounded-lg">
            Voltar
          </button>
        </section>
      )}

      {step === "trilhas" && (
        <section className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-green-400">Trilhas de Desenvolvimento</h2>
          <p className="text-zinc-300">Escolha uma trilha para começar.</p>
          <button onClick={voltarEtapa} className="bg-zinc-800 hover:bg-zinc-700 text-white py-2 px-6 rounded-lg">
            Voltar
          </button>
        </section>
      )}

      {step === "motivacional" && (
        <section className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-green-400">Mensagem do Dia</h2>
          <p className="text-zinc-300">"Você é mais forte do que imagina!"</p>
          <button onClick={voltarEtapa} className="bg-zinc-800 hover:bg-zinc-700 text-white py-2 px-6 rounded-lg">
            Voltar
          </button>
        </section>
      )}

      {step === "psicologos" && (
        <section className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-green-400">Fale com um Especialista</h2>
          <p className="text-zinc-300">Lista de psicólogos parceiros em breve.</p>
          <button onClick={voltarEtapa} className="bg-zinc-800 hover:bg-zinc-700 text-white py-2 px-6 rounded-lg">
            Voltar
          </button>
        </section>
      )}

      {step === "trilhaNova" && (
        <section className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-green-400">Nova Trilha</h2>
          <p className="text-zinc-300">Conteúdo exclusivo dessa nova trilha será adicionado em breve.</p>
          <button onClick={voltarEtapa} className="bg-zinc-800 hover:bg-zinc-700 text-white py-2 px-6 rounded-lg">
            Voltar
          </button>
        </section>
      )}
    </main>
  );
}
