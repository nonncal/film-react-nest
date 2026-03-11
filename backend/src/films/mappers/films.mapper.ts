import { FilmDto, ScheduleDto } from '../dto/films.dto';
import { Film } from '../entities/film.entity';
import { Schedule } from '../entities/schedule.entity';
export class FilmMapper {
  static scheduleToDto(schedule: Schedule): ScheduleDto {
    return {
      id: schedule.id || '',
      daytime: schedule.daytime,
      hall: schedule.hall,
      rows: schedule.rows,
      seats: schedule.seats,
      price: Number(schedule.price),
      taken: schedule.getTakenArray(),
    };
  }

  static toDto(film: Film): FilmDto {
    return {
      id: film.id,
      rating: Number(film.rating),
      director: film.director,
      tags: film.getTagsArray(),
      image: film.image,
      cover: film.cover,
      title: film.title,
      about: film.about,
      description: film.description,
      schedule: film.schedules.map((s) => this.scheduleToDto(s)),
    };
  }

  static toDtoArray(films: Film[]): FilmDto[] {
    return films.map((film) => this.toDto(film));
  }
}
