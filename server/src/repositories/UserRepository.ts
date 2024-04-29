import { prisma } from "../db";
import bcrypt from "bcrypt";

interface userProps {
  name: string;
  email: string;
  writtenNotes?: string;
  password?: string;
}

export class UserRepository {
  client = prisma.user;

  async save(user: userProps) {
    const { name, email, password, writtenNotes } = user;
    const passwordHash = password ? await bcrypt.hash(password, 10) : null;
    const savedUser = await this.client.create({
      data: {
        name,
        email,
        writtenNotes,
        password: passwordHash,
      },
    });

    return { ...savedUser, password: undefined };
  }

  async findByEmail(email: string) {
    const user = await this.client.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  async findById(id: string) {
    const user = await this.client.findFirst({
      where: {
        id,
      },
    });
    return user;
  }

  async update(id: string, user: userProps) {
    const passwordHash = user.password
      ? await bcrypt.hash(user.password, 10)
      : undefined;
    const updatedUser = await this.client.update({
      data: { ...user, password: passwordHash },
      where: { id },
    });
    return { ...updatedUser, password: undefined };
  }
}
