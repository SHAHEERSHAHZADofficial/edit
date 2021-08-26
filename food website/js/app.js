// firebaseinit
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAFJFB8zEr2YmJWCIvBqULqmTDG1-adVlY",
    authDomain: "hackathonbatch7.firebaseapp.com",
    projectId: "hackathonbatch7",
    storageBucket: "hackathonbatch7.appspot.com",
    messagingSenderId: "900761913502",
    appId: "1:900761913502:web:845deb3024c0129d93538f",
    measurementId: "G-NHJ027MGVX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
//javascript
let username = document.getElementById("username")
let email = document.getElementById("email")
let password = document.getElementById("passcode")
let confirmpassword = document.getElementById("review-passcode")
let phonenumber = document.getElementById("phonenum")
let city = document.getElementById("city")
let country = document.getElementById("country")
let errorvalue = document.getElementById("messagepara")
let db = firebase.firestore()
let heading = document.getElementById("firstheading")

// let userRoleEl = document.getElementsByName('user-role');
let userImageEl = document.getElementById('upload-image');
let avatarCustomEl = document.getElementById('avatar-custom');


function imageSelected() {
    let image = userImageEl.files[0];
    avatarCustomEl.src = `.././images/${image.name}`;
}

async function register() {
    await firebase.auth().createUserWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            var user = userCredential.user
            console.log(user)
            validation()

            async function saveUserInFirestore() {
                // var user = userCredential.user;
                // console.log(user, userCredential);

                await db.collection("users").add({
                        email: email.value,
                        userName: username.value,
                        UID: user.uid,
                        // password: password.value,
                        // userImage: imageURL,
                        Phonenumber: phonenumber.value,
                        City: city.value,
                        Country: country.value,
                    })
                    .then(() => {
                        console.log("Document written with ID: ", user.uid);

                        window.location = "./login.html";


                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
            }
            saveUserInFirestore()
        })






    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // var errorvalue = document.getElementById("error")
        errorvalue.innerHTML = error
    });
}

function validation() {
    if (username.value === "" || username.value === null) {
        errorvalue.innerHTML = "Error: Username can't be empty !"
    } else if (email.value === "" || email.value === null) {
        errorvalue.innerHTML = "Error:Email can't be empty !"
    } else if (password.value === "") {
        errorvalue.innerHTML = "Error: Password can't be empty !"
    } else if (password.value.length < 6) {
        errorvalue.innerHTML = "Error: you should enter atleast 6 letter !"
    } else if (password.value != confirmpassword.value) {
        errorvalue.innerHTML = "Error: Password must be same !"
    }


}

// function login() {
//     firebase.auth().signInWithEmailAndPassword(email.value, password.value)

//     .then((userCredential) => {
//             // Signed in
//             var user = userCredential.user;
//             console.log(user)
//             window.location = "./home.html"

//             // ...
//         })
//         .catch((error) => {
//             var errorCode = error.code;
//             var errorMessage = error.message;
//             errorvalue.innerHTML = error
//         });
// }

function giveCheckedRadio() {
    let checkedProp;
    for (var i = 0; i < userRoleEl.length; i++) {
        if (userRoleEl[i].checked) {
            checkedProp = userRoleEl[i].value;
        }
    }
    return checkedProp;
}


function uploadImageToStorage(UID) {
    return new Promise(async(resolve, reject) => {
        let image = userImageEl.files[0];
        let storageRef = storage.ref();
        let imageRef = storageRef.child(`avatar/${UID}/${image.name}`);
        await imageRef.put(image);
        let url = await imageRef.getDownloadURL();
        resolve(url);
    })
}

// firebase.auth().onAuthStateChanged((user) => {
// console.log(user, '*********************');
// 
// 
// let pageLocArr = window.location.href.split('/');
// console.log(pageLocArr)
// let pageName = pageLocArr[pageLocArr.length - 1];
// let authenticatedPages = ['home.html'];
// if (user && authenticatedPages.indexOf(pageName) === -1) {
// window.location = './home.html';
// } else if (!user && pageName === 'home.html') {
// window.location = './index.html';
// }
// ...
// });

function signout() {
    firebase.auth().signOut()
        .then(() => {
            window.location = './index.html';
        })
        .catch(() => {
            errorvalue.innerHTML = error
        })
}


function sendPasswordResetEmail() {
    let emailAddress = email.value;
    firebase.auth().sendPasswordResetEmail(emailAddress)
        .then(() => {
            errorvalue.innerHTML = 'Check your email ';
            // Password reset email sent!
            // ..
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            errorvalue.innerHTML = error
        });
}

function fetchUsers() {
    let uid = firebase.auth().currentUser.uid;
    console.log(uid)
}
// errorvalue.innerHTML = error
// 


function fetchUsers() {
    let uid = firebase.auth().currentUser.uid;
    console.log(uid)
}


function login() {
    firebase.auth().signInWithEmailAndPassword(email.value, password.value)

    .then((userCredential) => {
            // Signed in
            window.location = ".././main web/home.html"
            var user = userCredential.user;
            console.log(user)
                // window.location = "./home.html"

            // ...
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            errorvalue.innerHTML = error
        });
}