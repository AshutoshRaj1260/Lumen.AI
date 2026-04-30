import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.PROD ? "" : "http://localhost:3000",
    withCredentials: true,
})

export const analyzeWebsite = async ({ url }) => {
    console.log("Sending URL from API:", url);
    const response = await api.post("/api/analyze/website", {
        url: url
    });
    console.log("API response", response.data);

    return response.data;
}


