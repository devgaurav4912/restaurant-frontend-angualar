import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './login/login.component';
import { PosComponent } from './pos/pos.component';
import { BillingComponent } from './billing/billing.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NavbarComponent } from './navbar/navbar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CategoryListComponent } from './category-list/category-list.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import { ConfirmdialogComponent } from './confirmdialog/confirmdialog.component';
import { AddCategoryFormComponent } from './add-category/add-category.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AddProductComponent } from './add-product/add-product.component';
import { MatInputModule } from '@angular/material/input';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PosComponent,
    BillingComponent,
    NavbarComponent,
    CategoryListComponent,
    ConfirmdialogComponent,
    AddCategoryFormComponent,
    AddProductComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatPaginatorModule,
    MatTableModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
  

})
export class AppModule { }
