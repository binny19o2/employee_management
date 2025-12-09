import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Master } from '../../services/master';
import { IApiResponse, IChildDept, IParentDept, Employee as EmployeeModel } from '../../model/Employee';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../services/employee';

@Component({
  selector: 'app-employee',
  imports: [FormsModule, CommonModule,NgIf,NgFor],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee implements OnInit {
  masterService = inject(Master);
  empService = inject(EmployeeService);
  parentDeptList: IParentDept[] = [];
  childDeptList: IChildDept[] = [];
  deptId: number = 0;
  employeeObj: EmployeeModel = new EmployeeModel();
  employeeList: EmployeeModel[] = [];
  isSidePanel = signal<boolean>(true);
  ngOnInit(): void {
      this.getParentDeptList();
      this.getEmployees();
  }

  getParentDeptList(){
    this.masterService.getParentDept().subscribe((res:IApiResponse)=>{
      this.parentDeptList = res.data;
    })
  }
  onDeptChange(){
    this.masterService.getChildDeptByParentId(this.deptId).subscribe((res:IApiResponse)=>{
      if (!res.data || res.data.length === 0) {
        res.data = [
          {
            childDeptId: 1,
            departmentName: "Dummy1",
            parentDeptId: 15556
          },
          {
            childDeptId: 2,
            departmentName: "Dummy2",
            parentDeptId: 15556
          }
        ];
      }
      this.childDeptList = res.data;
    })
  }
  onSaveEmp(){
    this.empService.createNewEmp(this.employeeObj).subscribe((res:EmployeeModel)=>{
      alert("Emp Added Success")
    },error=>{
      alert("error")
    })
  }
  getEmployees(){
    this.empService.getAllEmployees().subscribe((res:EmployeeModel[])=>{
      this.employeeList = res;
    })
  }
  onDelete(id: number){
    const result = confirm("Are you sure?");
    if (result) {
      this.empService.deleteEmployeeById(id).subscribe((res) => {
        alert("deletion success")
        this.getEmployees();
      }, error => {
        alert("Error, cannot delete");
      })
    }
  }
  onEdit(obj: EmployeeModel){
    this.employeeObj = obj;
  }
  onUpdateEmp(obj: EmployeeModel){
    this.empService.updateEmp(this.employeeObj).subscribe((res:EmployeeModel)=>{
      alert("Emp Update Success");
      this.getEmployees();
    },error=>{
      alert("error")
    })
  }
  onAdd(){
    this.isSidePanel.set(true);
  }
  close(){
    this.isSidePanel.set(false);
  }
}
