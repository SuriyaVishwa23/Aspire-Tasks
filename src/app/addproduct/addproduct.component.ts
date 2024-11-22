import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent {
  productnamepattern="[A-Za-z]{3,}"
  constructor(private fb:FormBuilder,private http:HttpClient,private router:Router){}

  productForm=this.fb.group({
    productname:[,[Validators.required, ]],
    productDescription:[,[Validators.required, ]],
    productPrice:[,[Validators.required,]],
    discountedPrice:[,],
    rating:[,[Validators.required,]],
    productImage:[,[Validators.required,]]

  })
  addproduct(){
    this.http.post<any>("http://localhost:3000/products",this.productForm.value)
    .subscribe(res=>{
      alert("Product Added Successfull");
      this.productForm.reset();
      this.router.navigate(['addproduct']);
    })
  }
}
