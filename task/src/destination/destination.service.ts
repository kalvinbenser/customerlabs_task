import { Injectable } from '@nestjs/common';
import { Destination, Prisma } from '@prisma/client';
import { DBService } from '../db/db.service';
import {
  createDestinationTypes,
  updateDestinationTypes,
} from './destination.types';

@Injectable()
export class DestinationService {
  constructor(private dbService: DBService) {}

  async getDestination(id: number): Promise<any> {
    return this.dbService.destination.findUnique({
      where: { id: id },
    });
  }
  async getAllDestination(): Promise<any> {
    return this.dbService.destination.findMany();
  }
  async createDestination(data: any): Promise<any> {
    data.headers = JSON.stringify(data.headers);
    return this.dbService.destination.create({
      data,
    });
  }

  async updateDestination(id: number, data: any): Promise<any> {
    data.headers = JSON.stringify(data.headers);
    return this.dbService.destination.update({
      where: { id: id },
      data: data,
    });
  }

  async deleteDestination(id: number): Promise<any> {
    return this.dbService.destination.delete({
      where: { id: id },
    });
  }
}
