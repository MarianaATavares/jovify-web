'use client'

import { useState } from 'react'
import { Mail, Instagram, Youtube, TikTok } from 'lucide-react'

export default function Home() {
  const [step, setStep] = useState<'inicio' | 'cadastro' | 'autoconhecimento' | 'resultado' | 'boasVindas' | 'home' | 'trilhas' | 'psicologos'>('inicio')
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
        setStep('boasVindas')
        break
      case 'trilhas':
        setStep('home')
        break
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
          <button
            onClick={() => setStep('cadastro')}
            className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-6 rounded transition"
          >
            Começar
          </button>
          <div className="flex justify-center gap-6 pt-6">
            <a
              href="https://instagram.com/thejovify"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-pink-500 transition"
              title="@thejovify no Instagram"
            >
              <Instagram className="w-6 h-6" />
            </a>
            <a
              href="https://youtube.com/@thejovify"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-red-600 transition"
              title="Canal TheJovify no YouTube"
            >
              <Youtube className="w-6 h-6" />
            </a>
            <a
              href="https://www.tiktok.com/@thejovify"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-400 hover:text-white transition"
              title="@thejovify no TikTok"
            >
              <TikTok className="w-6 h-6" />
            </a>
            <a
              href="mailto:thejovify@gmail.com"
              className="text-zinc-400 hover:text-green-400 transition"
              title="Contato por e-mail"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </section>
      )}

      {/* as outras telas permanecem exatamente como estão no seu código original */}
      
      {/* ... (cadastro, autoconhecimento, resultado, boasVindas, home, psicologos, trilhas) */}
    </main>
  )
}
