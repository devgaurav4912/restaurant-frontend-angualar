import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from '../api.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';
import { AddCategoryFormComponent } from '../add-category/add-category.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['SL', 'categoryImage', 'CategoryName', 'Action'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  recordId!:number;

  constructor(
    private service: ApiService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router : Router
  ) {}

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory() {
    this.service.fetchAllCategory().subscribe((res: any) => {
      this.dataSource.data = res;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  deleteCategory(id: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '100px'; // Adjust the width as needed
    dialogConfig.position = { top: '20%', left: '35%' };

    const dialogRef = this.dialog.open(ConfirmdialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.deleteCategory(id).subscribe(() => {
          this.getAllCategory();
          this.snackBar.open('Your category has been deleted', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: ['custom-snackbar']
          });
          this.dataSource.data = this.dataSource.data.filter(item => item.category_id !== id);
        });
      }
    });
  }

  openAddCategoryDialog(): void {
    const dialogRef = this.dialog.open(AddCategoryFormComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('New category added', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['custom-snackbar']
        });
        this.getAllCategory();
      }
    });
  }

  // onUpdate(id :any){
  //   // console.log("category-id --> "+id)
  //    const dialogRef = this.dialog.open(AddCategoryFormComponent);

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.snackBar.open('category is updated!', 'Close', {
  //         duration: 3000,
  //         horizontalPosition: 'center',
  //         verticalPosition: 'top',
  //         panelClass: ['custom-snackbar']
  //       });
  //       this.getAllCategory();
  //     }
  //   });
  //   }

  // }

  onUpdate(id: any) {
    const dialogRef = this.dialog.open(AddCategoryFormComponent, {
      data: { categoryId: id }  // Pass the id as data
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.snackBar.open('Category is updated!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['custom-snackbar']
        });
        this.getAllCategory();
      }
    });
  }
  
}
