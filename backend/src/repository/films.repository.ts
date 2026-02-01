import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Film } from "src/films/schemas/films.schemas";

@Injectable()
export class FilmsRepository {
  constructor(@InjectModel(Film.name) private readonly filmModel: Model<Film>){};
  
  async findAll(): Promise<Film[]> {
    return this.filmModel.find().exec();
  }

  async count(): Promise<number> {
    return this.filmModel.countDocuments().exec();
  }
}