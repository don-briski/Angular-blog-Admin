import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr'
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private storage: AngularFireStorage, 
    private afs: AngularFirestore, 
    private toastr: ToastrService ,
    private router: Router ) { }

  uploadImage(selectedImg: any, postData: any, formStatus: any, id: string) {

    const filePath = `postIMG/${Date.now()}`;
    console.log(filePath);
    
    this.storage.upload(filePath, selectedImg).then( () => {
      console.log('Post Image uploaded successfully')

      this.storage.ref(filePath).getDownloadURL().subscribe( URL => {
        postData.postImgPath = URL
        console.log(postData)


        if(formStatus == 'Edit') {
          this.updateData(id, postData)
        }else {
          this.saveData(postData)
        }
      


      })
      
    }).catch(err => {
      console.log('Error uploading post image')
    })

  }

  saveData(postData: any) {

    this.afs.collection('post').add(postData).then( docRef => {
      console.log(docRef)
      this.toastr.success('Post successfully added...!')
      this.router.navigate(['posts'])
    })

  }

 loadData() {
  return this.afs.collection('post').snapshotChanges().pipe(
    map(actions => {
      return actions.map( a => {
        const data = a.payload.doc.data();
        const id = a.payload.doc.id;
        return { id, data }
      })
    })
 )}




 loadSingleData(id: any) {
  return this.afs.collection('post').doc(id).valueChanges();

 }



 updateData(id: string, postData: any) {
  this.afs.collection('post').doc(id).update(postData).then(() => {
    
    this.toastr.success('Data updated sucessfully...!')
    this.router.navigate(['/posts'])

  }).catch( err => {
    console.log(err)
  })
 }


 deleteImage(postImgPath: string, id: string) {
    this.storage.storage.refFromURL(postImgPath).delete().then( () => {
      this.deleteData(id)
    })

 }


 deleteData(id: string) {
   this.afs.collection('post').doc(id).delete().then( () => {
     
     this.toastr.warning('Data deleted...!')

   }).catch( err => {
     console.log(err)
   })
 }

 markFeatured( id: string, featuredData: any ) {
 this.afs.doc(`post/${id}`).update( featuredData).then( () => {
    this.toastr.info('Post Featured status updated...!')
 })
 }



}

