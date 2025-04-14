import {
  Controller,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { memoryStorage } from 'multer';
import { AuthGuard } from 'modules/auth/guards/auth.guard';
import { CloudinaryService } from 'modules/cloudinary/cloudinary.service';
import { UploadUserAvatarDto } from 'modules/cloudinary/dtos/upload-user-avatar.dto';

@ApiTags('file-upload')
@Controller('file-upload')
export class CloudinaryController {
  constructor(private cloudinaryService: CloudinaryService) {}

  @Post('/user-avatar')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file', { storage: memoryStorage() }))
  @ApiOperation({ summary: 'Uploads user avatar' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadUserAvatarDto })
  @ApiResponse({
    status: 201,
    description: "Successfully uploaded user's avatar",
  })
  uploadUserAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const { userId } = req.body as UploadUserAvatarDto;

    return this.cloudinaryService.uploadUserAvatar(file, userId);
  }
}
