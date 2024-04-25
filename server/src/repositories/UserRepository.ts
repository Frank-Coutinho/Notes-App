import { prisma } from "../db";

interface userProps {
  name: string;
  email: string;
  password: string;
}

export class UserRepository {
  client = prisma.user;

  async save(user: userProps) {
    const { name, email, password } = user;
    await this.client.create({
      data: {
        name,
        email,
      },
    });
    const savedUser = await this.client
    return (savedUser)
  }
}
