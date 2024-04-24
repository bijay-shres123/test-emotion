import Category from "../models/categoryModel.js";

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        console.log(categories);
        res.status(200).json(categories);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

const createCategory = async (req, res) => {
    const body = req.body;
    const newCategory = new Category({
        ...body
    });

    try {
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

export { getCategories, createCategory };
