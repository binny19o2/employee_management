import { Component, inject, OnInit } from '@angular/core';
import { Master } from '../../services/master';
import { IApiResponse, IChildDept, IParentDept, Employee as EmployeeModel } from '../../model/Employee';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  imports: [FormsModule],
  templateUrl: './employee.html',
  styleUrl: './employee.css',
})
export class Employee implements OnInit {
  masterService = inject(Master);
  parentDeptList: IParentDept[] = [];
  childDeptList: IChildDept[] = [];
  deptId: number = 0;
  employeeObj: EmployeeModel = new EmployeeModel();

  ngOnInit(): void {
      this.getParentDeptList();
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
}
