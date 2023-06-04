import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { CategoriesService } from '../services/categories.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categoryArray!: any[];
  formCategory: string = '';
  formStatus: string = 'Add';
  categoryid: string = '';
  categoryData: string = '';



  constructor(private categoryService: CategoriesService ) {}

  ngOnInit(): void {
    this.categoryService.loadData().subscribe(val => {
      console.log(val)

      this.categoryArray = val;
    })

    }


  onSubmit(formData:any) {
    let categoryData: Category = {
      category: formData.value.category
      // status: 'active'
    }
    console.log(categoryData);

    // let subCategoryData = {
    //   subCategory: 'sub-category1',
    //   status: 'active'
    // }

    if(this.formStatus == 'Add') {

      this.categoryService.saveData(categoryData)
      formData.resetForm()

    }else if(this.formStatus == 'Update') {

      this.categoryService.updateData(this.categoryid , categoryData)
      formData.resetForm()

    }




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

  onEdit(category: any, id: string) {
    this.formCategory = category;
    this.formStatus = 'Update';
    this.categoryid = id;
    console.log(category)
  }

  onDelete(id: string) {
    this.categoryService.deleteData(id)
  }



}
