import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';
import { ICategory } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private afs: AngularFirestore, private toastr: ToastrService) { }

  saveData(data: any) {
    this.afs.collection('categories').add(data).then(docRef => {
      console.log(docRef)
      this.toastr.success('Data inserted sucessfully...!')

    }).catch( err => {
      console.log(err)
    })
  }

  loadData() {

    return this.afs.collection('categories').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {

          const data = a.payload.doc.data()
          const id = a.payload.doc.id;

          return { id, data}
        })
      })
    )
  }


  updateData(id: string, Editdata: any) {
    this.afs.collection('categories').doc(id).update(Editdata).then(docRef => {
      console.log(docRef)
      this.toastr.success('Data updated sucessfully...!')

    }).catch( err => {
      console.log(err)
    })
  }
// simplifying query shorthand by removing collection('categories')
//
// updateData(id: string, Editdata: any) {
//   this.afs.doc(`categories/${id}`).update(Editdata).then(docRef => {
//     console.log(docRef)
//     this.toastr.success('Data updated sucessfully...!')

//   }).catch( err => {
//     console.log(err)
//   })
// }


//delete query on categories collection in firebase store
  deleteData( id: string) {
    this.afs.collection('categories').doc(id).delete().then(docRef => {
      console.log( id)
      this.toastr.success('Data deleted sucessfully...!')
    })
  }

}

//simpllifyn delete query by removing collection('categories')
//
// deleteData( id: string) {
//   this.afs.doc(`categories/${id}`).delete().then(docRef => {
//     console.log( id)
//     this.toastr.success('Data deleted sucessfully...!')
//   })
// }
// }
