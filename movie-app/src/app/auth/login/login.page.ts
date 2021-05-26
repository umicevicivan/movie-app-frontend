import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    form: FormGroup;

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            username: new FormControl(null),
            password: new FormControl(null)
        });
    }

    login() {
        this.authService.login(this.form).subscribe(() => {
            console.log('aaaaa');
            this.router.navigateByUrl('/tabs/discover');
        });
    }
}
