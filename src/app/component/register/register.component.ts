import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    email: new FormControl(''),
    username: new FormControl(''),
    presentation: new FormControl(''),
    role : new FormControl('', Validators.required),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ])
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    const formValues = this.registerForm?.value;
    console.log(formValues);
    this.authService.register(formValues).subscribe(
      (resp: any) => {
        console.log('reussit');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log('faild');
        console.log(error);
      }
    );
  }
}
