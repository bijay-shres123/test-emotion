import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose'; // Import mongoose
import storyRoutes from './routes/stories.js'
import categoryRoutes from './routes/categories.js'
import questionRoutes from './routes/questions.js'

const app = express();

app.use(bodyParser.json({limit: "32mb", extended: true }))
app.use(bodyParser.urlencoded({limit: "32mb", extended: true }))
app.use(cors())

//Route for storyRoute
app.use("/stories",storyRoutes)
//Route for categoryRoutes
app.use("/categories",categoryRoutes)
//Route for QuestionRoutes
app.use("/questions",questionRoutes)

const MONGO_URI = "mongodb+srv://user2024:test123@cluster0.hsmnvk0.mongodb.net/TestQuiz?retryWrites=true&w=majority&appName=Cluster0"

const PORT = process.env.PORT || 5001;

const connectDB = async() =>{
    try{
        await mongoose.connect(MONGO_URI),{ useNewUrlParser: true, useUnifiedTopology: true };
        app.listen(PORT,()=> console.log(`Server running on port :${PORT}`));
    }catch(err){
        console.log("Connectino to the MongoDB failed",err.message)
    }
}

connectDB();
mongoose.connection.on("open",()=> console.log("Conncection to database has been established successfully"))
mongoose.connection.on("error",(err)=> console.log(err))