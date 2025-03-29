const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Geolocation is not supported by your browser"));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                console.log(`Your current location: Latitude: ${latitude}, Longitude: ${longitude}`);
                resolve({ latitude, longitude });
            },
            (error) => {
                console.error("Error getting location:", error);
                reject(error);
            }
        );
    });
};

export default getCurrentLocation;
