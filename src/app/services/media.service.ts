import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';



class mediaService {

    public uploadImage = async (file) => {
        console.log(file);

        if (!file) return;

        const storageRef = ref(storage, `images/${file.name}`);

        try {
            // Upload the file to Firebase Storage
            const snapshot = await uploadBytes(storageRef, file);
            console.log('Uploaded a blob or file!');

            // Get the download URL for the uploaded file
            const downloadURL = await getDownloadURL(snapshot.ref);
            console.log('File available at', downloadURL);

            return downloadURL; // You can return or save the URL as needed
        } catch (error) {
            console.error('Upload failed:', error);
            throw error; // Handle the error as needed
        }
    };
}

export default Object.freeze(new mediaService)