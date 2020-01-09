import {Controller, Get} from '@nestjs/common';

@Controller('language')
export class LanguageController {

    @Get('/list')
    public list()
    {

    }
}
