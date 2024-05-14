import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../database/database.service';
import { SinginAuthDto } from './dto/signin-auth.dto';
import { Role } from 'src/guards/role/role.guard';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: DatabaseService, private jwtService: JwtService) { }

  async validateUser(email: string, password: string, role: Role): Promise<any> {
    const user = role === "Manager"
      ? await this.prisma.manager.findUnique({
        where: {
          name: email
        }
      })
      : await this.prisma.administrator.findUnique({ where: { name: email } });

    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(dto: SinginAuthDto) {
    const { password, role, username } = dto
    const user = await this.validateUser(username, password, role);
    if (!user) {
      return 'Invalid credentials';
    }
    const payload = { username: user.name, sub: user.id, role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(dto: CreateAuthDto) {
    const { password, role, username } = dto
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = role === "Manager"
      ? await this.prisma.manager.create({
        data: { name: username, password: hashedPassword },
      })
      : await this.prisma.administrator.create({
        data: { name: username, password: hashedPassword },
      });

    return { id: newUser.id, name: newUser.name };
  }
}
