// 🔥 Firebase v12 imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import { 
   getAuth, 
   onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";
import { 
  getDatabase, 
  ref, 
  push, 
  onValue,
  onChildAdded
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";
// 🔥 LISTEN FOR NEW IMAGES




// 🔥 Firebase Config (replace with YOUR config)
const firebaseConfig = {
  apiKey: "AIzaSyCxOv8jIRXK-5rvW6QWsq18n_pQX9HG3s0",
  authDomain: "web-auth-39b45.firebaseapp.com",
  databaseURL: "https://web-auth-39b45-default-rtdb.firebaseio.com",
  projectId: "web-auth-39b45",
  storageBucket: "web-auth-39b45.firebasestorage.app",
  messagingSenderId: "140032041040",
  appId: "1:140032041040:web:7ba19aa213d609cdd6b155",
  measurementId: "G-EWQPVHDS35"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const name = document.getElementById("name").value;
const uploadBtn = document.getElementById("uploadBtn");
const imageInput = document.getElementById("imageInput");
const imageContainer = document.getElementById("imageContainer");

let uid = null;

/* ================= GET LOGGED IN USER ================= */
onAuthStateChanged(auth, (user) => {
  if (user) {
    uid = user.uid;
    loadUserImages(); // 🔥 sirf apni images load
  } else {
    // user logged out → redirect
    window.location.href = "login.html";
  }
});

/* ================= UPLOAD IMAGE ================= */
uploadBtn.addEventListener("click", () => {
  if (!uid) return alert("Login required");

  const file = imageInput.files[0];
  if (!file) return alert("Image select karo");

  const reader = new FileReader();
  reader.onload = () => {
    push(ref(db, `users/${uid}/images`), {
      name: document.getElementById("name").value,
      image: reader.result,
      time: new Date().toLocaleString()

    });

         // upload progress dikhao
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3000);
}

// Example: fake progress then show popup
let bar = document.getElementById("progress");
let status = document.getElementById("status");

let p = 0;
status.innerText = "Uploading...";
const interval = setInterval(() => {
  if (p < 90) {
    p++;
    bar.value = p;
  } else {
    clearInterval(interval);
    bar.value = 100;
    status.innerText = "Upload Complete ✅";
    showToast("Data saved successfully! ✅"); // <-- popup
  }
}, 50);
// end upload progress dikhao
    // alert("Image successfully uploaded!");
    
  };

  reader.readAsDataURL(file);
});

/* ================= LOAD OWN IMAGES ================= */
function loadUserImages() {
  const userImagesRef = ref(db, `users/${uid}/images`);

  onChildAdded(userImagesRef, (snapshot) => {
    const data = snapshot.val();

    const box = document.createElement("div");
    box.className = "image-box";

    box.innerHTML =`
    <img src="${data.image}">
    <p><strong>${data.name}</strong></p>
    <small>${data.time}</small>
    `;

    imageContainer.appendChild(box);
  });
}
