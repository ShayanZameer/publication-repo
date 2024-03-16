import { Problems } from "../models/problems.js";

export const addProblems = async(req, res) => {
    try{
        const { name, email, content } = req.body;
        const problem = await Problems.create({
            name, email, content
        })
        return res.status(201).json({
            message:"Your issue have been submitted successfully!",
            problem,
            success:true,
        });
    }catch (error) {
        return res.status(500).json({
            message:"Poor internet connectivity! Check you internet connections!",
            success:false,
        })
    } 
}