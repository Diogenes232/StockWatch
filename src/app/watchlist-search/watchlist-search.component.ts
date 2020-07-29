import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Watchlist } from '../watchlist';
import { WatchlistService } from '../watchlist.service';

@Component({
  selector: 'app-watchlist-search',
  templateUrl: './watchlist-search.component.html',
  styleUrls: [ './watchlist-search.component.css' ]
})
export class WatchlistSearchComponent implements OnInit {
  
  watchlists$: Observable<Watchlist[]>;
  private searchTerms = new Subject<string>();

  constructor(private watchlistService: WatchlistService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.watchlists$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.watchlistService.searchWatchlists(term)),
    );
  }
}