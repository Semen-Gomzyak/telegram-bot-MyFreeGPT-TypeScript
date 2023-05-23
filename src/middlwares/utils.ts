import { promises as fsPromises } from 'fs';

async function removeFile(path: string): Promise<void> {
    try {
        await fsPromises.unlink(path);
    } catch (error: any) {
        console.error("Error while removing file", error.message)
    }
};

export default removeFile;