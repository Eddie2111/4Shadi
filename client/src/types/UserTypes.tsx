interface IUserProps{
    data?: {
        user?: {
            _id: string;
            age: string
            birth_cert: string
            email: string;
            height: string;
            location: string;
            marriage_cert: string;
            name: string;
            nid_number: string;
            phone_number: string
            preferences: string;
            serial: string;
            gender: string;
            lookingFor: string;
        }
    },
    user?: {
        _id: string;
        age: string
        birth_cert: string
        email: string;
        height: string;
        location: string;
        marriage_cert: string;
        name: string;
        nid_number: string;
        phone_number: string
        preferences: string;
        serial: string;
        gender: string;
        lookingFor: string;
    }
}

//export
export type {IUserProps};
