import { pool } from "../database/connection.js";

const findAll = async () => {
  const query = {
    text: `SELECT 
      t.id,
      u1.nombre AS emisor_nombre,
      u2.nombre AS receptor_nombre,
      t.monto,
      t.fecha
    FROM 
      transferencias t
    JOIN 
      usuarios u1 ON t.emisor = u1.id
    JOIN 
      usuarios u2 ON t.receptor = u2.id`,
    rowMode: "array",
  };
  const { rows } = await pool.query(query);
  return rows;
};

const create = async ({ emisor, receptor, monto }) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    
    const { rows: balanceRows } = await client.query(
      "SELECT balance FROM usuarios WHERE id = $1",
      [emisor]
    );
    const emisorBalance = balanceRows[0]?.balance;

    if (emisorBalance < monto) {
      throw new Error("Balance Insuficiente");
    }

    await client.query(
      "UPDATE usuarios SET balance = balance - $1 WHERE id = $2",
      [monto, emisor]
    );

    await client.query(
      "UPDATE usuarios SET balance = balance + $1 WHERE id = $2",
      [monto, receptor]
    );

    const insertQuery = {
      text: `
        INSERT INTO transferencias (emisor, receptor, monto, fecha)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `,
      values: [emisor, receptor, monto, new Date()],
    };

    const { rows } = await client.query(insertQuery);

    await client.query("COMMIT");
    return rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    
    if (client) {
      client.release();
    }
  }
};

export const Transfer = {
  findAll,
  create,
};
