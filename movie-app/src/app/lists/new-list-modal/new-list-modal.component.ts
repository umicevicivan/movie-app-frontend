import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { FormControl, FormGroup } from '@angular/forms';
import { ApplicationService } from '../../services/application.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-new-list-modal',
    templateUrl: './new-list-modal.component.html',
    styleUrls: ['./new-list-modal.component.scss'],
})
export class NewListModalComponent implements OnInit {

    form: FormGroup;

    constructor(private modalController: ModalController, private applicationSerivce: ApplicationService, private router: Router,
                private alertController: AlertController) {
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
            this.presentAlert(error.error.apierror.message);
        });
    }

    async presentAlert(msg: string) {
        const alert = await this.alertController.create({
            cssClass: 'my-custom-class',
            header: 'Failed to create new list',
            subHeader: '',
            message: msg,
            buttons: ['OK']
        });

        await alert.present();
    }

}
