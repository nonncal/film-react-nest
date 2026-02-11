import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from 'src/films/schemas/films.schema';


@Injectable()
export class FilmsRepository {
  constructor(
    @InjectModel(Film.name) private readonly filmModel: Model<FilmDocument>
  ) {}

  async findAll(): Promise<FilmDocument[]> {
    return this.filmModel.find().exec();
  }

  async count(): Promise<number> {
    return this.filmModel.countDocuments().exec();
  }

  async findById(id: string): Promise<FilmDocument | null> {
    return this.filmModel.findOne({ id: id }).exec(); 
  }

  async validateFilmAndSession(filmId: string, sessionId: string): Promise<boolean> {
    const film = await this.filmModel.findOne({
      id: filmId, 
      'schedule.id': sessionId,
    }).exec();

    return !!film;
  }

  async isSeatTaken(
    filmId: string,
    sessionId: string,
    row: number,
    seat: number
  ): Promise<boolean> {
    const seatKey = `${row}:${seat}`;

    const film = await this.filmModel.findOne({
      id: filmId, 
      'schedule': {
        $elemMatch: {
          id: sessionId,
          taken: seatKey
        }
      }
    }).exec();

    return !!film;
  }

  async takeSeat(
    filmId: string,
    sessionId: string,
    row: number,
    seat: number
  ): Promise<boolean> {
    const seatKey = `${row}:${seat}`;

    const result = await this.filmModel.updateOne(
      {
        id: filmId,  
        'schedule': {
          $elemMatch: {
            id: sessionId,
            taken: { $ne: seatKey }
          }
        }
      },
      {
        $push: { 'schedule.$.taken': seatKey }
      }
    ).exec();

    return result.modifiedCount === 1;
  }

  async releaseSeat(
    filmId: string,
    sessionId: string,
    row: number,
    seat: number
  ): Promise<void> {
    const seatKey = `${row}:${seat}`;

    await this.filmModel.updateOne(
      {
        id: filmId,  
        'schedule.id': sessionId,
      },
      {
        $pull: { 'schedule.$.taken': seatKey }
      }
    ).exec();
  }
}