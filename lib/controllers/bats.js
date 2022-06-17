const { Router } = require('express');
const { Bat } = require('../models/Bat');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const data = await Bat.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const data = await Bat.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
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
