import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ListModel } from '../../models/list.model';
import { ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-list-details',
    templateUrl: './list-details.page.html',
    styleUrls: ['./list-details.page.scss'],
})
export class ListDetailsPage implements OnInit, OnDestroy {

    private list: BehaviorSubject<ListModel> = new BehaviorSubject(null);

    list$: Observable<ListModel> = this.list.asObservable();
    moviesEmpty$: Observable<boolean> = this.list$.pipe(map(list => !list || !list.movies ||  list.movies.length === 0));

    imageBaseUrl = environment.imageBaseUrl;

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.list.next(this.route.snapshot.data.list);
    }

    ngOnDestroy(): void {
        this.list.complete();
    }

}
