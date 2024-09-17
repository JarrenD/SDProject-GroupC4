describe('back.js tests', () => {
  beforeEach(() => {
    jest.resetModules(); // Clear any cached modules to ensure fresh imports
    jest.clearAllMocks();
    document.body.innerHTML = `
      <button id="google-signout-btn"></button>
      <span id="userName"></span>
      <span id="userEmail"></span>
      <img id="userProfilePicture" />
    `;
    
    // Mock Firebase Auth
    jest.mock('firebase/auth', () => {
      return {
        getAuth: jest.fn(() => ({
          currentUser: {
            displayName: 'John Doe',
            email: 'john@example.com',
            photoURL: 'http://example.com/photo.jpg',
          },
        })),
        signOut: jest.fn(() => Promise.resolve()),
        onAuthStateChanged: jest.fn((auth, callback) => {
          // Immediately call the callback with a user object
          callback({
            displayName: 'John Doe',
            email: 'john@example.com',
            photoURL: 'http://example.com/photo.jpg',
          });
        }),
      };
    });
    
    // Re-import the file to ensure it runs with the mocked functions
    require('../back.js');
  });

  it('should call signOut when the signout button is clicked', () => {
    const signOutBtn = document.getElementById('google-signout-btn');
    signOutBtn.click();
    expect(require('firebase/auth').signOut).toHaveBeenCalled();
  });

  it('should update user profile onAuthStateChanged', () => {
    // Check the DOM updates
    expect(document.getElementById('userName').textContent).toBe('John Doe');
    expect(document.getElementById('userEmail').textContent).toBe('john@example.com');
    expect(document.getElementById('userProfilePicture').src).toBe('http://example.com/photo.jpg');
  });
});