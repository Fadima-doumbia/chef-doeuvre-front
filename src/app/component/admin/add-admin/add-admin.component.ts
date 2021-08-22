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
    const formValues = this.adminForm?.value;
    console.log(formValues);
    this.authService.newAdmin(formValues).subscribe(
      (resp: any) => {
        console.log('reussit');
        // this.router.navigate(['/login']);
      },
      (error) => {
        console.log('faild');
        console.log(error);
      }
    );
  }
}
