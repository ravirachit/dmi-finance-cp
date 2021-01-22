import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profileedit',
  templateUrl: './profileedit.component.html',
  styleUrls: ['./profileedit.component.scss']
})
export class ProfileeditComponent implements OnInit {
  userBasicInfo: any;

  constructor(
    private http:HttpClient,
     private data: DataService,
     private router: Router) { }

  
  ngOnInit() {

    this.userBasicInfo = JSON.parse(localStorage.getItem('user_basic_info')) || [];
  }

}
