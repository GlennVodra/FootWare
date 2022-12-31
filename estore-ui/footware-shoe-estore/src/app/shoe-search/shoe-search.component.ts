import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { Router } from '@angular/router';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Shoe } from '../interfaces/shoe';
import { ShoeService } from '../services/shoe.service';

@Component({
  selector: 'app-shoe-search',
  templateUrl: './shoe-search.component.html',
  styleUrls: [ './shoe-search.component.css' ]
})
export class ShoeSearchComponent implements OnInit {
  shoes$!: Observable<Shoe[]>;
  private searchTerms = new Subject<string>();

  constructor(private shoeService: ShoeService,
    private router: Router,
    private location: Location) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.shoes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.shoeService.searchInventory(term)),
    );
  }
  reloadPage() {
    setTimeout(()=>{
      window.location.reload();
    }, 200);
  }
}