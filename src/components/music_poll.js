import React, { useState } from 'react';
import '../styles/music_poll.css';
import axios from 'axios';

const genres = ['Rock', 'Pop', 'Jazz', 'Hip-hop', 'Classical'];

const MusicPoll = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [userName, setUserName] = useState('');
  const [recommendedArtists, setRecommendedArtists] = useState([]);
  const [loadingArtists, setLoadingArtists] = useState(false);
  const [errorLoadingArtists, setErrorLoadingArtists] = useState(null);

  const questions = [
    {
      type: 'text',
      question: "What is your name?"
    },
    {
      type: 'single',
      question: "Which instrument do you prefer to listen to?",
      options: [
        { answer: "Electric guitar", points: { Rock: 3, Pop: 1, Jazz: 2, "Hip-hop": 0, Classical: 0 } },
        { answer: "Synthesizer/Keyboard", points: { Pop: 3, "Hip-hop": 2, Jazz: 1, Rock: 0, Classical: 0 } },
        { answer: "Violin or piano", points: { Classical: 3, Jazz: 2, Pop: 0, Rock: 0, "Hip-hop": 0 } },
      ]
    },
    {
      type: 'single',
      question: "What kind of rhythm do you enjoy most?",
      options: [
        { answer: "Strong, fast beats", points: { Rock: 3, "Hip-hop": 3, Pop: 1, Jazz: 0, Classical: 0 } },
        { answer: "Smooth and flowing", points: { Jazz: 3, Classical: 2, Pop: 1, Rock: 0, "Hip-hop": 0 } },
        { answer: "Catchy and repetitive", points: { Pop: 3, "Hip-hop": 2, Rock: 1, Jazz: 0, Classical: 0 } },
      ]
    },
    {
      type: 'single',
      question: "Which setting do you prefer to listen to music in?",
      options: [
        { answer: "Loud concert or festival", points: { Rock: 3, "Hip-hop": 2, Pop: 1, Jazz: 0, Classical: 0 } },
        { answer: "Chill lounge or cafe", points: { Jazz: 3, Classical: 2, Pop: 1, "Hip-hop": 0, Rock: 0 } },
        { answer: "At home or in the car", points: { Pop: 3, "Hip-hop": 2, Rock: 1, Jazz: 0, Classical: 0 } },
      ]
    },
    {
      type: 'single',
      question: "Which theme do you like most in songs?",
      options: [
        { answer: "Rebellion and freedom", points: { Rock: 3, "Hip-hop": 2, Pop: 1, Jazz: 0, Classical: 0 } },
        { answer: "Love and relationships", points: { Pop: 3, Jazz: 1, Classical: 1, Rock: 0, "Hip-hop": 0 } },
        { answer: "Complex emotions or stories", points: { Classical: 3, Jazz: 2, Rock: 1, Pop: 0, "Hip-hop": 0 } },
      ]
    },
    {
      type: 'single',
      question: "Which artist would you rather listen to?",
      options: [
        { answer: "The Beatles or Led Zeppelin", points: { Rock: 3, Pop: 1, Jazz: 0, "Hip-hop": 0, Classical: 0 } },
        { answer: "Beyoncé or Michael Jackson", points: { Pop: 3, "Hip-hop": 2, Rock: 0, Jazz: 0, Classical: 0 } },
        { answer: "Miles Davis or Yo-Yo Ma", points: { Jazz: 3, Classical: 3, Pop: 0, Rock: 0, "Hip-hop": 0 } },
      ]
    }
  ];

  const handleAnswer = (value, points = {}) => {
    if (currentQ === 0) {
      setUserName(value);
    }
    setAnswers(prev => ({ ...prev, [currentQ]: { value, points } }));
  };

  const isAnswered = () => {
    const ans = answers[currentQ];
    if (!ans) return false;
    return questions[currentQ].type === 'text'
      ? !!ans.value?.trim()
      : Array.isArray(ans)
        ? ans.length > 0
        : true;
  };

  const calculateScores = () => {
    const totalScores = genres.reduce((acc, genre) => ({ ...acc, [genre]: 0 }), {});
    questions.forEach((question, index) => {
      const answer = answers[index];
      if (answer && question.type === 'single') {
        genres.forEach(g => {
          totalScores[g] += answer.points[g] || 0;
        });
      }
    });
    return totalScores;
  };

  const getFavoriteGenre = () => {
    const scores = calculateScores();
    const maxPoints = Math.max(...Object.values(scores));
    const topGenres = Object.entries(scores)
      .filter(([_, v]) => v === maxPoints)
      .map(([k]) => k);
    return topGenres[0] || 'No genre';
  };

  const fetchArtistsByGenre = async (genre) => {
    setLoadingArtists(true);
    setErrorLoadingArtists(null);
    try {
      const response = await axios.get('http://127.0.0.1:8000/artists/');
      const artists = response.data;
      const filtered = artists.filter(artist =>
        artist.genres && artist.genres.some(g => g.toLowerCase() === genre.toLowerCase())
      );
      setRecommendedArtists(filtered);
    } catch (error) {
      setErrorLoadingArtists('Ошибка при загрузке артистов');
      setRecommendedArtists([]);
    } finally {
      setLoadingArtists(false);
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
    const favGenre = getFavoriteGenre();
    if (favGenre !== 'No genre') {
      fetchArtistsByGenre(favGenre);
    } else {
      setRecommendedArtists([]);
    }
  };

  const handleTryAgain = () => {
    setShowResults(false);
    setAnswers({});
    setCurrentQ(0);
    setUserName('');
    setRecommendedArtists([]);
    setErrorLoadingArtists(null);
  };

  const currentQuestion = questions[currentQ];
  if (!currentQuestion && !showResults) {
    return <div>Ошибка: вопрос не найден</div>;
  }

  return (
    <div className="music-poll">
      <h3>What's your favourite genre?</h3>

      {showResults ? (
        <div className="poll-results">
          <h4>Hi{userName ? `, ${userName}` : ''}!</h4>
          <h4>Your favorite music genre: <em>{getFavoriteGenre()}</em></h4>

          {loadingArtists && <p>Loading recommended artists...</p>}
          {errorLoadingArtists && <p style={{ color: 'red' }}>{errorLoadingArtists}</p>}

          {!loadingArtists && recommendedArtists.length > 0 && (
            <>
              <h5>Recommended artists in {getFavoriteGenre()}:</h5>
              <div className="recommended-artists">
                <ul>
                  {recommendedArtists.map(artist => (
                    <li key={artist.id}>{artist.artist_name}</li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {!loadingArtists && recommendedArtists.length === 0 && (
            <p>No recommended artists found for this genre.</p>
          )}

          <button onClick={handleTryAgain}>
            Try again
          </button>
        </div>
      ) : (
        <>
          <div className="poll-question">
            <p>{currentQuestion.question}</p>
            <div className="poll-options">
              {currentQuestion.type === 'single' &&
                currentQuestion.options.map((opt, i) => (
                  <button
                    key={i}
                    className={answers[currentQ]?.value === opt.answer ? 'selected' : ''}
                    onClick={() => handleAnswer(opt.answer, opt.points)}
                  >
                    {opt.answer}
                  </button>
                ))
              }
              {currentQuestion.type === 'text' && (
                <textarea
                  rows="2"
                  cols="40"
                  value={answers[currentQ]?.value || ''}
                  onChange={(e) => handleAnswer(e.target.value, {})}
                  placeholder="Enter your answer..."
                />
              )}
            </div>
          </div>

          <div className="poll-nav">
            {currentQ > 0 && (
              <button onClick={() => setCurrentQ(currentQ - 1)}>← Back</button>
            )}
            {currentQ < questions.length - 1 ? (
              <button onClick={() => setCurrentQ(currentQ + 1)} disabled={!isAnswered()}>
                Next →
              </button>
            ) : (
              <button className="submit-btn" onClick={handleSubmit} disabled={!isAnswered()}>
                Submit
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default MusicPoll;
