'use client'

import { useState } from 'react'

export default function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [step, setStep] = useState<
    'inicio' | 'cadastro' | 'autoconhecimento' | 'resultado' | 'boasVindas' | 'home' | 'trilhas' | 'trilhaDetalhes' | 'psicologo' | 'mensagens'
  >('inicio')

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [nome, setNome] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cpf, setCpf] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [email, setEmail] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dataNascimento, setDataNascimento] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [senha, setSenha] = useState('')
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [respostas, setRespostas] = useState<number[]>(Array(8).fill(0))
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [perfil, setPerfil] = useState<string | null>(null)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const Mensagem = ({ titulo, texto }: { titulo: string, texto: string }) => (
    <div className="bg-zinc-800 p-4 rounded-lg shadow-md space-y-2">
      <h4 className="text-green-400 text-xl font-semibold">{titulo}</h4>
      <p className="text-zinc-300">{texto}</p>
    </div>
  )

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-6 text-white">
      {/* ... todas as telas anteriores aqui sem alterações ... */}

      {step === 'home' && (
        <section className="w-full max-w-3xl bg-zinc-900 p-8 rounded-xl shadow-xl space-y-6">
          <BotaoVoltar voltarPara="boasVindas" />
          <h2 className="text-3xl font-bold text-green-400 text-center">Home - Bem-vindo, {nome}!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-zinc-300">
            <div onClick={() => setStep('trilhas')} className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition cursor-pointer">
              <h3 className="text-green-400 font-semibold text-lg">Trilhas de Autodesenvolvimento</h3>
              <p>Acesse conteúdos e desafios personalizados para evoluir continuamente.</p>
            </div>
            <div onClick={() => setStep('psicologo')} className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition cursor-pointer">
              <h3 className="text-green-400 font-semibold text-lg">Sessões com Psicólogos</h3>
              <p>Agende conversas com nossos especialistas parceiros para cuidar da sua mente.</p>
            </div>
            <div onClick={() => setStep('mensagens')} className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition cursor-pointer">
              <h3 className="text-green-400 font-semibold text-lg">Mensagens Motivacionais</h3>
              <p>Palavras para acalmar sua mente e fortalecer seu coração.</p>
            </div>
          </div>
        </section>
      )}

      {step === 'mensagens' && (
        <section className="w-full max-w-2xl bg-zinc-900 p-8 rounded-xl shadow-xl space-y-6">
          <BotaoVoltar voltarPara="home" />
          <h2 className="text-3xl font-bold text-green-400 text-center">Mensagens Motivacionais</h2>
          <Mensagem
            titulo="Ansiedade"
            texto="Respire fundo. Tudo acontece no seu tempo. Você não precisa ter todas as respostas agora. Confie no processo."
          />
          <Mensagem
            titulo="Estresse"
            texto="Você está fazendo o melhor que pode. Permita-se descansar. Às vezes, pausar é o que te leva mais longe."
          />
          <Mensagem
            titulo="Medo"
            texto="Coragem não é ausência de medo, mas agir apesar dele. Você é mais forte do que imagina."
          />
        </section>
      )}
    </main>
  )
}
