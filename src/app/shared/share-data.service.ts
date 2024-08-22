import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  constructor() { }

  private categoryCount: any;
  private productCount : any;
  private customerCount : any;
  private placeOrderCount :any;
  

  setCategoryCount(count: number) {
    this.categoryCount = count;
  }

  getCategoryCount(): number {
    return this.categoryCount;
  }


  setProductCount(count: number) {
    this.productCount = count;
  }

  getProductCount(): number {
    return this.productCount;
  }


  setCustomerCount(count: number) {
    this.customerCount = count;
  }

  getCustomerCount(): number {
    return this.customerCount;
  }


  setPlaceOrderCount(count: number) {
    this.customerCount = count;
  }

  getPlaceOrderCount(): number {
    return this.customerCount;
  }
  
}
