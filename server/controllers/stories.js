import mongoose from "mongoose";
import Story from "../models/storyContent.js"

const getStories = async (req, res) =>{
    const story = await Story.find();
    console.log(story)
    try{
        res.status(200).json(story);
    }
    catch{
        res.status(404).json({message: error.message})
    }
}

const createStory = async (req, res) => {
    const body = req.body;
    const newStory = new Story({
        ...body
    });

    try {
        const savedStory = await newStory.save();
        res.status(201).json(savedStory);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export {getStories,createStory}