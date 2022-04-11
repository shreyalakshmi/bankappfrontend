import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


//to declare headers globally 
const options={
  headers: new HttpHeaders()
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentUname: any
  currentAcno:any
  database: any = {
    1000: { acno: 1000, uname: "NILA", password: "aaaa", balance: 5000,transaction:[] },
    1001: { acno: 1001, uname: "NIMMI", password: "bbbb", balance: 5000,transaction:[] },
    1002: { acno: 1002, uname: "NEEL", password: "cccc", balance: 5000,transaction:[] }

  }

  constructor(private http:HttpClient) { 
  //  this.getDetails()
  }




  //local storage
  saveDetails(){
    if(this.database){
      localStorage.setItem("database", JSON.stringify(this.database))
    }
    if(this.currentUname){
      localStorage.setItem("currentUname",JSON.stringify(this.currentUname))
    }
    if(this.currentAcno){
      localStorage.setItem("currentAcno",JSON.stringify(this.currentAcno))
    }
  }

  getDetails(){
    if(localStorage.getItem("database")){
      this.database=JSON.parse(localStorage.getItem("database") || "")   //  (|| "") to correct error
    }
    if(localStorage.getItem("currentUname")){
      this.currentUname=JSON.parse(localStorage.getItem("currentUname") || "")
    }
  }


  //get transaction array
  getTransaction(acno:any){
    const data={acno}
 return this.http.post("http://localhost:3001/getTransaction",data,this.getOption())

  }
//delete account number
deleteAccount(acno:any){
  return this.http.delete("http://localhost:3001/deleteAcc/"+acno)
}


  register(acno: any, uname: any, password: any) {         //remember to give in the same order as in database
   const data={
     acno,uname,password
   }
   //register API
   return this.http.post("http://localhost:3001/register",data)
  }

  // let db = this.database                          //got the database defined above
  // if (acno in db) {
  //   return false  //since reg called in reg comp.ts the value here should be returend to reg comp.ts

  // }
  // else {
  //   db[acno] = {
  //     acno, uname, password,                 //to add the details entered by user in database db[key]={values in db}  Remember type in order
  //     balance: 0,
  //     transaction:[]
  //   }
  //   this.saveDetails()      //to save details while registering in local storage
  //   return true

  // }



  
  //login function
  
  
  
  login(acno: any, password: any) {
const data={acno,password}
//login API
return this.http.post("http://localhost:3001/login",data)
  }
      // alert("clicked")
    // var acno=this.acno
    // var pswd=this.pswd
    // let db = this.database
    // if (acno in db) {
    //   if (password == this.database[acno]["password"]) {
    //     this.currentUname = db[acno]["uname"]   //to get username to display after welcome
    //     this.currentAcno=acno

    //     this.saveDetails()
    //     return true

    //   }
    //   else {
    //     alert("invalid password")
    //     return false
    //   }

    // }
    // else {
    //   alert("invalid accno")
    //   return false
    // }


  deposit(acno: any, password: any, amt: any) {
const data={acno,
           password,
           amt}
return this.http.post("http://localhost:3001/deposit",data,this.getOption())
  }
  getOption(){
    const token=JSON.parse(localStorage.getItem("token") || '')
    let headers=new HttpHeaders()
    if(token){
      headers=headers.append('x-access-token',token)
options.headers=headers
    }
    return options
  }

    // var amount = parseInt(amt)         //to change from string
    // let db = this.database
    // if (acno in db) {
    //   if (password == db[acno]["password"]) {
    //     db[acno]["balance"] += amount                   //to add up with balance
    //     db[acno].transaction.push({
    //       amount:amount,
    //       type:"CREDIT"
    //     })                                 //to add the details of transactions in database
    //     this.saveDetails()
    //     return db[acno]["balance"]
    //   }
    //   else {
    //     alert("invalid password")
    //     return false
    //   }
    // }
    // else {
    //   alert("invalid account number")
    //   return false
    // }




  // account_num,pass_word,amount_value

  withdraw(acno: any, password: any, amt: any) {

const data={
 acno,
  password,
  amt}
return this.http.post("http://localhost:3001/withdraw",data,this.getOption())



  }

  // var amount = parseInt(amount_value)

  // let db = this.database
  // if (account_num in db) {
  //   if (pass_word == db[account_num]["password"]) {
  //     if (db[account_num]["balance"] > amount_value) {
  //       db[account_num]["balance"] -= amount
  //       db[account_num].transaction.push({
  //         amount:amount,
  //         type:"DEBIT"
  //       })

  //       this.saveDetails()
  //       return db[account_num]["balance"]

  //     }
  //     else {
  //       alert("insufficient balance")
  //     }
  //   }
  //   else {
  //     alert("invalid password")
  //     return false
  //   }
  // }
  // else {
  //   alert("invalid account number")
  //   return false
  // }


}
