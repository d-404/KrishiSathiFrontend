import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/allServices/user.service';
import { NotificationService } from 'src/app/allServices/notification.service';
import { CommonService } from 'src/app/allServices/common.service';
import { CategoryService } from 'src/app/allServices/category.service';

declare var jQuery: any;

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{
  loginStatus: any;
  productList: any;
  editObject: any;
  products: any;
  retreivedData: any;
  categoryName: any;
  categoryList: any;
  product : any;
  user: any;
  retreivedData1: any;
  category:any;

  constructor(private userservice: UserService, private router: Router, private notifyService: NotificationService, private commonService : CommonService, private service: CategoryService) {
    // this.productList = [
    //   { productId: 1, productName: 'Dahlia', productDescription: 'Premium quality Dahlia seeds.', imgPath: "/assets/Category Images/Flowers/Dahlia.jpg", productPrice: '250.30' },
    //   { productId: 2, productName: 'Apple', productDescription: 'Premium quality Apple seeds.', imgPath: "/assets/Category Images/Fruits/Apple.jpg", productPrice: '200.50' }
    // ];
    this.loginStatus = false;

    this.category = {
      categoryId: '',
      categoryName: '',
      categoryDescription: '',
      imgPath: ''
    };

    this.editObject= { productId: '', productName: '',productPrice: '',productDescription: '',imgPath: '',categoryId: '' };

    this.products = { productId: '', productName: '',productPrice: '',productDescription: '',imgPath: '',categoryId: '' };

    this.product= { productId: '', productName: '',productPrice: '',productDescription: '',imgPath: '',category:{categoryId:''} };

    // this.categoryList = [
    //   { categoryId: 1, categoryName: 'Vegetable Seeds', categoryDescription: 'Best in class germination, Suitable for all Seasons, Fresh Seeds. Seed box comes with Hand-picked vegetable seeds, packed in air tight pouch that keeps its freshness and germination intact.', imgPath:"/assets/Category Images/Categories/Vegetables.jpg"},
    //   { categoryId: 2, categoryName: 'Fruit Seeds', categoryDescription: 'Seed box comes with Hand-picked fruit seeds, packed in air tight pouch that keeps its freshness and germination intact. Best in class germination, Suitable for all Seasons.', imgPath:"/assets/Category Images/Categories/Fruit.jpg"},
    //   { categoryId: 3, categoryName: 'Flower Seeds', categoryDescription: 'Premium quality for blooming flowers. Seed box comes with Hand-picked flower seeds, packed in air tight pouch that keeps its freshness and germination intact. Healthy and Fresh', imgPath:"/assets/Category Images/Categories/Flowers.jpg"},
    //   { categoryId: 4, categoryName: 'Farming Equipments', categoryDescription: 'At our large manufacturing unit that is well equipped with latest machines, it is precisely manufactured by our skilled professionals using the finest quality of raw material and cutting edge technology.', imgPath:"/assets/Category Images/Categories/Equipments.jpg"},
    //   { categoryId: 5, categoryName: 'Fertilizers', categoryDescription: 'Krishi Sathi sells a range of best in class and organic compost manure, manure soil, and other soil fertilizer for plant growth. Our fertilizers also work well as succulent fertilizers and are the best in category.', imgPath:"/assets/Category Images/Categories/Fertilizers.jpg"},
    //   { categoryId: 6, categoryName: 'Saplings', categoryDescription: 'Krishi Sathi offers a wide range of saplings to chhoose from, for your everyday needs at a competitive price. The saplings are crafted carefully and packed in an appropriate container that helps in maintaining the quality of the plants without damaging it.', imgPath:"/assets/Category Images/Categories/Saplings.jpg"}
    // ];
  }

  ngOnInit(): void {
    this.retreivedData = localStorage.getItem('categoryName');
    this.categoryName = JSON.parse(this.retreivedData);
   
    this.retreivedData1 = localStorage.getItem('category');
    this.category = JSON.parse(this.retreivedData1);
    
    // this.service.getallProducts().subscribe((data:any)=>
    // {
    //   this.products =data;
    //   console.log(data);
    // });

    this.service.getallProductsBycategoryId(this.category).subscribe((data:any)=>
    {
      this.products = data;
      console.log(data);
    });

    this.user=this.userservice.getUser().userType;
    console.log(this.user);

    this.userservice.getLoginStatus().subscribe((data: any) => {
      this.loginStatus = data;
    });
   
    this.service.getallcategories().subscribe((data:any)=>
    {
      this.categoryList =data;
      console.log(data);
    });
  }

  

  editProduct(prod: any) {
    console.log('Update Category');
    console.log(prod);
    this.editObject = prod;

    jQuery('#updateModal').modal('show');
  }

  updateProduct() {
    // console.log();
    // this.notifyService.showInfo("", "Updated Successfully.")
    this.service.updateProduct(this.editObject).subscribe((result: any) => {
      console.log(result);
    });
  }

  deleteProduct(product: any) {
    // console.log('Delete Category');
    // console.log(cat);
    //this.notifyService.showError("", "Deleted Successfully.")
    this.service.deleteProduct(product).subscribe((result: any) => {
      console.log(result)
    });

    const i = this.products.findIndex((element: any) => {
      return product.productId === element.productId;
    });
    
    this.products.splice(i, 1);
  
  }

  addProduct(){
    jQuery('#addModal').modal('show');
  }

  registerProduct(){
    // alert(JSON.stringify(this.products));
    // this.notifyService.showInfo("", "Added Successfully.")
    this.service.registerProduct(this.product).subscribe((result: any) => {
      console.log(result);
    });
    console.log(this.product);
    //alert(JSON.stringify(this.product));
  }
 

  addToCart(prod: any) {
    console.log(prod);
    
    this.commonService.addToCart(prod).subscribe((data: any) => {

    });
  }

  showToasterSuccess() {
    this.notifyService.showInfo("", "Added To Cart.")
  }


}
