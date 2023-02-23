import { IsInt, IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreatePokemonDto {
  @IsInt()
  readonly id: number;

  @IsString()
  readonly 'Name': string;

  @IsString()
  readonly 'Type 1': string;

  @IsString()
  readonly 'Type 2': string;

  @IsNumber()
  readonly 'Total': number;

  @IsNumber()
  readonly 'HP': number;

  @IsNumber()
  readonly 'Attack': number;

  @IsNumber()
  readonly 'Defense': number;

  @IsNumber()
  readonly 'Sp. Atk': number;

  @IsNumber()
  readonly 'Sp. Def': number;

  @IsNumber()
  readonly 'Speed': number;

  @IsNumber()
  readonly 'Generation': number;

  @IsBoolean()
  readonly 'Legendary': boolean;
}
