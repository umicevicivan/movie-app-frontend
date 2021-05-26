import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ListModel } from '../../models/list.model';
import { ApplicationService } from '../../services/application.service';

@Injectable({
    providedIn: 'root'
})
export class ListResolver implements Resolve<ListModel> {
    constructor(private applicationService: ApplicationService) {

    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ListModel> {
        return this.applicationService.getList(route.paramMap.get('name'));
    }
}
