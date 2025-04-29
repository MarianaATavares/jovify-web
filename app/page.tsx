'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const [step, setStep] = useState<'inicio' | 'cadastro' | 'autoconhecimento' | 'resultado' | 'boasVindas' | 'home' | 'trilhas' | 'sessaoPsicologo' | 'mensagensDiarias' | 'comunidade' | 'conteudosPersonalizados'>('inicio')
const [nome, setNome] = useState<string>('')
const [dataNascimento, setDataNascimento] = useState<string>('')
const [senha, setSenha] = useState<string>('')
const [respostas, setRespostas] = useState<number[]>(Array(8).fill(0))
const [perfil, setPerfil] = useState<string | null>(null)
const [contato, setContato] = useState<string>('')
const [sugestao, setSugestao] = useState<string>('')



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
        return 'Você tem uma grande sensibilidade emocional...'
      case 'Guardião':
        return 'Você é leal, confiável e organizado...'
      case 'Estratégico':
        return 'Você pensa à frente, enxerga soluções...'
      case 'Pioneiro':
        return 'Você é um líder nato! Ama inovação...'
      default:
        return ''
    }
  }

  const dicasPorPerfil: Record<string, string[]> = {
    'Empático': [
      'Explore hobbies artísticos como pintura ou escrita.',
      'Pratique meditação para aliviar a ansiedade.',
      'Converse com amigos próximos em dias difíceis.',
      'Participe de grupos sociais para novas amizades.',
      'Crie mapas mentais para estudar com mais leveza.'
    ],
    'Guardião': [
      'Organize sua rotina com listas e metas.',
      'Evite sobrecarga delegando tarefas quando possível.',
      'Reserve tempo para autocuidado.',
      'Inicie conversas com interesses comuns para novas amizades.',
      'Crie cronogramas de estudos com pausas.'
    ],
    'Estratégico': [
      'Busque hobbies que envolvam lógica ou estratégia.',
      'Use técnicas de respiração para controlar ansiedade.',
      'Analise o que está te incomodando em dias ruins.',
      'Participe de clubes ou fóruns de debate.',
      'Use flashcards ou quizzes para otimizar estudos.'
    ],
    'Pioneiro': [
      'Experimente novos projetos criativos.',
      'Desconecte-se e pratique atividades físicas.',
      'Escreva ideias ou projetos em dias difíceis.',
      'Crie eventos ou participe de grupos inovadores.',
      'Explore cursos online sobre temas que ama.'
    ]
  }

  const enviarRespostas = () => {
    const perfilCalculado = calcularPerfil()
    setPerfil(perfilCalculado)
    setStep('resultado')
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-6 text-white">
      {step === 'home' && (
        <section className="w-full max-w-3xl bg-zinc-900 p-8 rounded-xl shadow-xl space-y-6">
          <h2 className="text-3xl font-bold text-green-400 text-center">Home - Bem-vindo, {nome}!</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-zinc-300">
            <div onClick={() => setStep('trilhas')} className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition cursor-pointer">
              <h3 className="text-green-400 font-semibold text-lg">Trilhas de Autodesenvolvimento</h3>
              <p>Acesse conteúdos e desafios personalizados para evoluir continuamente.</p>
            </div>
            <div onClick={() => setStep('sessaoPsicologo')} className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition cursor-pointer">
              <h3 className="text-green-400 font-semibold text-lg">Sessões com Psicólogos</h3>
              <p>Agende conversas com nossos especialistas parceiros para cuidar da sua mente.</p>
            </div>
            <div onClick={() => setStep('mensagensDiarias')} className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition cursor-pointer">
              <h3 className="text-green-400 font-semibold text-lg">Mensagens Diárias</h3>
              <p>Receba motivações diárias e mantenha o foco no que importa.</p>
            </div>
            <div onClick={() => setStep('comunidade')} className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition cursor-pointer">
              <h3 className="text-green-400 font-semibold text-lg">Comunidade Jovify</h3>
              <p>Conecte-se com outros jovens do mesmo perfil e compartilhe sua jornada.</p>
            </div>
            <div onClick={() => setStep('conteudosPersonalizados')} className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition cursor-pointer">
              <h3 className="text-green-400 font-semibold text-lg">Conteúdos Personalizados</h3>
              <p>Dicas exclusivas para você: {perfil}</p>
            </div>
          </div>
        </section>
      )}

      {step === 'trilhas' && perfil && (
        <section className="w-full max-w-2xl bg-zinc-900 p-8 rounded-xl shadow-xl space-y-6">
          <h2 className="text-2xl font-bold text-green-400 text-center">Dicas para seu perfil: {perfil}</h2>
          <ul className="list-disc list-inside text-zinc-300 space-y-2">
            {dicasPorPerfil[perfil].map((dica, index) => (
              <li key={index}>{dica}</li>
            ))}
          </ul>
          <button onClick={() => setStep('home')} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition">Voltar para o Início</button>
        </section>
      )}

      {step === 'sessaoPsicologo' && (
        <section className="w-full max-w-md bg-zinc-900 p-8 rounded-xl shadow-xl text-center space-y-6">
          <h2 className="text-2xl font-bold text-green-400">Trabalhe conosco!</h2>
          <p className="text-zinc-300">Se você é psicólogo(a) e deseja colaborar com a Jovify, envie sua proposta e currículo para <strong>equipejovify@gmail.com</strong></p>
          <button onClick={() => setStep('home')} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition">Voltar para o Início</button>
        </section>
      )}

      {step === 'mensagensDiarias' && (
        <section className="w-full max-w-md bg-zinc-900 p-8 rounded-xl shadow-xl space-y-4">
          <h2 className="text-2xl font-bold text-green-400 text-center">Mensagens Diárias</h2>
          <input
            type="text"
            placeholder="Digite seu celular ou email"
            value={contato}
            onChange={(e) => setContato(e.target.value)}
            className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700"
          />
          <textarea
            placeholder="O que você gostaria de ver mais nesta trilha?"
            value={sugestao}
            onChange={(e) => setSugestao(e.target.value)}
            className="w-full p-2 rounded bg-zinc-800 text-white border border-zinc-700"
          ></textarea>
          <button onClick={() => setStep('home')} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition">Enviar e Voltar</button>
        </section>
      )}

      {step === 'comunidade' && perfil && (
        <section className="w-full max-w-3xl bg-zinc-900 p-8 rounded-xl shadow-xl space-y-4">
          <h2 className="text-2xl font-bold text-green-400 text-center">Comunidade Jovify - {perfil}</h2>
          <p className="text-zinc-300 text-center">Participe do chat geral ou solicite amizade para conversar em particular com outros usuários do seu perfil.</p>
          <div className="bg-zinc-800 p-4 rounded-xl text-zinc-300">[Área de Chat Geral do Perfil: {perfil} - Em construção]</div>
          <button onClick={() => setStep('home')} className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition">Voltar para o Início</button>
        </section>
      )}

{step === 'conteudosPersonalizados' && perfil && (
  <section className="w-full max-w-2xl bg-zinc-900 p-8 rounded-xl shadow-xl space-y-4">
    <h2 className="text-2xl font-bold text-green-400 text-center">Conteúdos Personalizados - {perfil}</h2>

    <div className="space-y-3 text-zinc-300">
      <h3 className="text-lg font-semibold text-green-400">💭 Como lidar com a autossabotagem</h3>
      <p>
        A autossabotagem acontece quando criamos barreiras internas que nos impedem de evoluir. 
        Reconheça padrões como procrastinação, autocrítica excessiva ou medo de fracassar. 
        Uma dica prática é escrever o que está sentindo e quais pensamentos surgem antes de evitar uma tarefa. 
        Pergunte-se: "Essa crença é realmente verdadeira?" ou "Que prova tenho disso?". A escrita terapêutica ajuda a reorganizar o pensamento e construir uma autopercepção mais generosa.
      </p>
    </div>

    <div className="space-y-3 text-zinc-300">
      <h3 className="text-lg font-semibold text-green-400">🔄 Como reciclar falsas crenças</h3>
      <p>
        Falsas crenças são ideias distorcidas que criamos sobre nós mesmos, geralmente na infância ou adolescência, como "não sou bom o suficiente" ou "não consigo mudar". 
        Identifique essas frases e confronte-as com fatos reais da sua vida. Crie versões alternativas e mais positivas dessas frases. 
        Exemplo: troque "não sou criativo" por "posso desenvolver minha criatividade com prática e paciência".
      </p>
    </div>

    <div className="space-y-3 text-zinc-300">
      <h3 className="text-lg font-semibold text-green-400">🎯 Lidando com a necessidade de perfeição</h3>
      <p>
        A busca pelo perfeccionismo gera estresse e paralisia. Aceite que errar faz parte do aprendizado. 
        Ao invés de se cobrar perfeição, foque em progresso e consistência. 
        Tente praticar o “feito é melhor que perfeito” e celebre pequenas vitórias ao longo do caminho. 
        Exercícios de mindfulness também ajudam a reduzir a autocobrança e aumentar a autocompaixão.
      </p>
    </div>

    <button
      onClick={() => setStep('home')}
      className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition"
    >
      Voltar para o Início
    </button>
  </section>
)}

