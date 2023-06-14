import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class CreateAccountTypes {
  @IsString()
  email: string;

  @IsString()
  account_name: string;

  @IsString()
  @IsOptional()
  website: string;
}

export class updateAccountTypes {
  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  account_name: string;

  @IsString()
  @IsOptional()
  website: string;
}
