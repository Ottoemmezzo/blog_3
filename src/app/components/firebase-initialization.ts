// firebase-initialization.ts
import firebase from 'firebase/compat/app';
import 'firebase/app-check';
import { environment } from 'src/environments/environment';



const app = firebase.initializeApp(environment.firebase);
//const appCheck =
app.appCheck().activate('6LfzajclAAAAACOMPEeHJd-Vs7_BRjeG0KG6PLVw');
//appCheck.activate('');
