let product = document.getElementById("product")
let username = document.getElementById("username")
let phonenumber = document.getElementById("phonenumber")
let email = document.getElementById("email")
let address = document.getElementById("address")
let messengeAlert = document.getElementById("messenge")
let db = firebase.firestore()


function register() {
    db.collection("order").add({
            Product: product.value,
            Username: username.value,
            Phonenumber: phonenumber.value,
            Email: email.value,
            Address: address.value
        }).then(() => {
            console.log("Document writen")
        })
        .catch(() => {
            console.log("Document is not been added")
        })
}





function deleteListItem(btnElement) {
    let docId = btnElement.parentNode.id;
    db.collection("order").doc(docId).delete()
        .then(() => {
            removeListFromDOM(docId);
        });
}



function removeListFromDOM(id) {
    let targetToRemove = document.getElementById(id);
    allTasksUl.removeChild(targetToRemove);
}

function fetchorder() {
    db.collection("order")
        .onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === "added") {
                    let tasksObj = change.doc.data();
                    tasksObj.id = change.doc.id;
                    showListInDOM(tasksObj)
                }
                if (change.type === "removed") {
                    console.log("Removed list: ", change.doc.id);
                    removeListFromDOM(change.doc.id);
                    messengeAlert.innerHTML = "Your Order Is Going To Reach Soon"

                }
                if (change.type === "modified") {
                    console.log("modified list: ", change.doc.id);
                    let tasksObj = change.doc.data();
                    tasksObj.id = change.doc.id;
                    updateListFromDOM(tasksObj);
                    messengeAlert.innerHTML = "Your Order Is Going To Reach Soon"

                }
            });
        });
}