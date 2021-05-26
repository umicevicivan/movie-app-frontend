import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
    }

    register(form) {
        console.log(form.value);
        this.authService.register(form.value).subscribe((res) => {
            if (res && res.password === null){
                this.router.navigateByUrl('/login');
            }
        });
    }

    login() {
        this.router.navigateByUrl('/login');
    }

}
