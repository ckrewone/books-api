import { Container } from 'inversify';
import 'reflect-metadata';
import API_TYPES from './ApiTypes';
import { bootstrap } from './Bootstrap';
import { AppConfig } from './config/AppConfig';
import { HttpServer } from './http/HttpServer';
import { JsonConfigProvider } from './service/provider/JsonConfigProvider';

const APP_CONFIG_FILE = 'app-config.json';

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
        const server = container.get<HttpServer>(API_TYPES.HttpServer);
        server.start();
    } catch (e) {
        console.log(e);
    }
})();

