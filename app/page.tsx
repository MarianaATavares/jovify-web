'use client'

import { useState } from 'react'
// Removido: import { useRouter } from 'next/navigation'

export default function Home() {
  // Removido: const router = useRouter()

  const [step, setStep] = useState<'inicio' | 'cadastro' | 'autoconhecimento' | 'resultado' | 'boasVindas' | 'home' | 'trilhas' | 'psicologos' | 'mensagens' | 'comunidade' | 'conteudos'>('inicio')
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')
  const [senha, setSenha] = useState('')
  const [respostas, setRespostas] = useState<number[]>(Array(8).fill(0))
  const [perfil, setPerfil] = useState<string | null>(null)
  const [contatoMensagem, setContatoMensagem] = useState('')
  const [sugestaoMensagem, setSugestaoMensagem] = useState('')

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
          <input type="text" placeholder="Digite seu nome" value={nome} onChange={(e) => setNome(e.target.value)} className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700" />
          <input type="text" placeholder="Digite seu CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700" />
          <input type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700" />
          <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700" />
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
        <section className="bg-zinc-900 p-8 rounded-xl shadow-xl w-full max-w-md text-center space-y-6">
          <h2 className="text-3xl font-bold text-green-400">Seja bem-vindo(a), {nome}!</h2>
          <p className="text-zinc-300">{getDescricaoPerfil(perfil)}</p>
          <div className="space-y-4 text-left text-zinc-300">
            <h3 className="text-green-400 font-semibold text-xl">Funções Disponíveis:</h3>
            <ul className="space-y-2 list-disc list-inside">
              <li onClick={() => setStep('trilhas')} className="cursor-pointer">Acessar trilhas de autodesenvolvimento</li>
              <li onClick={() => setStep('psicologos')} className="cursor-pointer">Marcar sessões com psicólogos parceiros</li>
              <li onClick={() => setStep('mensagens')} className="cursor-pointer">Receber mensagens motivacionais diárias</li>
              <li onClick={() => setStep('comunidade')} className="cursor-pointer">Entrar na comunidade exclusiva Jovify</li>
              <li onClick={() => setStep('conteudos')} className="cursor-pointer">Receber conteúdos personalizados pelo seu perfil</li>
            </ul>
          </div>
        </section>
      )}

      {step === 'trilhas' && (
        <section className="w-full max-w-3xl bg-zinc-900 p-8 rounded-xl shadow-xl space-y-4 text-white">
          <h2 className="text-2xl font-bold text-green-400 text-center mb-4">Dicas para o perfil: {perfil}</h2>
          <ul className="space-y-4 list-disc list-inside">
            <li><strong>Como combater a autossabotagem:</strong> Entenda suas crenças limitantes, anote suas conquistas e pratique a autocompaixão diariamente.</li>
            <li><strong>Como fazer novas amizades:</strong> Participe de grupos com interesses em comum e pratique escuta ativa.</li>
            <li><strong>Dicas contra ansiedade:</strong> Faça respiração consciente, evite gatilhos e mantenha uma rotina saudável.</li>
            <li><strong>Como agir em dias ruins:</strong> Diminua o ritmo, aceite seus sentimentos e foque em pequenas ações positivas.</li>
            <li><strong>Como evoluir nos estudos:</strong> Use a técnica Pomodoro, tenha um cronograma e evite multitarefas.</li>
          </ul>
          <button onClick={() => setStep('home')} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition">
            Voltar
          </button>
        </section>
      )}

      {step === 'psicologos' && (
        <section className="w-full max-w-xl bg-zinc-900 p-8 rounded-xl shadow-xl space-y-4 text-white text-center">
          <h2 className="text-2xl font-bold text-green-400">Seja parceiro da Jovify!</h2>
          <p>Psicólogos interessados em colaborar com a plataforma devem enviar seu currículo e proposta para o e-mail:</p>
          <p className="text-green-400 font-semibold">equipejovify@gmail.com</p>
          <button onClick={() => setStep('home')} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition">
            Voltar
          </button>
        </section>
      )}

      {step === 'mensagens' && (
        <section className="w-full max-w-xl bg-zinc-900 p-8 rounded-xl shadow-xl space-y-6 text-white">
          <h2 className="text-2xl font-bold text-green-400 text-center">Mensagens Motivacionais</h2>
          <input type="text" placeholder="Seu celular ou email" value={contatoMensagem} onChange={(e) => setContatoMensagem(e.target.value)} className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700" />
          <textarea placeholder="O que você gostaria de ver mais nesta trilha?" value={sugestaoMensagem} onChange={(e) => setSugestaoMensagem(e.target.value)} className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700 h-28" />
          <button onClick={() => setStep('home')} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition">
            Enviar & Voltar
          </button>
        </section>
      )}

      {step === 'comunidade' && (
        <section className="w-full max-w-3xl bg-zinc-900 p-8 rounded-xl shadow-xl space-y-6 text-white">
          <h2 className="text-2xl font-bold text-green-400 text-center">Comunidade Jovify - Perfil: {perfil}</h2>
          <p className="text-zinc-300 text-center">Converse com pessoas do seu perfil, faça amigos e troque experiências.</p>
          <div className="bg-zinc-800 p-4 rounded-xl space-y-4">
            <p>Chat geral do perfil <strong>{perfil}</strong> (exemplo futuro aqui...)</p>
            <p>Funcionalidade futura: Solicitar amizade e abrir chat privado.</p>
          </div>
          <button onClick={() => setStep('home')} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition">
            Voltar
          </button>
        </section>
      )}

      {step === 'conteudos' && (
        <section className="w-full max-w-3xl bg-zinc-900 p-8 rounded-xl shadow-xl space-y-6 text-white">
          <h2 className="text-2xl font-bold text-green-400 text-center">Conteúdos Personalizados</h2>
          <ul className="space-y-4 list-disc list-inside">
            <li>Como combater a autossabotagem</li>
            <li>Como reciclar falsas crenças</li>
            <li>Como lidar com a necessidade de perfeição</li>
            <li>Dicas de organização emocional e prática</li>
            <li>Vídeos e artigos focados no perfil: {perfil}</li>
          </ul>
          <button onClick={() => setStep('home')} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition">
            Voltar
          </button>
        </section>
      )}
    </main>
  )
}
