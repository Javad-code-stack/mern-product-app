import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
};

export const getSingleProduct = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
            .status(404)
            .json({ success: false, message: "کد محصول نامعتبر است" });
    }

    try {
        const singleProduct = await Product.findById(id);
        res.status(200).json(singleProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ messsage: error.message });
    }
};

export const createProduct = async (req, res) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image)
        return res
            .status(400)
            .json({ message: "لطفا تمام فیلدها را پر کنید" });

    try {
        const newProduct = await Product.create(product);
        res.status(200).json(newProduct);
    } catch (error) {
        console.log(error);
        res.status(500).json({ messsage: error.message });
    }
};

export const deleteProduct = async (req, res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
            .status(404)
            .json({ success: false, message: "کد محصول نامعتبر است" });
    }

    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct)
            return res.status(404).json({ message: "محصول یافت نشد" });

        res.status(200).json({ success: true, message: "محصول حذف شد" });
    } catch (error) {
        console.log(error.message);
        res.status(404).json({ messsage: error.message });
    }
};

export const updateProduct = async (req, res) => {
    const id = req.params.id;
    const { name, price, image } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res
            .status(404)
            .json({ success: false, message: "کد محصول نامعتبر است" });
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { name, price, image },
            { new: true, runValidators: true }
        );

        if (!updatedProduct)
            return res.status(404).json({ message: "محصول یافت نشد" });

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message });
    }
};
