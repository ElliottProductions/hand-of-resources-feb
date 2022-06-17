const { Router } = require('express');
const { Bat } = require('../models/Bat');

module.exports = Router()
  .get('/:id', async (req, res) => {
    try {
      const aBat = await Bat.getById(req.params.id);
      res.json(aBat);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res) => {
    const bats = await Bat.getAll();
    const batsSorted = bats.map(({ id, name, nickname }) => ({ id, name, nickname }));
    res.json(batsSorted);
  });
