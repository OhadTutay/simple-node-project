import { Router } from "express";
import { GlobSync } from "glob";
import { logMiddleware } from "./middlewares/log.middleware";

const router = Router();

// MiddleWares
router.use(logMiddleware);

// Get all the controller files from the src directory
const files = new GlobSync("./routes/*.route.{js,ts}", { cwd: __dirname }).found;

files.forEach((value) => {
  // get the name of the controller
  const names = value.match(/\/\w+\./g);

  // I don't know how that can happen :(
  if (!names?.length) {
    return;
  }

  // Get the route from the file
  const route = require(value.slice(0, -3)).default;

  // The programmer didn't route to the default
  if (!route) {
    return;
  }

  // Remove the ts suffix
  router.use(`${names[0].slice(0, -1)}`, require(value.slice(0, -3)).default);
});

export default router;
