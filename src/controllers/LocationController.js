import { LocationModel } from "../models/LocationModel";
import { auth } from '../../models/firebase/firebaseConfig.js';

export class LocationController {
  constructor() {
    this.locationModel = new LocationModel();
  }

  async getUserLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            });
          },
          (error) => {
            reject(error.message);
          }
        );
      } else {
        reject("Geolocation is not supported by this browser.");
      }
    });
  }

  async shareLocation() {
    try {
      const location = await this.getUserLocation();
      const user = auth.currentUser;

      if (!user){
        throw new Error("Please log in");
      }

      const timestamp = new Date().toISOString();

      const locationData = {
        user_id: user.uid,
        latitude: location.latitude,
        longitude: location.longitude,
        timestamp: timestamp
      };

      return await this.locationModel.saveLocation(user.uid,locationData);
    } catch (error) {
      return { success: false, message: error };
    }
  }
}
