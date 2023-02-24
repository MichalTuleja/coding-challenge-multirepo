import { IsInt, IsString, IsNumber, IsBoolean } from 'class-validator';

export class CreatePokemonDto {
  @IsInt()
  readonly id: number | null;

  @IsString()
  readonly 'Name': string;

  @IsString()
  readonly 'Type 1': string | null;

  @IsString()
  readonly 'Type 2': string | null;

  @IsNumber()
  readonly 'Total': number | null;

  @IsNumber()
  readonly 'HP': number | null;

  @IsNumber()
  readonly 'Attack': number | null;

  @IsNumber()
  readonly 'Defense': number | null;

  @IsNumber()
  readonly 'Sp. Atk': number | null;

  @IsNumber()
  readonly 'Sp. Def': number | null;

  @IsNumber()
  readonly 'Speed': number | null;

  @IsNumber()
  readonly 'Generation': number | null;

  @IsBoolean()
  readonly 'Legendary': boolean | null;
}
