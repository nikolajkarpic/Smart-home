import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { StringifyOptions } from "querystring";
import { contactMeMailerDto } from "./dto";

const nodemailer = require('nodemailer')
const { google } = require('googleapis')

@Injectable()
export class ContactMeMailerService {
    constructor(private config: ConfigService) { }

    async sendMail(dto: contactMeMailerDto) {

        const CLIENT_ID: string = this.config.get("CLIENT_ID");
        const CLIENT_SECRET: string = this.config.get("CLIENT_SECRET");
        const REFRESH_TOKEN: string = this.config.get("REFRESH_TOKEN");
        const REDIRECT_URL: string = this.config.get("REDiRECT_URL");
        const msg: string = 'Name:' + dto.firstName + " " + dto.lastName + '\nEmail: ' + dto.email + '\n' + 'Phone number: ' + dto.phoneNumber + '\nFrom: ' + dto.city + '\n'
            + 'Has contacted you about Smart Home.';

        const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL)
        oAuth2Client.setCredentials({
            refresh_token: REFRESH_TOKEN
        })

        try {
            const accessToken = await oAuth2Client.getAccessToken();

            const transport = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: 'ee1422017ftn@gmail.com',
                    clientId: CLIENT_ID,
                    clientSecret: CLIENT_SECRET,
                    refreshToken: REFRESH_TOKEN,
                    accessToken: accessToken
                }
            })

            const mailOptions = {
                from: 'SmartHome <ee1422017ftn@gmail.com>',
                to: 'karpicnikolaj@gmail.com',
                subject: 'SmartHome',
                text: msg,
            }

            const result = await transport.sendMail(mailOptions);
        } catch (error) {

        }

    }
}