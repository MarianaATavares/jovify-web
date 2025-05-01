'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

export default function Home() {
  const router = useRouter()
  const [step, setStep] = useState<'inicio' | 'cadastro' | 'autoconhecimento' | 'resultado' | 'boasVindas' | 'home' | 'trilhas' | 'trilhaDetalhes' | 'psicologo'>('inicio')
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

  const Dica = ({ titulo, conteudo }: { titulo: string, conteudo: string }) => (
    <div className="bg-zinc-800 p-4 rounded-lg shadow-md">
      <h4 className="text-green-400 font-semibold text-lg">{titulo}</h4>
      <p className="text-zinc-300">{conteudo}</p>
    </div>
  )

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-6 text-white">
      {step === 'inicio' && (
        <section className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-green-400">Bem-vindo à Jovify!</h1>
          <p className="text-zinc-300 text-lg">Sua jornada de autoconhecimento começa aqui.</p>
          <button onClick={() => setStep('cadastro')} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-6 rounded transition">
            Começar
          </button>
        </section>
      )}

      {step === 'cadastro' && (
        <section className="w-full max-w-md space-y-4 bg-zinc-900 p-6 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold text-green-400 text-center">Cadastro</h2>
          <input type="text" placeholder="Digite seu nome" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700" />
          <input type="text" placeholder="Digite seu CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700" />
          <input type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700" />
          <input type="date" placeholder="Digite sua data de nascimento" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700" />
          <input type="password" placeholder="Crie uma senha" value={senha} onChange={(e) => setSenha(e.target.value)} className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700" />
          <button onClick={() => nome.trim() !== '' && setStep('autoconhecimento')} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition">
            Avançar
          </button>
        </section>
      )}

      {step === 'autoconhecimento' && (
        <section className="w-full max-w-2xl space-y-6 bg-zinc-900 p-6 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold text-green-400 text-center">Perguntas de Autoconhecimento</h2>
          {perguntas.map((pergunta, index) => (
            <div key={index} className="space-y-2">
              <p className="text-zinc-300">{index + 1}. {pergunta}</p>
              <input type="range" min={0} max={5} value={respostas[index]} onChange={(e) => handleChange(index, Number(e.target.value))} className="w-full accent-green-500" />
            </div>
          ))}
          <button onClick={enviarRespostas} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition">
            Ver meu perfil
          </button>
        </section>
      )}

      {step === 'resultado' && perfil && (
        <section className="bg-zinc-900 p-8 rounded-xl shadow-xl w-full max-w-md text-center space-y-4">
          <h2 className="text-3xl font-bold text-green-400">Olá, {nome}!</h2>
          <p className="text-xl text-white">Seu perfil é: <span className="text-green-400 font-semibold">{perfil}</span></p>
          <p className="text-zinc-300">{getDescricaoPerfil(perfil)}</p>
          <button onClick={() => setStep('boasVindas')} className="mt-4 bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition">
            Acessar Funções Especiais
          </button>
        </section>
      )}

      {step === 'boasVindas' && perfil && (
        <motion.section
          className="bg-zinc-900 p-8 rounded-xl shadow-xl w-full max-w-md text-center space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
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
          <button onClick={() => setStep('home')} className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 w-full rounded transition">
            Ir para a Página Inicial
          </button>
        </motion.section>
      )}

      {step === 'home' && (
        <section className="space-y-6 w-full max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-green-400">Explorar Jovify</h2>
          <button onClick={() => setStep('trilhas')} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-6 rounded transition">
            Trilhas de Desenvolvimento
          </button>
          <button onClick={() => setStep('psicologo')} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-6 rounded transition">
            Sessões com Psicólogos
          </button>
        </section>
      )}

      {step === 'trilhas' && (
        <section className="space-y-4 bg-zinc-900 p-6 rounded-xl shadow-xl w-full max-w-md">
          <h3 className="text-2xl font-bold text-green-400">Escolha uma Trilha</h3>
          <button onClick={() => setStep('trilhaDetalhes')} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-6 rounded transition">
            Trilha de Desenvolvimento Pessoal
          </button>
          <button onClick={() => setStep('trilhaDetalhes')} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-6 rounded transition">
            Trilha de Liderança
          </button>
        </section>
      )}

      {step === 'trilhaDetalhes' && (
        <section className="space-y-4 bg-zinc-900 p-6 rounded-xl shadow-xl w-full max-w-md">
          <h3 className="text-2xl font-bold text-green-400">Detalhes da Trilha</h3>
          <p className="text-zinc-300">Aqui você encontrará as etapas de sua jornada de autodesenvolvimento.</p>
          <button onClick={() => setStep('home')} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-6 rounded transition">
            Voltar para a Página Inicial
          </button>
        </section>
      )}

      {step === 'psicologo' && (
        <section className="space-y-4 bg-zinc-900 p-6 rounded-xl shadow-xl w-full max-w-md">
          <h3 className="text-2xl font-bold text-green-400">Sessões com Psicólogos</h3>
          <p className="text-zinc-300">Se você é psicólogo e quer oferecer sessões, entre em contato com a nossa equipe pelo e-mail <span className="font-semibold">equipejovify@gmail.com</span>.</p>
          <button onClick={() => setStep('home')} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-6 rounded transition">
            Voltar para a Página Inicial
          </button>
        </section>
      )}
    </main>
  )
}
