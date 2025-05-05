'use client'

import { useState } from 'react'

export default function Home() {
  const [step, setStep] = useState<
    'inicio' | 'cadastro' | 'autoconhecimento' | 'resultado' | 'boasVindas' | 'home' | 'trilhas' | 'trilhaDetalhes' | 'psicologo'
  >('inicio')
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

  const BotaoVoltar = ({ voltarPara }: { voltarPara: typeof step }) => (
    <button
      onClick={() => setStep(voltarPara)}
      className="bg-zinc-700 hover:bg-zinc-600 text-white py-1 px-4 rounded transition mb-4"
    >
      ← Voltar
    </button>
  )

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
          <h1 className="text-4xl font-bold text-green-400">Bem-vindo à Gerafy</h1>
          <p className="text-zinc-300 text-xl font-medium">A nova geração que transformará o mundo começa aqui.</p>
          <button onClick={() => setStep('cadastro')} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-6 rounded transition">
            Entrar com convite / Pedir acesso
          </button>
          <div className="mt-6 flex justify-center gap-4 text-sm text-zinc-400">
            <a href="https://instagram.com/thegerafy" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">Instagram</a>
            <a href="https://youtube.com/@thegerafy" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">YouTube</a>
            <a href="mailto:sacgerafy@gmail.com" className="hover:text-green-400">Email</a>
            <a href="https://tiktok.com/@thegerafy" target="_blank" rel="noopener noreferrer" className="hover:text-green-400">TikTok</a>
          </div>
        </section>
      )}

      {/* O resto permanece idêntico, apenas links e nomes como "Jovify" foram alterados para "Gerafy" */}

      {step === 'boasVindas' && perfil && (
        <section className="bg-zinc-900 p-8 rounded-xl shadow-xl w-full max-w-md text-center space-y-6">
          <BotaoVoltar voltarPara="resultado" />
          <h2 className="text-3xl font-bold text-green-400">Seja bem-vindo(a), {nome}!</h2>
          <p className="text-zinc-300">{getDescricaoPerfil(perfil)}</p>
          <div className="space-y-4 text-left text-zinc-300">
            <h3 className="text-green-400 font-semibold text-xl">Funções Disponíveis:</h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>Acessar trilhas de autodesenvolvimento</li>
              <li>Marcar sessões com psicólogos parceiros</li>
              <li>Receber mensagens motivacionais diárias</li>
              <li>Entrar na comunidade exclusiva Gerafy</li>
              <li>Receber conteúdos personalizados pelo seu perfil</li>
            </ul>
          </div>
          <button onClick={() => setStep('home')} className="bg-green-500 hover:bg-green-600 text-black font-bold py-2 w-full rounded transition">
            Ir para a Página Inicial
          </button>
        </section>
      )}

      {step === 'psicologo' && (
        <section className="w-full max-w-2xl bg-zinc-900 p-8 rounded-xl shadow-xl text-center space-y-6">
          <BotaoVoltar voltarPara="home" />
          <h2 className="text-3xl font-bold text-green-400">Sessões com Psicólogos</h2>
          <p className="text-zinc-300">Estamos montando uma rede de psicólogos parceiros da Gerafy.</p>
          <p className="text-zinc-300">Se você é psicólogo(a) e tem interesse em fazer parte, envie um e-mail para:</p>
          <a href="mailto:equipegerafy@gmail.com" className="text-green-400 underline">equipegerafy@gmail.com</a>
        </section>
      )}
    </main>
  )
}
