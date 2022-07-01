const { Router } = require('express');
const { President } = require('../models/President');

module.exports = Router()
  .delete('/:id', async (req, res, next) => {
    try {
      const data = await President.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const data = await President.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const data = await President.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const aSal = await President.getById(req.params.id);
      res.json(aSal);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res) => {
    const data = await President.getAll();
    const presSorted = data.map(({ id, name, nickname }) => ({ id, name, nickname }));
    res.json(presSorted);
  });
