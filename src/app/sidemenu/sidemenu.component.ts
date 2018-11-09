import {Component, OnInit, Input} from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AuthGuardService } from '../auth/auth-guard.service';
import { DataService } from '../../data.service';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { fadeAnimation } from '../animations';
@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css'],
  animations: [fadeAnimation]
})
export class SidemenuComponent implements OnInit   {
  hidesidebar = true;
  setTitle: string;
  message: boolean;
  @Input() public isUserLoggedIn: boolean;
  isHandset: Observable<BreakpointState> = this.breakpointObserver.observe(Breakpoints.Handset);
  loader: string;
  constructor(private router: Router, private data: DataService, public route: ActivatedRoute,
    public Auth: AuthGuardService, private breakpointObserver: BreakpointObserver) {
      this.hidesidebar = this.Auth.checkLogin();
      router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          const url = event.url;
          this.setTitle = url.replace(/[^a-zA-Z ]/g, ' ');

        }

      });
    }
    public getRouterOutletState(outlet) {
      return outlet.isActivated ? outlet.activatedRoute : '';
    }
    // tslint:disable-next-line:use-life-cycle-interface
    ngOnInit() {
      this.data.currentMessage.subscribe((message) => {
        if (message === 'indeterminate' || message === 'determinate' ) {
          this.loader =  message;
        }
        if (message === 'login') {
          this.hidesidebar =  true;
        }
      });
    }
    getTitle (title) {
      this.setTitle = title;
    }
    Logout() {
      localStorage.clear();
      this.hidesidebar =  false;
      this.router.navigate(['/login']);
    }
    goToPage(page) {
      this.router.navigate([page]);
    }
  }
