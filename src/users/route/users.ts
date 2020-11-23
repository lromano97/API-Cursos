import express from "express";

import { signInUser, signUpUser } from "./userMethods";
const router = express.Router();

router.post("/signup", signUpUser);
router.post("/signin", signInUser);

export { router };
