import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { NgIf, NgForOf, NgFor, AsyncPipe, DatePipe } from "@angular/common";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee';
import { Observable } from 'rxjs';
import { Employee, ProjectEmployee, ProjectModel } from '../../model/Employee';

@Component({
  selector: 'app-project',
  imports: [NgIf, ReactiveFormsModule, NgFor, AsyncPipe, DatePipe,FormsModule],
  templateUrl: './project.html',
  styleUrl: './project.css',
})
export class Project implements OnInit {
  @ViewChild("myModal") empModal: ElementRef | undefined;
  onToggle: boolean = true;
  empService = inject(EmployeeService);
  empData$: Observable<Employee[]> = new Observable<Employee[]>();
  projectList: ProjectModel[] = [];
  projectEmployee: ProjectEmployee = new ProjectEmployee();
  projectEmployeeList: ProjectEmployee[] = [];
  constructor() {
    this.initializeForm();
    this.empData$ = this.empService.getAllEmployees();
  }
  
  ngOnInit(): void {
    this.getAllProject();
  }
  projectForm: FormGroup = new FormGroup({});
  initializeForm(project?: ProjectModel) {
    this.projectForm = new FormGroup({
      projectId: new FormControl(project ? project.projectId : 0),
      projectName: new FormControl(project ? project.projectName : ""),
      clientName: new FormControl(project ? project.clientName : ""),
      startDate: new FormControl(project ? project.startDate : ""),
      leadByEmpId: new FormControl(project ? project.leadByEmpId : ""),
      contactPerson: new FormControl(project ? project.contactPerson : ""),
      contactNo: new FormControl(project ? project.contactNo : ""),
      emailId: new FormControl(project ? project.emailId : ""),

    })
  }

  onSaveProject() {
    const formVal = this.projectForm.value;
    if (formVal.projectId == 0) {
      this.empService.createNewProject(formVal).subscribe((res: ProjectModel) => {
        alert("Project created success");
        this.getAllProject();
      }, error => {
        alert("Error from API")
      })
    }
    else {
      this.empService.updateProject(formVal).subscribe((res: ProjectModel) => {
        alert("Project Update Succ");
        this.getAllProject();
      }, error => {
        alert("Error from API");
      })

    }
  }
  getAllProject() {
    this.empService.getAllProjects().subscribe((res: ProjectModel[]) => {
      this.projectList = res;
    })
  }
  onEdit(obj: ProjectModel) {
    this.initializeForm(obj);
    this.onToggle = !this.onToggle;
  }
  onDelete(obj: ProjectModel) {
    this.empService.deleteProjectById(obj.projectId).subscribe((res) => {
      alert("deletion succ");
      this.getAllProject();
    }, error => {
      alert("error from api")
    })
  }
  onAddEmployee(id: number) {
    // if(this.empModal){
    //   this.empModal.nativeElement.style.display = 'block';
    // }
    this.getAllProjectEmp(id);
    this.projectEmployee.projectId = id;
    if (this.empModal) {
      const modal: HTMLElement = this.empModal.nativeElement;
      // show modal (without bootstrap JS) by adding 'show' and setting display
      modal.classList.add('show');
      modal.style.display = 'block';
      modal.setAttribute('aria-modal', 'true');
      modal.setAttribute('role', 'dialog');

      // append a backdrop so it looks like a real modal
      const existing = document.getElementById('project-modal-backdrop');
      if (!existing) {
        const backdrop = document.createElement('div');
        backdrop.id = 'project-modal-backdrop';
        backdrop.className = 'modal-backdrop fade show';
        document.body.appendChild(backdrop);
      }
    }
  }
  closeModal(){
    // if(this.empModal){
    //   this.empModal.nativeElement.style.display = 'none';
    // }
   if (this.empModal) {
      const modal: HTMLElement = this.empModal.nativeElement;
      modal.classList.remove('show');
      modal.style.display = 'none';
      modal.removeAttribute('aria-modal');
      modal.removeAttribute('role');
    }
    const backdrop = document.getElementById('project-modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }  
  }
  onAddProjectEmployee(){
    this.empService.addNewProjectEmp(this.projectEmployee).subscribe((res)=>{
      alert("emp added succ");


    },error=>{
      alert("error from api");
    })
  }
  getAllProjectEmp(id: number) {
    this.empService.getProjectEmployees().subscribe((res: ProjectEmployee[]) => {
      const rec = res.filter(m => m.projectId == id);
      this.projectEmployeeList = rec;
    })
  }
}
