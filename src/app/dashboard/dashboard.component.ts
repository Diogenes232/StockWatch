import { Component, OnInit } from '@angular/core';
import { Watchlist } from '../watchlist';
import { WatchlistService } from '../watchlist.service';
 
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  watchlists: Watchlist[] = [];
 
  constructor(private watchlistService: WatchlistService) { }
 
  ngOnInit() {
    this.getWatchlists();
  }
 
  getWatchlists(): void {
    this.watchlistService.getWatchlists()
      .subscribe(watchlists => this.watchlists = watchlists.slice(1, 5));
  }
}