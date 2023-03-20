import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireStorageService {
  uploadPercent!: Observable<number>;
  downloadURL!: Observable<string>;
  profileUrl!: Observable<any>;

  constructor(private storage: AngularFireStorage) { }
  uploadFile(event:any, filePath:string) {
    const file = event.target.files[0];
    //const filePath = 'imgBlog';
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    //this.filePath=inputFile.value;

    // observe percentage changes
    this.uploadPercent = <Observable<number>> task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => {

          this.downloadURL=fileRef.getDownloadURL();
          console.log("imgUrl:",this.downloadURL);

        })
     )
    .subscribe()
  }
  downloadUrl()
  {
    const ref=this.storage.ref('users/davideast.jpg');
    this.profileUrl= ref.getDownloadURL();
    return this.profileUrl;
  }

}
