import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Game } from './schemas/game.schema';
import * as mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

@Injectable()
export class GameService {
    constructor(
        @InjectModel(Game.name)
        private gameModel: mongoose.Model<Game>,
    ) {}

    async findAll(): Promise<Game[]>{
        const games = await this.gameModel.find();
        return games;
    }

    async create(game: Game, user: User): Promise<Game> {
        const data = Object.assign(game,{user:user._id})
        
        const res = await this.gameModel.create(data);
        return res;
    }

    async findById(id: string): Promise<Game> {
        const game = await this.gameModel.findById(id);

    if(!game){
        throw new NotFoundException('Game Not Found.');
    }
        return game;
    }

    async updateById(id: string, game: Game): Promise<Game> {
        return await this.gameModel.findByIdAndUpdate(id, game, {
            new: true,
            runValidators: true,
        });
    }

    async deleteById(id: string): Promise<Game> {
        return await this.gameModel.findByIdAndDelete(id);
    }
}