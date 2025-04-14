import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Readable } from 'stream';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { UsersService } from 'modules/users/users.service';
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

  async uploadUserAvatar(file: Express.Multer.File, userId: string) {
    const user = await this.usersService.findUserById(userId);

    const uploadedResource = await this.findResourcedByPublicId(
      'avatars',
      userId,
    );

    if (uploadedResource) {
      await this.deleteResource('avatars', userId);
    }

    const streamUpload = (fileBuffer: Buffer): Promise<UploadApiResponse> => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'avatars',
            public_id: user?.id,
            resource_type: 'image',
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
    };

    await streamUpload(file.buffer);
    return { success: true };
  }

  async deleteResource(
    resourceFolder: 'avatars',
    publicId: string,
  ): Promise<void> {
    const result = (await cloudinary.uploader.destroy(
      `${resourceFolder}/${publicId}`,
    )) as UploadApiResponse;

    if (result.result !== 'ok') {
      throw new Error('Failed to delete avatar from Cloudinary.');
    }
  }

  async findResourcedByPublicId(
    resourceFolder: 'avatars',
    publicId: string,
  ): Promise<UploadApiResponse | null> {
    try {
      const result = (await cloudinary.api.resource(
        `${resourceFolder}/${publicId}`,
      )) as UploadApiResponse;

      return result;
    } catch (err: any) {
      if (err?.error?.http_code === 404 || err?.http_code === 404) {
        return null;
      }

      throw new Error(
        `Cloudinary resource fetch failed: ${err?.error?.message || 'Unknown error'}`,
      );
    }
  }
}
