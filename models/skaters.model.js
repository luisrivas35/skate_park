import pool from "../database/connection.js";

export const findAll = async () => {
  try {
    const result = await pool.query("SELECT * FROM skaters");
    return result.rows;
  } catch (err) {
    console.error("Error querying the database:", err);
    throw err;
  }
};

export const findByEmail = async (email) => {
  try {
    
    const query = {
      text: "SELECT * FROM skaters WHERE email = $1",
      values: [email],
    };
    const { rows } = await pool.query(query);
    if (rows.length === 0) {
      throw new Error("Registry not Found");
    }
    return rows[0];
  } catch (error) {
    console.error("Error in findByEmail:", error);
    throw error; 
  }
};

export const createSkater = async (skaterData) => {
  const {
    email,
    nombre,
    password,
    anos_experiencia,
    especialidad,
    foto,
    estado,
  } = skaterData;

  try {
    const sql = `
      INSERT INTO skaters (email, nombre, password, anos_experiencia, especialidad, foto, estado)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
    `;
    await pool.query(sql, [
      email,
      nombre,
      password,
      anos_experiencia,
      especialidad,
      foto,
      estado,
    ]);
    return skaterData;
  } catch (err) {
    console.error("Error creating skater:", err);
    throw err;
  }
};

export const updateSkater = async (email, updatedData) => {
  const query = {
    text: `UPDATE skaters 
           SET nombre = $1, password = $2, anos_experiencia = $3, especialidad = $4 
           WHERE email = $5`,
    values: [
      updatedData.nombre,
      updatedData.password,
      updatedData.anos_experiencia,
      updatedData.especialidad,
      email,
    ],
  };
  await pool.query(query);
};

export const deleteSkater = async (email) => {
  try {
    const query = {
      text: "DELETE FROM skaters WHERE email = $1",
      values: [email],
    };
    await pool.query(query);
  } catch (err) {
    console.error("Error deleting skater:", err);
    throw err;
  }
};

export const updateSkaterEstado = async (id, estado) => {
  const query = {
    text: "UPDATE skaters SET estado = $1 WHERE id = $2",
    values: [estado, id],
  };
  await pool.query(query);
};

export default {
  findAll,
  createSkater,
  updateSkater,
  deleteSkater,
  findByEmail,
  updateSkaterEstado,
};
