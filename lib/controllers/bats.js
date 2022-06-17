const { Router } = require('express');
const { Bat } = require('../models/Bat');

module.exports = Router()
  .get('/', async (req, res) => {
    const bats = await Bat.getAll();
    const batsSorted = bats.map(({ id, name, nickname }) => ({ id, name, nickname }));
    res.json(batsSorted);
  });
