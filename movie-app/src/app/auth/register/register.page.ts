import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    form: FormGroup;

    get errorControl() {
        return this.form.controls;
    }

    constructor(private authService: AuthService, private router: Router) {
    }

    ngOnInit() {
        this.form = new FormGroup({
            firstName: new FormControl(null),
            lastName: new FormControl(null),
            username: new FormControl(null, Validators.required),
            email: new FormControl(null, [Validators.required, Validators.email]),
            password: new FormControl(null, Validators.required),
        });
    }

    register() {
        const user = this.form.getRawValue();
        console.log(user);
        this.authService.register(user).subscribe((res) => {
            if (res && res.password === null) {
                this.router.navigateByUrl('/login');
            }
        });
    }

}
