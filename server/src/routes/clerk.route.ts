import { Router } from "express";
import {
    index,
    show,
    update,
    destroy
} from '../controllers/clerk.controller'; 
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.get("/", index, authMiddleware);
router.get("/:id", show, authMiddleware);
router.put("/:id", update, authMiddleware);
router.delete("/:id", destroy, authMiddleware);

export default router;