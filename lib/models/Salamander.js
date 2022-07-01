const pool = require('../utils/pool');

class Salamander {
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
      'INSERT INTO Salamanders (name, nickname) VALUES ($1, $2) RETURNING *',
      [name, nickname]
    );
    return new Salamander(rows[0]);
  }
  
  static async updateById(id, update) {
    const data = await Salamander.getById(id);
    if (!data) return null;
    const { name, nickname } = { ...data, ...update };
    const { rows } = await pool.query(
      `
      UPDATE Salamanders 
      SET name=$2, nickname=$3 
      WHERE id=$1 RETURNING *`,
      [id, name, nickname]
    );
    return new Salamander(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query('SELECT * FROM Salamanders');
    return rows.map((row) => new Salamander(row));
  }
  
  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * FROM salamanders 
      WHERE salamanders.id = $1
      GROUP BY salamanders.id`,
      [id]
    );
    return new Salamander(rows[0]);
  }

  static async delete(id) {
    const { rows } = await pool.query(
      'DELETE FROM salamanders WHERE id = $1 RETURNING *',
      [id]
    );
    return new Salamander(rows[0]);
  }
}

module.exports = { Salamander };
