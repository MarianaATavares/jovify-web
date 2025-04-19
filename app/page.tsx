'use client'

import { useState } from 'react'
import { FaInstagram, FaLinkedin, FaTiktok } from 'react-icons/fa'

export default function Home() {
  const [step, setStep] = useState<'inicio' | 'cadastro' | 'autoconhecimento' | 'resultado' | 'boasVindas' | 'home' | 'trilhas' | 'psicologos' | 'sobre'>('inicio')
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
      case 'sobre':
        setStep('boasVindas')
        break
      case 'trilhas':
      case 'psicologos':
        setStep('home')
        break
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-6 text-white">
      {step === 'inicio' && (
        <section className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-green-400">Bem-vindo à Jovify</h1>
          <p className="text-zinc-300">Descubra seu perfil e desbloqueie funções exclusivas para o seu desenvolvimento!</p>
          <div className="space-y-3">
            <button onClick={() => setStep('cadastro')} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-6 rounded transition">
              Começar
            </button>
            <button onClick={() => setStep('sobre')} className="text-sm underline text-green-400 hover:text-green-300 block">
              Sobre a Jovify
            </button>
          </div>
          <div className="flex justify-center gap-6 pt-4 text-2xl text-green-400">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer"><FaTiktok /></a>
          </div>
        </section>
      )}

      {step === 'sobre' && (
        <section className="bg-zinc-900 p-6 rounded-xl shadow-xl max-w-2xl text-zinc-300 space-y-4">
          <h2 className="text-3xl font-bold text-green-400 text-center">Sobre a Jovify</h2>
          <p>
            A Jovify é uma startup que tem como propósito ajudar jovens inconformados a se desenvolverem e encontrarem propósito de vida. Nós acreditamos que o mundo precisa de jovens corajosos, conscientes e engajados para resolver os problemas do presente e criar um futuro mais justo, criativo e humano.
          </p>
          <p>
            Para isso, desenvolvemos uma jornada interativa que une tecnologia, psicologia e educação. Você vai descobrir seu perfil comportamental, receber trilhas de autoconhecimento e desenvolvimento, conversar com psicólogos parceiros, receber conteúdos personalizados e muito mais.
          </p>
          <p>
            Acreditamos que todo jovem tem um potencial transformador. E a nossa missão é te ajudar a despertar esse potencial, com ciência, acolhimento e inovação.
          </p>
          <div className="text-center pt-4">
            <button onClick={voltarEtapa} className="bg-zinc-800 hover:bg-zinc-700 text-white py-2 px-6 rounded-lg shadow-md">← Voltar</button>
          </div>
        </section>
      )}

      {/* as demais telas continuam exatamente iguais */}
      {/* ...telas de cadastro, autoconhecimento, resultado, boas-vindas, home, trilhas, psicólogos... */}
    </main>
  )
}
