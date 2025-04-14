import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CloudinaryController } from 'modules/cloudinary/cloudinary.controller';
import { CloudinaryService } from 'modules/cloudinary/cloudinary.service';
import { UsersModule } from 'modules/users/users.module';

@Module({
  imports: [ConfigModule, UsersModule],
  controllers: [CloudinaryController],
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
