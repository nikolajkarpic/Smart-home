import { Module } from "@nestjs/common";
import { ContactMeMailerService } from "./contactMe.service";
import { ContactMeMailerController } from "./contactMeMailer.controller";

@Module({
    controllers: [ContactMeMailerController],
    providers: [ContactMeMailerService]
})
export class ContactMeMailerModule {

}