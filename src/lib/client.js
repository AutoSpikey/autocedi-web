
import axios from "axios";

export async function postAutomation(payload) {
    const SERVER_URL = import.meta.env.VITE_SERVER_URL;

    try {
        const { data } = await axios
            .post(`${SERVER_URL}/automations`, payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            })

        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }

}