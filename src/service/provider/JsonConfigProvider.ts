import * as fs from 'fs';
import * as path from 'path';
import { IConfigProvider } from './IConfigProvider';

export class JsonConfigProvider implements IConfigProvider {
    private _path: string;

    constructor(path: string) {
        this._path = path;
    }

    public async readConfig(): Promise<Record<string, any>> {
        try {
            const json = fs.readFileSync(path.resolve(this._path));
            return JSON.parse(json as any);
        } catch (e) {
            return null;
        }
    }

    public async saveConfig(configObject: Record<string, any>): Promise<boolean> {
        try {
            fs.writeFileSync(this._path, JSON.stringify(configObject, null, 4) );
            return true;
        } catch (e) {
            console.log('Unable to save config');
            console.log(e);
            return false;
        }
    }

}
