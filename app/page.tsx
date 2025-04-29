'use client';

import { useState } from 'react';

export default function Home() {
  const [step, setStep] = useState<
    'inicio' | 'perfil' | 'home' | 'trilhas' | 'psicologos' | 'mensagens' | 'comunidade' | 'conteudos'
  >('inicio');
  const [perfil, setPerfil] = useState<'Empático' | 'Guardião' | 'Estratégico' | 'Visionário' | null>(null);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-black p-4">
      {step === 'inicio' && (
        <section className="text-white text-center space-y-6 max-w-xl">
          <h1 className="text-4xl font-bold text-green-400">Bem-vindo à Jovify</h1>
          <p className="text-lg">Uma jornada de autoconhecimento e evolução pessoal para jovens como você.</p>
          <button
            onClick={() => setStep('perfil')}
            className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 px-6 rounded transition"
          >
            Começar
          </button>
        </section>
      )}

      {step === 'perfil' && (
        <section className="w-full max-w-xl bg-zinc-900 p-8 rounded-xl shadow-xl space-y-6 text-white">
          <h2 className="text-2xl font-bold text-green-400 text-center">Qual dessas características mais combina com você?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['Empático', 'Guardião', 'Estratégico', 'Visionário'].map((p) => (
              <button
                key={p}
                onClick={() => {
                  setPerfil(p as typeof perfil);
                  setStep('home');
                }}
                className="bg-zinc-800 hover:bg-green-700 text-white py-2 rounded-lg border border-zinc-700 transition"
              >
                {p}
              </button>
            ))}
          </div>
        </section>
      )}

      {step === 'home' && perfil && (
        <section className="w-full max-w-4xl bg-zinc-900 p-8 rounded-xl shadow-xl space-y-8 text-white">
          <h2 className="text-2xl font-bold text-green-400 text-center">Olá, {perfil}! Escolha uma opção:</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div
              onClick={() => setStep('trilhas')}
              className="cursor-pointer p-4 bg-zinc-800 rounded-xl hover:bg-green-700 transition"
            >
              <h3 className="text-xl font-semibold text-green-300">Trilhas personalizadas</h3>
              <p>Receba conteúdos e orientações para seu tipo de perfil.</p>
            </div>
            <div
              onClick={() => setStep('psicologos')}
              className="cursor-pointer p-4 bg-zinc-800 rounded-xl hover:bg-green-700 transition"
            >
              <h3 className="text-xl font-semibold text-green-300">Profissionais de apoio</h3>
              <p>Entre em contato com psicólogos que apoiam o projeto.</p>
            </div>
            <div
              onClick={() => setStep('mensagens')}
              className="cursor-pointer p-4 bg-zinc-800 rounded-xl hover:bg-green-700 transition"
            >
              <h3 className="text-xl font-semibold text-green-300">Mensagens motivacionais</h3>
              <p>Cadastre-se para receber mensagens diárias.</p>
            </div>
            <div
              onClick={() => setStep('comunidade')}
              className="cursor-pointer p-4 bg-zinc-800 rounded-xl hover:bg-green-700 transition"
            >
              <h3 className="text-xl font-semibold text-green-300">Comunidade</h3>
              <p>Converse com outros jovens como você!</p>
            </div>
            <div
              onClick={() => setStep('conteudos')}
              className="cursor-pointer p-4 bg-zinc-800 rounded-xl hover:bg-green-700 transition"
            >
              <h3 className="text-xl font-semibold text-green-300">Conteúdos personalizados</h3>
              <p>Vídeos, textos e ferramentas para seu desenvolvimento.</p>
            </div>
          </div>
        </section>
      )}

      {step === 'trilhas' && perfil && (
        <section className="w-full max-w-2xl bg-zinc-900 p-8 rounded-xl shadow-xl space-y-4 text-white">
          <h2 className="text-2xl font-bold text-green-400 mb-4">Trilhas para o perfil {perfil}</h2>
          <ul className="space-y-2 list-disc list-inside">
            <li><strong>Hobbies recomendados:</strong> {perfil === 'Empático' ? 'Escrita, voluntariado, jardinagem' : perfil === 'Guardião' ? 'Leitura, xadrez, caminhadas' : perfil === 'Estratégico' ? 'Programação, jogos de estratégia, investimentos' : 'Inovação, startups, design criativo'}</li>
            <li><strong>Como evitar ansiedade:</strong> Técnicas de respiração, journaling, limitar redes sociais</li>
            <li><strong>O que fazer em dias ruins:</strong> Música, conversar com amigos, escrever o que sente</li>
            <li><strong>Como fazer novas amizades:</strong> Participar de clubes, eventos, ser autêntico</li>
            <li><strong>Como evoluir nos estudos:</strong> Técnicas Pomodoro, mapa mental, revisão ativa</li>
          </ul>
          <button
            onClick={() => setStep('home')}
            className="mt-6 bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition"
          >
            Voltar à Home
          </button>
        </section>
      )}

      {step === 'psicologos' && (
        <section className="w-full max-w-lg bg-zinc-900 p-8 rounded-xl shadow-xl text-white space-y-6 text-center">
          <h2 className="text-2xl font-bold text-green-400">Profissional da Psicologia?</h2>
          <p>Estamos recrutando psicólogos para fazer parte da Jovify!</p>
          <p>Envie seu currículo e proposta para: <strong className="text-green-400">equipejovify@gmail.com</strong></p>
          <button
            onClick={() => setStep('home')}
            className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition"
          >
            Voltar à Home
          </button>
        </section>
      )}

      {step === 'mensagens' && (
        <section className="w-full max-w-md bg-zinc-900 p-8 rounded-xl shadow-xl text-white space-y-4">
          <h2 className="text-2xl font-bold text-green-400">Receba mensagens motivacionais</h2>
          <input
            type="text"
            placeholder="Seu número de celular ou email"
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 text-white"
          />
          <textarea
            placeholder="O que você gostaria de ver mais nas mensagens dessa trilha?"
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 text-white"
            rows={4}
          />
          <button className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition">
            Enviar
          </button>
          <button
            onClick={() => setStep('home')}
            className="mt-2 bg-zinc-700 hover:bg-zinc-600 text-white py-2 w-full rounded transition"
          >
            Voltar à Home
          </button>
        </section>
      )}

      {step === 'comunidade' && perfil && (
        <section className="w-full max-w-3xl bg-zinc-900 p-8 rounded-xl shadow-xl text-white space-y-6">
          <h2 className="text-2xl font-bold text-green-400 text-center">Comunidade Jovify - {perfil}</h2>
          <p className="text-center">Converse com outros jovens do seu perfil!</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-zinc-800 p-4 rounded-xl">
              <h3 className="font-semibold text-green-400">Chat Geral</h3>
              <p>Você está conectado com todos do perfil {perfil}.</p>
            </div>
            <div className="bg-zinc-800 p-4 rounded-xl">
              <h3 className="font-semibold text-green-400">Chat Privado</h3>
              <p>Solicite amizade para iniciar conversas individuais.</p>
            </div>
          </div>
          <button
            onClick={() => setStep('home')}
            className="bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition"
          >
            Voltar à Home
          </button>
        </section>
      )}

      {step === 'conteudos' && perfil && (
        <section className="w-full max-w-2xl bg-zinc-900 p-8 rounded-xl shadow-xl text-white space-y-4">
          <h2 className="text-2xl font-bold text-green-400">Conteúdos personalizados para {perfil}</h2>
          <ul className="list-disc list-inside space-y-2">
            <li>Dicas sobre autossabotagem e como combatê-la</li>
            <li>Como reciclar falsas crenças que limitam seu crescimento</li>
            <li>Lidando com a necessidade de perfeição</li>
            <li>Ferramentas de autoconhecimento para seu perfil</li>
            <li>Vídeos e artigos escolhidos com base no seu estilo Jovify</li>
          </ul>
          <button
            onClick={() => setStep('home')}
            className="mt-6 bg-green-600 hover:bg-green-700 text-black font-bold py-2 w-full rounded transition"
          >
            Voltar à Home
          </button>
        </section>
      )}
    </main>
  );
}
