import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from 'src/films/entities/film.entity';
import { Schedule } from 'src/films/entities/schedule.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FilmsRepository {
  constructor(
    @InjectRepository(Film) private readonly filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async findAll(): Promise<Film[]> {
    return this.filmRepository.find({ relations: ['schedules'] });
  }

  async count(): Promise<number> {
    return this.filmRepository.count();
  }

  async findById(id: string): Promise<Film | null> {
    return this.filmRepository.findOne({
      where: { id },
      relations: ['schedules'],
    });
  }

  async validateFilmAndSession(
    filmId: string,
    sessionId: string,
  ): Promise<boolean> {
    const schedule = await this.scheduleRepository.findOne({
      where: { filmId, id: sessionId },
    });
    return !!schedule;
  }

  async isSeatTaken(
    filmId: string,
    sessionId: string,
    row: number,
    seat: number,
  ): Promise<boolean> {
    const schedule = await this.scheduleRepository.findOne({
      where: { filmId, id: sessionId },
    });
    if (!schedule) return false;
    return schedule.isSeatTaken(row, seat);
  }

  async takeSeat(
    filmId: string,
    sessionId: string,
    row: number,
    seat: number,
  ): Promise<boolean> {
    return this.scheduleRepository.manager.transaction(async (manager) => {
      const schedule = await manager.findOne(Schedule, {
        where: { filmId, id: sessionId },
      });
      if (!schedule) return false;
      if (schedule.isSeatTaken(row, seat)) return false;
      schedule.addSeat(row, seat);
      try {
        await manager.save(schedule);
        return true;
      } catch (err) {
        return false;
      }
    });
  }

  async releaseSeat(
    filmId: string,
    sessionId: string,
    row: number,
    seat: number,
  ): Promise<void> {
    const schedule = await this.scheduleRepository.findOne({
      where: { filmId, id: sessionId },
    });
    if (!schedule) return;
    schedule.removeSeat(row, seat);
    await this.scheduleRepository.save(schedule);
  }
}
