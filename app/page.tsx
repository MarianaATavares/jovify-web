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
          <div className="mt-6 flex justify-center gap-4 text-sm text-zinc-400">
            <a href="https://instagram.com/thejovify" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">Instagram</a>
            <a href="https://youtube.com/@thejovify" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">YouTube</a>
            <a href="mailto:sacjovify@gmail.com" className="hover:text-green-400">Email</a>
            <a href="https://tiktok.com/@thejovify" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">TikTok</a>
          </div>
        </section>
      )}

      {step === 'sobre' && (
        <section className="w-full max-w-2xl bg-zinc-900 p-8 rounded-xl shadow-xl space-y-4 text-zinc-300">
          <h2 className="text-3xl font-bold text-green-400 text-center">Sobre a Jovify</h2>
          <p>
            A Jovify nasceu da inquietação de transformar o desenvolvimento pessoal dos jovens em uma experiência acessível, envolvente e realmente eficaz. Sabemos que muitos enfrentam dificuldades emocionais, falta de propósito e insegurança sobre o futuro — e foi pensando nisso que criamos a Jovify: uma plataforma que une tecnologia, psicologia e comunidade para impulsionar cada jovem a descobrir seu verdadeiro potencial.
          </p>
          <p>
            Mais do que uma ferramenta, somos um movimento. Acreditamos que todo jovem tem dentro de si uma força transformadora — e a nossa missão é desbloqueá-la com trilhas personalizadas, apoio profissional e uma rede de apoio inspiradora.
          </p>
          <p>
            Seja bem-vindo(a) à revolução do autodesenvolvimento. Seja bem-vindo(a) à Jovify.
          </p>
          <div className="text-center pt-2">
            <button onClick={voltarEtapa} className="bg-zinc-800 hover:bg-zinc-700 text-white py-1 px-4 rounded-lg shadow-md text-sm">← Voltar</button>
          </div>
        </section>
      )}

      {/* As outras telas (cadastro, autoconhecimento, resultado, boasVindas, home, trilhas) estão exatamente como você enviou, sem alterações. */}
    </main>
  )
}
