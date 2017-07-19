// src/firebase.js

import firebase from 'firebase';
import Gathering from './Gathering';
import C from './constants';

firebase.initializeApp(C.firebaseConfig);
export const auth = firebase.auth();
export const database = firebase.database();

// firebase.auth().onAuthStateChanged(function(user) 
// {
// window.GATHERING = new Gathering(firebase.database());

//     if (user) {
//     	console.log('SIGNED IN');
//     	alert('Welcome back!')
//     	var isAnonymous = user.isAnonymous;
//     	var uid = user.uid;

//     	if (isAnonymous) {
//     		checkForFirstTime(uid);
//     	}

//     } else {
//         // User is signed out.
//         console.log('SIGNED OUT');
//         firebase.auth().signInAnonymously()
//         	.then(function() {
//         		alert('Signed in anonymously');
//         	})
//         	.catch(function(error) {
//         		alert('Error', error);
// 			//   // Handle Errors here.
// 			  var errorCode = error.code;
// 			  var errorMessage = error.message;
// 			  // ...
// 			});
//     }
//     // ...
// });

// Tests to see if /users/<userId> exists. 
// function checkForFirstTime(userId) {
//   firebase.database().ref('/users').child(userId).once('value', function(snapshot) {
//     var exists = (snapshot.val() !== null);
//     userFirstTimeCallback(userId, exists);
//   });
// }

// Number.prototype.pad = function(size) {
//   var s = String(this);
//   while (s.length < (size || 2)) {s = "0" + s;}
//   return s;
// }

// // Setup what to do with the user information.
// function userFirstTimeCallback(userId, exists) {
//   if (exists) {

// 	// Get user stored in database.
// 	var usersRef = firebase.database().ref('users/' + userId);
// 	usersRef.once('value').then(function(snapshot) {
// 		var displayName = snapshot.val().displayName;
// 		window.GATHERING.join(firebase.auth().currentUser.uid, displayName );
// 	})

// 	window.GATHERING.onUpdated( function(count, users) {
// 		console.log(window.GATHERING.roomName + ' have ' + count + ' members.');
// 		console.log('Here is the updated users list -');
// 		for (var i in users) {
// 			console.log(users[i] + '(id: ' + i + ')');
// 		}
// 	})

//     // Do something here you want to do for non-firstime users...
//   } else {
//   	// Do something here you want to do for first time users (Store data in database?)
//   	// Create new user in database!
// 	var userCountRef = firebase.database().ref('/userCount')
// 	var tempName;
// 	alert('Creating new user in database ...');
// 	userCountRef
// 		.transaction(function (current_value) {
// 			return (current_value || 0) + 1;
// 		})
// 		.then(function (userCountTxn) {
// 			tempName = 'Poet_' + ( userCountTxn.snapshot.val() ).pad(5);
// 			var usersRef = firebase.database().ref('users/' + userId);
// 			console.log('hi!!!');
// 			return usersRef.set({
// 				// provider: user.provider,
// 		      	displayName: tempName
// 			})
// 		})
// 		.then(function (snapshot) {
// 			window.GATHERING.join(firebase.auth().currentUser.uid, tempName );
// 		})
// 		.catch(function (error) {
// 			console.log('User creation error?')
// 		})
//     // alert('user ' + userId + ' does not exist!');
//   }
// }

// // find a suitable name based on the meta info given by each provider
// function getName(authData) {
//   switch(authData.provider) {
//      case 'password':
//        return authData.password.email.replace(/@.*/, '');
//      case 'twitter':
//        return authData.twitter.displayName;
//      case 'facebook':
//        return authData.facebook.displayName;
//   }
// }

export default firebase;