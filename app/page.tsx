'use client'

import { useState } from 'react'

export default function Home() {
  const [step, setStep] = useState('inicio')

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-6">
      <header className="w-full flex justify-end p-4">
        <button
          onClick={() => setStep('sobre')}
          className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-4 rounded transition"
        >
          Sobre a Jovify
        </button>
      </header>

      {step === 'inicio' && (
        <section className="text-center">
          <h1 className="text-4xl font-bold text-green-400 mb-4">Bem-vindo ao Jovify</h1>
          <p className="text-zinc-300 mb-6 max-w-xl leading-relaxed">
            Aqui você encontra apoio para sua saúde mental e desenvolvimento pessoal.
          </p>
          {/* Coloque aqui os botões ou elementos da tela principal do app */}
        </section>
      )}

      {step === 'sobre' && (
        <section className="text-center mt-10 max-w-2xl">
          <h2 className="text-3xl font-bold text-green-400 mb-6">Sobre a Jovify</h2>
          <p className="text-zinc-300 leading-relaxed mb-6">
            O App foi criado em maio de 2024 por uma Estudante brasileira do primeiro Período de Gestão da Tecnologia da Informação, em Goiânia-GO. Inspirada pela busca de conhecimento sobre Saúde Mental familiar e desafios pessoais com ansiedade, a ideia cresceu com o apoio de Professores, Profissionais e Amigos que formaram sua equipe. Hoje, o App continua evoluindo, oferecendo informações e acessibilidade em Saúde Mental e Desenvolvimento Pessoal para Jovens do mundo.
          </p>
          <button
            onClick={() => setStep('inicio')}
            className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-6 rounded transition"
          >
            ← Voltar à Tela Inicial
          </button>
        </section>
      )}
    </main>
  )
}
