import { Body, Controller, Post } from "@nestjs/common";
import { ContactMeMailerService } from "./contactMe.service";
import { contactMeMailerDto } from "./dto";

@Controller('contactMe')
export class ContactMeMailerController {
    constructor(private contactMeMailerService: ContactMeMailerService) { }
    @Post()
    sendEmail(@Body() dto: contactMeMailerDto) {
        return this.contactMeMailerService.sendMail(dto);
    }
}