import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// Custom Alert components
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
    {
        question: "How many primary subspecies of elk are there in North America?",
        choices: [
            "Two",
            "Three",
            "Four",
            "Five"
        ],
        correctAnswer: 1,
        explanation: "In North America, there are three primary subspecies of elk: the American elk (Cervus canadensis spp.), Roosevelt's elk (Cervus canadensis roosevelti), and tule elk (Cervus canadensis nannodes)."
    },
    {
        question: "Which subspecies of elk is the largest-bodied?",
        choices: [
            "American elk",
            "Roosevelt's elk",
            "Tule elk",
            "Manitoba elk"
        ],
        correctAnswer: 1,
        explanation: "Roosevelt's elk (Cervus canadensis roosevelti) of the coastal areas of the northwest are the largest-bodied elk subspecies."
    },
    // ... (include all other questions here)
];

const QuizApp = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showExplanation, setShowExplanation] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [quizComplete, setQuizComplete] = useState(false);
    const [isCorrect, setIsCorrect] = useState(null);

    const handleAnswer = (choiceIndex) => {
        setSelectedAnswer(choiceIndex);
        setShowExplanation(true);
        const correct = choiceIndex === questions[currentQuestion].correctAnswer;
        setIsCorrect(correct);
        if (correct) {
            setScore((prevScore) => prevScore + 1);
        }
    };

    const nextQuestion = () => {
        setShowExplanation(false);
        setSelectedAnswer(null);
        setIsCorrect(null);
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prevQuestion) => prevQuestion + 1);
        } else {
            setQuizComplete(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setScore(0);
        setShowExplanation(false);
        setSelectedAnswer(null);
        setQuizComplete(false);
        setIsCorrect(null);
    };

    if (quizComplete) {
        return (
            <div className="max-w-2xl mx-auto p-4 relative">
                <img 
                    src="https://aws.boone-crockett.org/s3fs-public/styles/12-col_848px/public/thumbnails/image/150_bw_logo_0.png" 
                    alt="Boone and Crockett Club Logo" 
                    className="absolute top-0 right-0 w-[75px] h-[75px]"
                />
                <h1 className="text-2xl font-bold mb-6">Quiz Complete!</h1>
                <p className="text-xl mb-6">Your final score: {score} out of {questions.length}</p>
                <a 
                    href="https://www.boone-crockett.org/american-elk-retrospective" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-1/2 mx-auto mb-6 hover:opacity-80 transition-opacity"
                >
                    <img 
                        src="https://aws.boone-crockett.org/s3fs-public/styles/featured_product/public/thumbnails/image/bpaer_0.jpg?itok=OXajVOEH" 
                        alt="An American Elk Retrospective" 
                        className="w-full"
                    />
                </a>
                <p className="mb-6 text-center">
                    As a thank you for taking our elk quiz...<br />
                    Use this discount code to get <b>$10 off</b> on our best-selling book<br /> <b>An American Elk Retrospective</b>.
                </p>
                <div className="bg-yellow-100 p-6 mb-6 text-center rounded-lg shadow-md">
                    <p className="font-bold text-xl text-yellow-800">Coupon Code: ELKQUIZ</p>
                </div>
                <div className="flex justify-center space-x-4">
                    <button
                        onClick={resetQuiz}
                        className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        Restart Quiz
                    </button>
                    <a 
                        href="https://www.boone-crockett.org/american-elk-retrospective" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-colors"
                    >
                        BUY NOW!
                    </a>
                </div>
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
            <h1 className="text-2xl font-bold mb-4">American Elk Knowledge Quiz</h1>
            <p className="mb-4">Question {currentQuestion + 1} of {questions.length}</p>
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
        </div>
    );
};

ReactDOM.render(<QuizApp />, document.getElementById('root'));
