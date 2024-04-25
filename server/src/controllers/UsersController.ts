// import { getRandomValues, randomUUID } from "crypto";
import { FastifyReply, FastifyRequest } from "fastify";
import { prisma } from "../db";
import { UserRepository } from "../repositories/UserRepository";

interface Iuser {
  name: string;
  email: string;
  password: string;
}

const userRepository = new UserRepository();
export class UsersController {
  client = userRepository;

  // Create users
  async create(request: FastifyRequest, reply: FastifyReply) {
    const { name, email, password } = request.body as Iuser;
    this.client.save({ name, email, password });

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
    return reply.send(updatedUser);
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    interface reqBodyParams {
      email: string;
    }

    const { email } = request.body as reqBodyParams;

    const deleteUser = await prisma.user.delete({
      where: {
        email,
      },
    });
    return reply.send("User deleted successfully");
  }
}
