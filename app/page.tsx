'use client'

import { useState } from 'react'

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
          <button onClick={() => setStep('cadastro')} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-6 rounded transition">
            Começar
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
            <div className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition cursor-pointer" onClick={() => setStep('psicologos')}>
              <h3 className="text-green-400 font-semibold text-lg">Sessões com Psicólogos</h3>
              <p>Agende conversas com nossos especialistas parceiros para cuidar da sua mente.</p>
            </div>
            <div className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition cursor-pointer">
              <h3 className="text-green-400 font-semibold text-lg">Mensagens Diárias</h3>
              <p>Receba motivações diárias e mantenha o foco no que importa.</p>
            </div>
            <div className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition cursor-pointer">
              <h3 className="text-green-400 font-semibold text-lg">Comunidade Jovify</h3>
              <p>Conecte-se com outros jovens inconformados e compartilhe sua jornada.</p>
            </div>
            <div className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition cursor-pointer">
              <h3 className="text-green-400 font-semibold text-lg">Conteúdos Personalizados</h3>
              <p>Receba artigos, vídeos e dicas com base no seu perfil: {perfil}.</p>
            </div>
          </div>
          <div className="text-center pt-2">
            <button onClick={voltarEtapa} className="bg-zinc-800 hover:bg-zinc-700 text-white py-1 px-4 rounded-lg shadow-md text-sm">← Voltar</button>
          </div>
        </section>
      )}

      {step === 'psicologos' && (
        <section className="w-full max-w-3xl bg-zinc-900 p-8 rounded-xl shadow-xl space-y-6">
          <h2 className="text-3xl font-bold text-green-400 text-center">Sessões com Psicólogos</h2>
          <div className="bg-zinc-800 p-6 rounded-xl text-zinc-300">
            <h3 className="text-green-400 font-semibold text-xl">Psicólogo Parceiro</h3>
            <p><strong>Nome:</strong> Bruno Ferreira</p>
            <p><strong>CRP:</strong> 06/123456</p>
            <p><strong>Especialidade:</strong> Psicologia Positiva e Terapia Cognitivo-Comportamental</p>
          </div>
          <div className="bg-zinc-800 p-6 rounded-xl text-zinc-300">
            <h3 className="text-green-400 font-semibold text-xl">É psicólogo e quer trabalhar com a Jovify?</h3>
            <p>Estamos recrutando profissionais engajados em transformar a vida de jovens inconformados.</p>
            <p>Envie seu currículo ou proposta para: <strong className="text-white">thejovify@gmail.com</strong></p>
          </div>
          <div className="text-center pt-4">
            <button onClick={voltarEtapa} className="bg-zinc-800 hover:bg-zinc-700 text-white py-2 px-6 rounded-lg shadow-md">← Voltar</button>
          </div>
        </section>
      )}

      {step === 'trilhas' && (
        <section className="w-full max-w-3xl bg-zinc-900 p-8 rounded-xl shadow-xl space-y-6">
          <h2 className="text-3xl font-bold text-green-400 text-center">Trilhas de Autodesenvolvimento</h2>
          <p className="text-zinc-300 text-center">
            Aqui você encontrará desafios, conteúdos e práticas alinhadas ao seu perfil: <span className="text-green-400 font-semibold">{perfil}</span>.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-zinc-300">
            <div className="bg-zinc-800 p-4 rounded-xl">
              <h3 className="text-green-400 font-semibold">Trilha da Autoliderança</h3>
              <p>Fortaleça sua capacidade de tomar decisões, se motivar e influenciar com autenticidade.</p>
            </div>
            <div className="bg-zinc-800 p-4 rounded-xl">
              <h3 className="text-green-400 font-semibold">Trilha da Inteligência Emocional</h3>
              <p>Aprenda a lidar melhor com emoções, aumentar sua empatia e melhorar seus relacionamentos.</p>
            </div>
            <div className="bg-zinc-800 p-4 rounded-xl">
              <h3 className="text-green-400 font-semibold">Trilha do Propósito</h3>
              <p>Descubra o que te move, alinhe sua vida com seus valores e encontre sentido no que faz.</p>
            </div>
            <div className="bg-zinc-800 p-4 rounded-xl">
              <h3 className="text-green-400 font-semibold">Trilha da Comunicação</h3>
              <p>Desenvolva sua expressão, escuta ativa e impacto em interações pessoais e profissionais.</p>
            </div>
          </div>
          <div className="text-center pt-2">
            <button onClick={voltarEtapa} className="bg-zinc-800 hover:bg-zinc-700 text-white py-1 px-4 rounded-lg shadow-md text-sm">← Voltar</button>
          </div>
        </section>
      )}
    </main>
  )
}
