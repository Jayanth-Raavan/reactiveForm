import { Component, OnInit, ViewChild } from '@angular/core';
import { MasterService } from '../service/master.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private service : MasterService) {
    this.service.Refresh.subscribe(result=>{
      this.getAllEmps();
    })
   }

  ngOnInit(): void {
    this.getAllEmps();
  }
  //GetAllEmployees
  employees:any;
  getAllEmps(){
    this.service.getAllEmployee().subscribe(result=>{
      this.employees = result;
      console.log(this.employees.users[5].firstName)
    })
  }

  //deleteEmployee

  deleteEmployee(id:any){
   if(confirm("Are you sure want to delete")){
    this.service.deleteEmployee(id).subscribe(result=>{
      this.getAllEmps();
      console.log(result)
    });
   }
  }

  //edit and get employeebyId

  @ViewChild(ModalComponent) addview !: ModalComponent
  EditEmployee(id:any){
    this.addview.updateEmployee(id);
  }

}
