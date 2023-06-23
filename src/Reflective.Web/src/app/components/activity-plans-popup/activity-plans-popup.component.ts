import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-activity-plans-popup',
  templateUrl: './activity-plans-popup.component.html',
  styleUrls: ['./activity-plans-popup.component.scss']
})
export class ActivityPlansPopupComponent implements OnInit {
  title: string = "Plans";
  closeButtonIsActive: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    const observer = {
      next: () => {
        this.closeButtonIsActive = this.router.url == "/plans";
        this.title = this.route.firstChild?.routeConfig?.title?.toString() ?? "";
      }
    }

    this.route.url.subscribe(observer);
  }

  close() {
    this.router.navigateByUrl("/");
  }
}
