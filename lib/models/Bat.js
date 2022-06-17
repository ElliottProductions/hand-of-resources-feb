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

  static async insert({ name, nickname }) {
    const { rows } = await pool.query(
      'INSERT INTO bats (name, nickname) VALUES ($1, $2) RETURNING *',
      [name, nickname]
    );
    return new Bat(rows[0]);
  }
  
  static async updateById(id, update) {
    const bat = await Bat.getById(id);
    if (!bat) return null;
    const { name, nickname } = { ...bat, ...update };
    const { rows } = await pool.query(
      `
      UPDATE bats 
      SET name=$2, nickname=$3 
      WHERE id=$1 RETURNING *`,
      [id, name, nickname]
    );
    return new Bat(rows[0]);
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

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM bats WHERE id = $1 RETURNING *',
      [id]
    );
    return new Bat(rows[0]);
  }
}

module.exports = { Bat };
