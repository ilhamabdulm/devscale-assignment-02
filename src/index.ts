import "dotenv/config";

import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { researchRouter } from "./modules/research/router.js";

const app = new Hono();

app.route("/research", researchRouter);

serve(
  {
    fetch: app.fetch,
    port: 9001,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
