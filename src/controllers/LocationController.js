// src/controllers/LocationController.js
import { LocationModel } from "../models/LocationModel";

export class LocationController {
  constructor(user) {
    this.user = user;
    this.locationModel = new LocationModel(user.getUserId());
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

  async shareLocation(description) {
    try {
      const location = await this.getUserLocation();
      const locationData = {
        latitude: location.latitude,
        longitude: location.longitude,
        description: description || ""
      };

      return await this.locationModel.saveLocation(locationData);
    } catch (error) {
      return { success: false, message: error };
    }
  }
}
