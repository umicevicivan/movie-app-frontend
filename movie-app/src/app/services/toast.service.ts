import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(private toastController: ToastController) {
    }

  async success(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 1000,
      color: 'success',
    });
    toast.present();
  }

  async danger(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }
}
