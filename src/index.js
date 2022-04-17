import { initializeApp } from "firebase/app";
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc,
} from 'firebase/firestore'

import {
    getAuth, createUserWithEmailAndPassword,
} from "firebase/auth"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB1amabyXoTxN6KjAhcXp-XRJro7Gs5AyA",
    authDomain: "sandbox-a9eaf.firebaseapp.com",
    databaseURL: "https://sandbox-a9eaf.firebaseio.com",
    projectId: "sandbox-a9eaf",
    storageBucket: "sandbox-a9eaf.appspot.com",
    messagingSenderId: "884893440431",
    appId: "1:884893440431:web:d064f0f73b18f35307f75a",
    measurementId: "G-7RJBMD49PS"
  };


// Initialize app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();
const auth=getAuth();

// Collections ref
const colRef = collection(db, 'books')

// queries
const q=query(colRef, orderBy('createdAt'))

// get collecrtion data in realtime
onSnapshot(q,(snapshot) => {
    let books=[]
    snapshot.docs.forEach((doc)=> {
        books.push({ ...doc.data(), id: doc.id})
    })
    console.log(books);
})
// adding documents:
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    addDoc(colRef,{ title: addBookForm.title.value,
                    author: addBookForm.author.value,
                    createdAt: serverTimestamp()
    }).then(()=>{
        addBookForm.reset()
    })
})

// Deleting document
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const docRef = doc(db,'books',deleteBookForm.id.value)
    deleteDoc(docRef)
        .then (()=>{
            deleteBookForm.reset()
        })
})

// get a single document
const docRef = doc(db, 'books', 'N9hnbedgLRPt2EvBtX1z')

getDoc(docRef)
    .then((doc)=>{
        console.log(doc.data(), doc.id)
    })

onSnapshot(docRef,(doc)=>{
    console.log({ ...doc.data(), id: doc.id })
})

// update form
const updateBookForm = document.querySelector('.update')
updateBookForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const docRef = doc(db, 'books', updateBookForm.id.value)
    updateDoc(docRef, {
        title: 'updated title'
    })
    .then(()=>{
        updateBookForm.reset()
    })
})
//
//
// signup form
const signUpForm = document.querySelector('.signup')
signUpForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const email=signUpForm.email.value
    const password=signUpForm.password.value
    createUserWithEmailAndPassword(auth, email, password)
        .then((cred)=>{
            console.log('user created: ', cred.user)
            signUpForm.reset()
        })
        .catch((err)=>{
            console.log(err.message)
        })
})

