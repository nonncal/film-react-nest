import { IsString, IsNumber, IsDateString, Min } from 'class-validator';

export class TicketDto {
  @IsString()
  film: string;

  @IsString()
  session: string;

  @IsDateString()
  daytime: string;

  @IsNumber()
  @Min(1)
  row: number;

  @IsNumber()
  @Min(1)
  seat: number;

  @IsNumber()
  @Min(0)
  price: number;
}

export class OrderRequestDto {
  @IsString()
  email: string;
  @IsString()
  phone: string;
  tickets: TicketDto[];
}

export class TicketResponseDto {
  id: string;
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}

export class OrderDto {
  total: number;
  items: TicketResponseDto[];
}
