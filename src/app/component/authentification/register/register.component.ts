import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserRequest } from 'src/app/payload/user.request';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl('admin@mail'),
    username: new FormControl('admin'),
    presentation: new FormControl('admin'),
    number: new FormControl(12345),
    role : new FormControl('', Validators.required),
    password: new FormControl('user1234', [
      Validators.required,
      Validators.minLength(4),
    ])
  });

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    const formValues = this.registerForm?.value;
    formValues.role = [formValues.role];
    this.authService.register(formValues).subscribe(
      (user: any) => {
        console.log('reussit' + user);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log('faild');
        console.log(error);
      }
    );
  }
}
