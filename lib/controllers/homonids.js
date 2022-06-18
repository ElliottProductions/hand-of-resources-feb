const { Router } = require('express');
const { Homonid } = require('../models/Homonid');

module.exports = Router()
  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Homonid.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .post('/', async (req, res, next) => {
    try {
      const data = await Homonid.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const data = await Homonid.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const aSal = await Homonid.getById(req.params.id);
      res.json(aSal);
    } catch (e) {
      next(e);
    }
  })
  .get('/', async (req, res) => {
    const data = await Homonid.getAll();
    const salSorted = data.map(({ id, name, nickname }) => ({ id, name, nickname }));
    res.json(salSorted);
  });
