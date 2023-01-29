import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { IUser } from '../interfaces';

const message = 'Invalid credentials';

@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private readonly authModel: Model<IUser>) {}

    async login(email: string, password: string) {
        const existsUser = await this.authModel.findOne({ email });

        if (!existsUser) {
            return message
        }

        const cryptedPassword = bcrypt.compareSync(password, existsUser.password);

        if (!cryptedPassword) {
            return message
        }

        return `Hello ${existsUser.email}`
    }
}
