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
  url:any;
  file=null;
  constructor(private fb:FormBuilder,private userSvc:UserService,private router:Router,private route:ActivatedRoute) { }

  ngOnInit(): void {

  }

  userForm = this.fb.group({
    Name: ['', Validators.required],
    email: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
    password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[!@#&()\-/$=<>?])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9!@#&()\-/$=<>?]+$'),
    Validators.minLength(5), Validators.maxLength(8)]],
    confirmPassword: ['', Validators.required],
    type: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    dob: ['', [Validators.required]],
    address: ['']
  },

    {
      validators: this.MustMatch('password', 'confirmPassword'),
    });

  get name() {
      return this.userForm?.get('Name');
  }
  get email() {
      return this.userForm?.get('email');
  }
  get password() {
      return this.userForm?.get('password');
  }

  get confirmPassword() {
      return this.userForm?.get('confirmPassword');
  }
  get type() {
      return this.userForm?.get('type');
  }
  get phone() {
      return this.userForm?.get('phone');
  }

  get dob() {
      return this.userForm?.get('dob');
  }

  get address() {
      return this.userForm?.get('address');
  }

    MustMatch(controlName: string, matchingControlName: string) {
      return (formGroup:FormGroup) => {
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

  onSelectFile(e:any){
   
    if(e.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      this.file = e.target.files[0];
        reader.onload=(event:any)=>{
        this.url = event.target.result;
      }
    }
      }


      onConfirm(){
      
        this.userSvc.setUser({
          file:this.file,
          profile:this.url,
          data:this.userForm.value
        })
        this.router.navigate(['/user/confirm']);
      }

}
