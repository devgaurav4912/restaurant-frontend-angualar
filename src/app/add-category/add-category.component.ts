import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryFormComponent implements OnInit {

  categoryForm: FormGroup;
  selectedFile!: File;
  isSubmitting: boolean = false;
  selectedId!:any;
  categoryId: any;
  updateData :boolean=false;
  categoryImageUrl? : String 




  constructor(
    public dialogRef: MatDialogRef<AddCategoryFormComponent>,
    private service: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private routVaule : ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: any
    
  ) {
    this.categoryForm = this.fb.group({
      categoryName: ['', Validators.required],
      categoryImage: ['', Validators.required]
    });
    this.categoryId = data.categoryId; 
    console.log("CATEGORY_ID --> "+this.categoryId)
  }

  ngOnInit(): void {
    this.getDataFormUrl();
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.postCategory();
  }

  getDataFormUrl(){
    //this.routVaule.paramMap.subscribe((param:any)=>{
    // console.log("CATEGORY-ID -->"+param.get("id"));
     //this.selectedId = param.get("id");
      this.service.getCategoryById(this.categoryId)
      .subscribe((resp:any)=>{
        console.log("get by id response data ---> "+resp)
        this.categoryForm.patchValue(resp);
        this.categoryImageUrl = resp.categoryImage;
        console.log("categoryImageUrl -->" +this.categoryImageUrl)
        console.log("Updated category data ---> "+this.categoryForm)
        this.updateData=true;
      })

    
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    console.log("selected image -s-> " + this.selectedFile);
  }


  postCategory() {

   if(this.updateData){

    if (this.isSubmitting) return;

    this.isSubmitting = true;

      const formData = new FormData();

      if (this.selectedFile) {
        formData.append('file', this.selectedFile);
    }

      formData.append('category', new Blob([JSON.stringify( this.categoryForm.value)],{type:'application/json'}));
      formData.append('file', this.selectedFile);
     

//       if(this.selectedFile == null || undefined){
//         try {
//           const imageBlob = await this.service.fetchImageFromURL(this.categoryImageUrl as string).toPromise();
//           if (imageBlob) {
//             const  file = new File([imageBlob], 'businessLogo.jpg', { type: imageBlob.type });
//             this.updateCategory(this.categoryId, formData,this.selectedFile)
//           } else {
//             this.showSnackBar('Settings updated successfully', 'Close', 'top');

//           }
//         } catch (error) {
//           console.error('Error fetching image from URL', error);
//           this.isLoading = false;
//         }
//       }else if(){

//       }


  


      this.service.updateCategory(this.categoryId,formData,this.selectedFile).subscribe((res: any) => {
        console.log("Post Res --> "+res)
        this.dialogRef.close(this.categoryForm.value);
        this.isSubmitting = false;


      },(error: any) => {
        console.error("Error adding product: ", error);
        this.isSubmitting = false;
      });
    

   }else{
    if (this.isSubmitting) return;

    this.isSubmitting = true;

      const formData = new FormData();

      formData.append('category', new Blob([JSON.stringify( this.categoryForm.value)],{type:'application/json'}));
      formData.append('file', this.selectedFile);

      console.log("before --> " + this.categoryForm.value);
      console.log("before --> " + this.selectedFile);


      this.service.postCategory(formData ,this.selectedFile).subscribe((res: any) => {
        console.log("Post Res --> "+res)
        this.dialogRef.close(this.categoryForm.value);
        this.isSubmitting = false;


      },(error: any) => {
        console.error("Error adding product: ", error);
        this.isSubmitting = false;
      });
   }
      
    }

    updateCategory(){

    }
  }

