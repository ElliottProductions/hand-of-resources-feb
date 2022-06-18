const pool = require('../utils/pool');

class President {
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
      'INSERT INTO presidents (name, nickname) VALUES ($1, $2) RETURNING *',
      [name, nickname]
    );
    return new President(rows[0]);
  }
  
  static async updateById(id, update) {
    const data = await President.getById(id);
    if (!data) return null;
    const { name, nickname } = { ...data, ...update };
    const { rows } = await pool.query(
      `
      UPDATE presidents 
      SET name=$2, nickname=$3 
      WHERE id=$1 RETURNING *`,
      [id, name, nickname]
    );
    return new President(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM presidents');
    return rows.map((row) => new President(row));
  }
  
  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM presidents 
      WHERE presidents.id = $1
      GROUP BY presidents.id`,
      [id]
    );
    return new President(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM presidents WHERE id = $1 RETURNING *',
      [id]
    );
    return new President(rows[0]);
  }
}

module.exports = { President };
