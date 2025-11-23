import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee, IApiResponse } from '../model/Employee';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient){

  }

  createNewEmp(obj:Employee){
    return this.http.post<Employee>("/api/EmployeeManagement/CreateEmployee",obj)
  }
  updateEmp(obj:Employee){
    return this.http.put<Employee>("/api/EmployeeManagement/UpdateEmployee"+obj.employeeId,obj)
  }
  
  getAllEmployees(){
    return this.http.get<Employee[]>("/api/EmployeeManagement/GetAllEmployees")
  }
  deleteEmployeeById(id: number) {
    return this.http.delete(`/api/EmployeeManagement/DeleteEmployee/${id}`);
  }

}
