import { LocationModel } from '../models/LocationModel';
import { ref, set, getDatabase } from 'firebase/database';  // Adjust imports as needed

// Mock Firebase functions
jest.mock('firebase/database', () => ({
  ref: jest.fn(),
  set: jest.fn(),
  getDatabase: jest.fn(),
}));

describe('LocationModel', () => {
  let locationModel;
  const userId = 'user123';
  const locationData = {
    latitude: 40.7128,
    longitude: -74.0060,
    timestamp: new Date().toISOString()
  };

  beforeEach(() => {
    locationModel = new LocationModel();
  });

  describe('saveLocation', () => {
    it('should save location successfully and return success message', async () => {
      // Arrange
      const mockRef = jest.fn();
      const mockSet = jest.fn().mockResolvedValueOnce(true);

      ref.mockImplementation(mockRef);
      set.mockImplementation(mockSet);

      // Act
      const response = await locationModel.saveLocation(userId, locationData);

      // Assert
      expect(mockSet).toHaveBeenCalledWith(mockRef(`locations/${userId}`), locationData);
      expect(response).toEqual({
        success: true,
        location: locationData,
        message: 'Location shared successfully.'
      });
    });

    it('should return an error message if save fails', async () => {
      // Arrange
      const errorMessage = 'Failed to save location';
      const mockRef = jest.fn();
      const mockSet = jest.fn().mockRejectedValueOnce(new Error(errorMessage));

      ref.mockImplementation(mockRef);
      set.mockImplementation(mockSet);

      // Act
      const response = await locationModel.saveLocation(userId, locationData);

      // Assert
      expect(mockSet).toHaveBeenCalledWith(mockRef(`locations/${userId}`), locationData);
      expect(response).toEqual({
        success: false,
        message: errorMessage
      });
    });
  });
});
