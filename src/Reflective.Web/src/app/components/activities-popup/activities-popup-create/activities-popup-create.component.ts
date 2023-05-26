import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivityService } from 'src/app/services/activity/activity.service';

@Component({
  selector: 'app-activities-popup-create',
  templateUrl: './activities-popup-create.component.html',
  styleUrls: ['./activities-popup-create.component.scss']
})
export class ActivitiesPopupCreateComponent implements OnInit {
  name: string = "";
  nameIsInvalid: boolean = false;
  description: string = "";
  descriptionIsInvalid: boolean = false;

  constructor(
    private router: Router,
    private activityService: ActivityService
  ) {}

  ngOnInit(): void {}
  
  cancel() {
    this.router.navigateByUrl("/activities");
  }

  submit() {
    this.name = this.name.trim();
    this.nameIsInvalid = false;
    this.description = this.description.trim();
    this.descriptionIsInvalid = false;

    if (this.name.length == 0 || this.name.length > 10)
      this.nameIsInvalid = true;

    if (this.description.length > 55)
      this.descriptionIsInvalid = true;

    if (this.nameIsInvalid || this.descriptionIsInvalid)
      return;
    
    const observer = {
      next: () => this.router.navigateByUrl("/activities")
    };

    this.activityService.create(this.name, this.description).subscribe(observer);
  }
}
