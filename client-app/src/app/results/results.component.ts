import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Search } from '../models/Search';
import { Results } from '../models/Results';
import { Restaurant } from '../models/Restaurant';
import { DataService } from '../services/data.service';
import { RestService } from '../services/rest.service';

@Component({
  selector: 'res-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit, OnDestroy {
  private search: Search;
  private results: Results;
  private item: number;
  private viewFrom: number;
  private viewTo: number;
  private searchWord: string;
  private popRest: Restaurant;
  private icon: string;
  private searchInput: string;
  constructor(
    private sanitizer: DomSanitizer,
    private modalService: NgbModal,
    public dataservice: DataService,
    public restservice: RestService,
    private activeRouter: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    // this.search = this.dataservice.search; // paramters from services

    if (this.activeRouter.snapshot.queryParams !== null) {
      this.search = {
        word: this.activeRouter.snapshot.queryParams.word ? this.activeRouter.snapshot.queryParams.word : '',
        grade: this.activeRouter.snapshot.queryParams.grade ? this.activeRouter.snapshot.queryParams.grade : '1',
        page: this.activeRouter.snapshot.queryParams.page ? this.activeRouter.snapshot.queryParams.page : '1',
      }; // will never be used
    }
    // Initial setup
    this.viewFrom = 0;
    this.viewTo = 0;
    this.searchWord = '';

    // empty element avoid error
    this.popRest = {
      _id: '',
      name: '',
      cuisine: '',
      grade: '',
      address: '',
      phone: '',
      imageUrl: '',
      gradeDate: '',
      inspection: {
        grade_date: '',
        grade_date_first: '',
        action: '',
        violation_code: '',
        violation_desc: '',
        score: '',
        grade: '',
        inspection_type: ''
      }
    };
    // generate a random number for background
    this.item = Math.floor(Math.random() * 12) + 1; // background generared random

    // debug comments
    // if (this.search == null) {
    //   // this code is for test
    //   this.search = {
    //     search: 'mexicans',
    //     grade: '-1',
    //     price: 'less',
    //     page: '1'
    //   }; // will never be used
    // }
    this.searchInput = this.search.word;

    this.icon = 'arrow_drop_down';
    // set results as empty to avoid nulls
    this.results = {
      total: 0,
      limit: 0,
      page: 0,
      pages: 0,
      restaurants: []
    };
    this.loadResults();
  }
  // this method is trigered when the User select a new page from pagination.
  pageChanged(page) {
    this.search.page = page;
    this.loadResults();
  }
  // this method allow insert html style image
  public getBackgroundRestaurant(img) {
    return this.sanitizer.bypassSecurityTrustStyle(
      `url(${img}) no-repeat center`
    );
  }
  // Modal PopUp set up parameters
  public popUp(content, restaurant) {
    this.popRest = restaurant;
    this.modalService.open(content, { size: 'lg', centered: true });
  }
  // format date display
  public dateHTML(date) {
    return this.sanitizer.bypassSecurityTrustHtml(
      date.replace(/\./g, '&middot;')
    );
  }
  // format grade description
  public gradeName(grade) {
    return grade === 'GP' ? 'Grade Pending' : `Grade ${grade.toUpperCase()}`;
  }
  // Main Method to call the restaurant API
  // Format the display information from the results.
  public loadResults() {
    if (this.search.word.length > 3) {
      this.restservice.getResults(this.search).subscribe(response => {
        this.results = response;
        // view elements calculation
        // pagination
        this.viewFrom =
          this.results.total < this.results.limit
            ? this.results.page
            : this.results.limit * (this.results.page - 1) + 1;
        const viewToTemp = this.viewFrom + (this.results.limit - 1);
        this.viewTo =
          this.results.total < this.results.limit ||
          this.results.total < viewToTemp
            ? this.results.total
            : viewToTemp;
        this.searchWord = this.search.word;
        this.searchInput = this.search.word;
        // updte url every new search or page change easy for share the URL
        this.location.go('/results', `word=${this.search.word}&grade=${this.search.grade}&page=${this.search.page}`);

      }); // subscribe response
  }
  }
  // Method to sort results by grade values
  public gradeUpDown() {
    this.search.grade = this.search.grade === '1' ? '-1' : '1';
    this.icon = this.search.grade === '1' ? 'arrow_drop_down' : 'arrow_drop_up';
    this.loadResults();
  }
  // Method to search from input search bar on the header.
  public onSubmit() {
    if (this.searchInput.length < 3) {
      alert('Search for word must be longer than 3 characters');
      return false;
    }
    this.search.word = this.searchInput;
    this.search.grade = '1';
    this.icon = 'arrow_drop_down';
    this.search.page = '1'; // reset the page
    this.loadResults();
  }
  ngOnDestroy() {
    this.dataservice.search = this.search;
  }
}
