import { Injectable } from '@nestjs/common';
import {
  GetObjectCommand,
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
      accessKeyId: this.configService.get('s3.accessKey'),
      secretAccessKey: this.configService.get('s3.secretAccessKey'),
    },
    endpoint: this.configService.get('s3.endpoint'),
    forcePathStyle: true,
  });

  constructor(private readonly configService: ConfigService) {}

  async upload(fileName: string, file: Buffer, contentType: string) {
    const command = new PutObjectCommand({
      Bucket: 'avatars',
      Key: fileName,
      Body: file,
      ContentType: contentType,
    });

    const response = await this.s3Client.send(command);
    console.log(response);
    const getCom = new GetObjectCommand({ Bucket: 'avatars', Key: fileName });
    const ress = await this.s3Client.send(getCom);
    console.log(ress);
  }

  getBuckets() {
    const command = new ListBucketsCommand({});
    return this.s3Client.send(command);
  }
}
