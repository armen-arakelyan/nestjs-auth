import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { IUser } from '../interfaces';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getAll() {
        return this.userService.getAll()
    }

    @Get('getUser/:id')
    getOne(@Param('id') id: string) {
        return this.userService.getOne(id);
    }

    @Post('addUser')
    addUser(@Body() { email, password }: IUser) {
        if (!email || !password) {
            return 'All fields are required';
        }
        return this.userService.addUser(email, password)
    }

    @Put('updateUser/:id')
    updateUser(@Param('id') id: string, @Body() { email, password }: IUser) {
        if (!id) {
            return 'Id field are required';
        }

        if (!email && !password) {
            return 'Email or Password are required'
        }

        return this.userService.updateUser(id, email, password);
    }

    @Delete('deleteUser/:id')
    deleteUser(@Param('id') id: string) {
        if (!id) {
            return 'Id field are required';
        }

        return this.userService.deleteUser(id);
    }
}
