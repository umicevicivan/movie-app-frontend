import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MovieFilters, TmdbService } from 'src/app/core/api/movies/tmdb.service';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.page.html',
    styleUrls: ['./filters.page.scss'],
})
export class FiltersPage implements OnInit {
    maxYear: number;
    form: FormGroup;
    filters: MovieFilters;
    segmentValue = 'desc';
    fromMinYear: number;
    fromMaxYear: number;
    toMinYear: number;
    toMaxYear: number;


    constructor(private tmdbService: TmdbService) {
        this.fromMinYear = new Date('1900').getFullYear();
        this.fromMaxYear = new Date().getFullYear();
        this.toMinYear = new Date('1900').getFullYear();
        this.toMaxYear = new Date().getFullYear();
    }

    fromDateChange(event) {
        this.toMinYear = new Date(event.target.value).getFullYear();
    }

    toDateChange(event) {
        this.fromMaxYear = new Date(event.target.value).getFullYear();
    }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = new FormGroup({
            genres: new FormControl(null, {
                updateOn: 'blur',
            }),
            dateFrom: new FormControl(null, {
                updateOn: 'blur',
            }),
            dateTo: new FormControl(null, {
                updateOn: 'blur',
            }),
            sortBy: new FormControl('popularity', {
                updateOn: 'blur',
            }),
            descAsc: new FormControl('desc', {
                updateOn: 'blur',
            }),
        });
    }

    onSearch() {
        this.form.value.descAsc = this.segmentValue;
        this.filters = Object.assign({}, this.form.value);
        this.tmdbService.createCustomSearchURL(this.filters);

    }

    onSegmentChange(event) {
        this.segmentValue = event.srcElement.value;
    }
}
