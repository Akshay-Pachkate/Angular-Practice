import { Component, ViewChild, viewChild } from '@angular/core';
import { ProductComponent } from '../components/product/product.component';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule, EditPopupComponent, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  @ViewChild('paginator') paginator: Paginator | undefined; 

  emptyProduct: Product = {
    id: 0,
    name: '',
    price: '', 
    image: '',
    rating: 0,
  }
  products: Product[] = [];
  selectedProduct: Product = {
    id: 0,
    name: '',
    price: '', 
    image: '',
    rating: 0,
  };
  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;

  constructor(private productService: ProductsService){}
  rows : number = 5;
  totalRecords!: number;

  onPageChange(event: any){
    console.log(event);
    this.fetchProducts(event.page, event.rows);
  }


  resetPaginator(){
    this.paginator?.changePage(0);
  }

  toggleEditPopup(product: Product){
    this.selectedProduct = product;
    this.displayEditPopup = true;
    console.log(this.displayEditPopup, "edit toggle");
    
  }


  toggleAddPopup(){
    console.log("add");
    this.displayAddPopup = true;
  }



  onConfirmEdit(product: Product){
    if(this.selectedProduct.id){
      this.editProduct(product, this.selectedProduct.id);
    }
    this.displayEditPopup = false;
    this.selectedProduct = this.emptyProduct;
  }



  onConfirmAdd(product: Product){
    if(product){
      this.addProduct(product);
    }
    this.displayAddPopup = false;
    this.selectedProduct = this.emptyProduct;
  }




  fetchProducts(page: number, perPage: number){
    this.productService.getProducts("http://localhost:3000/clothes", {page, perPage})
    .subscribe({
      next: (product: Products) => {
        this.products = product.items;
        this.totalRecords = product.total;
        this.resetPaginator();
       },
      error: (error) => {
        console.log(error);
      }
    })
  }

  editProduct(product: Product, id: number){
    this.productService.editProduct(`http://localhost:3000/clothes/${id}`, product)
    .subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts(0, this.rows);
        this.resetPaginator();
      },

      error: (error) => {
        console.log(error);
      }
    })
  }


  addProduct(product: Product){
    this.productService.addProduct('http://localhost:3000/clothes', product)
    .subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts(0, this.rows);
        this.resetPaginator();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }


  deleteProduct(id: number){
    this.productService.deleteProduct(`http://localhost:3000/clothes/${id}`)
    .subscribe({
      next: (data) => {
        console.log(data);
        this.fetchProducts(0, this.rows);
        this.resetPaginator();
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  toggleDeletePopup(product: Product){
    if(product.id){
      this.deleteProduct(product.id);
      this.resetPaginator();
    }
    return;
  }


  ngOnInit(): void {
    this.fetchProducts(0, this.rows);
  }
}
