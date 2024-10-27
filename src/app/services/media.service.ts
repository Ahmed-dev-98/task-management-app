/* eslint-disable @typescript-eslint/no-explicit-any */
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';



class mediaService {

    public uploadImage = async (file: any) => {

        if (!file) return;

        const storageRef = ref(storage, `images/${file.name}`);

        try {
            const snapshot = await uploadBytes(storageRef, file);
            const downloadURL = await getDownloadURL(snapshot.ref);
            console.log('File available at', downloadURL);

            return downloadURL;
        } catch (error) {
            console.error('Upload failed:', error);
            throw error;
        }
    };
}

export default Object.freeze(new mediaService)