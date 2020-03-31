import 'jest';
import 'reflect-metadata';
import {AppConfig} from "../../../src/config/AppConfig";


describe('AppConfig', () => {
    let mockConfig;
    let appConfig: AppConfig;
    beforeEach(() => {
        mockConfig = {
            port: 1234,
            db: {
                type: 'json',
                path: 'test/path',
            },
        };
        appConfig = new AppConfig();
    });
    it('should propertly serialize a config', () => {
        appConfig.serialize(mockConfig);
        expect(appConfig.port).toBe(mockConfig.port);
        expect(appConfig.dbSettings.path).toBe(mockConfig.db.path);
        expect(appConfig.dbSettings.type).toBe(mockConfig.db.type);
    });

    it('should propertly deserialize config', () => {
        appConfig.serialize(mockConfig);
        expect(appConfig.deserialize()).toEqual(mockConfig);
    });
});
