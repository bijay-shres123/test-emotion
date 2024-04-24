import mongoose from 'mongoose';

const answerSchema = mongoose.Schema({
    text: { type: String, required: true },
    score: { type: Number, required: true }
});

const questionSchema = mongoose.Schema({
    text: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    answers: [answerSchema] // Array of answer objects
});

export default mongoose.model('Question', questionSchema);
