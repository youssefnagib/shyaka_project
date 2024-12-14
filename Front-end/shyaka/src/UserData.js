// GetUserData.js
const fetchUserData = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
        console.log("No token found, user is not logged in.");
        return null;
    }

    try {
        const response = await fetch('http://localhost:8000/api/userinfo/', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Include token in Authorization header
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        return data; // Return the full user data
    } catch (error) {
        console.error("Error fetching user data:", error);
        return null;
    }
};

export default fetchUserData;
