export interface IConfigProvider {
    readConfig(): Promise<Record<string, any>>;
    saveConfig(configObject: Record<string, any>): Promise<boolean>;
}
