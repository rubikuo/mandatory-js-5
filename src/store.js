import {BehaviorSubject} from 'rxjs';
// save the accesstoken to store so we can subscribe later when we want to use token
export const token$ = new BehaviorSubject(localStorage.getItem("token"));
// function to  save and remove token depend if the token is active or not. If active, then save the token to a local storage so that it's still available even if the page got refreshed
//else if user want logout or the token validation time has expired, then remove the token from the local storage so the page will redirect automatically to a login page
export function updateToken(token) {
  if (token) {
    localStorage.setItem("token", token);
  } else {
    localStorage.removeItem("token");
  }
  token$.next(token);
}


// run load the page only once
// define a new obserable and create a new behaviorSubject
export const documents$ = new BehaviorSubject(
  // because localstorage can only store string 
  // so when we get data from local storage we will have to parse it to object
  //or as an empty array
  new Set(JSON.parse(localStorage.getItem("documents") || "[]"))
);
// run when you call it

export function uploadDocuments(doc) {
  console.log(documents$.value)
  const newSet = new Set(Array.from(documents$.value)); // convert documents$.value to array
  newSet.add(doc);
  // to store the documents in localStorage, convert the object to string
  localStorage.setItem("documents", JSON.stringify(Array.from(newSet)));
  documents$.next(newSet);
}

export function removeDocument(doc) {
  console.log(documents$.value);
  const newSet = new Set(Array.from(documents$.value));
  newSet.delete(doc);
  localStorage.setItem("documents", JSON.stringify(Array.from(newSet)));
  documents$.next(newSet);

}
