import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup } from '@angular/forms';
import { MovieListsService } from '../../core/api/movie-lists/movie-lists.service';
import { Router } from '@angular/router';
import { NotifyService } from '../../core/util/notify.service';

@Component({
    selector: 'app-new-list-modal',
    templateUrl: './new-list-modal.component.html',
    styleUrls: ['./new-list-modal.component.scss'],
})
export class NewListModalComponent implements OnInit {

    form: FormGroup;

    constructor(private modalController: ModalController, private applicationService: MovieListsService,
                private router: Router, private notifyService: NotifyService) {
        this.form = new FormGroup({
            name: new FormControl(null),
        });
    }

    ngOnInit() {
    }

    dismiss(): void {
        this.modalController.dismiss({
            dismissed: true
        });
    }

    createList(): void {
        this.applicationService.create(this.form.get('name').value).subscribe(res => {
            this.notifyService.success('Successfully created new movie list!');
            this.router.navigate(['/tabs/lists']);
            this.dismiss();
        }, (error) => {
            this.notifyService.alert('Failed to create new list', '', error.error.apierror.message);
        });
    }
}
