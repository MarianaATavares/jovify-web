'use client'

import { useState } from 'react'

export default function Home() {
  const [step, setStep] = useState<'inicio' | 'cadastro' | 'autoconhecimento' | 'resultado' | 'boasVindas' | 'home' | 'trilhas' | 'sobre'>('inicio')
  const [nome, setNome] = useState('')
  const [respostas, setRespostas] = useState<number[]>(Array(8).fill(0))
  const [perfil, setPerfil] = useState<string | null>(null)

  const handleChange = (index: number, value: number) => {
    const novasRespostas = [...respostas]
    novasRespostas[index] = value
    setRespostas(novasRespostas)
  }

  const calcularPerfil = () => {
    const soma = respostas.reduce((a, b) => a + b, 0)
    if (soma < 12) return 'Empático'
    if (soma < 20) return 'Guardião'
    if (soma < 28) return 'Estratégico'
    return 'Pioneiro'
  }

  const getDescricaoPerfil = (perfil: string) => {
    switch (perfil) {
      case 'Empático':
        return 'Você tem uma grande sensibilidade emocional, valoriza conexões humanas e está sempre pronto para apoiar quem precisa. Seu poder está na escuta e no acolhimento.'
      case 'Guardião':
        return 'Você é leal, confiável e organizado. Gosta de proteger o que é importante e se dedica com responsabilidade às suas tarefas. Um verdadeiro pilar para qualquer equipe.'
      case 'Estratégico':
        return 'Você pensa à frente, enxerga soluções e sabe como alcançar objetivos com inteligência. Seu raciocínio lógico e visão tática te destacam.'
      case 'Pioneiro':
        return 'Você é um líder nato! Ama inovação, desafiar padrões e transformar ideias em realidade. Seu espírito criativo e ousado inspira mudanças.'
      default:
        return ''
    }
  }

  const perguntas = [
    'Você se considera uma pessoa comunicativa?',
    'Costuma planejar com antecedência suas tarefas?',
    'Consegue entender facilmente os sentimentos dos outros?',
    'Gosta de assumir a liderança em projetos?',
    'Você prefere estabilidade ou mudanças constantes?',
    'Tem facilidade em resolver problemas de forma lógica?',
    'Valoriza relações profundas e sinceras?',
    'Sente-se motivado por desafios e inovação?'
  ]

  const enviarRespostas = () => {
    const perfilCalculado = calcularPerfil()
    setPerfil(perfilCalculado)
    setStep('resultado')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-6 text-white">
      {step === 'inicio' && (
        <section className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-green-400">Bem-vindo à Jovify</h1>
          <p className="text-zinc-300">Descubra seu perfil e desbloqueie funções exclusivas para o seu desenvolvimento!</p>
          <button onClick={() => setStep('cadastro')} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-6 rounded transition">
            Começar
          </button>
          <button onClick={() => setStep('sobre')} className="mt-4 bg-zinc-800 hover:bg-zinc-700 text-green-400 font-bold py-2 px-6 rounded transition">
            Sobre a Jovify
          </button>
          <div className="mt-6 flex justify-center gap-4 text-sm text-zinc-400">
            <a href="https://instagram.com/thejovify" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">Instagram</a>
            <a href="https://youtube.com/@thejovify" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">YouTube</a>
            <a href="mailto:sacjovify@gmail.com" className="hover:text-green-400">Email</a>
            <a href="https://tiktok.com/@thejovify" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">TikTok</a>
          </div>
        </section>
      )}

      {step === 'cadastro' && (
        <section className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-green-400">Como podemos te chamar?</h2>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="p-2 rounded text-black"
            placeholder="Digite seu nome"
          />
          <button onClick={() => setStep('autoconhecimento')} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-6 rounded transition">
            Continuar
          </button>
        </section>
      )}

      {step === 'autoconhecimento' && (
        <section className="space-y-6 w-full max-w-xl">
          <h2 className="text-3xl font-bold text-green-400 text-center">Responda com sinceridade:</h2>
          {perguntas.map((pergunta, index) => (
            <div key={index} className="bg-zinc-800 p-4 rounded">
              <p className="text-white mb-2">{pergunta}</p>
              <input
                type="range"
                min={0}
                max={4}
                value={respostas[index]}
                onChange={(e) => handleChange(index, parseInt(e.target.value))}
                className="w-full"
              />
            </div>
          ))}
          <button onClick={enviarRespostas} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-6 rounded transition w-full">
            Ver meu perfil
          </button>
        </section>
      )}

      {step === 'resultado' && perfil && (
        <section className="w-full max-w-2xl bg-zinc-900 p-8 rounded-xl shadow-xl space-y-6 text-center">
          <h2 className="text-3xl font-bold text-green-400">Seu perfil é: {perfil}</h2>
          <p className="text-zinc-300 text-lg">{getDescricaoPerfil(perfil)}</p>
          <button onClick={() => setStep('inicio')} className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 w-full rounded transition">
            Voltar ao Início
          </button>
        </section>
      )}

      {step === 'sobre' && (
        <section className="w-full max-w-3xl bg-zinc-900 p-8 rounded-xl shadow-xl space-y-6">
          <h2 className="text-3xl font-bold text-green-400 text-center">Sobre a Jovify</h2>
          <p className="text-zinc-300 text-lg text-center">
            O App foi criado em maio de 2024 por uma Estudante brasileira do primeiro Período de Gestão da Tecnologia da Informação, em Goiânia-GO. Inspirada pela busca de conhecimento sobre Saúde Mental familiar e desafios pessoais com ansiedade, a ideia cresceu com o apoio de Professores, Profissionais e Amigos que formaram sua equipe. Hoje, o App continua evoluindo, oferecendo informações e acessibilidade em Saúde Mental e Desenvolvimento Pessoal para Jovens do mundo.
          </p>
          <button
            onClick={() => setStep('inicio')}
            className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 w-full rounded transition"
          >
            Voltar para o Início
          </button>
        </section>
      )}
    </main>
  )
}
