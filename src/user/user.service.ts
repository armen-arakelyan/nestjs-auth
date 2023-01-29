import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { IUser } from '../interfaces';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<IUser>) {}

    getAll() {
        return this.userModel.find({});
    }

    getOne(id: string) {
        return this.userModel.findById(id);
    }

    async addUser(email: string, password: string) {
        const cryptedPassword = await bcrypt.hash(password, 10);
        const user = new this.userModel({
            email,
            password: cryptedPassword
        })

        await user.save();

        return user;
    }

    async updateUser(id: string, email?: string, password?: string) {
        const findedUser = await this.userModel.findById(id);

        if (!findedUser) {
            return "We haven't user by that id!"
        }

        const updateData = {} as IUser;

        if (email) {
            updateData.email = email;
        }

        if (password) {
            const cryptedPassword = await bcrypt.hash(password, 10);
            updateData.password = cryptedPassword;
        }

        await findedUser.updateOne(updateData);

        return `Updated user id:${id}`;
    }

    async deleteUser(id: string) {
        await this.userModel.deleteOne({ _id: id })
        return `Deleted user id:${id}`;
    }
}
