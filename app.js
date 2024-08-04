import React, { useState, useEffect } from 'react';

const Alert = ({ children, className }) => (
    <div className={`bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 ${className}`} role="alert">
        {children}
    </div>
);

const AlertTitle = ({ children }) => (
    <h3 className="font-bold">{children}</h3>
);

const AlertDescription = ({ children }) => (
    <p>{children}</p>
);

const questions = [
    // ... (questions array remains unchanged)
];

const QuizApp = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showExplanation, setShowExplanation] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [quizComplete, setQuizComplete] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);
    const [pageViews, setPageViews] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [quizAttempts, setQuizAttempts] = useState(0);

    useEffect(() => {
        setPageViews(prevViews => prevViews + 1);
    }, []);

    const handleAnswer = (choiceIndex) => {
        setSelectedAnswer(choiceIndex);
        setShowExplanation(true);
        const correct = choiceIndex === questions[currentQuestion].correctAnswer;
        setIsCorrect(correct);
        if (correct) {
            setScore(prevScore => prevScore + 1);
        }
    };

    const nextQuestion = () => {
        setShowExplanation(false);
        setSelectedAnswer(null);
        setIsCorrect(null);
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prevQuestion => prevQuestion + 1);
        } else {
            setQuizComplete(true);
            setTotalScore(prevTotal => prevTotal + score);
            setQuizAttempts(prevAttempts => prevAttempts + 1);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowExplanation(false);
        setSelectedAnswer(null);
        setQuizComplete(false);
        setIsCorrect(null);
    };

    const averageScore = quizAttempts > 0 ? (totalScore / quizAttempts).toFixed(2) : 0;

    const PageCounter = () => (
        <div className="sr-only" aria-hidden="true">
            {pageViews}
        </div>
    );

    if (quizComplete) {
        return (
            <div className="max-w-2xl mx-auto p-4 relative">
                <img 
                    src="https://aws.boone-crockett.org/s3fs-public/styles/12-col_848px/public/thumbnails/image/150_bw_logo_0.png" 
                    alt="Boone and Crockett Club Logo" 
                    className="absolute top-0 right-0 w-[75px] h-[75px]"
                />
                <div className="absolute top-0 left-0 p-2 bg-gray-100 rounded">
                    <p className="text-sm">Avg. Score: {averageScore}</p>
                </div>
                <h1 className="text-2xl font-bold mb-4">Quiz Complete!</h1>
                <p className="text-xl mb-4">Your final score: {score} out of {questions.length}</p>
                <p className="text-lg mb-4">Total quiz attempts: {quizAttempts}</p>
                <button
                    onClick={restartQuiz}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Take Quiz Again
                </button>
                <PageCounter />
            </div>
        );
    }

    const currentQ = questions[currentQuestion];

    return (
        <div className="max-w-2xl mx-auto p-4 relative">
            <img 
                src="https://aws.boone-crockett.org/s3fs-public/styles/12-col_848px/public/thumbnails/image/150_bw_logo_0.png" 
                alt="Boone and Crockett Club Logo" 
                className="absolute top-0 right-0 w-[75px] h-[75px]"
            />
            <div className="absolute top-0 left-0 p-2 bg-gray-100 rounded">
                <p className="text-sm">Avg. Score: {averageScore}</p>
            </div>
            <h1 className="text-2xl font-bold mb-4 mt-8">American Elk Knowledge Quiz</h1>
            <p className="mb-2">Question {currentQuestion + 1} of {questions.length}</p>
            <p className="text-lg font-semibold mb-4">{currentQ.question}</p>
            <div className="space-y-2">
                {currentQ.choices.map((choice, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        disabled={showExplanation}
                        className={`w-full text-left p-2 rounded ${
                            selectedAnswer === index
                                ? index === currentQ.correctAnswer
                                    ? 'bg-green-200'
                                    : 'bg-red-200'
                                : 'bg-gray-100 hover:bg-gray-200'
                        } ${showExplanation ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                        {choice}
                    </button>
                ))}
            </div>
            {isCorrect !== null && (
                <p className={`mt-4 text-lg font-bold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                </p>
            )}
            {showExplanation && (
                <Alert className="mt-4">
                    <AlertTitle>Explanation</AlertTitle>
                    <AlertDescription>
                        {currentQ.explanation}
                    </AlertDescription>
                </Alert>
            )}
            {showExplanation && (
                <button
                    onClick={nextQuestion}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </button>
            )}
            <p className="mt-4">Current Score: {score} / {currentQuestion + 1}</p>
            <PageCounter />
        </div>
    );
};

export default QuizApp;
