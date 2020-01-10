import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { ClientModule } from './client/client.module';
import { AdminModule } from './admin/admin.module';
import { EntityModule } from './entity/entity.module';

@Module({
  imports: [
    CoreModule,
    ClientModule,
    AdminModule,
    EntityModule,
  ],
  controllers: [],
  providers: [],

})
export class AppModule {}
