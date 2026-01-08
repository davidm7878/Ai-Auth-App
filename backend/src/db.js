import pg from "pg";

const { Pool } = pg;

// Use pooled connections for efficiency
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function healthcheck() {
  // Simple query to ensure connectivity
  await pool.query("SELECT 1 AS ok");
}
