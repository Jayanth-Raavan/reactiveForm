import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  hide = true;

togglePasswordVisibility() {
  this.hide = !this.hide;

  if(this.hide == false)
    console.log("close")
  else
    console.log("open")
}
}

