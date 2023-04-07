/*import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule} from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirestoreModule, USE_EMULATOR as USE_FIRESTORE_EMULATOR } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule, USE_EMULATOR as USE_AUTH_EMULATOR } from '@angular/fire/compat/auth';
import { AngularFireFunctionsModule, USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from '@angular/fire/compat/functions';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { LandingComponent } from './components/landing/landing.component';
import { ListaArticoliComponent } from './components/lista-articoli/lista-articoli.component';
import { HeaderComponent } from './components/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


import { FirebaseAppModule, getApp, initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { provideAnalytics,getAnalytics} from '@angular/fire/analytics';
import { provideAuth,getAuth, connectAuthEmulator } from '@angular/fire/auth';
import { provideFirestore,getFirestore, initializeFirestore, connectFirestoreEmulator, Firestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions, Functions, connectFunctionsEmulator } from '@angular/fire/functions';
import { provideStorage,getStorage, connectStorageEmulator } from '@angular/fire/storage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import { AddComponent } from './components/add/add.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, NgModel, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from '@angular/material/input';
import { DettaglioArticoloComponent } from './components/dettaglio-articolo/dettaglio-articolo.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { AngularFireStorageModule, BUCKET } from '@angular/fire/compat/storage';
import { DelComponent } from './components/del/del.component';
import { ImmagineComponent } from './components/immagine/immagine.component';
import { UpdArticoloComponent } from './components/upd-articolo/upd-articolo.component';
import { CardArticoloComponent } from './components/card-articolo/card-articolo.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDialog, MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';


import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { RegisterDialogComponent } from './components/register-dialog/register-dialog.component';
import { UserComponent } from './components/user/user.component';
import {firebase, firebaseui, FirebaseUIModule} from 'firebaseui-angular';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './components/auth.guard';
import { TableArtComponent } from './components/user/table-art/table-art.component';
//import { initializeAppCheck, provideAppCheck, ReCaptchaV3Provider } from '@angular/fire/app-check';
//import './components/firebase-initialization';
import {MatTableModule} from '@angular/material/table';
import { ProfileComponent } from './components/user/profile/profile.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { SezioneComponent } from './components/sezione/sezione.component';
import { LazTableComponent } from './components/user/laz-table/laz-table.component';






const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      scopes: [
        'public_profile',
        'email',
        'user_likes',
        'user_friends'
      ],
      customParameters: {
        'auth_type': 'reauthenticate'
      },
      provider: firebase.auth.FacebookAuthProvider.PROVIDER_ID
    },
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    {
      requireDisplayName: false,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    },
    firebase.auth.PhoneAuthProvider.PROVIDER_ID,
    firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
  ],
  tosUrl: '<your-tos-link>',
  privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
};

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatDividerModule,
    MatListModule,


    provideFirebaseApp(() => initializeApp(environment.firebase)),
    /*provideAppCheck(() => initializeAppCheck(
      getApp(), {
      provider: new ReCaptchaV3Provider('6LfzajclAAAAACOMPEeHJd-Vs7_BRjeG0KG6PLVw'),})),*/
   // provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    /*provideAuth(() => {
      let auth = getAuth()
      if (environment.useEmulators) {
        connectAuthEmulator(auth, 'http://localhost:9099', {
          disableWarnings: false })
      }
      return auth
    }),
    //provideFirestore(() => getFirestore()),
    provideFirestore(() => {
      let firestore: Firestore
      if (environment.useEmulators) {
        // long polling for Cypress
        firestore = initializeFirestore(getApp(), {
          experimentalForceLongPolling: true,
        })
        connectFirestoreEmulator(firestore, 'https://localhost', 8080)
      } else {
        firestore = getFirestore()
      }
      return firestore
    }),
    provideStorage(() => {
      const storage = getStorage()
      if (environment.useEmulators) {
        connectStorageEmulator(storage, 'https://localhost', 9199)
      }
      return storage
    }),
    //provideFunctions(() => getFunctions()),
    provideFunctions(() => {
      let functions: Functions
      functions = getFunctions()
      if (environment.useEmulators) {
        connectFunctionsEmulator(functions, 'https://localhost', 5001)
      }
      return functions
    }),*/
    provideStorage(() => getStorage()),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatGridListModule,
    MatPaginatorModule,
    MatDialogModule,
    AngularFireAuthModule,
    FirebaseAppModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig)


  ],
  declarations: [ AppComponent, LandingComponent, ListaArticoliComponent, HeaderComponent, AddComponent, DettaglioArticoloComponent, DelComponent, ImmagineComponent, UpdArticoloComponent, CardArticoloComponent, LoginDialogComponent, RegisterDialogComponent, UserComponent, LoginComponent, TableArtComponent, ProfileComponent, SezioneComponent, LazTableComponent ],
  bootstrap: [ AppComponent ],
  providers: [
    //ScreenTrackingService,UserTrackingService,
    {
      provide: BUCKET,
      useValue: environment.firebase.storageBucket,
    },
    AuthGuard
    /*{provide:BUCKET, useValue:'gs://blog-personale-f2d9d.appspot.com'},
    { provide: USE_AUTH_EMULATOR, useValue: environment.useEmulators ? ['http://localhost', 9099] : undefined },
  { provide: USE_FIRESTORE_EMULATOR, useValue: environment.useEmulators ? ['http://localhost', 8080] : undefined },
  { provide: USE_FUNCTIONS_EMULATOR, useValue: environment.useEmulators ? ['http://localhost', 5001] : undefined }
    //{ provide: AUTH_SETTINGS, useValue: { appVerificationDisabledForTesting: true } }*/
  ]
})
export class AppModule {



}
