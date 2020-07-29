import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Watchlist } from './watchlist';
import { WATCHLISTS } from './mock-watchlists';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class WatchlistService {
  private watchlistsUrl = 'api/watchlists';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
  
  getWatchlists (): Observable<Watchlist[]> {
    return this.http.get<Watchlist[]>(this.watchlistsUrl)
      .pipe(
        tap(_ => this.log('fetched watchlists')),
        catchError(this.handleError<Watchlist[]>('getWatchlists', []))
      );
  }

  /** GET watchlist by id. Will 404 if id not found */
  getWatchlist(id: number): Observable<Watchlist> {
    const url = `${this.watchlistsUrl}/${id}`;
    return this.http.get<Watchlist>(url).pipe(
      tap(_ => this.log(`fetched watchlist id=${id}`)),
      catchError(this.handleError<Watchlist>(`getWatchlist id=${id}`))
    );
  }

  addWatchlist(watchlist: Watchlist): Observable<Watchlist>{
    return this.http.post<Watchlist>(this.watchlistsUrl, watchlist, httpOptions)
    .pipe(
      tap((newWatchlist: Watchlist) => this.log(`added watchlist w/ id=${newWatchlist.id}`)),
      catchError(this.handleError<Watchlist>('addWatchlist'))
    );
  }

  updateWatchlist (watchlist: Watchlist): Observable<any> {

    return this.http.put(this.watchlistsUrl, watchlist, httpOptions).pipe(
      tap(_ => this.log(`updated watchlist id=${watchlist.id}`)),
      catchError(this.handleError<any>('updateWatchlist'))
    );
  }

  /** DELETE: delete the watchlist from the server */
deleteWatchlist (watchlist: Watchlist | number): Observable<Watchlist> {
  const id = typeof watchlist === 'number' ? watchlist : watchlist.id;
  const url = `${this.watchlistsUrl}/${id}`;

  return this.http.delete<Watchlist>(url, httpOptions).pipe(
    tap(_ => this.log(`deleted watchlist id=${id}`)),
    catchError(this.handleError<Watchlist>('deleteWatchlist'))
  );
}

/* GET watchlists whose name contains search term */
searchWatchlists(term: string): Observable<Watchlist[]> {
  if (!term.trim()) {
    return of([]);
  }
  return this.http.get<Watchlist[]>(`${this.watchlistsUrl}/?name=${term}`)
    .pipe(
      tap(_ => this.log(`found watchlists matching "${term}"`)),
      catchError(this.handleError<Watchlist[]>('searchWatchlists', []))
    );
}

private log(message: string) {
  this.messageService.add(`WatchlistService: ${message}`);
}

/**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T> (operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
 
    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead
 
    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);
 
    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

}
