import { Component, OnInit } from '@angular/core';

import {EmployeeService} from '../shared/employee.service';
import { NgForm } from '@angular/forms';
import {Employee} from '../shared/employee.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers:[EmployeeService]
})
export class EmployeeComponent implements OnInit {

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.resetForm();
    this.refreshEmployeeList();
  }

resetForm(form?: NgForm)  //form can be nullable
{
if(form)
form.reset();
this.employeeService.selectedEmployee= {
  _id:"",
  name:"",
  email:"",
  mobile:null
}
}

  onSubmit(form : NgForm)
  {
    if(form.value._id == "")
    {
    this.employeeService.postEmployee(form.value).subscribe((res)=>{
  this.resetForm(form);
  this.refreshEmployeeList();
})
    }
    else
    {
      this.employeeService.putEmployee(form.value).subscribe((res)=>{
    this.resetForm(form);
    this.refreshEmployeeList();
  })
      }
}


refreshEmployeeList(){
  this.employeeService.getEmployeeList().subscribe((res)=> {
    this.employeeService.employees=res as Employee[];
  })
}


onEdit(emp: Employee){
  this.employeeService.selectedEmployee=emp;
}


onDelete(_id: string, form: NgForm){
  if(confirm('Are you sure ?')==true)
  {
    this.employeeService.deleteEmployee(_id).subscribe((res)=> {
      this.refreshEmployeeList();    //refreshes table after deletion
      // this.resetForm(form);
    } )
  }
}

}
