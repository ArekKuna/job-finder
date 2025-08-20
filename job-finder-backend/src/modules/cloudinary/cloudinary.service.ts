import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { UsersService } from 'modules/users/users.service';
import { BooleanResponseDto } from 'common/dtos/boolean-resposne.dto';
@Injectable()
export class CloudinaryService {
  constructor(
    private usersService: UsersService,
    private configService: ConfigService,
  ) {
    cloudinary.config({
      cloud_name: this.configService.get('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get('CLOUDINARY_API_SECRET'),
    });
  }

  async uploadUserAvatar(
    file: Express.Multer.File,
    userId: string,
  ): Promise<BooleanResponseDto> {
    const user = await this.usersService.findUserById(userId);

    if (!user) {
      throw new NotFoundException();
    }

    const result = await this.streamUpload(file.buffer, user.id);

    const optimizedUrl = cloudinary.url(result.public_id, {
      width: 800,
      height: 800,
      crop: 'fill',
      quality: 'auto:good',
      secure: true,
      version: result.version,
    });

    await this.usersService.updateUser(userId, {
      avatar_url: optimizedUrl,
    });

    return { success: true };
  }

  private streamUpload(
    fileBuffer: Buffer,
    userId: string,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'avatars',
          public_id: userId,
          resource_type: 'image',
          format: 'webp',
          overwrite: true,
          invalidate: true,
        },
        (error, result) => {
          if (error || !result) {
            return reject(
              new Error(
                error?.message || 'Something went wrong during file upload.',
              ),
            );
          }

          resolve(result);
        },
      );

      Readable.from(fileBuffer).pipe(stream);
    });
  }
}
