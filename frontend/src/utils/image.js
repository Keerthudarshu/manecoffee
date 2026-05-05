const CLOUD_NAME = "dletwba1e";

export const getImage = (path, width = 800) => {
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/f_auto,q_auto,w_${width}${path}`;
};