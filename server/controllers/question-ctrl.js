import Question from "../models/QuestionModel.js";

const getQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        console.log(questions);
        res.status(200).json(questions);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const createQuestion = async (req, res) => {
    const body = req.body;
    const newQuestion = new Question({
        ...body
    });

    try {
        const savedQuestion = await newQuestion.save();
        res.status(201).json(savedQuestion);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export { getQuestions, createQuestion };
