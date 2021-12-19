import * as express from "express";
//import * as httpStatus from 'http-status';
import * as bodyParser from "body-parser";
import { Injectable, OnInit } from '@angular/core';
import {Mail} from "./mail";


@Injectable({
    providedIn: 'root',
})

export class Send {
    mail = new Mail
    public send: express.Application;

    constructor() {
        this.send = express();
        this.send.use(bodyParser.json());
        this.routes();
    }
    routes() {

        this.send.route("/").get((req, res) => {
            res.send({ 'result': 'version 0.0.2' })
        });

        this.send.route("/").post((req, res) => {
            const message = Object.assign({}, req.body);     
            
            this.mail.to = message.to;
            this.mail.subject = message.subject;
            this.mail.message = message.message;
            let result = this.mail.sendMail();

            res.status(200).json({ 'result': result })
        });


    }
}
