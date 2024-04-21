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

  // Create users
  async create(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = request.body as Iuser;

    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    // Validating creation of new users
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

  // List users
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
    const { id } = request.body as reqParams;
    interface reqBodyProps {
      email?: string;
      name?: string;
    }
    const { email, name } = request.body as reqBodyProps;

    if (email) {
      const userExists = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (userExists?.email) {
        return reply.status(400).send();
      }
    }
    const updatedUser = await prisma.user.update({
      data: {
        email,
        name,
      },
      where: {
        id,
      },
    });
    return reply.send(updatedUser)
  }

  async delete (request: FastifyRequest, reply: FastifyReply) {
    interface user {
      id: string
    }

    const { id } = request.body as user

    const deleteUser = await prisma.user.delete({
      data: {
        
      },
      where: {

      }
    })
  }
}
