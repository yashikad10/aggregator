"use server";
import axios from "axios";

export const getCollections = async () => {
  try {
    const apiUrl = "/api/collections";
    const response = await axios.get(apiUrl);
    return response.data.collections;
  } catch (err: any) {
    console.error("Error fetching data:", err);
    throw new Error("Error fetching data");
  }
};
