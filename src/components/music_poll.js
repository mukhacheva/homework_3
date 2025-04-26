import React, { useState } from 'react';

import '../styles/music_poll.css';

const MusicPoll = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const questions = [
    {
      type: 'single',
      question: "How old are you?",
      options: [
        { answer: "Under 18", points: 3 },
        { answer: "19-21", points: 8 },
        { answer: "22-27", points: 9 },
        { answer: "28-36", points: 10 },
        { answer: "Over 36", points: 15 },
      ]
    },
    {
      type: 'single',
      question: "Do you enjoy creating playlists based on your mood?",
      options: [
        { answer: "Yes", points: 10 },
        { answer: "No", points: 5 },
        { answer: "No, but I like when other people create them for me", points: 10 }
      ]
    },
    {
      type: 'single',
      question: "How often do you attend concerts of your favorite artists?",
      options: [
        { answer: "Never", points: 5 },
        { answer: "Depends", points: 7 },
        { answer: "1-2", points: 8 },
        { answer: "3-4", points: 9 },
        { answer: "4-5", points: 10 },
        { answer: "More than 5", points: 15 },
      ]
    },
    {
      type: 'single',
      question: "What is your favorite music genre?",
      options: [
        { answer: "Pop", points: 10 },
        { answer: "Rock", points: 10 },
        { answer: "Hip Hop", points: 10 },
        { answer: "Jazz", points: 10 },
        { answer: "Classical", points: 10 },
        { answer: "Electronic", points: 10 },
        { answer: "I love everything form Pop to Electronic", points: 25}
      ]
    },
    {
      type: 'single',
      question: "Do you prefer listening to music alone or with others?",
      options: [
        { answer: "Alone", points: 12 },
        { answer: "With others", points: 10 }
      ]
    },
    {
      type: 'single',
      question: "Do you listen to music while working or studying?",
      options: [
        { answer: "Yes", points: 7 },
        { answer: "No", points: 5 }
      ]
    },
    {
      type: 'single',
      question: "Do you like discovering new artists?",
      options: [
        { answer: "Yes", points: 3 },
        { answer: "No, I know what I like", points: 4 },
        { answer: "No", points: 2 }
      ]
    },
    {
      type: 'single',
      question: "Do you like attending live music events?",
      options: [
        { answer: "Yes", points: 2 },
        { answer: "No", points: 1 }
      ]
    },
    {
      type: 'single',
      question: "Do you prefer digital or physical music formats?",
      options: [
        { answer: "Digital", points: 0 },
        { answer: "Physical", points: 0 }
      ]
    },
    {
      type: 'single',
      question: "How often do you listen to music?",
      options: [
        { answer: "Every day", points: 5 },
        { answer: "Several times a week", points: 4 },
        { answer: "Once a week", points: 3 },
        { answer: "Rarely", points: 2 }
      ]
    },
    {
      type: 'single',
      question: "Do you follow music charts?",
      options: [
        { answer: "Yes", points: 5 },
        { answer: "No", points: 0 }
      ]
    },
    {
      type: 'text',
      question: "Do you have any favorite artists or bands? Please mention them."
    }
  ];

  const handleAnswer = (value, points) => {
    setAnswers(prev => ({ ...prev, [currentQ]: { value, points } }));
  };

  const handleMultiChange = (option) => {
    const selected = answers[currentQ] || [];
    const updated = selected.includes(option)
      ? selected.filter(o => o !== option)
      : [...selected, option];
    handleAnswer(updated);
  };

  const handleSubmit = () => setShowResults(true);

  const isAnswered = () => {
    const ans = answers[currentQ];
    return questions[currentQ].type === 'text'
      ? !!ans?.value?.trim()
      : Array.isArray(ans)
        ? ans.length > 0
        : !!ans;
  };

  const calculateScore = () => {
    let totalScore = 0;
    questions.forEach((question, index) => {
      const answer = answers[index];
      if (answer && question.type === 'single') {
        totalScore += answer.points;
      }
    });
    return Math.min(totalScore, 100);
  };

  const getType = () => {
    const score = calculateScore();
    if (score < 30) {
      return "Not a music lover";
    } else if (score < 50) {
      return "Moderate music lover";
    } else if (score < 70) {
      return "Passionate music lover";
    } else {
      return "Hardcore music lover";
    }
  };

  return (
    <div className="music-poll">
      <h3>What's your music lover type?</h3>

      {showResults ? (
        <div className="poll-results">
          <h4>Your music lover type: <em>{getType()}</em></h4>
          <h5>Your score: {calculateScore()}</h5>
          <button onClick={() => {
            setShowResults(false);
            setAnswers({});
            setCurrentQ(0);
          }}>
            Try again
          </button>
        </div>
      ) : (
        <>
          <div className="poll-question">
            <p>{questions[currentQ].question}</p>
            <div className="poll-options">
              {questions[currentQ].type === 'single' &&
                questions[currentQ].options.map((opt, i) => (
                  <button
                    key={i}
                    className={answers[currentQ]?.value === opt.answer ? 'selected' : ''}
                    onClick={() => handleAnswer(opt.answer, opt.points)}
                  >
                    {opt.answer}
                  </button>
                ))}

              {questions[currentQ].type === 'multi' &&
                questions[currentQ].options.map((opt, i) => (
                  <label key={i}>
                    <input
                      type="checkbox"
                      checked={(answers[currentQ] || []).includes(opt)}
                      onChange={() => handleMultiChange(opt)}
                    />
                    {opt}
                  </label>
                ))}

              {questions[currentQ].type === 'text' && (
                <textarea
                  rows="4"
                  cols="40"
                  value={answers[currentQ]?.value || ''}
                  onChange={(e) => handleAnswer(e.target.value, 0)}
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
