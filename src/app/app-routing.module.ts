import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './allComponents/contact/contact.component';
import { LoginComponent } from './allComponents/login/login.component';
import { RegisterComponent } from './allComponents/register/register.component';
import { LogoutComponent } from './allComponents/logout/logout.component';
import { AuthGuard } from './allGaurds/auth.guard';
import { HomeComponent } from './allComponents/home/home.component';
import { CategoryComponent } from './allComponents/Categories/category/category.component';
import { CropRecommenderComponent } from './allComponents/crop-recommender/crop-recommender.component';
import { CartComponent } from './allComponents/cart/cart.component';
import { ProfileComponent } from './allComponents/profile/profile.component';
import { ArticlesComponent } from './allComponents/articles/articles.component';
import { ProductComponent } from './allComponents/Categories/product/product.component';
import { OrderComponent } from './allComponents/order/order.component';
import { AllUsersComponent } from './allComponents/all-users/all-users.component';
import { PaymentComponent } from './allComponents/payment/payment.component';


const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contact',canActivate :[AuthGuard], component:ContactComponent },
  { path: 'logout',canActivate :[AuthGuard], component:LogoutComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'croprecommender', component: CropRecommenderComponent },
  { path: 'cart', component: CartComponent },
  { path: 'articles', component: ArticlesComponent },
  { path: 'category/product', component: ProductComponent },
  { path: 'order', component: OrderComponent},
  { path: 'contact', component: ContactComponent},
  { path: 'AllCustomers', component: AllUsersComponent},
  {path:'payment', component: PaymentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),ReactiveFormsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
