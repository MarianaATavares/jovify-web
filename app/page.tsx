'use client'

import { useState } from 'react'

export default function Home() {
  const [step, setStep] = useState<'inicio' | 'cadastro' | 'autoconhecimento' | 'resultado' | 'boasVindas' | 'home' | 'trilhas'>('inicio')
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')
  const [senha, setSenha] = useState('')
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
        return 'Você é sensível às emoções e valoriza relações humanas. Está sempre disposto a ouvir e apoiar os outros.'
      case 'Guardião':
        return 'Você preza pela segurança e estabilidade. Gosta de cuidar e garantir que tudo esteja sob controle.'
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
    <main className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      {step === 'inicio' && (
        <section className="bg-zinc-900 p-8 rounded-xl shadow-xl w-full max-w-md space-y-4">
          <h1 className="text-3xl font-bold text-green-400 text-center">Bem-vindo ao Jovify</h1>
          <button
            onClick={() => setStep('cadastro')}
            className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition"
          >
            Começar
          </button>
        </section>
      )}

      {step === 'cadastro' && (
        <section className="bg-zinc-900 p-8 rounded-xl shadow-xl w-full max-w-md space-y-4">
          <h2 className="text-2xl font-bold text-green-400 text-center">Cadastro</h2>
          <input
            type="text"
            placeholder="Digite seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700"
          />
          <input
            type="text"
            placeholder="Digite seu CPF"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700"
          />
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700"
          />
          <input
            type="date"
            value={dataNascimento}
            onChange={(e) => setDataNascimento(e.target.value)}
            className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700"
          />
          <input
            type="password"
            placeholder="Crie uma senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700"
          />
          <button
            onClick={() => nome.trim() !== '' && setStep('autoconhecimento')}
            className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition"
          >
            Avançar
          </button>
        </section>
      )}

      {step === 'autoconhecimento' && (
        <section className="bg-zinc-900 p-8 rounded-xl shadow-xl w-full max-w-md space-y-4">
          <h2 className="text-2xl font-bold text-green-400 text-center">Autoconhecimento</h2>
          {perguntas.map((pergunta, index) => (
            <div key={index}>
              <p className="text-white">{pergunta}</p>
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
          <button
            onClick={enviarRespostas}
            className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition"
          >
            Ver meu perfil
          </button>
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
        </section>
      )}

      {step === 'home' && (
        <section className="w-full max-w-3xl bg-zinc-900 p-8 rounded-xl shadow-xl space-y-6">
          <h2 className="text-3xl font-bold text-green-400 text-center">Home - Bem-vindo, {nome}!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-zinc-300">
            <div onClick={() => setStep('trilhas')} className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition cursor-pointer">
              <h3 className="text-green-400 font-semibold text-lg">Trilhas de Autodesenvolvimento</h3>
              <p>Acesse conteúdos e desafios personalizados para evoluir continuamente.</p>
            </div>
            <div className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition cursor-pointer">
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
        </section>
      )}
    </main>
  )
}
