import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsBoolean,
  IsOptional,
  IsObject,
} from 'class-validator';

export class createDestinationTypes {
  @IsString()
  url: string;

  @IsString()
  http: string;

  @IsObject()
  headers: {};

  @IsInt()
  account_id: number;
}

export class updateDestinationTypes {
  @IsString()
  @IsOptional()
  url: string;

  @IsString()
  @IsOptional()
  http: string;

  @IsObject()
  @IsOptional()
  headers: {};

  @IsInt()
  @IsOptional()
  account_id: number;
}
