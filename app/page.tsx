'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const [step, setStep] = useState<'inicio' | 'cadastro' | 'autoconhecimento' | 'resultado' | 'boasVindas' | 'home' | 'trilhas'>('inicio')
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

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-6 text-white">
      {step === 'inicio' && (
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-green-400">Bem-vindo à Jovify!</h1>
          <button onClick={() => setStep('cadastro')} className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded font-semibold text-black">
            Começar
          </button>
        </section>
      )}

      {step === 'cadastro' && (
        <section className="space-y-4">
          <h2 className="text-2xl text-green-400">Qual seu nome?</h2>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="px-4 py-2 rounded text-black w-full"
            placeholder="Digite seu nome"
          />
          <button onClick={() => setStep('autoconhecimento')} className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded font-semibold text-black">
            Avançar
          </button>
        </section>
      )}

      {step === 'autoconhecimento' && (
        <section className="space-y-6">
          <h2 className="text-2xl text-green-400 text-center">Responda às perguntas</h2>
          {perguntas.map((pergunta, index) => (
            <div key={index} className="space-y-2">
              <p>{pergunta}</p>
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
          <button onClick={enviarRespostas} className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded font-semibold text-black w-full">
            Ver Resultado
          </button>
        </section>
      )}

      {step === 'resultado' && perfil && (
        <section className="space-y-6 text-center">
          <h2 className="text-3xl font-bold text-green-400">Seu perfil é: {perfil}</h2>
          <p>{getDescricaoPerfil(perfil)}</p>
          <button onClick={() => setStep('trilhas')} className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded font-semibold text-black">
            Ver Trilhas de Desenvolvimento
          </button>
        </section>
      )}

      {step === 'trilhas' && perfil && (
        <section className="w-full max-w-3xl bg-zinc-900 p-8 rounded-xl shadow-xl space-y-6 text-zinc-300">
          <h2 className="text-3xl font-bold text-green-400 text-center">Trilhas para o perfil: {perfil}</h2>

          {perfil === 'Empático' && (
            <div>
              <h3 className="text-lg font-semibold text-green-400">Dicas para o seu perfil</h3>
              <ul className="space-y-3 list-disc list-inside">
                <li>Desenvolva habilidades de escuta ativa e empatia com cursos gratuitos.</li>
                <li>Participe de grupos de apoio ou voluntariado para exercitar seu dom.</li>
                <li>Pratique meditação e atenção plena para manter o equilíbrio emocional.</li>
              </ul>
              <h3 className="text-lg font-semibold text-green-400">Hobbies recomendados:</h3>
              <ul className="space-y-3 list-disc list-inside">
                <li>Praticar yoga ou meditação.</li>
                <li>Escrever um diário de reflexões pessoais.</li>
                <li>Voluntariar-se em ONGs ou ações comunitárias.</li>
              </ul>
            </div>
          )}

          {perfil === 'Guardião' && (
            <div>
              <h3 className="text-lg font-semibold text-green-400">Dicas para o seu perfil</h3>
              <ul className="space-y-3 list-disc list-inside">
                <li>Explore ferramentas de produtividade e organização pessoal.</li>
                <li>Invista em cursos sobre liderança de processos e gestão de tempo.</li>
                <li>Pratique equilíbrio entre vida pessoal e profissional.</li>
              </ul>
              <h3 className="text-lg font-semibold text-green-400">Hobbies recomendados:</h3>
              <ul className="space-y-3 list-disc list-inside">
                <li>Organizar eventos para a comunidade.</li>
                <li>Praticar jardinagem ou manutenção de espaços.</li>
                <li>Estudar sobre finanças pessoais e investimentos.</li>
              </ul>
            </div>
          )}

          {perfil === 'Estratégico' && (
            <div>
              <h3 className="text-lg font-semibold text-green-400">Dicas para o seu perfil</h3>
              <ul className="space-y-3 list-disc list-inside">
                <li>Faça trilhas sobre resolução de problemas e pensamento crítico.</li>
                <li>Leia sobre tomada de decisão e modelos mentais.</li>
                <li>Desafie-se com projetos práticos e simulações.</li>
              </ul>
              <h3 className="text-lg font-semibold text-green-400">Hobbies recomendados:</h3>
              <ul className="space-y-3 list-disc list-inside">
                <li>Participar de hackathons e competições de programação.</li>
                <li>Estudar novas tecnologias e ferramentas de produtividade.</li>
                <li>Praticar debates e discussões sobre temas complexos.</li>
              </ul>
            </div>
          )}

          {perfil === 'Pioneiro' && (
            <div>
              <h3 className="text-lg font-semibold text-green-400">Dicas para o seu perfil</h3>
              <ul className="space-y-3 list-disc list-inside">
                <li>Crie projetos inovadores e compartilhe com a comunidade Jovify.</li>
                <li>Explore ferramentas de design thinking e startups enxutas.</li>
                <li>Desenvolva suas soft skills de liderança e influência.</li>
              </ul>
              <h3 className="text-lg font-semibold text-green-400">Hobbies recomendados:</h3>
              <ul className="space-y-3 list-disc list-inside">
                <li>Iniciar um blog ou canal de conteúdo sobre inovação.</li>
                <li>Participar de meetups e eventos de networking com empreendedores.</li>
                <li>Desenvolver projetos de startup e buscar financiamento.</li>
              </ul>
            </div>
          )}

          <button
            onClick={() => setStep('home')}
            className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition"
          >
            Voltar para Home
          </button>
        </section>
      )}
    </main>
  )
}
