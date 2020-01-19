import {Controller, UseGuards} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('profile')
export class ProfileController {

}
