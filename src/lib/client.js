// import axios from "axios";

// import * as dotenv from "dotenv";
// dotenv.config()

// const SERVER_URL = process.env("SERVER_URL");

export async function postAutomation(payload){
    // const { data } = await axios.post(SERVER_URL, payload)
    // return data
    console.log(payload)
    return {
        isOk: true,
    }
}