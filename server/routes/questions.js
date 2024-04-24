import {Router} from "express";
import { getQuestions,createQuestion,updateQuestion } from "../controllers/question-ctrl.js";
const router  = Router();

router.get("/",getQuestions)
router.post("/",createQuestion)
router.patch("/:id",updateQuestion)


export default router;