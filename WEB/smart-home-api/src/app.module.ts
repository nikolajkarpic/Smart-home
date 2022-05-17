import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { SensorDataModule } from './sensorData/sensorData.module';
import { ThermostatModule } from './thermostat/thermostat.module';

@Module({
  imports: [AuthModule, SensorDataModule, PrismaModule, ThermostatModule]
})
export class AppModule { }
