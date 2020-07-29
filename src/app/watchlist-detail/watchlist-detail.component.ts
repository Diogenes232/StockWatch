import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { WatchlistService }  from '../watchlist.service';
import { Watchlist } from '../watchlist';

@Component({
  selector: 'app-watchlist-detail',
  templateUrl: './watchlist-detail.component.html',
  styleUrls: ['./watchlist-detail.component.css']
})
export class WatchlistDetailComponent implements OnInit {

  @Input() watchlist: Watchlist;

  constructor(
    private route: ActivatedRoute,
    private watchlistService: WatchlistService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getWatchlist();
  }

  save(): void {
    this.watchlistService.updateWatchlist(this.watchlist)
      .subscribe(() => this.goBack());
  }
  
  getWatchlist(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.watchlistService.getWatchlist(id)
      .subscribe(watchlist => this.watchlist = watchlist);
  }
  
  goBack(): void {
    this.location.back();
  }

}
