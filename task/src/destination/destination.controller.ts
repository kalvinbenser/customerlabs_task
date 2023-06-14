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
import { DestinationService } from './destination.service';
import {
  createDestinationTypes,
  updateDestinationTypes,
} from './destination.types';
import { Prisma } from '@prisma/client';

@Controller()
export class DestinationController {
  constructor(private readonly destinationService: DestinationService) {}

  @Get('destination')
  async getAllDestination(): Promise<any> {
    try {
      const data = await this.destinationService.getAllDestination();
      const data1 = data.map((data) => ({
        url: data.url,
        http: data.http,
        headers: JSON.parse(data.headers),
        account_id: data.account_id,
      }));
      return data1;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('destination/:id')
  async getDestinationById(@Param('id') id: string): Promise<any> {
    try {
      const data = await this.destinationService.getDestination(Number(id));
      if (data) {
        data.headers = JSON.parse(data.headers);
        return data;
      } else {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post('destination')
  async createDestination(
    @Body()
    CreateDestinationTypes: createDestinationTypes,
  ): Promise<createDestinationTypes> {
    try {
      return this.destinationService.createDestination(CreateDestinationTypes);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Put('destination/:id')
  async updateDestination(
    @Param('id') id: string,
    @Body()
    destinationData: updateDestinationTypes,
  ): Promise<updateDestinationTypes> {
    try {
      return this.destinationService.updateDestination(
        Number(id),
        destinationData,
      );
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete('destination/:id')
  async deleteDestination(@Param('id') id: string): Promise<any> {
    try {
      return await this.destinationService.deleteDestination(Number(id));
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
