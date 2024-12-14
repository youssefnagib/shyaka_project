import fetchUserData from "./UserData"
import React, { useEffect, useState } from 'react';
const GetUserData = () => {


    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [username, setUsername] = useState(null);


    useEffect(() => {
        const getUserData = async () => {
            const user = await fetchUserData();
            if (user) {
                setFirstName(user.first_name);
                setLastName(user.lastName);
                setEmail(user.email);
                setUsername(user.username);
            } else {
                setFirstName("Guest");
                setLastName("User");
                setEmail("guest@example.com");
                setUsername("guest");
            }
        };

        getUserData();
    }, []);
}

export default GetUserData;