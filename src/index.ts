import { Container } from 'inversify';
import * as minimist from 'minimist';
import 'reflect-metadata';
import API_TYPES from './ApiTypes';
import { bootstrap } from './Bootstrap';
import { AppConfig } from './config/AppConfig';
import { HttpServer } from './http/HttpServer';
import { JsonConfigProvider } from './service/provider/JsonConfigProvider';

const args = minimist(process.argv.slice(2));
let APP_CONFIG_FILE;
if(args.testing) {
    console.log('Application is running in testing mode.')
    APP_CONFIG_FILE = './testing-app-config.json';
} else {
    APP_CONFIG_FILE = './app-config.json';
}

const container = new Container();
const configProvider = new JsonConfigProvider(APP_CONFIG_FILE);

(async () => {
    const configObject = await configProvider.readConfig();
    const appConfig = new AppConfig();
    if (configObject !== null) {
        appConfig.serialize(configObject);
    } else {
        configProvider.saveConfig(appConfig.deserialize());
        console.log(`Config not found. Empty config has been created. Check ${APP_CONFIG_FILE} and restart the service.`);
        process.exit(1);
    }

    bootstrap(container, appConfig);
    try {
        const server: HttpServer = container.get(API_TYPES.HttpServer);
        server.start();
    } catch (e) {
        console.log(e);
    }
})();

