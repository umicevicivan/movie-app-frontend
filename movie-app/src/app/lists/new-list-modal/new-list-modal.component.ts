import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormControl, FormGroup } from '@angular/forms';
import { ApplicationService } from '../../services/application.service';
import { Router } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { ToastService } from '../../services/toast.service';

@Component({
    selector: 'app-new-list-modal',
    templateUrl: './new-list-modal.component.html',
    styleUrls: ['./new-list-modal.component.scss'],
})
export class NewListModalComponent implements OnInit {

    form: FormGroup;

    constructor(private modalController: ModalController, private applicationService: ApplicationService,
                private router: Router, private alertService: AlertService, private toastService: ToastService) {
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
        this.applicationService.createList(this.form.get('name').value).subscribe(res => {
            this.toastService.success('Successfully created new movie list!');
            this.router.navigate(['/tabs/lists']);
            this.dismiss();
        }, (error) => {
            this.alertService.warning('Failed to create new list', error.error.apierror.message);
        });
    }
}
