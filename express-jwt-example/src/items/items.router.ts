import { Router } from "express";
import * as ItemsController from "./items.controller";

export const itemsRouter = Router();

// GET items
itemsRouter.get("/", ItemsController.findAllItems);

// GET items/:id
itemsRouter.get("/:id", ItemsController.findItemById);

// POST items
itemsRouter.post("/", ItemsController.createItem);

// PUT items/:id
itemsRouter.put("/:id", ItemsController.updateOrCreateItemById);

// DELETE items/:id
itemsRouter.delete("/:id", ItemsController.deleteItemById);
