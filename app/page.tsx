"use client"

import { useState } from 'react'

export default function Home() {
  const [step, setStep] = useState<'inicio' | 'cadastro' | 'autoconhecimento' | 'resultado' | 'boasVindas' | 'home' | 'trilhas' | 'trilhaDetalhe' | 'psicologo' | 'mensagens' | 'comunidade' | 'conteudos'>('inicio')
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')
  const [senha, setSenha] = useState('')
  const [respostas] = useState<number[]>(Array(8).fill(0)) // <-- remove o setRespostas
  const [perfil, setPerfil] = useState<string | null>(null)
  const [contato, setContato] = useState('')
  const [sugestaoMensagem, setSugestaoMensagem] = useState('')

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
        return 'Você tem uma grande sensibilidade emocional, valoriza conexões humanas e está sempre pronto para apoiar quem precisa.'
      case 'Guardião':
        return 'Você é leal, confiável e organizado. Gosta de proteger o que é importante e se dedica com responsabilidade às suas tarefas.'
      case 'Estratégico':
        return 'Você pensa à frente, enxerga soluções e sabe como alcançar objetivos com inteligência.'
      case 'Pioneiro':
        return 'Você é um líder nato! Ama inovação, desafiar padrões e transformar ideias em realidade.'
      default:
        return ''
    }
  }

  const getDicasTrilha = (perfil: string) => {
    switch (perfil) {
      case 'Empático':
        return [
          'Hobbies: Pintura, meditação, escrita emocional.',
          'Evitar ansiedade: Praticar mindfulness diariamente.',
          'Dias ruins: Escutar músicas calmas e escrever sentimentos.',
          'Amizades: Participar de grupos de apoio e voluntariado.',
          'Evoluir nos estudos: Estudar com grupos para maior engajamento.'
        ]
      case 'Guardião':
        return [
          'Hobbies: Jardinagem, organização de eventos, culinária.',
          'Evitar ansiedade: Planejar tarefas antecipadamente.',
          'Dias ruins: Fazer checklists simples para retomar controle.',
          'Amizades: Círculos de atividades planejadas como clubes de leitura.',
          'Evoluir nos estudos: Mapas mentais e resumos organizados.'
        ]
      case 'Estratégico':
        return [
          'Hobbies: Xadrez, jogos de estratégia, debates.',
          'Evitar ansiedade: Criar planos de ação para problemas.',
          'Dias ruins: Analisar e aprender com o que não funcionou.',
          'Amizades: Grupos de estudo ou debates.',
          'Evoluir nos estudos: Análises SWOT dos temas de estudo.'
        ]
      case 'Pioneiro':
        return [
          'Hobbies: Startups, design thinking, hackathons.',
          'Evitar ansiedade: Relembrar objetivos e metas pessoais.',
          'Dias ruins: Brainstorm de novas ideias para projetos.',
          'Amizades: Comunidades de inovação e empreendedorismo.',
          'Evoluir nos estudos: Cursos práticos e bootcamps rápidos.'
        ]
      default:
        return []
    }
  }

  const getConteudosPersonalizados = (perfil: string) => {
    return [
      'Como evitar a autossabotagem.',
      'Reciclar falsas crenças limitantes.',
      'Diminuir a necessidade de perfeição.',
      'Estratégias para manter a motivação alta.'
    ]
  }

  const handleFinalizarCadastro = () => {
    const perfilCalculado = calcularPerfil()
    setPerfil(perfilCalculado)
    setStep('resultado')
  }

  const inputClass = "w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700"
  const btnPrimaryClass = "bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition"
  const cardClass = "bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 cursor-pointer transition text-center font-semibold"

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
        <section className="space-y-4 w-full max-w-md">
          <input type="text" placeholder="Nome completo" value={nome} onChange={(e) => setNome(e.target.value)} className={inputClass} />
          <input type="text" placeholder="CPF" value={cpf} onChange={(e) => setCpf(e.target.value)} className={inputClass} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
          <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} className={inputClass} />
          <input type="password" placeholder="Senha" value={senha} onChange={(e) => setSenha(e.target.value)} className={inputClass} />
          <button onClick={() => nome.trim() !== '' && setStep('autoconhecimento')} className={btnPrimaryClass}>
            Avançar
          </button>
        </section>
      )}

      {step === 'autoconhecimento' && (
        <section className="space-y-4 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold">Responda às perguntas</h2>
          {/* Aqui poderiam estar os sliders ou inputs */}
          <button onClick={handleFinalizarCadastro} className={btnPrimaryClass}>Finalizar</button>
        </section>
      )}

      {step === 'resultado' && perfil && (
        <section className="space-y-6 w-full max-w-md text-center">
          <h2 className="text-3xl font-bold">Olá, {nome}!</h2>
          <p className="text-xl">Seu perfil é: <span className="text-green-400 font-bold">{perfil}</span></p>
          <p>{getDescricaoPerfil(perfil)}</p>
          <button onClick={() => setStep('home')} className={btnPrimaryClass}>Acessar Plataforma</button>
        </section>
      )}

      {step === 'home' && (
        <section className="w-full max-w-3xl space-y-6">
          <h2 className="text-3xl font-bold text-center text-green-400">Home - Bem-vindo, {nome}!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div onClick={() => setStep('trilhaDetalhe')} className={cardClass}>Trilhas de Autodesenvolvimento</div>
            <div onClick={() => setStep('psicologo')} className={cardClass}>Sessões com Psicólogos</div>
            <div onClick={() => setStep('mensagens')} className={cardClass}>Mensagens Diárias</div>
            <div onClick={() => setStep('comunidade')} className={cardClass}>Comunidade Jovify</div>
            <div onClick={() => setStep('conteudos')} className={cardClass}>Conteúdos Personalizados</div>
          </div>
        </section>
      )}

      {step === 'trilhaDetalhe' && perfil && (
        <section className="space-y-6 w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-center">Dicas para seu perfil ({perfil})</h2>
          <ul className="list-disc pl-6">
            {getDicasTrilha(perfil).map((dica, index) => (
              <li key={index}>{dica}</li>
            ))}
          </ul>
          <button onClick={() => setStep('home')} className={btnPrimaryClass}>Voltar</button>
        </section>
      )}

      {step === 'psicologo' && (
        <section className="space-y-6 w-full max-w-md text-center">
          <h2 className="text-2xl font-bold">Seja nosso Psicólogo Parceiro</h2>
          <p>Envie sua proposta + currículo para: <br/><span className="text-green-400 font-semibold">equipejovify@gmail.com</span></p>
          <button onClick={() => setStep('home')} className={btnPrimaryClass}>Voltar</button>
        </section>
      )}

      {step === 'mensagens' && (
        <section className="space-y-6 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center">Receba Mensagens Diárias</h2>
          <input type="text" placeholder="Seu celular ou email" value={contato} onChange={(e) => setContato(e.target.value)} className={inputClass} />
          <textarea placeholder="O que gostaria de ver mais nas mensagens?" value={sugestaoMensagem} onChange={(e) => setSugestaoMensagem(e.target.value)} className={inputClass} />
          <button onClick={() => setStep('home')} className={btnPrimaryClass}>Enviar</button>
        </section>
      )}

      {step === 'comunidade' && perfil && (
        <section className="space-y-6 w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-center">Comunidade Jovify - {perfil}</h2>
          <p>Conecte-se com jovens do seu perfil! Participe do chat geral ou solicite amizade para chats privados.</p>
          <button onClick={() => setStep('home')} className={btnPrimaryClass}>Voltar</button>
        </section>
      )}

      {step === 'conteudos' && perfil && (
        <section className="space-y-6 w-full max-w-2xl">
          <h2 className="text-2xl font-bold text-center">Conteúdos para {perfil}</h2>
          <ul className="list-disc pl-6">
            {getConteudosPersonalizados(perfil).map((conteudo, index) => (
              <li key={index}>{conteudo}</li>
            ))}
          </ul>
          <button onClick={() => setStep('home')} className={btnPrimaryClass}>Voltar</button>
        </section>
      )}
    </main>
  )
}
