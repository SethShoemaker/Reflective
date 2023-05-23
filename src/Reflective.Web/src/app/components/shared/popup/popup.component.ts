import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  @Input() title: string = "";
  @Input() closeButtonIsActive: boolean = false;

  @Output() close = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
}