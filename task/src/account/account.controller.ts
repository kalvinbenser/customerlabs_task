import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AccountService } from './account.service';
import { CreateAccountTypes, updateAccountTypes } from './account.types';
import { Prisma } from '@prisma/client';
@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('account')
  async getAllAccount(): Promise<any> {
    return this.accountService.getAllAccount();
  }

  @Get('account/:id')
  async getAccountById(@Param('id') id: string): Promise<any> {
    try {
      const data = await this.accountService.getAccount(Number(id));
      if (data) {
        return data;
      } else {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/account/:id/destinations')
  async getDestinationByAccountId(@Param('id') id: string): Promise<any> {
    try {
      const data = await this.accountService.getDestinationByAccountId(
        Number(id),
      );
      if (data) {
        console.log('data', data);
        const data1 = data.destination.map((data) => ({
          url: data.url,
          http: data.http,
          headers: JSON.parse(data.headers),
          account_id: data.account_id,
        }));
        return data1;
      } else {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('account')
  async createAccount(
    @Body()
    CreateAccountTypes: CreateAccountTypes,
  ): Promise<any> {
    try {
      const isEmail = await this.accountService.isEmailExists(
        CreateAccountTypes.email,
      );
      if (isEmail)
        throw new HttpException(
          'email is already exists',
          HttpStatus.BAD_REQUEST,
        );

      return this.accountService.createAccount(CreateAccountTypes);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('account/:id')
  async updateAccount(
    @Param('id') id: string,
    @Body()
    accountData: updateAccountTypes,
  ): Promise<any> {
    try {
      return this.accountService.updateAccount(Number(id), accountData);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('account/:id')
  async deleteAccount(@Param('id') id: string): Promise<any> {
    try {
      return await this.accountService.deleteAccount(Number(id));
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
