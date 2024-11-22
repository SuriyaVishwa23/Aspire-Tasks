import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discountedproduct',
  templateUrl: './discountedproduct.component.html',
  styleUrls: ['./discountedproduct.component.css']
})
export class DiscountedproductComponent {
  productnamepattern="[A-Za-z]{3,}"
  constructor(private fb:FormBuilder,private http:HttpClient,private router:Router){}

  productForm=this.fb.group({
    bigdealproductname:[,[Validators.required, ]],
    bigdealproductDescription:[,[Validators.required, ]],
    bigdealproductPrice:[,[Validators.required,]],
    discountedPrice:[,],
    rating:[,[Validators.required,]],
    bigdealproductImage:[,[Validators.required,]],
    saleduration:[,[Validators.required,]]

  })
  addproduct(){
    this.http.post<any>("http://localhost:3000/discountedproducts",this.productForm.value)
    .subscribe(res=>{
      alert("Product Added Successfull");
      this.productForm.reset();
      this.router.navigate(['addproduct']);
    })
  }

}
