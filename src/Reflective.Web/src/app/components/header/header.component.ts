import { Output, EventEmitter, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  private interval: any;
  time: string = "";
  mobileMenuIsVisible: boolean = true;

  @Output() activitiesShowEvent = new EventEmitter();
  @Output() plansShowEvent = new EventEmitter();

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
    this.plansShowEvent.emit();
  }

  emitPlansShow() {
    this.mobileMenuIsVisible = false;
    this.plansShowEvent.emit();
  }
}