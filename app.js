import React, { useState } from 'react';

const Alert = ({ children }) => (
    <div className="alert" role="alert">
        {children}
    </div>
);

const AlertTitle = ({ children }) => (
    <h3 className="alert-title">{children}</h3>
);

const AlertDescription = ({ children }) => (
    <p className="alert-description">{children}</p>
);

const questions = [
    {
        question: "How many primary subspecies of elk are there in North America?",
        choices: ["Two", "Three", "Four", "Five"],
        correctAnswer: 1,
        explanation: "In North America, there are three primary subspecies of elk: the American elk (Cervus canadensis spp.), Roosevelt's elk (Cervus canadensis roosevelti), and tule elk (Cervus canadensis nannodes)."
    },
    {
        question: "Which subspecies of elk is the largest-bodied?",
        choices: ["American elk", "Roosevelt's elk", "Tule elk", "Manitoba elk"],
        correctAnswer: 1,
        explanation: "Roosevelt's elk (Cervus canadensis roosevelti) of the coastal areas of the northwest are the largest-bodied elk subspecies."
    },
    {
        question: "What is the scientific name for the American elk?",
        choices: ["Cervus elaphus", "Cervus canadensis", "Alces alces", "Rangifer tarandus"],
        correctAnswer: 1,
        explanation: "The scientific name for the American elk is Cervus canadensis."
    },
    {
        question: "What is the primary diet of American elk?",
        choices: ["Grasses and forbs", "Tree bark and leaves", "Small mammals", "Fish"],
        correctAnswer: 0,
        explanation: "The primary diet of American elk consists of grasses and forbs, although they also eat tree bark, leaves, and other vegetation depending on the season."
    },
    {
        question: "During which season do male elk (bulls) begin to grow their antlers?",
        choices: ["Spring", "Summer", "Fall", "Winter"],
        correctAnswer: 0,
        explanation: "Male elk grow their antlers during the spring and summer months."
    },
    {
        question: "What is the term for the vocalization male elk make during the mating season?",
        choices: ["Roar", "Bugle", "Bellow", "Grunt"],
        correctAnswer: 1,
        explanation: "The vocalization male elk make during the mating season is called a bugle."
    },
    {
        question: "What is the average gestation period for an American elk cow?",
        choices: ["5-6 months", "7-8 months", "9-10 months", "11-12 months"],
        correctAnswer: 1,
        explanation: "The average gestation period for an American elk cow is about 7-8 months."
    },
    {
        question: "Which of the following is a major predator of American elk?",
        choices: ["Bald eagle", "Black bear", "Mountain lion", "Coyote"],
        correctAnswer: 2,
        explanation: "Mountain lions are major predators of American elk, especially calves and weaker adults."
    },
    {
        question: "In which habitat type are American elk typically NOT found?",
        choices: ["Alpine meadows", "Coniferous forests", "Grasslands", "Desert scrublands"],
        correctAnswer: 3,
        explanation: "American elk are typically not found in desert scrublands. They prefer habitats such as alpine meadows, coniferous forests, and grasslands."
    },
    {
        question: "What is the average weight of an adult male American elk?",
        choices: ["300-500 pounds", "500-700 pounds", "700-900 pounds", "900-1100 pounds"],
        correctAnswer: 1,
        explanation: "The average weight of an adult male American elk (bull) is typically between 500-700 pounds."
    },
    {
        question: "What term is used for a group of elk?",
        choices: ["Herd", "Pack", "Flock", "Pod"],
        correctAnswer: 0,
        explanation: "A group of elk is called a herd."
    },
    {
        question: "What is the primary reason elk migrate seasonally in some regions?",
        choices: ["To avoid predators", "To find better food sources", "To seek warmer temperatures", "To find mates"],
        correctAnswer: 1,
        explanation: "The primary reason for seasonal elk migration is to find better food sources."
    },
    {
        question: "Which physical adaptation helps elk survive in cold climates?",
        choices: ["Thick, oily hair", "Ability to hibernate", "Color-changing coat", "Extra layers of fat"],
        correctAnswer: 0,
        explanation: "Elk have thick, oily hair that helps insulate them against cold temperatures and repel moisture."
    },
    {
        question: "What is the term for a male elk that has not yet reached breeding age?",
        choices: ["Calf", "Yearling", "Spike", "Buck"],
        correctAnswer: 2,
        explanation: "A young male elk that has not yet reached breeding age is often called a spike."
    },
    {
        question: "Which U.S. national park is famous for its large elk population?",
        choices: ["Yellowstone National Park", "Yosemite National Park", "Grand Canyon National Park", "Great Smoky Mountains National Park"],
        correctAnswer: 0,
        explanation: "Yellowstone National Park is famous for its large elk population."
    },
    {
        question: "What is the primary threat to elk populations in many areas today?",
        choices: ["Climate change", "Habitat fragmentation", "Overhunting", "Disease"],
        correctAnswer: 1,
        explanation: "Habitat fragmentation due to human development and land use changes is a primary threat to elk populations in many areas today."
    },
    {
        question: "Which of these is NOT a typical behavior of bull elk during the rutting season?",
        choices: ["Bugling", "Fighting other males", "Wallowing in mud", "Hibernating"],
        correctAnswer: 3,
        explanation: "Hibernating is not a typical behavior of bull elk during the rutting season."
    },
    {
        question: "What conservation effort has been crucial in restoring elk populations in some areas?",
        choices: ["Captive breeding programs", "Reintroduction to historical ranges", "Genetic modification", "Eliminating all predators"],
        correctAnswer: 1,
        explanation: "Reintroduction of elk to their historical ranges has been a crucial conservation effort in restoring elk populations in some areas."
    },
    {
        question: "What is the average lifespan of an American elk in the wild?",
        choices: ["5-10 years", "10-15 years", "15-20 years", "20-25 years"],
        correctAnswer: 1,
        explanation: "The average lifespan of an American elk in the wild is typically 10-15 years."
    },
    {
        question: "Which Native American tribe has a particularly strong cultural association with elk?",
        choices: ["Navajo", "Sioux", "Cherokee", "Nez Perce"],
        correctAnswer: 3,
        explanation: "The Nez Perce tribe has a particularly strong cultural association with elk."
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
            <div className="quiz-container">
                <img 
                    src="https://aws.boone-crockett.org/s3fs-public/styles/12-col_848px/public/thumbnails/image/150_bw_logo_0.png" 
                    alt="Boone and Crockett Club Logo" 
                    className="logo"
                />
                <h1>Quiz Complete!</h1>
                <p>Your final score: {score} out of {questions.length}</p>
                
                <img 
                    src="https://aws.boone-crockett.org/s3fs-public/styles/featured_product/public/thumbnails/image/bpaer_0.jpg?itok=OXajVOEH" 
                    alt="An American Elk Retrospective Book" 
                    className="product-image"
                />
                
                <p>Thank you for taking our elk quiz! Use this discount code to get $10 off on our best-selling book An American Elk Retrospective.</p>
                
                <div className="coupon-code">
                    <p>Coupon Code: ELKQUIZ</p>
                </div>
                
                <a 
                    href="https://www.boone-crockett.org/american-elk-retrospective" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="buy-button"
                >
                    BUY NOW!
                </a>
                
                <button onClick={resetQuiz} className="restart-button">
                    Restart Quiz
                </button>
            </div>
        );
    }

    const currentQ = questions[currentQuestion];

    return (
        <div className="quiz-container">
            <img 
                src="https://aws.boone-crockett.org/s3fs-public/styles/12-col_848px/public/thumbnails/image/150_bw_logo_0.png" 
                alt="Boone and Crockett Club Logo" 
                className="logo"
            />
            <h1>American Elk Knowledge Quiz</h1>
            <p>Question {currentQuestion + 1} of {questions.length}</p>
            <p className="question">{currentQ.question}</p>
            <div className="choices">
                {currentQ.choices.map((choice, index) => (
                    <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        disabled={showExplanation}
                        className={`choice-button ${
                            selectedAnswer === index
                                ? index === currentQ.correctAnswer
                                    ? 'correct'
                                    : 'incorrect'
                                : ''
                        } ${showExplanation ? 'disabled' : ''}`}
                    >
                        {choice}
                    </button>
                ))}
            </div>
            {isCorrect !== null && (
                <p className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
                    {isCorrect ? 'Correct!' : 'Incorrect'}
                </p>
            )}
            {showExplanation && (
                <Alert>
                    <AlertTitle>Explanation</AlertTitle>
                    <AlertDescription>
                        {currentQ.explanation}
                    </AlertDescription>
                </Alert>
            )}
            {showExplanation && (
                <button
                    onClick={nextQuestion}
                    className="next-button"
                >
                    {currentQuestion < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                </button>
            )}
            <p className="score">Current Score: {score} / {currentQuestion + 1}</p>
        </div>
    );
};

export default QuizApp;
