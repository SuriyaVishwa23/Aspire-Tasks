import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';

import { HomeComponent } from './home/home.component';


import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HaircareComponent } from './haircare/haircare.component';
import { SkincareComponent } from './skincare/skincare.component';
import { BeardcareComponent } from './beardcare/beardcare.component';
import { BodycareComponent } from './bodycare/bodycare.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AddproductComponent } from './addproduct/addproduct.component';
import { ProductsComponent } from './products/products.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { DiscountedproductComponent } from './discountedproduct/discountedproduct.component';
import { AuthGuard } from './auth.guard';
import { BookappointmentComponent } from './bookappointment/bookappointment.component';
import { NutritionComponent } from './nutrition/nutrition.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path:'home',
    component:HomeComponent,

  },
  {
    path:'login',
    component:LoginComponent,

  },
  {
    path:'nutrition',
    component:NutritionComponent,
    canActivate: [AuthGuard]

  },
  {
    path:'signup',
    component:SignupComponent,

  },
  {
    path:'products',
    component:ProductsComponent,

  },
  {
    path:'cart',
    component:CartComponent,

  },
  {
    path: 'appointment/:type',
    component: BookappointmentComponent,
    
    
  },
  {
    path:'admindashboard',
    component:AdmindashboardComponent,


  },
  {
    path:'userdashboard',
    component:UserdashboardComponent,
  },
  { path: 'userdashboard/haircare', component: HaircareComponent },
  {
    path:'addproduct',
    component:AddproductComponent
  },
  {
    path:'discountedproduct',
    component:DiscountedproductComponent,

  },
  {
    path:'haircare',
    component:HaircareComponent
  },
  {
    path:'skincare',
    component:SkincareComponent
  },
  {
    path:'beardcare',
    component:BeardcareComponent
  },
  {
    path:'bodycare',
    component:BodycareComponent
  },
  {
    path:'about',
    component:AboutComponent
  },


  {
    path:'**',
    component:HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
