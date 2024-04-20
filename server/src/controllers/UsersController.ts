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
        password,
      },
    });

    return reply.status(201).send("User created");
  }

  // HTTP GET users request
  async list(request: FastifyRequest, reply: FastifyReply) {
    interface reqParams {
      id: string;
    }

    const { id } = request.body as reqParams;
    // find user by ID
    const user = await prisma.user.findFirst({ where: { id } });
    // validating if it's a user
    if (!user) {
      return reply.status(404).send("user doen't exist");
    }

    return reply.send();
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    interface reqParams {
      id: string;
    }
    const { id } = request.body as reqParams
    interface reqBodyProps {
      email: string;
      name: string;
    }
    const { email, name } = request.body as reqBodyProps;

    // const user = await prisma.user.update({});
  }
}
