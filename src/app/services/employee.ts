import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee, IApiResponse, ProjectEmployee, ProjectModel } from '../model/Employee';
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
  createNewProject(obj:ProjectModel){
    return this.http.post<ProjectModel>("/api/EmployeeManagement/CreateProject",obj)
  }
  getAllProjects(){
    return this.http.get<ProjectModel[]>("/api/EmployeeManagement/GetAllProjects")
  }
  updateProject(obj:ProjectModel){
    return this.http.put<ProjectModel>("/api/EmployeeManagement/UpdateProject"+obj.projectId,obj)
  }
  deleteProjectById(id:number){
    return this.http.delete(`/api/EmployeeManagement/DeleteProject/${id}`);
  }
  addNewProjectEmp(obj:ProjectEmployee){
    return this.http.post<ProjectEmployee>("/api/EmployeeManagement/CreateProjectEmployee",obj)
  }
  getProjectEmployees(){
    return this.http.get<ProjectEmployee[]>("/api/EmployeeManagement/GetAllProjectEmployees")
  }
}
