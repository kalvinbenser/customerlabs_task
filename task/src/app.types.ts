import { Expose } from 'class-transformer';
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsBoolean,
  IsOptional,
  IsObject,
  IsDefined,
} from 'class-validator';

export class IncomingData {
  @IsString()
  data: string;
}
export class HeadersType {
  @IsDefined()
  @Expose({ name: 'cl-x-token' })
  'cl-x-token': string; // note the param here is in double quotes
}
