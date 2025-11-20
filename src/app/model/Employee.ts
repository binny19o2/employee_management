export class Employee{
    
  employeeId: number;
  employeeName: string;
  contactNo: string;
  emailId: string;
  deptId: number;
  password: string;
  gender: string;
  role: string;
  createdDate: Date;

  constructor(){
    this.employeeId = 0;
    this.deptId = 0;
    this.employeeName = "";
    this.contactNo = "";
    this.emailId = "";
    this.password = "";
    this.gender = "";
    this.role = "";
    this.createdDate = new Date()
  }
}