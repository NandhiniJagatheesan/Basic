import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import {Observable} from 'rxjs/observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/toPromise';

import {Employee} from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
selectedEmployee : Employee; //for insert & update operation
employees : Employee[];  //all employees from mongodb
readonly baseURL = 'http://localhost:3000/employee';

constructor(private http: HttpClient) { }

postEmployee(emp: Employee){
return this.http.post(this.baseURL,emp);
}

getEmployeeList(){
  return this.http.get(this.baseURL)
}


putEmployee(emp : Employee)
{
  return this.http.put(this.baseURL + '/${emp._id}',emp); //concatating
}


deleteEmployee(_id: string){
  return this.http.delete(this.baseURL + '/${_id}');
}

}
