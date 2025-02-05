import { Component } from '@angular/core';
import {ImageService} from '../app/services/image.service';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'gallery';
  ImageId: string = uuidv4();
  imageNumber: string = '';
  coupleName: string = '';
  imageSet : string ='';
  selectedFile: File | null = null;

  constructor(private imageService: ImageService) {

  }

  onFileSelected(event: any) {
    this.selectedFile =event.target.files[0];
  }

  onSubmit(){
    if (!this.selectedFile || !this.imageNumber || !this.coupleName || !this.imageSet){
      alert("Please fill all feilds and select an iamge.");
      return;
    }

    const imagePath= `/uploads/${this.ImageId}-${this.selectedFile.name}`;

    const imageData= {
      ImageId :this.ImageId,
      imageNumber:this.imageNumber,
      imagePath: imagePath,
      coupleName: this.coupleName,
      imageSet: this.imageSet
    };

    this.imageService.uploadImage(imageData).subscribe(response => {
      console.log("Image uploaded:",response);
      alert("Image data saved successfully!");
    }, error => {
      console.error("Error: ", error);
      alert("Failed to upload image.");
    });
  }
}
