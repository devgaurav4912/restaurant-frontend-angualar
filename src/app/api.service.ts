import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  baseUrlLogin: string = 'http://localhost:8090/api/user';

  baseUrCategory: string = 'http://localhost:8090/api/category';

  baseUrlProduct: string = 'http://localhost:8090/api/product';

  // login Api

  loginUser(obj: any) {
    return this.http.post(`${this.baseUrlLogin}/login`, obj, {
      responseType: 'text',
    });
  }

  //Category Api

  fetchAllCategory() {
    return this.http.get(`${this.baseUrCategory}/getAllCategory`);
  }

  postCategory(formData: FormData, file: any) {
    return this.http.post(`${this.baseUrCategory}/create-category`, formData);
  }

  getCategoryById(categoryId: any) {
    return this.http.get(`${this.baseUrCategory}/${categoryId}`);
  }

  updateCategory(id: any, formData: FormData, file?: any) {
    return this.http.put(
      `${this.baseUrCategory}/updateCategory/${id}`,
      formData
    );
  }

  deleteCategory(id: any) {
    return this.http.delete(`${this.baseUrCategory}/delete/${id}`);
  }

  //Product Api

  addProduct(formData: FormData, file: any, categoryName: string) {
    return this.http.post(
      `${this.baseUrlProduct}/add-product/${categoryName}`,
      formData
    );
  }

  getProductsByCategoryName(categoryName: any) {
    return this.http.get(`${this.baseUrlProduct}/category/${categoryName}`);
  }

  getAllProducts() {
    return this.http.get(`${this.baseUrlProduct}/getAllProducts`);
  }

  //image url into file convert

  fetchImageFromURL(url: string): Observable<Blob> {
    return this.http.get(url, { responseType: 'blob' });
  }
}
