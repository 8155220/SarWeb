import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Upload } from './upload';
import * as firebase from 'firebase';

@Injectable({
    providedIn: "root"
  })
export class UploadService{
    constructor(private storage:AngularFireStorage,private db:AngularFireDatabase){
        
    }

    private basePath:string='/uploads';
    private uploadTask:firebase.storage.UploadTask;

    pushUpload(upload:Upload){
        let storageRef=firebase.storage().ref();
        this.uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

        this.uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED),
        (snapshot)=>{
            upload.progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
        },
        (error) =>{
            //upload failed
            console.log(error);
        },
        ()=>{
            //upload success
            upload.url = this.uploadTask.snapshot.downloadURL;;
            upload.name = upload.file.name;
            this.saveFileData(upload);
        }
    }

    
    // Writes the file details to the realtime db
  private saveFileData(upload: Upload) {
    this.db.list(`${this.basePath}/`).push(upload);
  }
  

  uploadFile(file) {
    //const file = event.target.files[0];
    const filePath = '/root';
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    return task;
    // observe percentage changes
    //this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    //task.snapshotChanges().pipe(
    //    finalize(() => this.downloadURL = fileRef.getDownloadURL() ))
    //.subscribe()
  }

    deleteUpload(upload:Upload){
        this.deleteFileData(upload.$key)
        .then(()=>{
            this.deleteFileStorage(upload.name)
        })
        .catch(error=>console.log(error)
        );
    }
    //Writes the file details to the realTime db
    private deleteFileData(key:string){
        return this.db.list(`${this.basePath}/`).remove(key);
    }
    private deleteFileStorage(name:string){
        let storageRef = firebase.storage().ref();
        storageRef.child(`${this.basePath}/${name}`).delete();
    }
     // Main task 
  task: AngularFireUploadTask;
  // Progress monitoring
  percentage: Observable<number>;
  snapshot: Observable<any>;
  // Download URL
  downloadURL: Observable<string>;
  // State for dropzone CSS toggling
  isHovering: boolean;
  toggleHover(event: boolean) {
    this.isHovering = event;
  }


 /* startUpload(event: FileList) {
    // The File object
    const file = event.item(0)

    // Client-side validation example
    if (file.type.split('/')[0] !== 'image') { 
      console.error('unsupported file type :( ')
      return;
    }

    // The storage path
    const path = `test/${new Date().getTime()}_${file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'My AngularFire-powered PWA!' };

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata })

    // Progress monitoring
    this.percentage = this.task.percentageChanges();
    this.snapshot   = this.task.snapshotChanges()

    // The file's download URL
    this.downloadURL = this.task.downloadURL(); */


  // Determines if the upload task is active
 /* isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes
  }
*/
}