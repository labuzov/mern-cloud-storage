import fs from "fs";
import File from "../models/File.js";
import config from "config"


class FileService {
    createDir(file) {
        const filePath = `${config.get('filesPath')}\\${file.user}\\${file.path}`;

        return new Promise((resolve, reject) => {
            try {
                if (!fs.existsSync(file)) {
                    fs.mkdirSync(filePath);

                    return resolve({message: 'File has been created'})
                } else {
                    return reject({message: 'File already exist'})
                }
            } catch(e) {
                console.log(e)
                return reject({message: 'File error'})
            }
        })
    }
}


export default new FileService