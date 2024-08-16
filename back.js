import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBEbqPXRCr6BcsTBoM6VKiHcAFVVkqSW7E",
    authDomain: "creativetutorial-ba1bf.firebaseapp.com",
    projectId: "creativetutorial-ba1bf",
    storageBucket: "creativetutorial-ba1bf.appspot.com",
    messagingSenderId: "945665449612",
    appId: "1:945665449612:web:7cb4ac69350bfc6ad065a9"
};

 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);

 const googleLogout = document.getElementById("google-signout-btn");
 googleLogout.addEventListener("click",function(){
    signOut(auth).then(() => {
        alert("User has successfully signed out");
        window.location.href = 'LogIn.html';
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  })

 const user = auth.currentUser;

 function updateUserProfile(user){
   const userName = user.displayName;
   const userEmail = user.email;
   const userProfilePicture = user.photoURL;

   document.getElementById("userName").textContent = userName;
   document.getElementById("userEmail").textContent = userEmail;
   document.getElementById("userProfilePicture").src = userProfilePicture;
 }
 onAuthStateChanged(auth, (user)=>{
   if(user){
       updateUserProfile(user);
       const uid = user.uid;
        return uid;
    }else{
        console.log("Create Account and Login");
    }
 })
 

