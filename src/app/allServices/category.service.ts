import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient : HttpClient) {}
 
  getallcategories() :any {
    
    return this.httpClient.get('/getAllCategories');
  }

  registerCategory(category: any): any {
    return this.httpClient.post('/registerCategory', category);
  }

  updateCategory(category: any) {
    return this.httpClient.post('/updateCategory', category);
  }

  deleteCategory(category: any) {
    return this.httpClient.delete('/deleteCategoryById/' + category.categoryId);
  }


  getallProducts() :any {
    
    return this.httpClient.get('/getAllProducts');
  }

  getallProductsBycategoryId(category :any) :any {
    
    return this.httpClient.post('/getProductsByCategoryId', category);
  }

  registerProduct(product: any): any {
    return this.httpClient.post('/registerProduct', product);
  }

  updateProduct(product : any) {
    return this.httpClient.post('/updateProduct', product);
  }

  deleteProduct(product: any) {
    return this.httpClient.delete('/deleteProdById/' + product.productId);
  }


}
