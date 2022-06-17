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
  
  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM bats 
      WHERE bats.id = $1
      GROUP BY bats.id`,
      [id]
    );
    return new Bat(rows[0]);
  }
}

module.exports = { Bat };
