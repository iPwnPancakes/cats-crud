import express from "express";
import { Cat } from "../models/cat.js";

const cats = [
  new Cat(4, "Pancake", new Date("2015-06-15")),
  new Cat(2, "Fluffy"),
  new Cat(1, "Whiskers"),
  new Cat(3, "Mittens", new Date("2023-01-01")),
];

const router = express.Router();

router.get("/", (req, res) => {
  res.json(cats);
});

router.post("/", (req, res) => {
  const { id, name } = req.body;

  if (!id || !name) {
    res.status(400).json({ error: "ID and name are required" });
    return;
  } else if (cats.find((c) => c.id === id)) {
    res.status(409).json({ error: "Cat with this ID already exists" });
    return;
  }

  const newCat = new Cat(id, name);
  cats.push(newCat);
  res.status(201).json(newCat);
});

router.get("/:id", (req, res) => {
  const cat = cats.find((c) => c.id === parseInt(req.params.id));
  if (!cat) {
    res.status(404).json({ error: "Cat not found" });
    return;
  }

  res.json(cat);
});

router.put("/:id", (req, res) => {
  const catIndex = cats.findIndex((c) => c.id === parseInt(req.params.id));
  if (catIndex === -1) {
    res.status(404).json({ error: "Cat not found" });
    return;
  }

  const newCat = new Cat(cats[catIndex].id, req.body.name);
  cats[catIndex] = newCat;
  res.json(newCat);
});

router.delete("/:id", (req, res) => {
  const catIndex = cats.findIndex((c) => c.id === parseInt(req.params.id));
  if (catIndex === -1) {
    res.status(404).json({ error: "Cat not found" });
    return;
  }

  cats.splice(catIndex, 1);
  res.status(204).send();
});

export default router;
