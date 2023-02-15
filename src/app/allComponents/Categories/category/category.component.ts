import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/allServices/category.service';
import { NotificationService } from 'src/app/allServices/notification.service';
import { UserService } from 'src/app/allServices/user.service';

declare var jQuery: any;

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit{
  categoryList: any;
  items:any;
  loginStatus: any;
  editObject: any;
  category: any;
  retreivedData: any;
  userType: any;
  user: any;

  constructor(private userservice: UserService, private router: Router, private notifyService: NotificationService, private service : CategoryService) {

    this.editObject= { categoryId: '', categoryName: '', categoryDescription: '', imgPath:""};

    this.category = {
      categoryId: '',
      categoryName: '',
      categoryDescription: '',
      imgPath: ''
    };

  }
  ngOnInit(): void {   
    
    this.service.getallcategories().subscribe((data:any)=>
    {
      this.categoryList =data;
    });
    console.log(this.categoryList);
    
    this.user=this.userservice.getUser().userType;
    console.log(this.user);
    
  }

  showProducts(item: any) {
    this.router.navigate(['category/product']);
    localStorage.setItem('categoryName',JSON.stringify(item.categoryName));
    localStorage.setItem('category',JSON.stringify(item));
  }

  editCategory(cat: any) {
    console.log('Update Category');
    console.log(cat);
    this.editObject = cat;

    jQuery('#updateModal').modal('show');
  }

  updateCategory() {
    console.log(this.editObject);
    //this.notifyService.showInfo("", "Updated Successfully.");
    this.service.updateCategory(this.editObject).subscribe((result: any) => {
      console.log(result);
    });
  }

  deleteCategory(category: any) {
    alert('Delete Category');
    //console.log('Delete Category');

    this.service.deleteCategory(category).subscribe((result: any) => {
      console.log(result)
    });

    const i = this.categoryList.findIndex((element: any) => {
      return category.categoryId === element.categoryId;
    });
    
    this.categoryList.splice(i, 1);
  }

  addCategory(){
    jQuery('#addModal').modal('show');
  }

  registerCategory(){
   // alert(JSON.stringify(this.category));
   // this.notifyService.showInfo("", "Added Successfully.")
   this.service.registerCategory(this.category).subscribe((result: any) => {
    console.log(result);
  });
  alert(JSON.stringify(this.category));
}

}