import fs from 'fs';

export const readFile = (path: string) => {
    return fs.readFileSync(path, 'utf8');
}

export const readJsonFile = (path: string, { defaultValue = {} } = {}) => {
    try {
        return JSON.parse(readFile(path));
    } catch (error) {
        return defaultValue;
    }
}

export const writeFile = (path: string, data: string) => {
    fs.writeFileSync(path, data);
    console.log(`File ${path} written successfully`);
    return;
}

export const writeObjectToFile = (path: string, object: Record<string, any>, { pretty = false } = {}) => {
    writeFile(path, JSON.stringify(object, null, pretty ? 2 : undefined));
    return;
}

export const createFolderIfNotExists = (path: string) => {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path, { recursive: true });
        console.log(`Folder ${path} created successfully`);
    }
    return;
}   
