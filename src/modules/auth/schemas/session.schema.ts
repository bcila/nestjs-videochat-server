import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { timeStringToMs } from '../../../common/helpers/time.helper';

const deviceInfoType = {
  browser: {
    name: { type: String },
    version: { type: String },
    major: { type: String },
    type: { type: String },
  },
  cpu: {
    architecture: { type: String },
  },
  device: {
    type: { type: String },
    model: { type: String },
    vendor: { type: String },
  },
  engine: {
    name: { type: String },
    version: { type: String },
  },
  os: {
    name: { type: String },
    version: { type: String },
  },
};

@Schema({ versionKey: false })
export class Session {
  @Prop({ required: true, index: true })
  userId: string;
  @Prop({ required: true })
  refreshToken: string;
  @Prop({ type: deviceInfoType, _id: false })
  deviceInfo: {
    browser: { name: string; version: string; major: string; type: string };
    cpu: { architecture: string };
    device: { name: string; model: string; version: string };
    engine: { name: string; version: string };
    os: { name: string; version: string };
  };
  @Prop({ required: true, default: Date.now(), type: Date })
  createdAt: Date;
  @Prop({ required: true, type: Date, expires: timeStringToMs('7d') })
  expiresAt: Date;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
