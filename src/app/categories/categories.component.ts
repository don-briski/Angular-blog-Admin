import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoriesService } from '../services/categories.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  constructor(private categoryService: CategoriesService ) {}

  ngOnInit(): void {

  }

  onSubmit(formData:any) {
    let categoryData: Category = {
      category: formData.value.category,
      status: 'active'
    }
    console.log(categoryData);

    // let subCategoryData = {
    //   subCategory: 'sub-category1',
    //   status: 'active'
    // }

    this.categoryService.saveData(categoryData)


    // this.afs.collection('categories').add(categoryData).then(docRef => {
    //   console.log(docRef)

    //   this.afs.collection('categories').doc(docRef.id).collection('subcategory').add(subCategoryData).then(docRef1 => {
    //     console.log(docRef1)

    //    // this.afs.doc(`categories/${docRef.id}/subcategory/${docRef1}`).collection('subsubcategory').add(subCategoryData)

    //     this.afs.collection('categories').doc(docRef.id).collection('subcategory').doc(docRef1.id).collection('sub-subcategory').add(subCategoryData).then(docRef2 => {
    //       console.log('second level subCategory saved sucessfully');
    //     })
    //   })


    // })
    // .catch( err => {
    //   console.log(err)
    // })


  }

}
