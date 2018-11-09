import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
const helper = new JwtHelperService();
@Injectable()





export class AuthGuardService implements CanActivate {
  constructor(public jwtHelper: JwtHelperService, private router: Router, ) { }
  canActivate() {
    return this.checkLogin();
  }
  checkLogin(): boolean {
    const myRawToken = localStorage.getItem('token');
    if (myRawToken != null) {
      const decodedToken = helper.decodeToken(myRawToken);
      helper.getTokenExpirationDate(myRawToken);
      const isExpired = helper.isTokenExpired(myRawToken);
      if (decodedToken.type === 'admin' && !isExpired) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
