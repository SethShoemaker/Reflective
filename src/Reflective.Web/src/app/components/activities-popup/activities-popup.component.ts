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

    const observer = {
      next: () => {
        this.closeButtonIsActive = this.router.url == "/activities";
        this.title = this.route.firstChild?.routeConfig?.title?.toString() ?? "";
      }
    }

    this.route.url.subscribe(observer);
  }

  close(): void{
    this.router.navigateByUrl("/");
  }
}