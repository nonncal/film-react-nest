import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsResponse } from './dto/films.dto';
import { FilmsRepository } from 'src/repository/films.repository';
import { FilmMapper } from './mappers/films.mapper';

@Injectable()
export class FilmsService {

  constructor(private readonly filmsRepository: FilmsRepository) {};

  async findAll():Promise<FilmsResponse> {
    const films = await this.filmsRepository.findAll();
    const total = await this.filmsRepository.count();

    return {
      items: FilmMapper.toDtoArray(films),
      total
    }
  }

  async findSchedule(filmId: string) {
    const film = await this.filmsRepository.findById(filmId);

    if(!film) {
      throw new NotFoundException('Film not found');
    }

    const scheduleItems = film.schedule.map((schedule) => FilmMapper.scheduleToDto(schedule));

    return {
      total: scheduleItems.length,
      items: scheduleItems
    };
  }
}
