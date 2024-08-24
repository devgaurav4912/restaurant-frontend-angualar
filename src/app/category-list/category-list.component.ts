import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from '../api.service';
import { ShareDataService } from '../shared/share-data.service';
import { ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';
import { AddCategoryFormComponent } from '../add-category/add-category.component';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['SL', 'categoryImage', 'CategoryName', 'Action'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private service: ApiService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dataservice: ShareDataService
  ) {}

  ngOnInit(): void {
    this.getAllCategory();
  }

  getAllCategory() {
    this.service.fetchAllCategory().subscribe((res: any) => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteCategory(id: any) {
    // existing deleteCategory code
  }

  openAddCategoryDialog(): void {
    // existing openAddCategoryDialog code
  }

  onUpdate(id: any) {
    // existing onUpdate code
  }
}



// import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
// import { ApiService } from '../api.service';
// import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { MatTableDataSource } from '@angular/material/table';
// import { MatPaginator } from '@angular/material/paginator';
// import { ConfirmdialogComponent } from '../confirmdialog/confirmdialog.component';
// import { AddCategoryFormComponent } from '../add-category/add-category.component';
// import { Router } from '@angular/router';
// import { ShareDataService } from '../shared/share-data.service';

// @Component({
//   selector: 'app-category-list',
//   templateUrl: './category-list.component.html',
//   styleUrls: ['./category-list.component.css']
// })
// export class CategoryListComponent implements OnInit, AfterViewInit {


//   displayedColumns: string[] = ['SL', 'categoryImage', 'CategoryName', 'Action'];
//   dataSource = new MatTableDataSource<any>([]);
//   @ViewChild(MatPaginator) paginator!: MatPaginator;
//   recordId!:number;
//   selectedId:boolean =false;
//   categoryList : any[]=[];
//   categoryCount? : number


//   constructor(
//     private service: ApiService,
//     public dialog: MatDialog,
//     private snackBar: MatSnackBar,
//     private router : Router,
//     private dataservice : ShareDataService
//   ) {}

//   ngOnInit(): void {
//     this.getAllCategory();
//   }

//   getAllCategory() {
//     this.service.fetchAllCategory().subscribe((res: any) => {
//       this.dataSource.data = res;
//       this.categoryList = res;
//       console.log("Category list count ==> " + this.categoryList.length);
//       this.categoryCount = this.categoryList.length;
  
//       // Navigate with queryParams correctly
//       //this.router.navigate(["/report"], { queryParams: { count: this.categoryCount } });

//       console.log("category count --1-->"+ this.categoryCount)
//       this.dataservice.setCategoryCount(this.categoryCount);

//       console.log("category count --2-->"+ this.categoryCount)

//     });
//   }
  

//   ngAfterViewInit() {
//     this.dataSource.paginator = this.paginator;
//   }



//   deleteCategory(id: any) {
//     const dialogConfig = new MatDialogConfig();
//     dialogConfig.disableClose = true;
//     dialogConfig.autoFocus = true;
//     dialogConfig.width = '100px'; // Adjust the width as needed
//     dialogConfig.position = { top: '20%', left: '35%' };

//     const dialogRef = this.dialog.open(ConfirmdialogComponent);

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.service.deleteCategory(id).subscribe(() => {
//           this.getAllCategory();
//           this.snackBar.open('Your category has been deleted', 'Close', {
//             duration: 3000,
//             horizontalPosition: 'center',
//             verticalPosition: 'top',
//           });
//           this.dataSource.data = this.dataSource.data.filter(item => item.category_id !== id);
//         });
//       }
//     });
//   }

 
  
  

//   openAddCategoryDialog(): void {
//     const dialogRef = this.dialog.open(AddCategoryFormComponent ,{
//       height:'400',
//       width :'500px',
      
//     });

//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.snackBar.open('New category added', 'Close', {
//           duration: 3000,
//           horizontalPosition: 'center',
//           verticalPosition: 'top',
//           panelClass: ['custom-snackbar']
//         });
//         this.getAllCategory();
//       }
//     });
//   }

//   onUpdate(id: any) {
//     //this.selectedId = id;
//     const dialogRef = this.dialog.open(AddCategoryFormComponent, {
//       data: { categoryId: id },
//       height:'500px',
//       width :'500px', 

//     });
  
//     dialogRef.afterClosed().subscribe(result => {
//       if (result) {
//         this.snackBar.open('Category is updated!', 'Close', {
//           duration: 3000,
//           horizontalPosition: 'center',
//           verticalPosition: 'top',
//           panelClass: ['custom-snackbar']
//         });
//         this.getAllCategory();
//       }
//     });
//   }


  

  
// }


//  // onUpdate(id :any){
//   //   // console.log("category-id --> "+id)
//   //    const dialogRef = this.dialog.open(AddCategoryFormComponent);

//   //   dialogRef.afterClosed().subscribe(result => {
//   //     if (result) {
//   //       this.snackBar.open('category is updated!', 'Close', {
//   //         duration: 3000,
//   //         horizontalPosition: 'center',
//   //         verticalPosition: 'top',
//   //         panelClass: ['custom-snackbar']
//   //       });
//   //       this.getAllCategory();
//   //     }
//   //   });
//   //   }

//   // }
