import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { AngularFireModule } from '@angular/fire/compat';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(), provideFirebaseApp(() => initializeApp({"projectId":"fea-p013","appId":"1:493211012455:web:e8532725d54108c72933c2","databaseURL":"https://fea-p013-default-rtdb.firebaseio.com","storageBucket":"fea-p013.appspot.com","apiKey":"AIzaSyAGTO_9FyKC-JVSmel9YI8QlyTx-rGpNLU","authDomain":"fea-p013.firebaseapp.com","messagingSenderId":"493211012455","measurementId":"G-MR14CZJ13F"})), provideAuth(() => getAuth()),
    importProvidersFrom(AngularFireModule.initializeApp({
      apiKey: "AIzaSyAGTO_9FyKC-JVSmel9YI8QlyTx-rGpNLU",
      authDomain: "fea-p013.firebaseapp.com",
      databaseURL: "https://fea-p013-default-rtdb.firebaseio.com",
      projectId: "fea-p013",
      storageBucket: "fea-p013.appspot.com",
      messagingSenderId: "493211012455",
      appId: "1:493211012455:web:e8532725d54108c72933c2",
      measurementId: "G-MR14CZJ13F"
    }))
  ]
};
