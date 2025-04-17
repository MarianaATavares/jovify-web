'use client'

import { useState } from 'react'

export default function Home() {
  const [step, setStep] = useState<'inicio' | 'cadastro' | 'autoconhecimento' | 'resultado' | 'boasVindas' | 'home' | 'trilhas' | 'sobre'>('inicio')
  const [nome, setNome] = useState('')
  const [respostas, setRespostas] = useState<number[]>(Array(8).fill(0))
  const [perfil, setPerfil] = useState<string | null>(null)

  const perguntas = [
    'Sinto que conheço bem meus pontos fortes e fracos.',
    'Tenho clareza sobre meus objetivos pessoais e profissionais.',
    'Consigo manter a calma mesmo em situações estressantes.',
    'Sou capaz de me motivar mesmo diante de desafios.',
    'Tenho facilidade em me comunicar com diferentes pessoas.',
    'Sinto que pertenço a algum grupo ou comunidade.',
    'Tenho o hábito de refletir sobre minhas ações e sentimentos.',
    'Busco constantemente me desenvolver e aprender coisas novas.'
  ]

  function getDescricaoPerfil(perfil: string) {
    switch (perfil) {
      case 'Explorador':
        return 'Você é curioso(a), aberto(a) a novas experiências e sempre busca aprender. Gosta de se conhecer melhor e está em constante evolução.'
      case 'Conector':
        return 'Você valoriza os relacionamentos e sente que faz parte de algo maior. A troca com outras pessoas é essencial para seu crescimento.'
      case 'Construtor':
        return 'Você é prático(a), gosta de planejar e colocar a mão na massa. Enxerga o autoconhecimento como uma ferramenta para alcançar seus objetivos.'
      default:
        return ''
    }
  }

  function handleChange(index: number, value: number) {
    const novasRespostas = [...respostas]
    novasRespostas[index] = value
    setRespostas(novasRespostas)
  }

  function enviarRespostas() {
    const soma = respostas.reduce((acc, val) => acc + val, 0)
    const media = soma / respostas.length
    let perfilCalculado = ''

    if (media >= 4) perfilCalculado = 'Explorador'
    else if (media >= 2.5) perfilCalculado = 'Conector'
    else perfilCalculado = 'Construtor'

    setPerfil(perfilCalculado)
    setStep('resultado')
  }

  function voltarEtapa() {
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
      {step === 'inicio' && (
        <section className="text-center space-y-6">
          <div className="absolute top-4 right-6">
            <button
              onClick={() => setStep('sobre')}
              className="text-green-400 hover:text-green-300 underline text-sm md:text-base"
            >
              Sobre a Jovify
            </button>
          </div>
          <h1 className="text-4xl font-bold text-green-400">Bem-vindo à Jovify</h1>
          <p className="text-zinc-300">Descubra seu perfil e desbloqueie funções exclusivas para o seu desenvolvimento!</p>
          <button onClick={() => setStep('cadastro')} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-6 rounded transition">
            Começar
          </button>
        </section>
      )}

      {step === 'sobre' && (
        <section className="w-full max-w-2xl bg-zinc-900 p-8 rounded-xl shadow-xl space-y-4 text-zinc-300">
          <h2 className="text-3xl font-bold text-green-400 text-center">Sobre a Jovify</h2>
          <p>
            A Jovify surgiu como um projeto de um aluno do curso de Análise e Desenvolvimento de Sistemas, em 2024, com o objetivo de proporcionar aos jovens uma jornada de autoconhecimento de forma simples e eficaz.
          </p>
          <p>
            Pensando nas dificuldades enfrentadas pela juventude, como ansiedade, inseguranças e dúvidas sobre o futuro, esse projeto nasceu como uma ferramenta para auxiliar nesse processo de descoberta pessoal.
          </p>
          <p>
            Ao longo do desenvolvimento, a ideia foi se expandindo e tomou forma como uma plataforma interativa, acolhedora e personalizada. A Jovify acredita que todo jovem tem um grande potencial esperando para ser desbloqueado — e está aqui para ajudar nessa jornada.
          </p>
          <div className="text-center pt-2">
            <button onClick={voltarEtapa} className="bg-zinc-800 hover:bg-zinc-700 text-white py-1 px-4 rounded-lg shadow-md text-sm">← Voltar</button>
          </div>
        </section>
      )}

      {/* As outras telas do seu projeto permanecem exatamente como estão, sem alteração nenhuma. */}
    </main>
  )
}
