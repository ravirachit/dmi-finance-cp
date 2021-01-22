import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  
  constructor(private data: DataService, private http:HttpClient, private route:ActivatedRoute) {
    
   }


   kbposts: any;
   ngOnInit() {
     this.data.getKBdata().subscribe( data=> {this.kbposts = data; 
     
     }
       )
   }

}
