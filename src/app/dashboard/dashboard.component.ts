import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  accno = ["account number please!"]
  Amount = ["enter amount"]
  //  dep
  acno = ""
  pswd = ""
  amount = ""

  depositForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })

  // with
  acno1 = ""
  pswd1 = ""
  amount1 = ""

  withdrawForm = this.fb.group({
    acno1: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd1: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
    amount1: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })

  user: any                          // for {{string interpolation}}
  Acno: any
  lDate: any
  constructor(private ds: DataService, private fb: FormBuilder, private router: Router) {
    if(localStorage.getItem("currentUname")){
      this.user = JSON.parse(localStorage.getItem("currentUname")||'')     //since it should be executed first

    }
    this.lDate = new Date()    //to display date
  }

  ngOnInit(): void {
    if (!localStorage.getItem("token")) {
      alert("please log in")
      this.router.navigateByUrl("")
    }
  }



  deposit() {
    // alert("desposited successfully")

    var acno = this.depositForm.value.acno
    var pswd = this.depositForm.value.pswd
    var amount = this.depositForm.value.amount
    if (this.depositForm.valid) {
     this.ds.deposit(acno, pswd, amount)
       .subscribe((result:any)=>{
        if (result) {
          alert(result.message)
        }
  
       } ,
       (result)=>{
         alert(result.error.message)
       }
       )
    }
    else{
      alert("invalid form")
    }
    
  }


  withdraw() {
    // alert("withdraw successfull")

    var acno = this.withdrawForm.value.acno1
    var password = this.withdrawForm.value.pswd1
    var amt = this.withdrawForm.value.amount1
    if (this.withdrawForm.valid) {
      this.ds.withdraw(acno,password,amt)  //account_num, pass_word, amount_value
      .subscribe((result:any)=>{
        if (result) {
          alert(result.message) //`${amount_value} withdrawed! New balance is ${result}`
        }
  
      },
      (result)=>{
        alert(result.error.message)
      })
    }
    else {
      alert("invalid form")
    }

  }

  logout() {
    localStorage.removeItem("currentAcno")
    localStorage.removeItem("currentUname")
localStorage.removeItem("token")
    this.router.navigateByUrl("")

  }

  deleteAcc() {
    this.Acno = JSON.parse(localStorage.getItem("currentAcno") || '')
  }


  deleteFromParent(event:any){
    console.log(event);
    
this.ds.deleteAccount(event)
.subscribe((result:any)=>{
  if(result){
    alert(result.message)
    localStorage.removeItem("currentAcno")
    localStorage.removeItem("currentUname")
localStorage.removeItem("token")

    this.router.navigateByUrl("")
  }
},
(result)=>{
  alert(result.error.message)
})
  }
  cancelFromParent() {
    this.Acno = ""
  }

}
