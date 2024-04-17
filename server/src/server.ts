import fastify from "fastify";
import { routes } from "./routes";

const app = fastify({ logger: true });

app.register(routes);

app.listen({ port: 3000 }).then(() => {
  console.log;
});
