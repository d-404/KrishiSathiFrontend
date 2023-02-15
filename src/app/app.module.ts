import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider,} from '@abacritt/angularx-social-login';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './allComponents/header/header.component';
import { FooterComponent } from './allComponents/footer/footer.component';
import { ExpiryPipe } from './allPipes/expiry.pipe';
import { ContactComponent } from './allComponents/contact/contact.component';
import { CropRecommenderComponent } from './allComponents/crop-recommender/crop-recommender.component';
import { HomeComponent } from './allComponents/home/home.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './allComponents/login/login.component';
import { LogoutComponent } from './allComponents/logout/logout.component';
import { CategoryComponent } from './allComponents/Categories/category/category.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './allComponents/register/register.component';
import { ProfileComponent } from './allComponents/profile/profile.component';
import { RouterModule } from '@angular/router';
import { ProductComponent } from './allComponents/Categories/product/product.component';
import { ArticlesComponent } from './allComponents/articles/articles.component';
import { OrderComponent } from './allComponents/order/order.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AllUsersComponent } from './allComponents/all-users/all-users.component';
import { CartComponent } from './allComponents/cart/cart.component';
import { PaymentComponent } from './allComponents/payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ExpiryPipe,
    ContactComponent,
    CropRecommenderComponent,
    HomeComponent,
    LoginComponent,
    LogoutComponent,
    CategoryComponent,
    RegisterComponent,
    ProfileComponent,
    ProductComponent,
    ArticlesComponent,
    OrderComponent,
    AllUsersComponent,
    CartComponent,
    PaymentComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    SocialLoginModule,
    FormsModule,
    HttpClientModule,
   
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    TranslateModule.forRoot(
      {
        loader:{
          provide:TranslateLoader,
          useFactory:(http:HttpClient) => {return new TranslateHttpLoader(http,'./assets/i18n/','.json')
          },
          deps:[HttpClient]
        }
      }
    )
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '525801857538-lkfdivqp5sn0idvev40di9cu5c3l1mde.apps.googleusercontent.com'
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }