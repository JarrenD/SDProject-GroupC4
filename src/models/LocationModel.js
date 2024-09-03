// src/models/LocationModel.js
//import database from "../firebase/firebaseConfig";

export class LocationModel {
  constructor(userId) {
    this.userId = userId;
  }

  async saveLocation(locationData) {
    try {
      //await database.ref('locations/' + this.userId).set(locationData);
      return { success: true, location: locationData, message: "Location shared successfully." };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}
