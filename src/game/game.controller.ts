import { Body, Controller, Get, Post, Put, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { GameService } from './game.service';
import { Game } from './schemas/game.schema';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('games')
export class GameController {
    constructor(private gameService: GameService){}

    @Get()
    async getAllGames(): Promise<Game[]> {
        return this.gameService.findAll();
    }

    @Post()
    @UseGuards(AuthGuard())
    async createGame(
        @Body()
        game: CreateGameDto,
        @Req() req
    ): Promise<Game> {
        console.log(req.user)
        return this.gameService.create(game, req.user);
    }

    @Get(':id')
    async getGame(
        @Param('id')
        id: string,
    ): Promise<Game> {
        return this.gameService.findById(id);
    }

    @Put(':id')
    async updateGame(
        @Param('id')
        id: string,
        @Body()
        game: UpdateGameDto
    ): Promise<Game> {
        return this.gameService.updateById(id, game);
    }

    @Delete(':id')
    async deleteGame(
        @Param('id')
        id: string,
    ): Promise<{deleted: boolean}> {
        return this.gameService.deleteById(id);
    }
}
