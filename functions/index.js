const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require("@sendgrid/mail");
admin.initializeApp();
const db = admin.firestore();


const API_KEY = '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';
const TEMPLATE_ID = 'd-9ecc86ca91b04f39aa3ca163267782eb';
sgMail.setApiKey(API_KEY);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

// firestore trigger 
// exports.logData = functions.firestore.document('/{collection}/{id}')
//   .onCreate((snap, context) => {
//     console.log(snap.data());

//     const msg = {
//       to: 'anuragmitra4@gmail.com',
//       from: 'anuragmitra@college.harvard.edu',
//       templateId: TEMPLATE_ID,
//       dynamic_template_data: {
//         name: 'Anurag Mitra',
//         subject: 'Alert email',
//         text: 'Just blabber'
//       }
//     }

//   return sgMail.send(msg);
// })

exports.checkThreshold = functions.pubsub
  .schedule('every 60 minutes')
  .onRun(async () => {
    console.log(`Statistics ran at ${new Date().toISOString()}!`);

    var time_1h = new Date();
    time_1h.setHours(time_1h.getMinutes() - 1);

    let number_above_threshold = 0;

    const yourData = await admin
      .firestore()
      .collection('NutrientData')
      .select('CurrentValue')
      .where("Time", ">", time_1h)
      .get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log("threshold => ", doc.data().CurrentValue);
          if (doc.data().CurrentValue > 500) {
            number_above_threshold++;
          }
        });
      });
    console.log("Number above threshold => ", number_above_threshold);

    if (number_above_threshold >= 2) {
      const msg = {
          to: 'anuragmitra4@gmail.com',
          from: 'anuragmitra@college.harvard.edu',
          templateId: TEMPLATE_ID,
          dynamic_template_data: {
            name: 'Anurag Mitra',
            subject: 'Alert email',
            text: 'Alert: There may be something to be worried about!'
          }
        }
      return sgMail.send(msg);
    }
    return null;
  })
