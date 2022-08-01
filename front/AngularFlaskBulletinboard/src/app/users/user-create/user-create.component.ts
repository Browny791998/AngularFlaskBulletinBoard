import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';




@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  url: any;
  file = null;
  fileDestination: any;
  constructor(private fb: FormBuilder, private userSvc: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {

  }

  userForm = this.fb.group({
    Name: ['', Validators.required],
    Email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
    Password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[!@#&()\-/$=<>?])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#&()\-/$=<>?]+$'),
    Validators.minLength(5), Validators.maxLength(8)]],
    ConfirmPassword: ['', Validators.required],
    Type: ['', [Validators.required]],
    Phone: ['', [Validators.required]],
    DOB: ['', [Validators.required]],
    Address: ['']
  },

    {
      validators: this.MustMatch('Password', 'ConfirmPassword'),
    });

  get name() {
    return this.userForm?.get('Name');
  }
  get email() {
    return this.userForm?.get('Email');
  }
  get password() {
    return this.userForm?.get('Password');
  }

  get confirmPassword() {
    return this.userForm?.get('ConfirmPassword');
  }
  get type() {
    return this.userForm?.get('Type');
  }
  get phone() {
    return this.userForm?.get('Phone');
  }

  get dob() {
    return this.userForm?.get('DOB');
  }

  get address() {
    return this.userForm?.get('Address');
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors?.['MustMatch']) {
        return
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MustMatch: true });
      } else {
        matchingControl.setErrors(null)
      }
    }
  }

  onSelectFile(e: any) {
    this.fileDestination = e;
    if (e.target.files) {
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      this.file = e.target.files[0];
      reader.onload = (event: any) => {
        this.url = event.target.result;
        console.log(event.target);
      }
    }
  }


  onConfirm() {

    this.userSvc.setUser({
      fileD: this.fileDestination,
      file: this.file,
      profile: this.url,
      data: this.userForm.value
    });
    
    console.log("photo is :", this.file);
    this.router.navigate(['/user/confirm']);
  }

}
