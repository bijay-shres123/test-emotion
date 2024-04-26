import {Router} from "express";
import { getQuestions,createQuestion,updateQuestion,deleteQuestion } from "../controllers/question-ctrl.js";
import authentication from "../middlewares/authentication.js";
const router  = Router();


router.get("/",getQuestions)
router.post("/",authentication, createQuestion)
router.patch("/:id",authentication, updateQuestion)
router.delete("/:id",authentication,deleteQuestion)


export default router;