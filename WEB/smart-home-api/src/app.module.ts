import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SensorDataModule } from './sensorData/sensorData.module';

@Module({
  imports: [AuthModule, SensorDataModule],
})
export class AppModule { }
