import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonSearchbar, ModalController } from '@ionic/angular';
import { DiscoverMovies } from 'src/app/models/discover-movies.model';
import { TmdbService } from 'src/app/services/tmdb.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @ViewChild('searchbar') searchbar: IonSearchbar;
  discoverMovies = new DiscoverMovies();
  movies = [];
  imageBaseUrl = environment.imageBaseUrl;
  searchTermEmpty = false;

  constructor(
    private modalCtrl: ModalController,
    private tmdbService: TmdbService,
    private router: Router
  ) {}

  ngOnInit() {}

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
    this.tmdbService.getsearchMovies(search).subscribe(
      (res) => {
        this.discoverMovies = res;
        this.movies = this.discoverMovies.results;
        for(var i = 0; i < this.movies.length; i++){
          if(this.movies[i].poster_path == null){
            var m = this.movies[i];
            this.movies.splice(i,1);
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
