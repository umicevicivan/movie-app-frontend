import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class NotifyService {

    constructor(private toastCtrl: ToastController, private loadingCtrl: LoadingController, private alertCtrl: AlertController) {
    }

    success(message: string, duration: number = 2000): void {
        this.toastMessage(message, duration, 'success');
    }

    error(message: string, duration: number = 2000): void {
        this.toastMessage(message, duration, 'danger');
    }

    warning(message: string, duration: number = 2000): void {
        this.toastMessage(message, duration, 'warning');
    }

    loading(message: string = 'Data is loading'): Promise<HTMLIonLoadingElement> {
        return this.loadingCtrl.create({
            message,
        }).then(loading => {
            loading.present();
            return loading;
        });
    }

    async alert(header: string, subHeader: string, message: string, action: string = 'OK') {
        return this.alertCtrl.create({
            header,
            subHeader,
            message,
            buttons: [action]
        }).then((alert: HTMLIonAlertElement) => {
            alert.present();
        });
    }

    httpError(res: HttpErrorResponse, message: string): void {
        this.alert(message, res.error && res.error.message || res.message || 'Unknown error', 'Report to administrator');
    }

    message(message: string): Promise<HTMLIonAlertElement> {
        return this.alertCtrl.create({
            header: message,
            buttons: ['OK']
        }).then(alert => {
            alert.present();
            return alert;
        });
    }

    private toastMessage(message: string, duration: number, color: 'primary' | 'secondary' | 'tertiary' | 'success' | 'warning' | 'danger'
        | 'light' | 'medium' | 'dark') {
        return this.toastCtrl.create({
            message,
            duration,
            color
        }).then((toast: HTMLIonToastElement) => {
            toast.present();
        });
    }
}
