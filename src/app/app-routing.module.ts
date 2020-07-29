import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WatchlistsComponent }      from './watchlists/watchlists.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { WatchlistDetailComponent }  from './watchlist-detail/watchlist-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: WatchlistDetailComponent },
  { path: 'watchlists', component: WatchlistsComponent }
  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}