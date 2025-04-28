"use client";

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const [step, setStep] = useState<
    'inicio' | 'cadastro' | 'autoconhecimento' | 'resultado' | 'boasVindas' | 'home' | 'trilhas' |
    'sessaoPsicologos' | 'mensagensDiarias' | 'comunidade' | 'conteudosPersonalizados'
  >('inicio')

  const [history, setHistory] = useState<string[]>([])
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [respostas, setRespostas] = useState<number[]>(Array(8).fill(0))
  const [perfil, setPerfil] = useState<string | null>(null)
  const [sugestao, setSugestao] = useState('')

  const navigate = (nextStep: typeof step) => {
    setHistory((prev) => [...prev, step])
    setStep(nextStep)
  }

  const goBack = () => {
    setHistory((prev) => {
      const newHistory = [...prev]
      const previousStep = newHistory.pop()
      if (previousStep) setStep(previousStep as typeof step)
      return newHistory
    })
  }

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
    navigate('resultado')
  }

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

      {/* Outros steps podem ser adicionados aqui conforme necessário */}

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
  )
}
