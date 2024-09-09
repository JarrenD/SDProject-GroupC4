import { db } from "./firebase/firebaseConfig.js";
import { ref, set } from "firebase/database";

export class LocationModel {
  async saveLocation(userId, locationData) {
    try {
      await set(ref(db, 'locations/' + userId), locationData);
      return { success: true, location: locationData, message: "Location shared successfully." };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
