import { pool } from "../database/connection.js";

const findAll = async () => {
  const query = {
    text: "SELECT * FROM usuarios",
    // rowMode: "array"
  };
  const { rows } = await pool.query(query);
  return rows;
};

const create = async ({ nombre, balance }) => {
  const query = {
    text: `
            INSERT INTO usuarios (nombre, balance)
            VALUES ($1, $2)
            RETURNING *
        `,
    values: [nombre, balance],
  };

  const { rows } = await pool.query(query);
  return rows[0];
};

const remove = async (id) => {
  const query = {
    text: `
            DELETE FROM usuarios WHERE id = $1
            RETURNING *
        `,
    values: [id],
  };

  const { rows } = await pool.query(query);
  return rows[0];
};


const update = async ({ id, nombre, balance }) => {
  const query = {
    text: `
      UPDATE usuarios
      SET nombre = $2,
          balance = $3
      WHERE id = $1
      RETURNING *
    `,
    values: [id, nombre, balance],
  };

  const { rows } = await pool.query(query);
  
  if (rows.length === 0) {
    return null; 
  }

  return rows[0];
};

const getUserByName = async (name) => {
  const query = {
    text: "SELECT id, nombre FROM usuarios WHERE nombre = $1",
    values: [name],
  };
  const { rows } = await pool.query(query);
  if (rows.length === 0) {
    throw new Error("Cliente no encontrado");
  }
  return rows[0];
};

const getUserById = async (id) => {
  const query = {
    text: "SELECT id, nombre FROM usuarios WHERE id = $1",
    values: [id],
  };
  const { rows } = await pool.query(query);
  if (rows.length === 0) {
    throw new Error("Cliente no encontrado");
  }
  return rows[0];
};

export const User = {
  findAll,
  create,
  remove,
  update,
  getUserByName,
  getUserById,
};