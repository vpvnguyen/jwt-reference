import { Request, Response } from "express";
import * as ItemsService from "./items.service";
import { BaseItem, Item } from "./items.interface";

export const findAllItems = async (_req: Request, res: Response) => {
  try {
    const items: Item[] = await ItemsService.findAll();

    res.status(200).send(items);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export const findItemById = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const item: Item = await ItemsService.find(id);

    if (item) {
      return res.status(200).send(item);
    }

    res.status(404).send("Item not found");
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export const createItem = async (req: Request, res: Response) => {
  try {
    const item: BaseItem = req.body;

    const newItem = await ItemsService.create(item);

    res.status(201).json(newItem);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export const updateOrCreateItemById = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const itemUpdate: Item = req.body;

    const existingItem: Item = await ItemsService.find(id);

    if (existingItem) {
      const updatedItem = await ItemsService.update(id, itemUpdate);
      return res.status(200).json(updatedItem);
    }

    const newItem = await ItemsService.create(itemUpdate);

    res.status(201).json(newItem);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

export const deleteItemById = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await ItemsService.remove(id);

    res.sendStatus(204).send(`Item ID: ${id} removed`);
  } catch (e) {
    res.status(500).send(e.message);
  }
};
