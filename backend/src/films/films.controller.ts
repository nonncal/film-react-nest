import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('api/afisha/films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  findAll() {
    
  }

  @Get(':id/schedule')
  findSchedule(@Param('id') id: string) {
    
  }
}
