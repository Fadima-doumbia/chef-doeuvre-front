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
  userFile:any;
  imagePath:any;
  imgURL:any;

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

  // onSelectFile(event:any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     this.userFile = file;
  //     var reader = new FileReader();
  //     this.imagePath = file;
  //     reader.readAsDataURL(file);
  //     reader.onload = (_event) => {
  //       this.imgURL = reader.result;
  //     }
  //   }
  // }

  // onSubmit() {
  //   const formData = new FormData();
  //   const formValues = this.registerForm?.value;
  //   formData.append('file', this.userFile);
  //   formData.append("user", new Blob([JSON.stringify(formValues)], { type: "application/json" }))
  //   console.log(formValues);
  //   this.authService.register(formData).subscribe(
  //     (resp: any) => {
  //       console.log('reussit' + resp);
  //       this.router.navigate(['/login']);
  //     },
  //     (error) => {
  //       console.log('faild');
  //       console.log(error);
  //     }
  //   );
  // }


  onSubmit() {
    const formValues = this.registerForm?.value;
    console.log(formValues);
    console.log("ici")
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
  // onSubmit() {
  //   const formValues = this.registerForm?.value;
  //   console.log(formValues);
  //   this.authService.register(formValues).subscribe(
  //     (resp: any) => {
  //       console.log('reussit');
  //       this.router.navigate(['/login']);
  //     },
  //     (error) => {
  //       console.log('faild');
  //       console.log(error);
  //     }
  //   );
  // }
}
