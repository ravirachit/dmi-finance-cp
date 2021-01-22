import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-blogslider',
  templateUrl: './blogslider.component.html',
  styleUrls: ['./blogslider.component.scss']
})
export class BlogsliderComponent implements OnInit {

  blogData:any;
  paginationData: any;
  page = 1;
  pageSize = 9;
  collectionSize: any;
  staticPage:any;
  blogDetailsData:any;

  constructor(
    private data:DataService,
    private http: HttpClient,
    public domSanatize: DomSanitizer,
    private router: Router
    ) { }

  ngOnInit() {
    this.staticPage = '1'
    this.data.getBlogList(this.staticPage).subscribe(res => {
      this.blogData = res;
    })
  }
  blogDetail(blog){
    //alert(blog.id)
    this.data.getBlogDetails(blog.id).subscribe(res =>{
      this.blogDetailsData = res;
      localStorage.setItem('sliderBlogDetail', JSON.stringify(this.blogDetailsData.data))
      this.router.navigate(['blogdetails'])
    })
  }

  loadPage(page: number) {
    this.data.getBlogList(page).subscribe(res => {
      this.blogData = res;
    })
    window.scroll(0,0);
  }

}
