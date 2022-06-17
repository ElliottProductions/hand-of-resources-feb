const pool = require('../utils/pool');

class Bat {
  id;
  name;
  nickname;
  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.nickname = row.nickname;
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM bats');
    return rows.map((row) => new Bat(row));
  }
}

module.exports = { Bat };
