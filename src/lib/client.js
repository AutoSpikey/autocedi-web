
import axios from "axios";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export async function postAutomation(payload) {

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

export async function getAutomations(){
    console.log(SERVER_URL)
    try {
        const { data } = await axios
            .get(`${SERVER_URL}/automations`, {
                headers: {
                    "Content-Type": "application/json",
                },
            })
        console.log(data)

        return data;
    } catch (error) {
        console.error("Error:", error);
        throw error;
    }
}
