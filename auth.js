import {auth,signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged} from "./firebase.js";

document.getElementById("login-btn").addEventListener("click", async () => {
    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        //showDashboard(userCredential.user);
        document.getElementById("errorMessage").textContent = ("Login Successfullly:", userCredential.user.email);
        sessionStorage.setItem('loggedIn', true);
        // Show app content and hide login
        const element = document.getElementById('loginContainer');
        element.style.display = 'none';
        const element1 = document.getElementById('logintab');
        element1.style.display = 'none';
        const element2 = document.getElementById('logouttab');
        element2.style.display = 'block';


    } catch (error) {
        alert(error.message);
        document.getElementById("errorMessage").textContent = "Invalid username or password";
    }
});

document.getElementById("sign-up").addEventListener("click", async () => {
    const email = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("User created successfully. You can now log in.");
    } catch (error) {
        alert(error.message);
    }
});