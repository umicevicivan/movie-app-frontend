import { Component, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { NewListModalComponent } from './new-list-modal/new-list-modal.component';
import { ApplicationService } from '../services/application.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { ListModel } from '../models/list.model';

@Component({
    selector: 'app-lists',
    templateUrl: 'lists.page.html',
    styleUrls: ['lists.page.scss']
})
export class ListsPage implements OnInit, OnDestroy {

    private lists: BehaviorSubject<ListModel[]> = new BehaviorSubject([]);

    lists$: Observable<ListModel[]> = this.lists.asObservable();

    constructor(public modalController: ModalController, private applicationService: ApplicationService) {
    }

    ionViewWillEnter(): void {
        this.fetchLists();
    }

    ngOnInit(): void {
        this.fetchLists();
    }

    ngOnDestroy(): void {
        this.lists.complete();
    }

    createList(): void {
        this.presentModalForNewList();
    }

    async presentModalForNewList() {
        const modal = await this.modalController.create({
            component: NewListModalComponent,
        });
        modal.onDidDismiss().then(data => {
            this.fetchLists();
        });
        return await modal.present();
    }

    fetchLists(): void {
        this.applicationService.fetchLists().subscribe(res => {
            this.lists.next(res);
        });
    }
}
