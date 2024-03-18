import express from "express";
import { Authenticate } from "../middleware/authenticate";
import {
  CreateEvent,
  DeleteEvent,
  GetEvent,
  GetEvents,
  UpdateEvent,
} from "../controllers/events";

const router = express.Router();

router.get("/", Authenticate, GetEvents);
router.post("/", Authenticate, CreateEvent);
router.get("/get-event/:id", Authenticate, GetEvent);
router.delete("/delete-event/:id", Authenticate, DeleteEvent);
router.put("/update-event/:id", Authenticate, UpdateEvent);

export default router;
