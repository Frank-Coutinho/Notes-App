// import { getRandomValues, randomUUID } from "crypto";
import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../db";

interface Iuser {
  name: string;
  email: string;
  password: string;
}

export class UsersController {
  users = new Map();
  async create(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = request.body as Iuser;

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userExists) {
      return reply.status(400).send({ error: "User already exists" });
    }

    await prisma.user.create({
      data: {
        name,
        email,
        password
      },
    });
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
