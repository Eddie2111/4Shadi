//'use server';
import axios from 'axios';

interface IUpdateHandler {
    id: string;
    images?: string[];
    profileImage?: string;
}

export default async function Updatehandler(data:IUpdateHandler): boolean{
    if (data.profileImage) {
        // update profile image
        const response = await axios.post('http://localhost:3500/update',
            {
                serial: id,
                profileImage: profileImage,
                images: sentImages
            },
        );
        return response
    }
    if (data.images) {
        // update images
        const response = await axios.post('http://localhost:3500/update',
            {
                serial: data.id,
                images: data.images
            },
        );
        console.log(response)
        return response
    }

}