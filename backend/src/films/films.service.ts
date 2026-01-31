import { Injectable } from '@nestjs/common';

@Injectable()
export class FilmsService {
  private films = []

  findAll() {
    return this.films
  }

  findSchedule(filmId: string) {
    
  }
}
