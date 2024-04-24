import {Router} from "express";
import { getQuestions,createQuestion } from "../controllers/question-ctrl.js";
const router  = Router();

router.get("/",getQuestions)
router.post("/",createQuestion)


export default router;