'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const [step, setStep] = useState<'inicio' | 'cadastro' | 'autoconhecimento' | 'resultado' | 'boasVindas' | 'home' | 'trilhas' | 'trilhaDetalhada' | 'psicologos' | 'mensagensDiarias' | 'comunidade' | 'conteudosPersonalizados'>('inicio')
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [email, setEmail] = useState('')
  const [dataNascimento, setDataNascimento] = useState('')
  const [senha, setSenha] = useState('')
  const [respostas, setRespostas] = useState<number[]>(Array(8).fill(0))
  const [perfil, setPerfil] = useState<string | null>(null)
  const [contato, setContato] = useState('')
  const [mensagemPreferencia, setMensagemPreferencia] = useState('')

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
        return 'Você se importa com os outros e está sempre disposto a ajudar.'
      case 'Guardião':
        return 'Você valoriza segurança e estabilidade, buscando proteger aqueles ao seu redor.'
      case 'Estratégico':
        return 'Você pensa à frente, enxerga soluções e sabe como alcançar objetivos com inteligência. Seu raciocínio lógico e visão tática te destacam.'
      case 'Pioneiro':
        return 'Você é um líder nato! Ama inovação, desafiar padrões e transformar ideias em realidade. Seu espírito criativo e ousado inspira mudanças.'
      default:
        return ''
    }
  }

  const getConteudoTrilha = (perfil: string) => {
    const baseConteudo = {
      hobbies: '',
      ansiedade: '',
      diasRuins: '',
      amizades: '',
      estudos: ''
    }

    switch (perfil) {
      case 'Empático':
        return {
          ...baseConteudo,
          hobbies: 'Atividades artísticas, leitura, voluntariado.',
          ansiedade: 'Praticar meditação e exercícios de respiração.',
          diasRuins: 'Escrever sobre seus sentimentos ou conversar com um amigo.',
          amizades: 'Participar de grupos de apoio e atividades sociais.',
          estudos: 'Estudar em grupos e compartilhar conhecimento.'
        }
      case 'Guardião':
        return {
          ...baseConteudo,
          hobbies: 'Jardinagem, culinária, organização.',
          ansiedade: 'Criar rotinas e seguir planejamentos.',
          diasRuins: 'Focar em atividades que tragam conforto e estabilidade.',
          amizades: 'Aprofundar relações já existentes e buscar conexões seguras.',
          estudos: 'Planejar metas de estudo e revisar conteúdos com frequência.'
        }
      case 'Estratégico':
        return {
          ...baseConteudo,
          hobbies: 'Jogos de lógica, quebra-cabeças, leitura estratégica.',
          ansiedade: 'Listar problemas e soluções possíveis para aliviar preocupações.',
          diasRuins: 'Reorganizar planos e estabelecer novas metas.',
          amizades: 'Participar de debates e grupos de interesse intelectual.',
          estudos: 'Criar cronogramas e usar ferramentas de produtividade.'
        }
      case 'Pioneiro':
        return {
          ...baseConteudo,
          hobbies: 'Inovação, projetos DIY, explorar novas tecnologias.',
          ansiedade: 'Experimentar novas ideias sem pressão por perfeição.',
          diasRuins: 'Buscar inspiração em projetos ou hobbies criativos.',
          amizades: 'Networking em eventos e comunidades inovadoras.',
          estudos: 'Explorar novos tópicos e aprender com experiências práticas.'
        }
      default:
        return baseConteudo
    }
  }

  const enviarRespostas = () => {
    const perfilCalculado = calcularPerfil()
    setPerfil(perfilCalculado)
    setStep('resultado')
  }

  const conteudoTrilha = perfil ? getConteudoTrilha(perfil) : null

  return (
    <main className="min-h-screen flex items-center justify-center bg-zinc-950 p-4">
      {step === 'inicio' && (
        <section className="bg-zinc-900 p-8 rounded-xl shadow-xl w-full max-w-md space-y-4">
          <h1 className="text-3xl font-bold text-green-400 text-center">Bem-vindo ao Jovify!</h1>
          <button onClick={() => setStep('cadastro')} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition">
            Começar
          </button>
        </section>
      )}

      {step === 'cadastro' && (
        <section className="bg-zinc-900 p-8 rounded-xl shadow-xl w-full max-w-md space-y-4">
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
        <section className="bg-zinc-900 p-8 rounded-xl shadow-xl w-full max-w-md space-y-4">
          <h2 className="text-2xl font-bold text-green-400 text-center">Autoconhecimento</h2>
          {perguntas.map((pergunta, index) => (
            <div key={index} className="space-y-2">
              <p className="text-white">{pergunta}</p>
              <input type="range" min="0" max="4" value={respostas[index]} onChange={(e) => handleChange(index, parseInt(e.target.value))} className="w-full" />
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

      {step === 'boasVindas' && (
        <section className="bg-zinc-900 p-8 rounded-xl shadow-xl w-full max-w-md text-center space-y-4">
          <h2 className="text-2xl font-bold text-green-400">Seja bem-vindo, {nome}!</h2>
          <button onClick={() => setStep('home')} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition">
            Ir para a Página Inicial
          </button>
        </section>
      )}

      {step === 'home' && (
        <section className="w-full max-w-3xl bg-zinc-900 p-8 rounded-xl shadow-xl space-y-6">
          <h2 className="text-3xl font-bold text-green-400 text-center">Home - Bem-vindo, {nome}!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-zinc-300">
            <div onClick={() => setStep('trilhaDetalhada')} className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition cursor-pointer">
              <h3 className="text-green-400 font-semibold text-lg">Trilhas de Autodesenvolvimento</h3>
              <p>Acesse conteúdos e desafios personalizados para evoluir continuamente.</p>
            </div>
            <div onClick={() => setStep('psicologos')} className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition cursor-pointer">
              <h3 className="text-green-400 font-semibold text-lg">Sessões com Psicólogos</h3>
              <p>Agende conversas com nossos especialistas parceiros para cuidar da sua mente.</p>
            </div>
            <div onClick={() => setStep('mensagensDiarias')} className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition cursor-pointer">
              <h3 className="text-green-400 font-semibold text-lg">Mensagens Diárias</h3>
              <p>Receba motivações diárias e mantenha o foco no que importa.</p>
            </div>
            <div onClick={() => setStep('comunidade')} className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition cursor-pointer">
              <h3 className="text-green-400 font-semibold text-lg">Comunidade Jovify</h3>
              <p>Conecte-se com outros jovens inconformados e compartilhe sua jornada.</p>
            </div>
            <div onClick={() => setStep('conteudosPersonalizados')} className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition cursor-pointer">
              <h3 className="text-green-400 font-semibold text-lg">Conteúdos Personalizados</h3>
              <p>Receba artigos, vídeos e dicas com base no seu perfil: {perfil}.</p>
            </div>
          </div>
        </section>
      )}

      {step === 'trilhaDetalhada' && perfil && conteudoTrilha && (
        <section className="bg-zinc-900 p-8 rounded-xl shadow-xl w-full max-w-lg space-y-4 text-zinc-300">
          <h2 className="text-2xl font-bold text-green-400 text-center">Trilha de Autodesenvolvimento - {perfil}</h2>
          <p><strong>Hobbies:</strong> {conteudoTrilha.hobbies}</p>
          <p><strong>Dicas para evitar ansiedade:</strong> {conteudoTrilha.ansiedade}</p>
          <p><strong>O que fazer em dias ruins:</strong> {conteudoTrilha.diasRuins}</p>
          <p><strong>Como fazer novas amizades:</strong> {conteudoTrilha.amizades}</p>
          <p><strong>Como evoluir nos estudos:</strong> {conteudoTrilha.estudos}</p>
          <button onClick={() => setStep('home')} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition">Voltar</button>
        </section>
      )}

      {step === 'psicologos' && (
        <section className="bg-zinc-900 p-8 rounded-xl shadow-xl w-full max-w-md space-y-4 text-zinc-300">
          <h2 className="text-2xl font-bold text-green-400 text-center">Sessões com Psicólogos</h2>
          <p>Você é psicólogo e quer fazer parte da Jovify?</p>
          <p>Envie sua proposta e currículo para:</p>
          <p className="text-green-400 font-semibold">equipejovify@gmail.com</p>
          <button onClick={() => setStep('home')} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition">Voltar</button>
        </section>
      )}

      {step === 'mensagensDiarias' && (
        <section className="bg-zinc-900 p-8 rounded-xl shadow-xl w-full max-w-md space-y-4 text-zinc-300">
          <h2 className="text-2xl font-bold text-green-400 text-center">Mensagens Diárias</h2>
          <input type="text" placeholder="Digite seu email ou número" value={contato} onChange={(e) => setContato(e.target.value)} className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700" />
          <textarea placeholder="O que você gostaria de ver mais nesta trilha?" value={mensagemPreferencia} onChange={(e) => setMensagemPreferencia(e.target.value)} className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700 h-24"></textarea>
          <button onClick={() => setStep('home')} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition">Enviar & Voltar</button>
        </section>
      )}

      {step === 'comunidade' && (
        <section className="bg-zinc-900 p-8 rounded-xl shadow-xl w-full max-w-lg space-y-4 text-zinc-300">
          <h2 className="text-2xl font-bold text-green-400 text-center">Comunidade Jovify - {perfil}</h2>
          <p>Aqui você poderá interagir com outros usuários do mesmo perfil.</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Chat geral para todos do perfil {perfil}</li>
            <li>Solicitar chat privado com amigos</li>
          </ul>
          <p className="text-sm text-zinc-500">*Funcionalidades de chat em desenvolvimento.</p>
          <button onClick={() => setStep('home')} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition">Voltar</button>
        </section>
      )}

      {step === 'conteudosPersonalizados' && (
        <section className="bg-zinc-900 p-8 rounded-xl shadow-xl w-full max-w-lg space-y-4 text-zinc-300">
          <h2 className="text-2xl font-bold text-green-400 text-center">Conteúdos Personalizados - {perfil}</h2>
          <p><strong>Autossabotagem:</strong> Identificar padrões negativos e substituí-los por hábitos saudáveis.</p>
          <p><strong>Reciclar falsas crenças:</strong> Questionar pensamentos limitantes e buscar novas perspectivas.</p>
          <p><strong>Necessidade de perfeição:</strong> Valorizar o progresso ao invés de buscar perfeição constante.</p>
          <button onClick={() => setStep('home')} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition">Voltar</button>
        </section>
      )}
    </main>
  )
}
