import * as fs from "fs";

export  const deleteFile = async (fileName: string)  => {
    await fs.unlink(`${fileName}`, (err) => {
        if (err) {
            console.error(err);
            return err;
        }
    });
}