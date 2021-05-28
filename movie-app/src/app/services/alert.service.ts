import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor(private alertController: AlertController) {
    }

    async warning(header: string, message: string, subHeader?: string) {
        const alert = await this.alertController.create({
            header,
            subHeader,
            message,
            buttons: ['OK']
        });
        await alert.present();
    }
}