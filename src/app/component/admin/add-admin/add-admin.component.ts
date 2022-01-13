import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {

  adminForm = new FormGroup({
    email: new FormControl('admin@mail'),
    username: new FormControl('admin'),
    presentation: new FormControl('presentation'),
    role : new FormControl('', Validators.required),
    password: new FormControl('User123@', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ])
  });

  get password(){
    return this.adminForm.get("password");
  }

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit() {
    const formValues = this.adminForm?.value;
    console.log(formValues);
    this.authService.register(formValues).subscribe(
        (resp: any) => {
          console.log(resp, 'reussit');
          this.router.navigate(['/login']);
        },
        (error) => {
          console.log('faild');
          console.log(error);
        }
      );
    }


//   adminForm = new FormGroup({
//     email: new FormControl('admin@mail'),
//     username: new FormControl('admin'),
//     presentation: new FormControl('presentation'),
//     role : new FormControl('', Validators.required),
//     password: new FormControl('User123@', [
//       Validators.required,
//       Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
//     ])
//   });

//   get password(){
//     return this.adminForm.get("password");
//   }

//   constructor(private authService: AuthService, private router: Router) {}

//   ngOnInit(): void {}

// onSubmit() {
//     const formValues = this.adminForm?.value;
//     console.log(formValues);
//     this.authService.register(formValues).subscribe(
//       (resp: any) => {
//         console.log('reussit');
//         this.router.navigate(['/login']);
//       },
//       (error) => {
//         console.log('faild');
//         console.log(error);
//       }
//     );
//   }
}
