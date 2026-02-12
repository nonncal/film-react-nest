import { FilmDto, ScheduleDto } from '../dto/films.dto';
import { Film, Schedule } from '../schemas/films.schema';
export class FilmMapper {
  static scheduleToDto(schedule: Schedule): ScheduleDto {
    return {
      id: schedule.id || '',
      daytime: schedule.daytime,
      hall: schedule.hall,
      rows: schedule.rows,
      seats: schedule.seats,
      price: schedule.price,
      taken: schedule.taken,
    };
  }

  static toDto(film: Film): FilmDto {
    return {
      id: film.id,
      rating: film.rating,
      director: film.director,
      tags: film.tags,
      image: film.image,
      cover: film.cover,
      title: film.title,
      about: film.about,
      description: film.description,
      schedule: film.schedule.map((s) => this.scheduleToDto(s)),
    };
  }

  static toDtoArray(films: Film[]): FilmDto[] {
    return films.map((film) => this.toDto(film));
  }
}
