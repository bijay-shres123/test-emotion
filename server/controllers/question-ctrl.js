import Question from "../models/QuestionModel.js";
import mongoose from "mongoose";

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

const updateQuestion = async (req, res) => {
    const { id: _id } = req.params;
    const question = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(400).json({ message: "Invalid ID" });
    }

    try {
        console.log(_id)
        const updatedQuestion = await Question.findByIdAndUpdate(_id, question, { new: true });
        if (!updatedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.json(updatedQuestion);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}
const deleteQuestion = async (req, res) => {
    const { id: _id } = req.params;

    if (!_id) {
        return res.status(400).json({ message: "Missing question ID" });
    }

    try {
        const deletedQuestion = await Question.findByIdAndDelete(_id);
        if (!deletedQuestion) {
            return res.status(404).json({ message: "Question not found" });
        }
        res.json({ message: "Question deleted successfully", deletedQuestion });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export { getQuestions, createQuestion, updateQuestion, deleteQuestion };
