import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private interval: any;
  time: string = "";
  mobileMenuIsVisible: boolean = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.setTime();
    this.interval = setInterval(() => this.setTime(), 1500);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  setTime(){
    this.time = new Date().toLocaleTimeString("en-us", {
      hour: "numeric",
      minute: "numeric"
    });
  }

  toggleMobileMenu() {
    this.mobileMenuIsVisible = !this.mobileMenuIsVisible;
  }

  emitActivitiesShow() {
    this.mobileMenuIsVisible = false;
    this.router.navigateByUrl("/activities")
  }

  emitPlansShow() {
    this.mobileMenuIsVisible = false;
    this.router.navigateByUrl("/plans")
  }
}