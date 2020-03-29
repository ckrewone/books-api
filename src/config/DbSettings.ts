import { DbTypes } from './DbTypes';
import { ISettings } from './ISettings';

export class DbSettings implements ISettings {
    private _type: DbTypes;
    private _path: string;

    get type(): DbTypes {
        return this._type;
    }

    get path(): string {
        return this._path;
    }

    public serialize(data: Record<string, any>): void {
        if (data.type) {
            this._type = data.type;
        }
        if (data.path) {
            this._path = data.path;
        }
    }

    public deserialize(): Record<string, any> {
        return {
            type: this._type,
            path: this._path,
        };
    }
}
