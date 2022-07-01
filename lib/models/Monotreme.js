const pool = require('../utils/pool');

class Monotreme {
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
      'INSERT INTO monotremes (name, nickname) VALUES ($1, $2) RETURNING *',
      [name, nickname]
    );
    return new Monotreme(rows[0]);
  }
  
  static async updateById(id, update) {
    const data = await Monotreme.getById(id);
    if (!data) return null;
    const { name, nickname } = { ...data, ...update };
    const { rows } = await pool.query(
      `
      UPDATE monotremes 
      SET name=$2, nickname=$3 
      WHERE id=$1 RETURNING *`,
      [id, name, nickname]
    );
    return new Monotreme(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM monotremes');
    return rows.map((row) => new Monotreme(row));
  }
  
  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM monotremes 
      WHERE monotremes.id = $1
      GROUP BY monotremes.id`,
      [id]
    );
    return new Monotreme(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM monotremes WHERE id = $1 RETURNING *',
      [id]
    );
    return new Monotreme(rows[0]);
  }
}

module.exports = { Monotreme };
