import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-all-post',
  templateUrl: './all-post.component.html',
  styleUrls: ['./all-post.component.css']
})
export class AllPostComponent implements OnInit {

  postArray: any[] = []

  constructor (private postService: PostService) {}

  ngOnInit(): void {
    this.postService.loadData().subscribe( val => {
      console.log(val)
      this.postArray = val
    })
  }


  onDelete( postImgPath: string, id: string) {

    this.postService.deleteImage(postImgPath, id);
  }



onFeatured(id: string, value: boolean) {

  const featuredData = {
    isFeatured: value
  }

  this.postService.markFeatured(id, featuredData);


}


}
