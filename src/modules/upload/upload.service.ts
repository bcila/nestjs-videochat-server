import { Injectable } from '@nestjs/common';
import {
  ListBucketsCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UploadService {
  private readonly s3Client = new S3Client({
    region: this.configService.get<string>('s3.region'),
    credentials: {
      accessKeyId: this.configService.get<string>('s3.accessKey'),
      secretAccessKey: this.configService.get<string>('s3.secretAccessKey'),
    },
    endpoint: this.configService.get<string>('s3.endpoint'),
    forcePathStyle: this.configService.get<boolean>('s3.forcePathStyle'),
  });

  constructor(private readonly configService: ConfigService) {}

  async upload(fileName: string, file: Buffer, contentType: string) {
    // const today = new Date();
    // const dateStr = today.toISOString().split('T')[0].replace(/-/g, ''); // '2024-12-18' -> '20241218'

    // fileName = randomUUID() + '_' + dateStr + '.' + contentType.split('/')[1];

    const command = new PutObjectCommand({
      Bucket: 'avatars',
      Key: fileName,
      Body: file,
      ContentType: contentType,
    });

    const response = await this.s3Client.send(command);

    const avatarPath = `${this.configService.get('s3.endpoint')}/avatars/${fileName}?x-id=GetObject`;
  }

  getBuckets() {
    const command = new ListBucketsCommand({});
    return this.s3Client.send(command);
  }
}
