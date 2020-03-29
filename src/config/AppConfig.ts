import { injectable } from 'inversify';
import { DbSettings } from './DbSettings';
import { ISettings } from './ISettings';

@injectable()
export class AppConfig implements ISettings {
    private _host: string = 'localhost';
    private _port: number = 8080;
    private _dbSettings: DbSettings = new DbSettings();

    get host(): string {
        return this._host;
    }

    get port(): number {
        return this._port;
    }

    get dbSettings(): DbSettings {
        return this._dbSettings;
    }

    public deserialize(): Record<string, any> {
        return {
            host: this._host,
            port: this._port,
            db: this._dbSettings.deserialize(),
        };
    }

    public serialize(object: Record<string, any>): void {
        if (object.host) {
            this._host = object.host;
        }
        if (object.port) {
            this._port = object.port;
        }
        if (object.db) {
            this._dbSettings = new DbSettings();
            this._dbSettings.serialize(object.db);
        }
    }
}
