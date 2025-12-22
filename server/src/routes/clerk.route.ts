import { Router } from "express";
import {
    index,
    show,
    update,
    destroy
} from '../controllers/clerk.controller'; 
import { Protected } from "../middleware/protected.middleware";

const router = Router();

router.get("/", index, Protected);
router.get("/:id", show, Protected);
router.put("/:id", update, Protected);
router.delete("/:id", destroy, Protected);

export default router;