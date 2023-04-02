import * as functions from "firebase-functions";
import * as admin from "firebase-admin"

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

admin.initializeApp();
exports.addAdminRole= functions.https.onCall((data, context)=>{
  return admin.auth().getUserByEmail(data.email).then(user=>{
    return admin.auth().setCustomUserClaims(user.uid, {
      admin: true,

    });
  }).then(()=>{
    return {
      message: `Success! ${data.emal} è ora amministratore`,
    };
  }).catch((err) => {
    return err;
  });
});

