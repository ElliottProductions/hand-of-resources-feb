const pool = require('../utils/pool');

class Homonid {
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
      'INSERT INTO homonids (name, nickname) VALUES ($1, $2) RETURNING *',
      [name, nickname]
    );
    return new Homonid(rows[0]);
  }
  
  static async updateById(id, update) {
    const data = await Homonid.getById(id);
    if (!data) return null;
    const { name, nickname } = { ...data, ...update };
    const { rows } = await pool.query(
      `
      UPDATE homonids 
      SET name=$2, nickname=$3 
      WHERE id=$1 RETURNING *`,
      [id, name, nickname]
    );
    return new Homonid(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM homonids');
    return rows.map((row) => new Homonid(row));
  }
  
  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM homonids 
      WHERE homonids.id = $1
      GROUP BY homonids.id`,
      [id]
    );
    return new Homonid(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM homonids WHERE id = $1 RETURNING *',
      [id]
    );
    return new Homonid(rows[0]);
  }
}

module.exports = { Homonid };
