import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from './database/database.service';

@Injectable()
export class AppService {
  constructor(private readonly databaseService: DatabaseService) {}

  getUsers() {
    return this.databaseService.user.findMany();
  }
  getUser(userId: string) {
    const user = this.databaseService.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new NotFoundException('This user does not exist');
    }
    return user;
  }
}
