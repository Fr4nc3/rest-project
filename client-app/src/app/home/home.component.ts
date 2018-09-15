import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Search } from '../models/Search';
import { DataService } from '../services/data.service';

@Component({
  selector: 'res-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private search: Search;

  constructor(private router: Router, public dataservice: DataService) {}

  ngOnInit() {
    this.search = {
      word: '',
      grade: '1',
      page: '1'
    };
  }
  // when the component is destroyed we pass the data as internal variables
  ngOnDestroy() {
    this.dataservice.search = this.search;
  }
  public onSubmit() {
    if (this.search.word.length < 3) {
      alert('Search for word must be longer than 3 characters');
      return false;
    }
    // console.log(this.search);
    // this.router.navigateByUrl('results') // this can be use when the parameters are pass direct to the component by a service
    this.router.navigate(['/results'], { queryParams: this.search });
  }
}
