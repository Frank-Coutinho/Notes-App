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
    this.client.save({ name, email, password, writtenNotes });

    // Validation
    const userExists = await this.client.findByEmail(email);
    if (userExists) {
      return reply.status(400).send({ error: "User already exists" });
    }

    return reply.status(201).send("User created");
  }

  // List users
  async list(request: FastifyRequest, reply: FastifyReply) {
    interface reqParams {
      id: string;
    }

    const { id } = request.params as reqParams;
    // find user by ID
    const user = await this.client.findById(id);
    if (!user) {
      return reply.status(404).send("user doen't exist");
    }

    return reply.send(user);
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    interface reqParams {
      id: string;
    }
    const { id } = request.body as reqParams;
    interface reqBodyProps {
      email?: string;
      name?: string;
      password:string
      writtenNotes: string
    }
    const { email, name, password, writtenNotes } = request.body as reqBodyProps;

    if (email) {
      const userExists = await this.client.findByEmail(email)
      if (userExists?.email) {
        return reply.status(400).send();
      }
    }
    const updatedUser = await this.client.update(id, name,);
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
