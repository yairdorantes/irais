import axios from "axios";
import { api } from "./api.js";

export async function DetectFace(image) {
  try {
    const response = await axios.post(`${api}/face`, { image: image });
    return JSON.stringify(response.data.person_data);
  } catch (error) {
    console.log("error");
    return false;
  }
}
