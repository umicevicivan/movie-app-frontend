import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth/auth.service';

@Component({
    selector: 'app-options',
    templateUrl: 'options.page.html',
    styleUrls: ['options.page.scss']
})
export class OptionsPage implements OnInit {

    constructor(private authService: AuthService) {
    }

    ngOnInit(): void {
    }

    logOut(): void {
        this.authService.logOut();
    }

}
