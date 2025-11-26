import { Component, inject, OnInit } from '@angular/core';
import { NgIf, NgForOf, NgFor, AsyncPipe, DatePipe } from "@angular/common";
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee';
import { Observable } from 'rxjs';
import { Employee ,ProjectModel} from '../../model/Employee';

@Component({
  selector: 'app-project',
  imports: [NgIf, ReactiveFormsModule, NgFor,AsyncPipe,DatePipe],
  templateUrl: './project.html',
  styleUrl: './project.css',
})
export class Project implements OnInit {
 onToggle: boolean = true;
 empService = inject(EmployeeService);
 empData$: Observable<Employee[]> = new Observable<Employee[]>();
 projectList: ProjectModel[] = [];
 constructor(){
  this.initializeForm();
  this.empData$ = this.empService.getAllEmployees();
 }

 ngOnInit(): void {
     this.getAllProject();
 }
 projectForm: FormGroup = new FormGroup({});
  initializeForm(project?: ProjectModel) {
    this.projectForm = new FormGroup({
      projectId: new FormControl(project ? project.projectId:0),
      projectName: new FormControl(project ? project.projectName:""),
      clientName: new FormControl(project ? project.clientName:""),
      startDate: new FormControl(project ? project.startDate:""),
      leadByEmpId: new FormControl(project ? project.leadByEmpId:""),
      contactPerson: new FormControl(project ? project.contactPerson:""),
      contactNo: new FormControl(project ? project.contactNo:""),
      emailId: new FormControl(project ? project.emailId:""),

    })
  }

  onSaveProject(){
    const formVal = this.projectForm.value;
    if (formVal.projectId == 0) {
      this.empService.createNewProject(formVal).subscribe((res:ProjectModel)=>{
        alert("Project created success");
        this.getAllProject();
      },error=>{
        alert("Error from API")
      })
    }
    else{
      this.empService.updateProject(formVal).subscribe((res:ProjectModel)=>{
        alert("Project Update Succ");
        this.getAllProject();
      },error=>{
        alert("Error from API");
      })

    }
  }
  getAllProject(){
    this.empService.getAllProjects().subscribe((res:ProjectModel[])=>{
      this.projectList=res;
    })
  }
  onEdit(obj:ProjectModel){
    this.initializeForm(obj);
    this.onToggle = !this.onToggle;
  }
  onDelete(obj:ProjectModel){
    this.empService.deleteProjectById(obj.projectId).subscribe((res)=>{
      alert("deletion succ");
      this.getAllProject();
    },error=>{
      alert("error from api")
    })
  }
}
