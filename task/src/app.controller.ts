import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Headers,
  ParseIntPipe,
  Put,
  Param,
} from '@nestjs/common';
import { AppService } from './app.service';
import { HeadersType, IncomingData } from './app.types';
import { DestinationService } from './destination/destination.service';
import { AccountService } from './account/account.service';
import axios from 'axios';
import { query } from 'express';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly destinationService: DestinationService,
    private readonly accountService: AccountService,
  ) {}

  @Get('/')
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/server/incoming_data')
  getIncomingData(): string {
    throw new HttpException('Invalid Data', HttpStatus.UNAUTHORIZED);
  }
  @Get('/server/send_data')
  sendGetData(@Query('data') data: string): string {
    try {
      return data;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/server/send_data')
  sendPutData(@Body() data: string): string {
    try {
      return data;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('/server/send_data')
  sendPostData(@Body() data: string): string {
    try {
      return data;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('/server/incoming_data')
  async serverIncomingData(
    @Body()
    incomingData: IncomingData,
    @Headers() headers: any,
  ): Promise<any> {
    try {
      // console.log('headers', headers['cl-x-token']);
      if (!headers['cl-x-token'])
        throw new HttpException('Un Authenticate', HttpStatus.UNAUTHORIZED);
      const account = await this.accountService.getAccountByToken(
        headers['cl-x-token'],
      );
      if (!account)
        throw new HttpException('Un Authenticate', HttpStatus.UNAUTHORIZED);
      // console.log('account', account);

      account.destination?.forEach(async (item, index) => {
        if (item.http === 'get') {
          const data1 = await axios.get(
            `http://localhost:4444/server/send_data?data=${incomingData.data}`,
            { headers: JSON.parse(item.headers) },
          );
          console.log('sent data', {
            url: item.url,
            http: item.http,
            data: data1.data,
          });
        } else if (item.http === 'post') {
          const data2 = await axios.post(
            'http://localhost:4444/server/send_data',
            {
              data: incomingData.data,
            },
            { headers: JSON.parse(item.headers) },
          );
          console.log('sent data', {
            url: item.url,
            http: item.http,
            data: data2.data.data,
          });
        } else if (item.http === 'put') {
          const data3 = await axios.put(
            'http://localhost:4444/server/send_data',
            {
              data: incomingData.data,
            },
            { headers: JSON.parse(item.headers) },
          );
          console.log('sent data', {
            url: item.url,
            http: item.http,
            data: data3.data.data,
          });
        } else {
          return null;
        }
      });

      return { message: 'data sent' };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
