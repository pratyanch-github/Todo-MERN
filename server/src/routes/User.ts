import { RegisterUser, LoginUser } from "../controllers/User";
import express from "express";

const router = express.Router();

router.post("/sign-up", RegisterUser);
router.post("/sign-in", LoginUser);


module.exports = router;