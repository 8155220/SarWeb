import { Upload } from "./../../../services/upload/upload";
import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { UploadService } from "../../../services/upload/upload.service";
import * as _ from "lodash";
@Component({
  selector: "app-upload-image",
  templateUrl: "./upload-image.component.html",
  styleUrls: ["./upload-image.component.scss"]
})
export class UploadImageComponent implements OnInit {
  @Output() imageBase64:EventEmitter<string> = new EventEmitter();
  @Input('fotoURL') fotoURL:string="";

  
  ngOnInit(): void {
    //throw new Error("Method not implemented.");
  }


  selectedFiles: FileList;
  currentUpload: Upload;
  imagenPerfil: string;
  fileReader = new FileReader();
  constructor(private upSvc: UploadService) {
    this.test();
    console.log('fotoURL');
    if(this.fotoURL)     
    console.log(this.fotoURL);
    
  }

  uploadFile(event) {
    this.upSvc.uploadFile(event.target.files[0]);
  }


  test() {
    this.fileReader.onload = (event:any) => {
      let output = <HTMLInputElement>document.getElementById("output_image");
      let image = new Image();
      image.onload = (imgsrc:any) => {
        
        //document.getElementById("original-Img").src = image.src;
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        canvas.width = 200;
        canvas.height = 200;
        context.drawImage(
          image,
          0,
          0,
          image.width,
          image.height,
          0,
          0,
          canvas.width,
          canvas.height
        );

        output.src = canvas.toDataURL();
        this.imageBase64.emit(canvas.toDataURL());
      };
      image.src = event.target.result;
      
    };
    //this.fileReader.readAsDataURL(event.target.files[0]);
  }


  loadImageFile() {
    var uploadImage = <HTMLInputElement>document.getElementById("upload-Image");
    if (uploadImage.files.length === 0) {
      return;
    }
    var uploadFile = (<HTMLInputElement>document.getElementById("upload-Image"))
      .files[0];
     


    this.fileReader.readAsDataURL(uploadFile);
  }
}
