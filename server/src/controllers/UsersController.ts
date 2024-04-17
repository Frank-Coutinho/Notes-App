import { getRandomValues, randomUUID } from "crypto";
import { FastifyReply, FastifyRequest } from "fastify";

interface Iuser {
  name: String;
  email: String;
  password: String;
}

export class UsersController {
  users = new Map();
  create(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = request.body as Iuser;

    const id = randomUUID();
    this.users.set(id, { name, email, password });
    return reply.send({ status: "success" });
  }

  list(request: FastifyRequest, reply: FastifyReply) {
    const usersArr = Array.from(this.users).map((item) => {
      return {
        id: item[0],
        ...item[1],
      };
    });
    return reply.send(usersArr);
  }
}
