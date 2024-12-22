import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { UAParser } from 'ua-parser-js';
import DeviceInfo from '../interfaces/device-info.interface';

@Injectable()
export class DeviceInfoMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const userAgent = req.get('User-Agent');
    const agent = UAParser(userAgent);
    req['deviceInfo'] = {
      browser: {
        name: agent.browser.name,
        version: agent.browser.version,
        major: agent.browser.major,
        type: agent.browser.type,
      },
      cpu: {
        architecture: agent.cpu.architecture,
      },
      device: {
        type: agent.device.type,
        model: agent.device.model,
        vendor: agent.device.vendor,
      },
      engine: {
        name: agent.engine.name,
        version: agent.engine.version,
      },
      os: {
        name: agent.os.name,
        version: agent.os.version,
      },
    } as DeviceInfo;
    next();
  }
}
