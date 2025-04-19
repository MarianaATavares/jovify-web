"use client"

import { useState } from "react"

export default function Home() {
  const [step, setStep] = useState<'inicio' | 'cadastro' | 'autoconhecimento' | 'resultado' | 'boasVindas' | 'home' | 'trilhas' | 'psicologos' | 'mensagens'>('inicio')
  const [nome, setNome] = useState("")
  const [perfil, setPerfil] = useState("")

  const perguntas = [
    {
      pergunta: "Você se considera uma pessoa mais emocional ou racional?",
      opcoes: [
        { texto: "Emocional", perfil: "Empático" },
        { texto: "Racional", perfil: "Estratégico" },
      ],
    },
    {
      pergunta: "Você prefere planejar cada passo ou agir por impulso?",
      opcoes: [
        { texto: "Planejar", perfil: "Guardião" },
        { texto: "Agir por impulso", perfil: "Pioneiro" },
      ],
    },
    {
      pergunta: "Você gosta mais de ouvir ou de falar?",
      opcoes: [
        { texto: "Ouvir", perfil: "Empático" },
        { texto: "Falar", perfil: "Pioneiro" },
      ],
    },
  ]

  const [respostas, setRespostas] = useState<number[]>([])
  const perguntaAtual = respostas.length

  const selecionarOpcao = (indice: number) => {
    setRespostas([...respostas, indice])
  }

  const calcularPerfil = () => {
    const contagem: Record<string, number> = {}
    respostas.forEach((resposta, i) => {
      const perfil = perguntas[i].opcoes[resposta].perfil
      contagem[perfil] = (contagem[perfil] || 0) + 1
    })
    const perfilFinal = Object.entries(contagem).reduce((a, b) => a[1] > b[1] ? a : b)[0]
    setPerfil(perfilFinal)
    setStep("resultado")
  }

  const voltarEtapa = () => {
    setStep("home")
  }

  const mensagensPorPerfil: Record<string, string[]> = {
    Empático: [
      "Sua empatia é um presente para o mundo. Use-a com orgulho.",
      "Lembre-se: ouvir com o coração transforma relações.",
      "Seu carinho inspira quem te cerca. Continue assim!",
    ],
    Guardião: [
      "Sua constância é o que constrói grandes conquistas.",
      "Você é a base que muitos precisam. Confie no seu valor.",
      "Segurança e organização são suas superpotências.",
    ],
    Estratégico: [
      "Você vê soluções onde outros veem obstáculos. Use isso a seu favor.",
      "Seu raciocínio é uma bússola. Confie nele.",
      "Hoje é um ótimo dia para executar aquele plano com clareza.",
    ],
    Pioneiro: [
      "Você nasceu para abrir caminhos. Lidere com coragem.",
      "Inove, experimente, transforme. Esse é o seu chamado.",
      "Não tema o novo. Você foi feito para criar o futuro.",
    ],
  }

  const getMensagemDoDia = (perfil: string) => {
    const mensagens = mensagensPorPerfil[perfil]
    const hoje = new Date().getDate() // de 1 a 31
    return mensagens[hoje % mensagens.length]
  }

  return (
    <main className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-4">
      {step === "inicio" && (
        <section className="space-y-4 text-center">
          <h1 className="text-4xl font-bold text-green-400">Bem-vindo ao App de Autoconhecimento</h1>
          <p className="text-zinc-300">Comece sua jornada de descoberta interior</p>
          <button onClick={() => setStep("cadastro")} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md transition">Começar</button>
        </section>
      )}

      {step === "cadastro" && (
        <section className="space-y-4 text-center">
          <h2 className="text-2xl font-semibold text-green-400">Qual é o seu nome?</h2>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="p-2 rounded bg-zinc-800 text-white"
            placeholder="Digite seu nome"
          />
          <button onClick={() => setStep("autoconhecimento")} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md transition">Continuar</button>
        </section>
      )}

      {step === "autoconhecimento" && (
        <section className="space-y-6 max-w-xl text-center">
          <h2 className="text-2xl font-bold text-green-400">Autoconhecimento</h2>
          <p className="text-lg">{perguntas[perguntaAtual].pergunta}</p>
          <div className="flex flex-col gap-4">
            {perguntas[perguntaAtual].opcoes.map((opcao, i) => (
              <button key={i} onClick={() => {
                selecionarOpcao(i)
                if (perguntaAtual + 1 === perguntas.length) {
                  calcularPerfil()
                }
              }} className="bg-zinc-800 hover:bg-zinc-700 p-4 rounded-lg shadow">{opcao.texto}</button>
            ))}
          </div>
        </section>
      )}

      {step === "resultado" && (
        <section className="space-y-4 text-center">
          <h2 className="text-3xl font-bold text-green-400">Parabéns, {nome}!</h2>
          <p className="text-xl">Seu perfil é: <span className="font-semibold">{perfil}</span></p>
          <button onClick={() => setStep("boasVindas")} className="mt-4 bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg">Continuar</button>
        </section>
      )}

      {step === "boasVindas" && (
        <section className="space-y-6 text-center max-w-xl">
          <h2 className="text-3xl font-bold text-green-400">Seja bem-vindo, {nome}!</h2>
          <p className="text-lg text-zinc-300">Prepare-se para explorar trilhas de autoconhecimento personalizadas para seu perfil: <span className="font-semibold text-white">{perfil}</span>.</p>
          <button onClick={() => setStep("home")} className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg">Ir para o Início</button>
        </section>
      )}

      {step === "home" && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-12">
          <div
            className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition cursor-pointer"
            onClick={() => setStep("trilhas")}
          >
            <h3 className="text-green-400 font-semibold text-lg">Trilhas Personalizadas</h3>
            <p>Explore conteúdos e práticas recomendadas para seu perfil.</p>
          </div>
          <div
            className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition cursor-pointer"
            onClick={() => setStep("mensagens")}
          >
            <h3 className="text-green-400 font-semibold text-lg">Mensagens Diárias</h3>
            <p>Receba motivações diárias e mantenha o foco no que importa.</p>
          </div>
          <div
            className="bg-zinc-800 p-4 rounded-xl hover:bg-zinc-700 transition cursor-pointer"
            onClick={() => setStep("psicologos")}
          >
            <h3 className="text-green-400 font-semibold text-lg">Fale com Psicólogos</h3>
            <p>Conecte-se com profissionais para apoio emocional.</p>
          </div>
        </section>
      )}

      {step === "mensagens" && perfil && (
        <section className="w-full max-w-2xl bg-zinc-900 p-8 rounded-xl shadow-xl space-y-6 text-center">
          <h2 className="text-3xl font-bold text-green-400">Mensagem do Dia</h2>
          <p className="text-xl text-zinc-300">{getMensagemDoDia(perfil)}</p>
          <p className="text-zinc-500">Baseado no seu perfil: <span className="text-green-400 font-semibold">{perfil}</span></p>
          <div className="text-center pt-4">
            <button onClick={voltarEtapa} className="bg-zinc-800 hover:bg-zinc-700 text-white py-2 px-6 rounded-lg shadow-md">← Voltar</button>
          </div>
        </section>
      )}

      {step === "trilhas" && (
        <section className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-green-400">Trilhas para {perfil}</h2>
          <p className="text-zinc-300">Em breve, conteúdos exclusivos para seu desenvolvimento pessoal.</p>
          <button onClick={voltarEtapa} className="bg-zinc-800 hover:bg-zinc-700 text-white py-2 px-6 rounded-lg shadow-md">← Voltar</button>
        </section>
      )}

      {step === "psicologos" && (
        <section className="text-center space-y-6">
          <h2 className="text-3xl font-bold text-green-400">Fale com um Especialista</h2>
          <p className="text-zinc-300">Lista de psicólogos parceiros em breve.</p>
          <button onClick={voltarEtapa} className="bg-zinc-800 hover:bg-zinc-700 text-white py-2 px-6 rounded-lg shadow-md">← Voltar</button>
        </section>
      )}
    </main>
  )
}
