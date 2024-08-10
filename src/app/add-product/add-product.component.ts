import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  categories: any[] = [];
  addProductForm: FormGroup;
  selectedFile!: File;
  isSubmitting: boolean = false;

  constructor(private service: ApiService,
              private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar) {
    this.addProductForm = this.fb.group({
      productName: ['', Validators.required],
      productImage: ['', Validators.required],
      productPrice: ['', Validators.required],
      selectedCategoryName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getAllCategory();
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    console.log("selected image -s-> " + this.selectedFile);
  }

  getAllCategory() {
    this.service.fetchAllCategory().subscribe((res: any) => {
      console.log("categorys res -->" + res);
      this.categories = res;
    });
  }

  postProduct() {
    if (this.isSubmitting) return;

    this.isSubmitting = true;

    const productData = this.addProductForm.value;
    const formData = new FormData();
    
    formData.append('product', new Blob([JSON.stringify(productData)], { type: 'application/json' }));
    formData.append('file', this.selectedFile);
    
    console.log("Form Value: ", productData);
    console.log("selectedCategoryName --> " + productData.selectedCategoryName);
    
    this.service.addProduct(formData, this.selectedFile, productData.selectedCategoryName)
      .subscribe((res: any) => {
        console.log("product res -->", res);
        this.router.navigate([""]);
        this.isSubmitting = false;
        this.addProductForm.reset(); 
        this.snackBar.open("Product added", "Close", {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }, (error: any) => {
        console.error("Error adding product: ", error);
        this.isSubmitting = false;
      });
  }
}
