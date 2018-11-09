import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { MaterialModule } from './material.module';
import { WebservicesService } from './services/webservices.service';
import { InterceptService} from './services/intercept.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuardService } from './auth/auth-guard.service';
import { JwtModule } from '@auth0/angular-jwt';
import { DataService } from '../data.service';
import { ShareModule } from './share/share.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
export function jwtTokenGetter() {
  return localStorage.getItem('token')
}
@NgModule({
  declarations: [AppComponent ],
  imports: [HttpClientModule, 
      JwtModule.forRoot({
      config: {
        tokenGetter:jwtTokenGetter
      }
    }),
    ShareModule,
    BrowserModule,  
    MaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [WebservicesService,AuthGuardService,DataService,InterceptService,{
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { } 