const { useState } = React;

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
        explanation: "In North America, there are three primary subspecies of elk: the American elk (Cervus canadensis spp.), Roosevelt's elk (Cervus canadensis roosevelti), and tule elk (Cervus canadensis nannodes). (How to Score North American Big Game, p. 67)"
    },
    {
        question: "Which subspecies of elk grows the largest antlers?",
        choices: [
            "Roosevelt's elk",
            "Tule elk",
            "American elk",
            "Red deer"
        ],
        correctAnswer: 2,
        explanation: "The American elk (Cervus canadensis spp.) grows the largest antlers among the subspecies of elk in North America. (How to Score North American Big Game, p. 67)"
    },
    {
        question: "How many normal points do mature typical American elk bulls usually have on each antler?",
        choices: [
            "Four",
            "Five",
            "Six",
            "Seven"
        ],
        correctAnswer: 2,
        explanation: "Racks of mature typical American elk bulls normally have six normal points on each antler (including main beam tip that is counted as a normal point, but not individually measured). (How to Score North American Big Game, p. 67)"
    },
    {
        question: "What is the most common location for an abnormal point on American elk?",
        choices: [
            "Above the G-1 point",
            "Above the G-2 point",
            "Above the G-3 point",
            "Above the G-4 point"
        ],
        correctAnswer: 3,
        explanation: "The most common location for an abnormal point on American elk is immediately above the G-4 point. (How to Score North American Big Game, p. 67)"
    },
    {
        question: "How many circumference measurements are always taken on American elk?",
        choices: [
            "Three",
            "Four",
            "Five",
            "Six"
        ],
        correctAnswer: 1,
        explanation: "Four circumferences are always taken on American elk, regardless of the number of normal points. (How to Score North American Big Game, p. 76)"
    },
    {
        question: "Where is the H-1 circumference measurement taken on American elk?",
        choices: [
            "Between the burr and G-1",
            "Between G-1 and G-2",
            "Between G-2 and G-3",
            "Between G-3 and G-4"
        ],
        correctAnswer: 1,
        explanation: "Unlike deer categories, the H-1 circumference on American elk is taken at the smallest place between the G-1 and G-2 points. (How to Score North American Big Game, p. 76)"
    },
    {
        question: "How is the greatest spread measurement best taken for American elk?",
        choices: [
            "With a flexible tape measure",
            "By eye estimation",
            "Using a wall, carpenter's level, and ruler",
            "It's not measured, only calculated"
        ],
        correctAnswer: 2,
        explanation: "The greatest-spread measurement is best taken by laying the rack on the floor against a vertical wall, using a carpenter's level, and measuring with a folding carpenter's ruler or quarter-inch steel tape. (How to Score North American Big Game, p. 69-70)"
    },
    {
        question: "What is the minimum score for a typical American elk to qualify for Boone and Crockett Awards?",
        choices: [
            "340",
            "350",
            "360",
            "370"
        ],
        correctAnswer: 2,
        explanation: "The minimum score for a typical American elk to qualify for Boone and Crockett Awards is 360. (How to Score North American Big Game, p. 77)"
    },
    {
        question: "How are unmatched points at the end of the main beam treated on American elk?",
        choices: [
            "Always as abnormal points",
            "Always as normal points",
            "As normal points only if they are the longest point",
            "They are not counted at all"
        ],
        correctAnswer: 1,
        explanation: "Numerous unmatched normal points can occur at the end of a beam on American elk and are treated as normal points. (How to Score North American Big Game, p. 74-75)"
    },
    {
        question: "How is the inside spread credit determined for American elk?",
        choices: [
            "It's always the actual inside spread measurement",
            "It's the actual inside spread or the length of the longer main beam, whichever is less",
            "It's calculated as 25% of the total score",
            "It's not included in the final score"
        ],
        correctAnswer: 1,
        explanation: "The inside spread credit cannot exceed the length of the longer antler main beam. If the inside spread measurement does exceed the longer main beam, record the longer main beam length as the spread credit. (How to Score North American Big Game, p. 70)"
    },
    {
        question: "Where is the H-4 circumference taken on American elk?",
        choices: [
            "Between G-3 and G-4",
            "Between G-4 and G-5",
            "Between G-5 and G-6",
            "Halfway between G-4 and the beam tip"
        ],
        correctAnswer: 1,
        explanation: "The H-4 circumference on American elk is taken at the smallest place between the G-4 and G-5 points. (How to Score North American Big Game, p. 76)"
    },
    {
        question: "How are circumference measurements taken when an abnormal point arises between normal points on American elk?",
        choices: [
            "At the abnormal point",
            "At the narrowest location on either side of the abnormal point",
            "They are not taken in this case",
            "At the widest point of the abnormal growth"
        ],
        correctAnswer: 1,
        explanation: "When an abnormal point arises between normal points on American elk, the circumference measurements are taken at the narrowest location on either side of the abnormal point. (How to Score North American Big Game, p. 76)"
    },
    {
        question: "What is done if a G-2 point is completely missing on an American elk antler?",
        choices: [
            "The rack is disqualified",
            "The H-1 and H-2 circumferences are taken at the same location",
            "An estimated measurement is used",
            "The G-2 on the opposite antler is treated as an abnormal point"
        ],
        correctAnswer: 1,
        explanation: "If a G-2 point is completely missing (didn't grow) on either or both antlers, then the H-1 and H-2 circumferences are taken at the same location, the narrowest place between the G-1 and G-3 points. (How to Score North American Big Game, p. 76)"
    },
    {
        question: "How is the main beam length measured on American elk?",
        choices: [
            "From the burr to the longest tine",
            "From the center of the burr on the outer side to the beam tip",
            "From the eye socket to the beam tip",
            "As a straight line from burr to tip"
        ],
        correctAnswer: 1,
        explanation: "The main beam length is measured from the point where the center line of the antler along the outer side intersects the burr, out to the beam tip. This line must stay in the middle of the beam on the outer side. (How to Score North American Big Game, p. 72-73)"
    },
    {
        question: "How are G-1 points (brow tines) measured on American elk?",
        choices: [
            "From the top of the beam",
            "From the bottom of the beam",
            "From the center of the base line on the outside edge",
            "As a straight line from base to tip"
        ],
        correctAnswer: 2,
        explanation: "The length of G-1 is measured from the center of the base line on the outside edge of the tine straight out until it naturally transitions to the bottom edge of the tine, then continues over the curve to the tip. (How to Score North American Big Game, p. 75-76)"
    },
    {
        question: "What is the minimum score for a non-typical American elk to qualify for Pope and Young?",
        choices: [
            "280",
            "290",
            "300",
            "310"
        ],
        correctAnswer: 2,
        explanation: "The minimum score for a non-typical American elk to qualify for Pope and Young is 300. (How to Score North American Big Game, p. 77)"
    },
    {
        question: "How many abnormal inches are required for an American elk to be classified as non-typical in Pope and Young?",
        choices: [
            "10 inches",
            "15 inches",
            "20 inches",
            "25 inches"
        ],
        correctAnswer: 2,
        explanation: "An American elk must have 20 abnormal inches to be classified as non-typical in Pope and Young. (How to Score North American Big Game, p. 77)"
    },
    {
        question: "How is the Final Score calculated for a typical American elk?",
        choices: [
            "Sum of all measurements",
            "Sum of measurements minus differences",
            "Sum of measurements plus abnormal points",
            "Average of right and left antler scores"
        ],
        correctAnswer: 1,
        explanation: "For a typical American elk, the Final Score is calculated by subtracting the total differences (Column 3) from the subtotal of measurements and spread credit. (How to Score North American Big Game, p. 77)"
    },
    {
        question: "What's the main difference in scoring between typical and non-typical American elk?",
        choices: [
            "Non-typical elk have more points measured",
            "Typical elk don't include abnormal points in the score",
            "Non-typical elk add abnormal point lengths to the score instead of subtracting differences",
            "There is no difference in scoring"
        ],
        correctAnswer: 2,
        explanation: "The main difference is that for non-typical American elk, the total length of abnormal points is added to the score, while for typical elk, it's subtracted as part of the differences. (How to Score North American Big Game, p. 77)"
    },
    {
        question: "How should a broken normal point be recorded on an American elk score sheet?",
        choices: [
            "Estimate its original length",
            "Ignore it completely",
            "Record it as an abnormal point",
            "Record a zero and note it in the Remarks section"
        ],
        correctAnswer: 3,
        explanation: "If a normal point is broken off, record a zero to indicate its condition and note the action in the Remarks section. This preserves the sequence and avoids any artificial penalty for non-symmetry. (How to Score North American Big Game, p. 74)"
    }
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
            <div className="max-w-2xl mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Quiz Complete!</h1>
                <p className="text-xl mb-4">Your final score: {score} out of {questions.length}</p>
                <button
                    onClick={resetQuiz}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Restart Quiz
                </button>
            </div>
        );
    }

    const currentQ = questions[currentQuestion];

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Quiz 1 - Scoring American Elk</h1>
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
