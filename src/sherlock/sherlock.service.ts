import { Injectable } from "@nestjs/common";
import { spawn } from "child_process";

export interface SherlockResult {
    positive: boolean;
    name: string;
    result: string;
}

const patternLine = /(.*)(\r?\n)/;
const patternResult = /\[([+\-])] (.+): (.+)/;

export class SherlockInstance {
    private readonly _username: string;
    private readonly _results: SherlockResult[] = [];
    private started = false;
    private buffer = "";

    constructor(username: string) {
        this._username = username;
    }

    get username(): string {
        return this._username;
    }

    get results(): SherlockResult[] {
        return this._results;
    }

    start(): void {
        if (this.started) {
            console.warn("Process has already started");
            return;
        }
        this.started = true;
        const process = spawn("python3", ["sherlock", "--print-all", "--timeout", "3", this.username], {
            cwd: "E:\\Daten\\Repositories\\Git\\sherlock",
        });
        process.addListener("message", message => console.debug(`message: "${message}"`));
        process.stdout.on("data", data => {
            this.processData(data);
            //console.error(`stdout: "${data}"`);
        });
        process.stderr.on("data", data => {
            //console.error(`stderr: "${data}"`);
        });
        process.on("close", code => {
            console.log(`process exit code: ${code}`);
        });
    }

    private processData(data: string): void {
        if (!data) {
            if (this.buffer.length > 0) {
                this.onLine(this.buffer);
                this.buffer = "";
            }
            return;
        }
        this.buffer += data;
        let match;
        while ((match = this.buffer.match(patternLine))) {
            this.buffer = this.buffer.substring(match[0].length);
            this.onLine(match[1]);
        }
    }

    private onLine(line: string): void {
        if (!line) {
            return;
        }
        const match = line.match(patternResult);
        if (!match) {
            return;
        }
        const result: SherlockResult = { positive: "+" === match[1], name: match[2], result: match[3] };
        console.debug(result);
        this._results.push(result);
        //TODO Or trigger some kind of event emitter etc...
    }
}

@Injectable()
export class SherlockService {
    private readonly instances: { [key: string]: SherlockInstance } = {};

    lookUp(username: string): void {
        let instance = this.instances[username];
        if (instance) {
            //TODO notifiy about this or idk
            return;
        }
        instance = new SherlockInstance(username);
        this.instances[username] = instance;
        instance.start();
    }
}
