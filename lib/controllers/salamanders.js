const { Router } = require('express');
const { Salamander } = require('../models/Salamander');

module.exports = Router()
  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Salamander.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const data = await Salamander.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const data = await Salamander.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const aSal = await Salamander.getById(req.params.id);
      res.json(aSal);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res) => {
    const data = await Salamander.getAll();
    const salSorted = data.map(({ id, name, nickname }) => ({ id, name, nickname }));
    res.json(salSorted);
  });
