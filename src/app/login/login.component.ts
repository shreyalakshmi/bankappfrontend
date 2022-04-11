import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  aim = "BANK SAFE, WITH US"
  // {{string interpolation}}
  accno = ["account number please!"]
  acno = ""
  pswd = ""

  loginForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
  })

  constructor(private router: Router, private ds: DataService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }



  get_accno(event: any) {
    console.log(event.target.value)
    this.acno = event.target.value

  }
  get_pswd(event: any) {
    console.log(event.target.value)
    this.acno = event.target.value


  }

  login() {

    // alert("clicked")
    var acno = this.loginForm.value.acno
    var pswd = this.loginForm.value.pswd
    if (this.loginForm.valid) {
       this.ds.login(acno, pswd)
       .subscribe((result:any)=>{
       if (result) {
          localStorage.setItem("currentUname",JSON.stringify(result.currentUname))
          localStorage.setItem("currentAcno",JSON.stringify(result.currentAcno))
          localStorage.setItem("token",JSON.stringify(result.token))
 
          alert(result.message)
          this.router.navigateByUrl("dashboard")
        }
  
       },
       (result)=>{
         alert(result.error.message)
       }
       )
    }
    else {
      alert("invalid LOGIN FORM")
    }

  }



  // FOR ONLY TEMPLATE REFERENCE VARIABLE METHOD

  // login(a:any,p:any){
  //   console.log(a.value);

  //   // alert("clicked")
  //   var acno=a.value
  //   var pswd=p.value
  //   let db=this.database
  //   if(acno in db){
  //     if(pswd==this.database[acno]["password"]){
  //       alert("login success")
  //     }
  //     else{alert("invalid password")}

  //   }
  //   else{
  //     alert("invalid accno")
  //   }
  // }

}
