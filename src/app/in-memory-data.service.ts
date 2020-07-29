import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Watchlist } from './watchlist';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const watchlists = [
      { id: 11, name: 'IT' },
      { id: 12, name: 'Green' }
    ];
    return {watchlists};
  }

  // Overrides the genId method to ensure that a watchlist always has an id.
  // If the watchlists array is empty,
  // the method below returns the initial number (11).
  // if the watchlists array is not empty, the method below returns the highest
  // watchlist id + 1.
  genId(watchlists: Watchlist[]): number {
    return watchlists.length > 0 ? Math.max(...watchlists.map(watchlist => watchlist.id)) + 1 : 11;
  }
}