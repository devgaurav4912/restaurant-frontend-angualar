import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShareDataService } from '../share-data.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit {

  Categorycount : any;
  productCount : any;
  customerCount : any;
  placeOrderCount : any;
  pieChartOptions: any;


  constructor(public route: ActivatedRoute,
              private dataService : ShareDataService
  ) { }

ngOnInit(): void {
 
   this.Categorycount = this.dataService.getCategoryCount();
  console.log('Category Item count:', this.Categorycount);
  console.log("category count --3--> "+ this.Categorycount)

  this.productCount = this.dataService.getProductCount();
  this.customerCount = this.dataService.getCustomerCount();
  this.placeOrderCount = this.dataService.getPlaceOrderCount();

//pie chart 

this.pieChartOptions = {
  title: {
    text: 'Sales by Category',
    subtext: 'Current Year',
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [
    {
      name: 'Category',
      type: 'pie',
      radius: '50%',
      data: [
        { value: 1048, name: 'Category 1' },
        { value: 735, name: 'Category 2' },
        { value: 580, name: 'Category 3' },
        { value: 484, name: 'Category 4' },
        { value: 300, name: 'Category 5' }
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
}

}

  

