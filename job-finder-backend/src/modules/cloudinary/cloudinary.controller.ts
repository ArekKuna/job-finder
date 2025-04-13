import {
  Controller,
  Post,
  UploadedFile,
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
import { CloudinaryService } from 'modules/cloudinary/cloudinary.service';
import { UploadUserAvatarDto } from 'modules/cloudinary/dtos/upload-user-avatar.dto';

@ApiTags('file-upload')
@Controller('file-upload')
export class CloudinaryController {
  constructor(private cloudinaryService: CloudinaryService) {}

  @Post('/user-avatar')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Uploads user avatar' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: UploadUserAvatarDto })
  @ApiResponse({
    status: 201,
    description: "Successfully uploaded user's avatar",
  })
  uploadUserAvatar(@UploadedFile() file: Express.Multer.File) {
    return { success: true };
  }
}
