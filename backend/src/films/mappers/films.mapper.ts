import { FilmDto, ScheduleDto } from "../dto/films.dto";
import { Film, Schedule } from "../schemas/films.schemas";

export class FilmMapper {
  static scheduleToDto(schedule: Schedule) : ScheduleDto {
    return {
      id: schedule.id || '',
      daytime: schedule.daytime,
      hall: schedule.hall,
      rows: schedule.rows,
      seats: schedule.seats,
      price: schedule.price,
      taken: schedule.taken
    }
  }

  static toDto(film: Film): FilmDto {
    return {
      id: film._id.toString(),
      rating: film.rating,
      director: film.director,
      tags: film.tags,
      schedules: film.schedule.map((schedule) => this.scheduleToDto(schedule)),
      image: film.image,
      cover: film.cover,
      description: film.description,
      title: film.title,
      about: film.about
    }
  }

  static toDtoArray(films: Film[]): FilmDto[] {
    return films.map((film) => this.toDto(film));
  }
}