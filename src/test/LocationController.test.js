import { LocationController } from '../controllers/LocationController';
import { LocationModel } from "../models/LocationModel.js";
import { auth } from '../models/firebase/firebaseConfig.js';

// Mock LocationModel and auth
jest.mock('../models/LocationModel.js');
jest.mock('../models/firebase/firebaseConfig.js', () => ({
  auth: {
    currentUser: null
  }
}));

describe('LocationController', () => {
  let locationController;
  let mockSaveLocation;

  beforeEach(() => {
    locationController = new LocationController();
    mockSaveLocation = jest.fn();
    LocationModel.mockImplementation(() => ({
      saveLocation: mockSaveLocation
    }));
  });

  describe('getUserLocation', () => {
    it('should resolve with geolocation data when navigator.geolocation is available', async () => {
      const mockPosition = {
        coords: {
          latitude: 40.7128,
          longitude: -74.0060
        }
      };
      const mockGetCurrentPosition = jest.fn((success) => success(mockPosition));
      global.navigator.geolocation = { getCurrentPosition: mockGetCurrentPosition };

      const location = await locationController.getUserLocation();
      expect(location).toEqual({
        latitude: 40.7128,
        longitude: -74.0060
      });
    });

    it('should reject with an error message when navigator.geolocation fails', async () => {
      const mockError = { message: 'Geolocation error' };
      const mockGetCurrentPosition = jest.fn((_, error) => error(mockError));
      global.navigator.geolocation = { getCurrentPosition: mockGetCurrentPosition };

      await expect(locationController.getUserLocation()).rejects.toEqual('Geolocation error');
    });

    it('should reject if geolocation is not supported', async () => {
      global.navigator.geolocation = undefined;

      await expect(locationController.getUserLocation()).rejects.toEqual('Geolocation is not supported by this browser.');
    });
  });

  describe('shareLocation', () => {
    it('should return error if getUserLocation fails', async () => {
      auth.currentUser = { uid: 'user123' };
      jest.spyOn(locationController, 'getUserLocation').mockRejectedValue('Geolocation error');

      const response = await locationController.shareLocation();

      expect(response).toEqual({ success: false, message: 'Geolocation error' });
    });
  });


  describe('shareVenue', () => {

    it('should return an error if user is not logged in when sharing a venue', async () => {
      auth.currentUser = null; // No user logged in
      const mockVenue = { id: 1, Name: 'Venue 1', Building: 'Building A' };

      const response = await locationController.shareVenue(mockVenue);

      expect(response).toEqual({ success: false, message: 'Please log in' });
    });

  
  });
});
