// Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-analytics.js";
  import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCxOv8jIRXK-5rvW6QWsq18n_pQX9HG3s0",
    authDomain: "web-auth-39b45.firebaseapp.com",
    projectId: "web-auth-39b45",
    storageBucket: "web-auth-39b45.firebasestorage.app",
    messagingSenderId: "140032041040",
    appId: "1:140032041040:web:7ba19aa213d609cdd6b155",
    measurementId: "G-EWQPVHDS35"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const auth = getAuth();


// submit 
const submit = document.getElementById("submit");
submit.addEventListener("click", function(event) {
    event.preventDefault()

    //   inputs
const email = document.getElementById("email").value;
const password = document.getElementById("password").value;
    
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    alert("Account successfully created!");
    window.location.href = "welcome.html";
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("Error: " + errorMessage);
    // ..
  });

})