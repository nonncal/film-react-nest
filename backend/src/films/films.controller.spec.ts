import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsRepository } from '../repository/films.repository';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  const mockFilmsRepository = {
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService, { provide: FilmsRepository, useValue: mockFilmsRepository }],
    }).compile();

    controller = module.get<FilmsController>(FilmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
