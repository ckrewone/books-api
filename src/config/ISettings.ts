export interface ISettings {
    serialize(object: Record<string, any>): void;
    deserialize(): Record<string, any>;
};
