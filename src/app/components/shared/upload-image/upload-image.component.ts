import { Upload } from "./../../../services/upload/upload";
import { Component, OnInit } from "@angular/core";
import { UploadService } from "../../../services/upload/upload.service";
import * as _ from "lodash";
@Component({
  selector: "app-upload-image",
  templateUrl: "./upload-image.component.html",
  styleUrls: ["./upload-image.component.scss"]
})
export class UploadImageComponent implements OnInit {
  ngOnInit(): void {
    //throw new Error("Method not implemented.");
  }

  selectedFiles: FileList;
  currentUpload: Upload;
  imagenPerfil: string;
  fileReader = new FileReader();
  constructor(private upSvc: UploadService) {
    this.test();
  }

  uploadFile(event) {
    this.upSvc.uploadFile(event.target.files[0]);
  }

  // detectFiles(event) {
  //     this.selectedFiles = event.target.files;
  // }

  // uploadSingle() {
  //   let file = this.selectedFiles.item(0)
  //   this.currentUpload = new Upload(file);
  //   this.upSvc.pushUpload(this.currentUpload)
  // }

  // uploadMulti() {
  //   let files = this.selectedFiles
  //   let filesIndex = _.range(files.length)
  //   _.each(filesIndex, (idx) => {
  //     this.currentUpload = new Upload(files[idx]);
  //     this.upSvc.pushUpload(this.currentUpload)}
  //   )
  // }

  test() {
    this.fileReader.onload = function(event:any) {
      let output = <HTMLInputElement>document.getElementById("output_image");
      let image = new Image();
      image.onload = function() {
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
        console.log(canvas.toDataURL());
      };
      image.src = event.target.result;
    };
    //this.fileReader.readAsDataURL(event.target.files[0]);
  }

  preview_image(event) {
    let reader = new FileReader();
    reader.onload = (eventReader: any) => {
      //let output = document.getElementById('output_image');   //esta linea genera error en typescript solucion abajo
      let output = <HTMLInputElement>document.getElementById("output_image");
      output.src = reader.result;
      //
      let image = new Image();
      image.onload = event => {
        console.log("EntroPreview_Image2");
        var canvas = document.createElement("canvas");
        var context = canvas.getContext("2d");
        canvas.width = 400;
        canvas.height = 400;
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
        this.imagenPerfil = canvas.toDataURL();
        console.log("Entro aqui 2232");
      };
      image.src = event.target.result;
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  loadImageFile() {
    var uploadImage = <HTMLInputElement>document.getElementById("upload-Image");

    //check and retuns the length of uploded file.
    if (uploadImage.files.length === 0) {
      return;
    }

    //Is Used for validate a valid file.
    var uploadFile = (<HTMLInputElement>document.getElementById("upload-Image"))
      .files[0];
    /*if (!filterType.test(uploadFile.type)) {
      alert("Please select a valid image.");
      return;
    }*/

    this.fileReader.readAsDataURL(uploadFile);
  }
}
