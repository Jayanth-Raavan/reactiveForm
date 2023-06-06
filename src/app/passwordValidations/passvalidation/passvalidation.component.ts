import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-passvalidation',
  templateUrl: './passvalidation.component.html',
  styleUrls: ['./passvalidation.component.css']
})
export class PassvalidationComponent implements OnInit {

  ngOnInit(): void {
  }

  showPassword = false;

  hidePassword = true;

togglePasswordVisibility() {
  this.hidePassword = !this.hidePassword;
}

  // togglePasswordVisibility() {
  //   // const eyeIcon = document.querySelector('.fa');
  //   // eyeIcon.classList.toggle('fa-eye-slash');
  //   this.showPassword = !this.showPassword;
  //   if(this.showPassword){
  //     console.log("open")
  //     console.log(this.showPassword)
  //   }
  //   else 
  //     console.log("close")
  //     console.log(this.showPassword)

  // }
  //assigning reactiveForm
  reactiveForm !: FormGroup;

  constructor(private formbuilder : FormBuilder) { 
    this.reactiveForm = this.formbuilder.group({
      username: new FormControl('',Validators.compose([Validators.required,Validators.minLength(3)])),
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])(?=.{8,})/)]],
      conpass: new FormControl('',Validators.required),

    },{
      validators: this.mustMatch('password','conpass')
    });
    this.reactiveForm.controls['password'].setValidators([this.passwordValidator()]);
    this.reactiveForm.controls['password'].updateValueAndValidity();
  }

  //getter property

  get username(){
    return this.reactiveForm.get('username');
  }

  get password(){
    return this.reactiveForm.get('password');
  }
  //password pattern setting

  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = control.value;
      if (password) {
        const hasMinLength = /.{8,}/.test(password);
        const hasNumber = /\d/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
        
        if (!hasMinLength && !hasNumber && !hasUpper && !hasSpecial) {
          return { passwordErrors: 'Password must contain 8 characters, should contain at least 1 number, 1 Uppercase letter, and 1 special character' };
        }
        if (!hasNumber && !hasUpper && !hasSpecial) {
          return { passwordErrors: 'Password should contain at least 1 uppercase letter, 1 special character and 1 number.' };
        }
        if (!hasUpper && !hasSpecial) {
          return { passwordErrors: 'Password should contain at least 1 special character and 1 uppercase letter.' };
        }
        if (!hasSpecial) {
          return { passwordErrors: 'Password should contain at least 1 special character' };
        }
        if (!hasMinLength) {
          return { passwordErrors: 'Password must contain 8 characters' };
        }
        if (!hasNumber) {
          return { passwordErrors: 'Password should contain at least 1 number' };
        }
        if (!hasUpper) {
          return { passwordErrors: 'Password should contain at least 1 Uppercase letter' };
        }
      }
      return null;
    };
  }

  get conpass(){
    return this.reactiveForm.get('conpass');
  }

  get f(){
    return this.reactiveForm.controls;
  }

  // logic for passowrd and confirm password

  mustMatch(passowrd:any, conpass:any){
    return (formgroup : FormGroup)=>{
      const passwordControl = formgroup.controls[passowrd];
      const conPasswordControl = formgroup.controls[conpass];

      if(conPasswordControl.errors && !conPasswordControl.errors['mustMatch']){
        return;
      }
      if(passwordControl.value != conPasswordControl.value){
        conPasswordControl.setErrors({mustMatch:true});
      }
      else{
        conPasswordControl.setErrors(null);
      }
    }
  }


  //register function

  register(){
    console.log(this.reactiveForm.value)
  }
}
