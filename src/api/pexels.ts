import axios from "axios";

const API_KEY = "lq5d3n6pQ20ivcQatUrShcI642jSUCIi5I2BS8PYI4uATJlHR0nZ21va";
const BASE_URL = "https://api.pexels.com/v1/";

export const fetchPhotos = async (query = "nature", perPage = 5, page = 1) => {
    try {
        const response = await axios.get(`${BASE_URL}search`, {
            headers: { Authorization: API_KEY },
            params: { query, per_page: perPage, page },
        });
        return response.data.photos;
    } catch (error: any) {
        if (error.response && error.response.status === 429) {
            console.error("Too many requests! Please wait.");
        } else {
            console.error("Failed to fetch photos:", error.message);
        }
        return [];
    }
};

export const fetchPhotoById = async (id: string) => {
    const response = await axios.get(`${BASE_URL}photos/${id}`, {
        headers: {
            Authorization: API_KEY,
        },
    });
    return response.data;
};
