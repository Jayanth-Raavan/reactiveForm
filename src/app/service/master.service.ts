import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient) { }

  apiUrl="http://localhost:3001/employees";
  desUrl="http://localhost:3002/designation";

  //post request
  postEmployee(data:any){
   return this.http.post(this.apiUrl, data, {observe : 'response'}).pipe(tap(()=>{
    this.refreshRequest.next();
   }))
  }

  //get request by Id
  getEmployeeById(id:any){
    return this.http.get(this.apiUrl + '/' + id);
  }

  //get all request
  getAllEmployee(){
    return this.http.get(this.apiUrl);
  }

  //delete request
  deleteEmployee(id:any){
    return this.http.delete(this.apiUrl + '/' + id);
  }

  //for auto refresh the data

  private refreshRequest = new Subject<void>();

  get Refresh(){
    return this.refreshRequest;
  }


  //to get all designation 
  getDesignation(){
    return this.http.get(this.desUrl);
  }
}
