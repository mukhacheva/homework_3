import React, { useState } from 'react';
import '../styles/music_poll.css';

const MusicPoll = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [userName, setUserName] = useState('');

  const questions = [
    {
      type: 'text',
      question: "What is your name?"
    },
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
        { answer: "No", points: 0 },
        { answer: "No, but I like when other people create them for me", points: 10 }
      ]
    },
    {
      type: 'single',
      question: "Do you prefer listening to music alone or with others?",
      options: [
        { answer: "Alone", points: 12 },
        { answer: "With others", points: 6 }
      ]
    },
    {
      type: 'single',
      question: "Do you listen to music while working or studying?",
      options: [
        { answer: "Yes", points: 7 },
        { answer: "No", points: 0 }
      ]
    },
    {
      type: 'single',
      question: "Do you like discovering new artists?",
      options: [
        { answer: "Yes", points: 3 },
        { answer: "No, I know what I like", points: 4 },
        { answer: "No", points: 0 }
      ]
    },
    {
      type: 'single',
      question: "Do you like attending live music events?",
      options: [
        { answer: "Yes", points: 2 },
        { answer: "No", points: 0 }
      ]
    },
    {
      type: 'single',
      question: "Do you prefer digital or physical music formats?",
      options: [
        { answer: "Digital", points: 5 },
        { answer: "Physical", points: 25 }
      ]
    },
    {
      type: 'single',
      question: "How often do you listen to music?",
      options: [
        { answer: "Every day", points: 8 },
        { answer: "Several times a week", points: 4 },
        { answer: "Once a week", points: 3 },
        { answer: "Rarely", points: 0 }
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

  const handleAnswer = (value, points = 0) => {
    if (currentQ === 0) {
      setUserName(value);
    }
    setAnswers(prev => ({ ...prev, [currentQ]: { value, points } }));
  };

  // const handleMultiChange = (option) => {
  //   const selected = answers[currentQ] || [];
  //   const updated = selected.includes(option)
  //     ? selected.filter(o => o !== option)
  //     : [...selected, option];
  //   handleAnswer(updated);
  // };

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
    return Math.min(totalScore, 88);
  };

  const getType = () => {
    const score = calculateScore();
    if (score < 18) {
      return "Not a music lover";
    } else if (score < 35) {
      return "Moderate music lover";
    } else if (score < 55) {
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
          <p>Thank you for your attention{userName ? `, ${userName}` : ''}</p>
          <button onClick={() => {
            setShowResults(false);
            setAnswers({});
            setCurrentQ(0);
            setUserName('');
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

              {/* {questions[currentQ].type === 'multi' &&
                questions[currentQ].options.map((opt, i) => (
                  <label key={i}>
                    <input
                      type="checkbox"
                      checked={(answers[currentQ] || []).includes(opt)}
                      onChange={() => handleMultiChange(opt)}
                    />
                    {opt}
                  </label>
                ))} */}

              {questions[currentQ].type === 'text' && (
                <textarea
                  rows="4"
                  cols="40"
                  value={answers[currentQ]?.value || ''}
                  onChange={(e) => handleAnswer(e.target.value, 0)}
                  placeholder="Enter your answerrrr..."
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
