import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  accno = ["account number please!"]
  username = ["Username"]
  // acno=""
  // pswd=""
  // uname=""


  // for reactive form
  registerForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    uname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]]
  })


  constructor(private ds: DataService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  register() {
    var uname = this.registerForm.value.uname
    var acno = this.registerForm.value.acno
    var pswd = this.registerForm.value.pswd
    if (this.registerForm.valid) {                              //only when the register form is valid next fnct to be performed
      this.ds.register(acno, uname, pswd)        //since we need the reg function defined in dataservice.ts in reg comp.ts call reg fnct from dataservice as this.ds(in constructor).register
        .subscribe((result: any) => {
          if (result) {
            alert(result.message)
            this.router.navigateByUrl("")       //for redirecting to login page when successfully registered
                      }             },
          (result) => {
            alert(result.error.message)   //error because 400 series msgs are in error
                    }
        )
       }
     }
   }
    // let database=this.ds.database                       since register is defined in dataservices hence

    //   else {
    //     alert("user already exist")
    //   }

    // }
    // else {
    //   alert("invalidform")
    // }
