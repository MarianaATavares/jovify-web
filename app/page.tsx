'use client'

import { useState } from 'react'

export default function Home() {
  const [step, setStep] = useState<'inicio' | 'cadastro' | 'autoconhecimento' | 'resultado' | 'boasVindas' | 'home' | 'trilhas' | 'sobre'>('inicio')
  const [nome, setNome] = useState('')
  const [respostas, setRespostas] = useState<number[]>(Array(8).fill(0))
  const [perfil, setPerfil] = useState<string | null>(null)

  const perguntas = [
    'Sinto que tenho clareza sobre meus objetivos pessoais.',
    'Consigo manter a motivação mesmo diante de dificuldades.',
    'Sei identificar minhas principais qualidades e pontos a desenvolver.',
    'Tenho facilidade em lidar com minhas emoções.',
    'Consigo manter uma rotina equilibrada e saudável.',
    'Sei pedir ajuda quando preciso.',
    'Tenho iniciativa para buscar meu crescimento pessoal.',
    'Sinto que faço parte de algo maior e que minha vida tem propósito.'
  ]

  const getDescricaoPerfil = (perfil: string) => {
    switch (perfil) {
      case 'Explorador':
        return 'Você está em fase de descoberta. Continue explorando e aprendendo sobre si mesmo!'
      case 'Consciente':
        return 'Você tem boa percepção de si. Agora é hora de agir com mais intencionalidade.'
      case 'Transformador':
        return 'Você está pronto para transformar sua vida e impactar o mundo ao seu redor!'
      default:
        return ''
    }
  }

  const handleChange = (index: number, value: number) => {
    const novasRespostas = [...respostas]
    novasRespostas[index] = value
    setRespostas(novasRespostas)
  }

  const enviarRespostas = () => {
    const soma = respostas.reduce((a, b) => a + b, 0)
    if (soma <= 16) setPerfil('Explorador')
    else if (soma <= 32) setPerfil('Consciente')
    else setPerfil('Transformador')
    setStep('resultado')
  }

  const voltarEtapa = () => {
    switch (step) {
      case 'cadastro':
        setStep('inicio')
        break
      case 'autoconhecimento':
        setStep('cadastro')
        break
      case 'resultado':
        setStep('autoconhecimento')
        break
      case 'boasVindas':
        setStep('resultado')
        break
      case 'home':
        setStep('boasVindas')
        break
      case 'trilhas':
        setStep('home')
        break
      case 'sobre':
        setStep('inicio')
        break
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-6 text-white relative">
      {/* Botão visível em todas as telas */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => setStep('sobre')}
          className="text-green-400 hover:text-green-300 underline text-sm md:text-base"
        >
          Sobre a Jovify
        </button>
      </div>

      {step === 'inicio' && (
        <section className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-green-400">Bem-vindo à Jovify</h1>
          <p className="text-zinc-300">Descubra seu perfil e desbloqueie funções exclusivas para o seu desenvolvimento!</p>
          <button onClick={() => setStep('cadastro')} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-6 rounded transition">
            Começar Jornada
          </button>
        </section>
      )}

      {step === 'cadastro' && (
        <section className="w-full max-w-md space-y-4 bg-zinc-900 p-6 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold text-green-400 text-center">Cadastro</h2>
          <input
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700"
          />
          <button
            onClick={() => nome.trim() !== '' && setStep('autoconhecimento')}
            className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition"
          >
            Avançar
          </button>
          <div className="text-center pt-2">
            <button onClick={voltarEtapa} className="bg-zinc-800 hover:bg-zinc-700 text-white py-1 px-4 rounded-lg shadow-md text-sm">← Voltar</button>
          </div>
        </section>
      )}

      {step === 'autoconhecimento' && (
        <section className="w-full max-w-2xl space-y-6 bg-zinc-900 p-6 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold text-green-400 text-center">Perguntas de Autoconhecimento</h2>
          {perguntas.map((pergunta, index) => (
            <div key={index} className="space-y-2">
              <p className="text-zinc-300">{index + 1}. {pergunta}</p>
              <input
                type="range"
                min={0}
                max={5}
                value={respostas[index]}
                onChange={(e) => handleChange(index, Number(e.target.value))}
                className="w-full accent-green-500"
              />
            </div>
          ))}
          <button
            onClick={enviarRespostas}
            className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition"
          >
            Ver meu perfil
          </button>
          <div className="text-center pt-2">
            <button onClick={voltarEtapa} className="bg-zinc-800 hover:bg-zinc-700 text-white py-1 px-4 rounded-lg shadow-md text-sm">← Voltar</button>
          </div>
        </section>
      )}

      {step === 'resultado' && perfil && (
        <section className="bg-zinc-900 p-8 rounded-xl shadow-xl w-full max-w-md text-center space-y-4">
          <h2 className="text-3xl font-bold text-green-400">Olá, {nome}!</h2>
          <p className="text-xl text-white">Seu perfil é: <span className="text-green-400 font-semibold">{perfil}</span></p>
          <p className="text-zinc-300">{getDescricaoPerfil(perfil)}</p>
          <button
            onClick={() => setStep('boasVindas')}
            className="mt-4 bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition"
          >
            Acessar Funções Especiais
          </button>
          <div className="text-center pt-2">
            <button onClick={voltarEtapa} className="bg-zinc-800 hover:bg-zinc-700 text-white py-1 px-4 rounded-lg shadow-md text-sm">← Voltar</button>
          </div>
        </section>
      )}

      {step === 'boasVindas' && perfil && (
        <section className="bg-zinc-900 p-8 rounded-xl shadow-xl w-full max-w-md text-center space-y-6">
          <h2 className="text-3xl font-bold text-green-400">Seja bem-vindo(a), {nome}!</h2>
          <p className="text-zinc-300">{getDescricaoPerfil(perfil)}</p>
          <div className="space-y-4 text-left text-zinc-300">
            <h3 className="text-green-400 font-semibold text-xl">Funções Disponíveis:</h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>Acessar trilhas de autodesenvolvimento</li>
              <li>Marcar sessões com psicólogos parceiros</li>
              <li>Receber mensagens motivacionais diárias</li>
              <li>Entrar na comunidade exclusiva Jovify</li>
              <li>Receber conteúdos personalizados pelo seu perfil</li>
            </ul>
          </div>
          <button
            onClick={() => setStep('home')}
            className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 w-full rounded transition"
          >
            Ir para a Página Inicial
          </button>
          <div className="text-center pt-2">
            <button onClick={voltarEtapa} className="bg-zinc-800 hover:bg-zinc-700 text-white py-1 px-4 rounded-lg shadow-md text-sm">← Voltar</button>
          </div>
        </section>
      )}

      {step === 'home' && (
        <section className="w-full max-w-3xl bg-zinc-900 p-8 rounded-xl shadow-xl space-y-6">
          <h2 className="text-3xl font-bold text-green-400 text-center">Home - Bem-vindo, {nome}!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-zinc-300">
            <div className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition cursor-pointer" onClick={() => setStep('trilhas')}>
              <h3 className="text-green-400 font-semibold text-lg">Trilhas de Autodesenvolvimento</h3>
              <p>Acesse conteúdos e desafios personalizados para evoluir continuamente.</p>
            </div>
          </div>
          <div className="text-center pt-2">
            <button onClick={voltarEtapa} className="bg-zinc-800 hover:bg-zinc-700 text-white py-1 px-4 rounded-lg shadow-md text-sm">← Voltar</button>
          </div>
        </section>
      )}

      {step === 'sobre' && (
        <section className="w-full max-w-3xl bg-zinc-900 p-8 rounded-xl shadow-xl text-zinc-300 space-y-4">
          <h2 className="text-3xl font-bold text-green-400 text-center">Sobre a Jovify</h2>
          <p>
            A Jovify foi criada por um aluno do curso de Análise e Desenvolvimento de Sistemas no ano de 2024, com o objetivo de ajudar jovens a se conhecerem melhor, desenvolverem habilidades emocionais e encontrarem um propósito.
          </p>
          <p>
            A plataforma busca unir tecnologia e psicologia para criar uma experiência única de autodesenvolvimento.
          </p>
          <div className="text-center pt-4">
            <button onClick={voltarEtapa} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-6 rounded transition">
              Voltar
            </button>
          </div>
        </section>
      )}
    </main>
  )
}
