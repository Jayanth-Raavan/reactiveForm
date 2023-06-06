import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MasterService } from '../service/master.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @ViewChild('content') addview!: ElementRef;

  closeResult = '';

  constructor(private modalService: NgbModal, private service: MasterService) {}

  open() {
    this.clearForm();
    this.modalService
      .open(this.addview, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  ngOnInit(): void {
    this.getDes();
  }

  // formGroup

  employeeForm = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    name: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.minLength(5)])
    ),
    email: new FormControl(
      '',
      Validators.compose([Validators.required, Validators.email])
    ),
    phone: new FormControl('', Validators.required),
    designation: new FormControl('', Validators.required),
  });

  //Save employee (or) Post data
  buttonDisabled = false;
  buttonText = 'Upload';
  Employees: any;
  message = '';
  messageColor: any;
  buttonColor: any;

  saveEmployee() {
    this.buttonDisabled = true;
    this.buttonText = 'Saving Employee...';
    this.service.postEmployee(this.employeeForm.value).subscribe((result) => {
      this.Employees = result;
      console.log(result);

      if (result.status === 200 || 201) {
        this.buttonText = 'Employee saved successfully';
        this.buttonColor = 'green';

        setTimeout(() => {
          this.buttonText = 'Save';
		  this.buttonColor = 'blue';
          setTimeout(() => {
            if (this.buttonText === 'Save') {
              this.buttonDisabled = false;
              
            }
          }, 2000);
        }, 5000);
      } else {
        this.buttonText = 'Failed to save employee';
        this.buttonColor = 'red';
        this.buttonDisabled = true;
      }

      this.employeeForm.reset();
    });
  }

  //editEmployee

  edit: any;
  updateEmployee(id: any) {
    this.open();
    this.service.getEmployeeById(id).subscribe((result) => {
      this.edit = result;

      // injecting the data table to modal
      if(this.edit != null){
        this.employeeForm = new FormGroup({
          id: new FormControl(this.edit.id),
          name: new FormControl(this.edit.name),
          email: new FormControl(this.edit.email),
          phone: new FormControl(this.edit.phone),
          designation: new FormControl(this.edit.designation),
        });
      }
      
    });
  }

  //clearing form

  clearForm() {
    this.employeeForm.reset(); // Reset the form instead of manually clearing the fields

    //instead of writing clearform like below, we can clear the form data by calling reset() method.
    /*this.employeeForm.setValue({
		id:'',
		name:'',
		email:'',
		phone:'',
		designation:''
	});*/
  }

  // get methods to display error messages or to get the values
  get name() {
    return this.employeeForm.get('name');
  }

  get email() {
    return this.employeeForm.get('email');
  }

  get phone() {
    return this.employeeForm.get('phone');
  }

  get designation() {
    return this.employeeForm.get('designation');
  }

  //get designation from service

  des: any;

  getDes() {
    this.service.getDesignation().subscribe((result) => {
      this.des = result;
    });
  }
}
