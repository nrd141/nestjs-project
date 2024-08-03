import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/auth/schemas/user.schema";


export enum Category {
    SHOOTER = 'Shooter',
    ADVENTURE = 'Adventure',
    RACING = 'Racing',
    SIMULATION = 'Simulation',
    STRATEGY = 'Strategy',
}


@Schema({
    timestamps: true
})
export class Game {
    @Prop()
    title: string;

    @Prop()
    publisher: string;

    @Prop()
    description: string;

    @Prop()
    price: number;

    @Prop()
    category: Category;

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User;
}

export const GameSchema = SchemaFactory.createForClass(Game)