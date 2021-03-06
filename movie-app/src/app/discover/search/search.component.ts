import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { TMDBMoviesWrapper } from 'src/app/core/api/movies/movie';
import { TmdbService } from 'src/app/core/api/movies/tmdb.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {

    private discoverMovies: BehaviorSubject<TMDBMoviesWrapper> = new BehaviorSubject(null);

    discoverMovies$: Observable<TMDBMoviesWrapper> = this.discoverMovies.asObservable();


    @ViewChild('searchbar') searchbar: IonSearchbar;
    movies = [];
    imageBaseUrl = environment.imageBaseUrl;
    searchTermEmpty = false;

    constructor(
        private tmdbService: TmdbService,
        private router: Router
    ) {
    }

    ngOnInit() {
    }

    ngOnDestroy(): void {
        this.discoverMovies.complete();
    }

    onCancel() {
        this.router.navigateByUrl('/tabs/discover');
    }

    ionViewDidEnter() {
        setTimeout(() => {
            this.searchbar.setFocus();
        });
    }

    onSearchChange(event) {
        if (event.srcElement.value == '') {
            this.searchTermEmpty = true;
            return;
        }
        this.searchTermEmpty = false;
        var searchTerm = event.srcElement.value;
        var search = searchTerm.split(' ').join('%20');
        this.tmdbService.getSearchMovies(search).subscribe(
            res => {
                this.discoverMovies.next(res);
                this.movies = this.discoverMovies.getValue().results;
                for (var i = 0; i < this.movies.length; i++) {
                    if (this.movies[i].poster_path == null) {
                        var m = this.movies[i];
                        this.movies.splice(i, 1);
                        this.movies.push(m);
                    }
                }
            },
            (error) => {
                console.log('Greskica');
            }
        );
    }
}
