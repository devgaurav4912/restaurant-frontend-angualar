import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PosComponent } from './pos/pos.component';
import { BillingComponent } from './billing/billing.component';
import { AddProductComponent } from './add-product/add-product.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { AddCategoryFormComponent } from './add-category/add-category.component';

const routes: Routes = [
  {
  path :"login",
  component : LoginComponent
  },

  {path :"",
    component : PosComponent
    
  },
  {
    path :"product",
    component : AddProductComponent
    
  },
  {
    path :"category-list",
    component : CategoryListComponent
    
  },
  {
    path :"add-category",
    component : AddCategoryFormComponent,
    
  },
  // {
  //   path :"add-category/:id",
  //   component : AddCategoryFormComponent,
  // },
  {
    path :"billing",
    component : BillingComponent,
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
