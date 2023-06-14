import { Injectable } from '@nestjs/common';
import { Account, Prisma } from '@prisma/client';
import { DBService } from '../db/db.service';
import { CreateAccountTypes, updateAccountTypes } from './account.types';
import * as uuid from 'uuid';

@Injectable()
export class AccountService {
  constructor(private dbService: DBService) {}

  async getAccount(id: number): Promise<any> {
    return this.dbService.account.findUnique({
      where: { id: id },
    });
  }

  async getDestinationByAccountId(id: number): Promise<any> {
    return this.dbService.account.findUnique({
      where: { id: id },
      include: { destination: true },
    });
  }
  async isEmailExists(email: string): Promise<any> {
    return this.dbService.account.findUnique({
      where: { email: email },
    });
  }
  async getAllAccount(): Promise<any> {
    return this.dbService.account.findMany();
  }
  async createAccount(data: CreateAccountTypes): Promise<any> {
    return this.dbService.account.create({
      data: {
        email: data.email,
        account_name: data.account_name,
        website: data.website,
        account_id: uuid.v4(),
        token: uuid.v4(),
      },
    });
  }

  async updateAccount(id: number, data: updateAccountTypes): Promise<any> {
    return this.dbService.account.update({
      where: { id: id },
      data: {
        email: data.email,
        account_name: data.account_name,
        website: data.website,
        account_id: uuid.v4(),
        token: uuid.v4(),
      },
    });
  }

  async deleteAccount(id: number): Promise<any> {
    return this.dbService.account.delete({
      where: { id: id },
    });
  }

  //-------------------incoming_data-------------------\\

  async getAccountByToken(token: string): Promise<any> {
    return this.dbService.account.findFirst({
      where: { token: token },
      include: {
        destination: true,
      },
    });
  }
}
