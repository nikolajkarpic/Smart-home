import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { SensorDataModule } from './sensorData/sensorData.module';
import { ThermostatModule } from './thermostat/thermostat.module';
import { UserModule } from './user/user.module';
import { SmartHomeModule } from './smartHome/smartHome.module';
import { OccupantModule } from './occupant/occupant.module';
import { ContactMeMailerModule } from './contactMeMailer/contactMeMailer.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    AuthModule,
    SensorDataModule,
    PrismaModule,
    ThermostatModule,
    UserModule,
    SmartHomeModule,
    OccupantModule,
    ContactMeMailerModule]
})
export class AppModule { }
