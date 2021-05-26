import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
        this.authService.register(form.value).subscribe((res) => {
            if (res && res.password === null) {
                this.router.navigateByUrl('/login');
            }
        });
    }

}
