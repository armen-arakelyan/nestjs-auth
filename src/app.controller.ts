import { Controller, Get } from '@nestjs/common';

@Controller('api')
export class AppController {

    @Get('getAll')
    getAll() {
        return 'hello world'
    }
}
