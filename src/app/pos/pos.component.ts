import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.css']
})
export class PosComponent implements OnInit {

  categories: any[] = [];
  categoryProducts: any[] = [];
  allProductsList: any[] = [];
  searchTerm: string = '';
  selectedCategoryName: string = 'All';

  constructor(private service: ApiService,
              private fb: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllCategory();
    this.getAllProducts();
  }

  getAllCategory() {
    this.service.fetchAllCategory().subscribe((res: any) => {
      console.log("categories res -->", res);
      this.categories = res;
    });
  }

  getAllProducts() {
    this.service.getAllProducts().subscribe((res: any) => {
      console.log("res -allProducts-->", res);
      this.allProductsList = res;
      // Initially show all products
      this.categoryProducts = res;
    });
  }

  onCategoryChange(event: any) {
    this.selectedCategoryName = event.target.value;
    if (this.selectedCategoryName === "All") {
      this.filterProducts(this.allProductsList);
    } else {
      this.getProductsByCategory(this.selectedCategoryName);
    }
  }

  getProductsByCategory(categoryName: string) {
    this.service.getProductsByCategoryName(categoryName).subscribe((res: any) => {
      console.log("products -->", res);
      this.filterProducts(res);
    });
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value.toLowerCase();
    if (this.selectedCategoryName === "All") {
      this.filterProducts(this.allProductsList);
    } else {
      this.getProductsByCategory(this.selectedCategoryName);
    }
  }

  filterProducts(products: any[]) {
    if (this.searchTerm) {
      this.categoryProducts = products.filter(product =>
        product.productName.toLowerCase().includes(this.searchTerm)
      );
    } else {
      this.categoryProducts = products;
    }
  }
}
