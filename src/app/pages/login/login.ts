import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginObj: any = {
    "userName": "",
    "password": ""
  }

  http = inject(HttpClient);
  router = inject(Router);
  onLogin(){
    // this.http.post("https://projectapi.gerasim.in/api/EmployeeManagement/login",this.loginObj).subscribe((res: any) =>{
    // this.http.post("/api/EmployeeManagement/login",this.loginObj).subscribe((res: any) =>{
    //   if(res.result){
    //     localStorage.setItem('employeeApp',JSON.stringify(res.data));
    //     this.router.navigate(["/dashboard"]);
    //   }
    //   else{
    //     alert(res.message);
    //   }
    // })
    this.router.navigate(["/dashboard"]);

  }

}
