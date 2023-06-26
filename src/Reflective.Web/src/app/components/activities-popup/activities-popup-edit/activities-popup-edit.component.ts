import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Activity } from 'src/app/models/activity.model';
import { ActivityService } from 'src/app/services/activity/activity.service';

@Component({
  selector: 'app-activities-popup-edit',
  templateUrl: './activities-popup-edit.component.html',
  styleUrls: ['./activities-popup-edit.component.scss']
})
export class ActivitiesPopupEditComponent implements OnInit {
  name: string = "";
  nameIsInvalid: boolean = false;
  description: string | null = null;
  descriptionIsInvalid: boolean = false;

  activityId: string = "";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private activityService: ActivityService
  ) {}

  ngOnInit(): void {

    this.activityId = this.route.snapshot.paramMap.get('id') ?? "";
    
    if (this.activityId.length == 0)
      this.router.navigateByUrl("/activities");

    const observer = {
      next: (res: Activity) => {
        this.name = res.name;
        this.description = res.description;
      },
      error: () => this.router.navigateByUrl("/activities")
    }

    this.activityService.getNameAndDescriptionById(this.activityId).subscribe(observer);
  }
  
  cancel() {
    this.router.navigateByUrl("/activities");
  }

  submit() {
    this.name = this.name.trim();
    this.nameIsInvalid = false;

    if (this.name.length == 0 || this.name.length > 10)
      this.nameIsInvalid = true;
    
    
    if(this.description != null)
      this.description = this.description.trim();

    this.descriptionIsInvalid = false;

    if (this.description != null && this.description.length > 55)
      this.descriptionIsInvalid = true;


    if (this.nameIsInvalid || this.descriptionIsInvalid)
      return;
    
    const observer = {
      next: () => this.router.navigateByUrl("/activities"),
      error: () => this.router.navigateByUrl("/activities")
    };

    this.activityService.saveNameAndDescriptionById(this.activityId, this.name, this.description).subscribe(observer);
  }
}