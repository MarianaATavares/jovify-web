'use client';

import { useState } from 'react';

export default function Home() {
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [respostas, setRespostas] = useState<number[]>([]);
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [tela, setTela] = useState<'quiz' | 'sobre'>('quiz');

  const perguntas = [
    {
      pergunta: 'Você prefere estudar com:',
      opcoes: ['Vídeos', 'Textos', 'Podcasts'],
    },
    {
      pergunta: 'Quanto tempo por dia você tem disponível para estudar?',
      opcoes: ['Menos de 30 minutos', '30 minutos a 1 hora', 'Mais de 1 hora'],
    },
    {
      pergunta: 'Você se considera uma pessoa mais:',
      opcoes: ['Visual', 'Leitora', 'Auditiva'],
    },
  ];

  const trilhas = [
    {
      nome: 'Trilha Visual',
      descricao: 'Você aprende melhor com vídeos e imagens. Recomendamos cursos em vídeo, infográficos e mapas mentais.',
    },
    {
      nome: 'Trilha Leitora',
      descricao: 'Você prefere aprender lendo. Recomendamos e-books, artigos e plataformas com foco em leitura.',
    },
    {
      nome: 'Trilha Auditiva',
      descricao: 'Você aprende melhor ouvindo. Recomendamos podcasts, audiolivros e aulas gravadas em áudio.',
    },
  ];

  const lidarComResposta = (indice: number) => {
    const novasRespostas = [...respostas, indice];
    setRespostas(novasRespostas);

    if (perguntaAtual < perguntas.length - 1) {
      setPerguntaAtual(perguntaAtual + 1);
    } else {
      setMostrarResultado(true);
    }
  };

  const reiniciarQuiz = () => {
    setPerguntaAtual(0);
    setRespostas([]);
    setMostrarResultado(false);
    setTela('quiz');
  };

  const calcularTrilha = () => {
    const contagem = [0, 0, 0];
    respostas.forEach((resposta) => {
      contagem[resposta]++;
    });
    const indiceMaior = contagem.indexOf(Math.max(...contagem));
    return trilhas[indiceMaior];
  };

  const trilha = calcularTrilha();

  return (
    <main style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <button
        onClick={() => setTela(tela === 'sobre' ? 'quiz' : 'sobre')}
        style={{
          position: 'fixed',
          top: '1rem',
          right: '1rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          zIndex: 1000,
        }}
      >
        {tela === 'sobre' ? 'Voltar' : 'Sobre a Jovify'}
      </button>

      {tela === 'sobre' ? (
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Sobre a Jovify</h1>
          <p style={{ marginBottom: '2rem' }}>
            O App foi criado em maio de 2024 por um aluno apaixonado por educação e tecnologia.
            Ele queria ajudar outras pessoas a descobrirem a melhor forma de estudar, de acordo com seu estilo.
          </p>
        </div>
      ) : (
        <>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Descubra sua trilha de estudos</h1>

          {mostrarResultado ? (
            <div>
              <h2>{trilha.nome}</h2>
              <p>{trilha.descricao}</p>
              <button
                onClick={reiniciarQuiz}
                style={{
                  marginTop: '1rem',
                  padding: '0.5rem 1rem',
                  backgroundColor: '#0070f3',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                Refazer Diagnóstico
              </button>
            </div>
          ) : (
            <div>
              <p style={{ marginBottom: '1rem' }}>{perguntas[perguntaAtual].pergunta}</p>
              {perguntas[perguntaAtual].opcoes.map((opcao, index) => (
                <button
                  key={index}
                  onClick={() => lidarComResposta(index)}
                  style={{
                    display: 'block',
                    marginBottom: '0.5rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: '#eaeaea',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  {opcao}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}
