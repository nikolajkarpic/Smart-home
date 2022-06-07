import { Controller, Post } from "@nestjs/common";
import { ContactMeMailerService } from "./contactMe.service";

@Controller('contactMe')
export class ContactMeMailerController {
    constructor(private contactMeMailerService: ContactMeMailerService) { }
    @Post()
    sendEmail() {
        return this.contactMeMailerService.sendMail()
    }
}