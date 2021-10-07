import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from './employee-dashboard.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css'],
})
export class EmployeeDashboardComponent implements OnInit {
  formValue!: FormGroup;
  showAdd!: boolean;
  showUpdate!: boolean;
  employeeData!: any;

  employeeModelObj: EmployeeModel = new EmployeeModel();

  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      dob: [''],
      telephone: [''],
      email: [''],
      // mstatus: [''],
    });
    this.getAllEmployee();
  }
  clickAddEmployee() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  onEdit(row: any) {
    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['dob'].setValue(row.dob);
    this.formValue.controls['telephone'].setValue(row.telephone);
    this.formValue.controls['email'].setValue(row.email);
    this.showUpdate = true;
    this.showAdd = false;
  }

  postEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.dob = this.formValue.value.dob;
    this.employeeModelObj.telephone = this.formValue.value.telephone;
    this.employeeModelObj.email = this.formValue.value.email;

    this.api.postEmployee(this.employeeModelObj).subscribe((res) => {
      console.log(res);
      alert('Employee Added Success');
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    }, err => {
      alert("Something Went Wrong");
    });
  }

  getAllEmployee() {
    this.api.getEmployee().subscribe(res => {
      this.employeeData = res;
    })
  }

  deleteEmployee(row: any) {
    this.api.deleteEmployee(row.id).subscribe(res => {
      alert("Employee Deleted");
      this.getAllEmployee();
    })
  }

  updateEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.dob = this.formValue.value.dob;
    this.employeeModelObj.telephone = this.formValue.value.telephone;
    this.employeeModelObj.email = this.formValue.value.email;

    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id).subscribe(res => {
      alert("Employee Updated Success");
      let ref = document.getElementById('cancel');
      ref?.click();
      this.getAllEmployee();
    })
  }
}
