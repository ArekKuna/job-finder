import { Module } from '@nestjs/common';
import { CloudinaryController } from 'modules/cloudinary/cloudinary.controller';
import { CloudinaryService } from 'modules/cloudinary/cloudinary.service';

@Module({
  controllers: [CloudinaryController],
  providers: [CloudinaryService],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
