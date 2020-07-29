import { Component, OnInit } from '@angular/core';

import { Watchlist } from '../watchlist';
import { WatchlistService } from '../watchlist.service';

@Component({
  selector: 'app-watchlists',
  templateUrl: './watchlists.component.html',
  styleUrls: ['./watchlists.component.css']
})
export class WatchlistsComponent implements OnInit {

  watchlists: Watchlist[];

  constructor(private watchlistService: WatchlistService) { }
  
  getWatchlists(): void {
    this.watchlistService.getWatchlists()
      .subscribe(watchlists => this.watchlists = watchlists);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.watchlistService.addWatchlist({ name } as Watchlist)
      .subscribe(watchlist => {
        this.watchlists.push(watchlist);
      });
  }

  delete(watchlist: Watchlist): void {
    this.watchlists = this.watchlists.filter(h => h !== watchlist);
    this.watchlistService.deleteWatchlist(watchlist).subscribe();
  }

  ngOnInit() {
    this.getWatchlists();
  }

}
