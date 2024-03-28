import { useState, useEffect } from 'react'
import { questions } from './questions'
import './App.css'

const App = () => {
  const [showInstructions, setShowInstructions] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [userAnswers, setUserAnswers] = useState([''])
  const [startTime, setStartTime] = useState<number | null>(null)
  const [elapsedTime, setElapsedTime] = useState(0)
  const [quizFinished, setQuizFinished] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const handleStartQuiz = () => {
    setShowInstructions(false)
    setStartTime(new Date().getTime()) // Record the start time
  }

  const handleNextQuestion = () => {
    const answer = (document.getElementById('answer')! as HTMLInputElement).value
    setUserAnswers([...userAnswers, answer])
    setCurrentQuestion(currentQuestion + 1)
  }

  const handleFinishQuiz = () => {
    const answer = (document.getElementById('answer')! as HTMLInputElement).value
    setUserAnswers([...userAnswers, answer])
    setQuizFinished(true)
    console.log("User's answers:", userAnswers)
  }

  // const handleRestartQuiz = () => {
  //   setCurrentQuestion(0)
  //   setUserAnswers([])
  //   setShowInstructions(true)
  //   setStartTime(null) // Reset the start time
  //   setElapsedTime(0) // Reset the elapsed time
  //   setQuizFinished(false)
  // }

  useEffect(() => {
    let intervalId: number | undefined
  
    if (startTime !== null && !quizFinished) {
      intervalId = setInterval(() => {
        const currentTime = new Date().getTime()
        const elapsedTimeInSeconds = Math.floor((currentTime - startTime) / 1000)
        setElapsedTime(elapsedTimeInSeconds)
      }, 1000)
    }
  
    // Stop the timer if the quiz is finished
    if (quizFinished) {
      clearInterval(intervalId)
    }
  
    return () => clearInterval(intervalId)
  }, [quizFinished, startTime])
  

  const calculateTimeTaken = () => {
    const minutes = Math.floor(elapsedTime / 60)
    const seconds = elapsedTime % 60
    return `${minutes}m ${seconds}s`
  }

  return (
    <div style={{ width: '60vw' }}>
      {showInstructions ? (
        <div>
          <h1>CS 5754 Virtual Environments Research Quiz</h1>
          <p>
            Instructions: You have unlimited time to take the quiz. However, along with your score, the 
            time it takes for you to complete it will be recorded. Please read each question carefully 
            and enter your answer in the input field provided. You are allowed to use Google. Click 
            "Next Question" to proceed to the next question. You cannot go back. Click "Finish" once 
            you are done to stop the timer. Once you are ready, click "Start Quiz" to begin.
          </p>
          <br />
          <button onClick={handleStartQuiz}>Start Quiz</button>
        </div>
      ) : (
        <div>
          <h2>
            <b>Question {currentQuestion + 1}/{questions.length}</b>
            : {questions[currentQuestion].question}
          </h2>
          <p>Please enter your answer below:</p>
          <input
            style={{ width: '50%', minWidth: '180px' }}
            type="text"
            id="answer"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <br /><br />
          {currentQuestion === questions.length - 1 ? (
            <button disabled={!inputValue} onClick={handleFinishQuiz}>Finish</button>
          ) : (
            <button disabled={!inputValue} onClick={handleNextQuestion}>Next Question</button>
          )}
          <div style={{ width: '100%', backgroundColor: '#ccc', height: '20px', marginTop: '20px' }}>
            <div style={{ width: `${(currentQuestion + 1) / questions.length * 100}%`, backgroundColor: 'green', height: '100%' }}></div>
          </div>
          <p style={{ textAlign: 'right' }}>Time taken: {calculateTimeTaken()}</p>
        </div>
      )}
    </div>
  )
}

export default App