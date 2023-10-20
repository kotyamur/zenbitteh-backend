import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Deal } from './entities/deal.entity';

@Injectable()
export class DealsService {
  constructor(
    @InjectRepository(Deal)
    private readonly dealRepository: Repository<Deal>,
  ) {}

  async findAll() {
    return await this.dealRepository.find();
  }
}
