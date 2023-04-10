import * as fs from 'fs';

export function isDocker(){
    console.log(fs?.existsSync("/usr") !== undefined)
    return fs?.existsSync("/usr") !== undefined;
}