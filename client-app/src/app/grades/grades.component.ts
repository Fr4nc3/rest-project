import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'res-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: { 'class': 'res-grades' },
})
export class GradesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
