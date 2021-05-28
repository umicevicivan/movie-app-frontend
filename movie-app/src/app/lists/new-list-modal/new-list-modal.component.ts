import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup } from '@angular/forms';
import { ApplicationService } from '../../services/application.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'app-new-list-modal',
    templateUrl: './new-list-modal.component.html',
    styleUrls: ['./new-list-modal.component.scss'],
})
export class NewListModalComponent implements OnInit {

    form: FormGroup;

    constructor(private modalController: ModalController, private applicationSerivce: ApplicationService,
                private router: Router, private alertService: AlertService) {
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
        this.applicationSerivce.createList(this.form.get('name').value).subscribe(res => {
            this.router.navigate(['/tabs/lists']);
            this.dismiss();
        }, (error) => {
            this.alertService.warning('Failed to create new list', error.error.apierror.message);
        });
    }
}
