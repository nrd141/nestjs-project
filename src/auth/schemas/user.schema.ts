import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({
    timestamps: true,
})
export class User extends Document{

    @Prop({ unique: [true, 'Username is already being used.']})
    name: string;

    @Prop()
    password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);