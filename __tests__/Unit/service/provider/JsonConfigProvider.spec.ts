import * as fs from 'fs';
import 'jest';
import 'reflect-metadata';
import { IConfigProvider } from '../../../../src/service/provider/IConfigProvider';
import { JsonConfigProvider } from '../../../../src/service/provider/JsonConfigProvider';

describe('JsonConfigProvider', () => {
    const TEST_PATH = './test.json';
    let configProvider: IConfigProvider;

    beforeEach(() => {
        configProvider = new JsonConfigProvider(TEST_PATH);
    });

    it('should propertly read json file', async () => {
        const json = {
            test: 123,
            test2: 'test',
        };
        fs.writeFileSync(TEST_PATH, JSON.stringify(json));
        const config = await configProvider.readConfig();
        expect(config.test).toBe(json.test);
        expect(config.test2).toBe(json.test2);
        fs.unlinkSync(TEST_PATH);
    });

    it('should not read json if does not exist', async () => {
        const config = await configProvider.readConfig();
        expect(config).toBeNull();
    });

    it('should write config', async () => {
        const json = {
            test: 123,
            test2: 'test',
        };

        const save = await configProvider.saveConfig(json);
        expect(save).toBeTruthy();
        const config = await configProvider.readConfig();
        expect(config.test).toBe(json.test);
        expect(config.test2).toBe(json.test2);
        fs.unlinkSync(TEST_PATH);
    });
});
