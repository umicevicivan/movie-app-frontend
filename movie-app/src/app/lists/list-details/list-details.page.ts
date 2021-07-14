import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { MovieListsService } from '../../core/api/movie-lists/movie-lists.service';
import { MovieList } from '../../core/api/movies/movie';

@Component({
    selector: 'app-list-details',
    templateUrl: './list-details.page.html',
    styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit, OnDestroy {

    private list: BehaviorSubject<MovieList> = new BehaviorSubject(null);

    list$: Observable<MovieList> = this.list.asObservable();
    moviesEmpty$: Observable<boolean> = this.list$.pipe(map(list => !list || !list.movies ||  list.movies.length === 0));

    imageBaseUrl = environment.imageBaseUrl;

    constructor(private route: ActivatedRoute, private aplicationService: MovieListsService) {
    }

    ngOnInit() {
        this.list.next(this.route.snapshot.data.list);
    }

    ngOnDestroy(): void {
        this.list.complete();
    }

    generateQRCode(listName: string): void {

    }

}
