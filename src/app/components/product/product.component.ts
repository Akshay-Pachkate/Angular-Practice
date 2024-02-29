import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RatingModule, FormsModule, ButtonModule, ConfirmPopupModule],
  providers: [ConfirmationService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() product! : Product;
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();


  constructor(private confirmationService: ConfirmationService){}

  @ViewChild('deleteButton') deleteButton: any;

  confirmDelete(){    
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement,
      message: 'are you sure you want to delete the product from your store',
      accept: () => {
        console.log("accept");
        
        this.deleteProduct();
      }
    })
  }


  editProduct(){
    console.log("edit");
    this.edit.emit(this.product);
  }

  deleteProduct(){
    console.log("delete emit");
    
    this.delete.emit(this.product);
  }

}
