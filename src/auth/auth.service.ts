import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>,
        private jwtService: JwtService
    ) {}

    async signUp(signUpDto: SignUpDto): Promise<{token: string}> {
        const{name,password} = signUpDto;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.userModel.create({
            name,
            password: hashedPassword
        })

        const token = this.jwtService.sign({id: user._id})
        return{token}
    }

    async login(loginDto: LoginDto): Promise<{token: string}> {
        const{name,password} = loginDto;

        const user = await this.userModel.findOne({name})

        if(!user){
            throw new UnauthorizedException('Invalid login')
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password)

        if(!isPasswordMatched){
            throw new UnauthorizedException('Invalid login')
        }
        const token = this.jwtService.sign({id: user._id})
        return{token}
    }
}
