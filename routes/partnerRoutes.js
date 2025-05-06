// routes/partnerRoutes.js
import express from "express";
import { registerPartner , getAllPartners, deletePartner } from "../controllers/partnerController.js";

const router = express.Router();

router.post("/", registerPartner);
router.get("/", getAllPartners);
router.delete("/:id", deletePartner);

export default router;
