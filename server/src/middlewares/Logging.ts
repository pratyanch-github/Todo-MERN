import fs from "fs";
import path from "path";

import moment from "moment";
import momentTz from "moment-timezone";

momentTz.tz.setDefault("Asia/Kolkata");


const logFilePath = path.resolve(__dirname, '../../LOGFILE');

let count = 0;
export function LogUserActivity(req: any, res: any, next: any) {
    count++;

    // console.log(req.ip)

    let time = moment().format("HH:mm:ss DD/MM/YYYY")

    let user = req.body.user || req.query.user || req.body.username

    console.log(time + " " + (user !== undefined ? "USER " + "[" + user + "]" : "USER") + " requested: " + "[" + req.method + "] " + req.originalUrl + " ; requests: " + count)

    let data_to_log: string = time + " " + (user !== undefined ? "USER " + "[" + user + "]" : "USER") + " requested: " + "[" + req.method + "] " + req.originalUrl + " ; requests: " + count + "\n"

    try {
        fs.appendFile(logFilePath, data_to_log, function (err: any) {
            if (err) throw err;
            // console.log('Saved!');
        });
    }
    catch (err: any) {
        console.log(err)
    }

    next();
}
