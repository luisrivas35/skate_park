import "dotenv/config";
import pkg from "pg"; 
import fs from "fs";

const { Pool } = pkg;

const pool = new Pool({
  user: process.env.USER_DB,
  password: process.env.PASSWORD_DB,
  host: process.env.HOST_DB,
  port: process.env.PORT_DB || 5432,
  database: process.env.DATABASE_NAME,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync("./ca.pem"),
  },
  allowExitOnIdle: true,
});

(async () => {
  try {
    const result = await pool.query("SELECT NOW()");
    console.log("DB is connected");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
})();

export default pool;
