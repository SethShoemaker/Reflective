import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-activities-popup',
  templateUrl: './activities-popup.component.html',
  styleUrls: ['./activities-popup.component.scss']
})
export class ActivitiesPopupComponent implements OnInit {
  title: string  = "Activities";
  closeButtonIsActive: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe(
      () => {
        this.closeButtonIsActive = this.router.url == "/activities";
        this.title = this.route.firstChild?.routeConfig?.title?.toString() ?? "";
      }
    );
  }

  close(): void{
    this.router.navigateByUrl("/");
  }
}