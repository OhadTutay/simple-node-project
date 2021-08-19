import { createConnection, getConnection, ConnectionOptions, Connection } from "typeorm";
import { resolve } from "path";

const getConnectionSaftly = (): Connection | null => {
  let conn = null;
  try {
    conn = getConnection();
  } catch (e) {}

  return conn;
};

// Open connection to the db
export const openConnection = async () => {
  let conn = getConnectionSaftly();

  if (!conn || !conn.isConnected) {
    // Get the current directory(src or build)
    const dir = resolve(__dirname, "../");

    // let options : ConnectionOptions = await import("./ormconfig.js").then((x) => x)
    let options: ConnectionOptions = {
      type: "postgres",
      host: process.env.SERVER_HOST,
      port: 5432,
      database: process.env.SERVER_DATABASE,
      username: process.env.SERVER_USER,
      password: process.env.SERVER_PASSWORD,
      schema: process.env.SERVER_SCHEMA,
      synchronize: true,
      dropSchema: true,
      ssl: false,
      logging: true,
      entities: [`${dir}/models/*.entity.{ts,js}`],
      cli: {
        entitiesDir: "src/models",
      },
    };
    conn = await createConnection(options).catch((e) => {
      console.log(e);
      return null;
    });
  }

  return conn;
};

// Close the db connection
export const closeConnection = async (dev: boolean = true) => {
  let conn = getConnectionSaftly();
  if (conn && conn.isConnected) {
    await conn.close();
  }

  return conn;
};
