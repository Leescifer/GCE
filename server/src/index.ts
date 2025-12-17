import app from "./server";
import dotenv from "dotenv";
import color from "@colors/colors";
import { initDB } from "./config/db.config";

console.log(color.white.bold("Starting server initialization..."));

dotenv.config();

console.log(
  color.white.bold(`Enviroment loaded, NODE_ENV: ${process.env.NODE_ENV}`)
);

const PORT = process.env.PORT || 3000;

const startServer = () => {
  console.log("Starting server".bgBrightCyan.bold);
  app
    .listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`.green.bold);
    })
    .on("error", (error) => {
      console.error(`Error starting server: ${error}`.red.bold);
      process.exit(1);
    });
};

const init = async () => {
  console.log("Initializing application...".bgYellow.bold);
  try {
    await initDB();
    startServer();
  } catch (error) {
    console.error("Failed to connect to the database".red.bold);
    process.exit(1);
  }
};

init().catch((error) => {
  console.error(`Fatal error during initialization: ${error}`.red.bold);
  process.exit(1);
});
