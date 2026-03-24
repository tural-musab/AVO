import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller()
export class HealthController {
  @Get('health')
  health() {
    return {
      status: 'ok',
      service: 'avo-api',
      version: '1.0.0',
      timestamp: new Date().toISOString(),
    };
  }
}
