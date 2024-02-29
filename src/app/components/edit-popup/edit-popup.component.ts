import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../types';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [DialogModule, CommonModule, FormsModule, RatingModule, ButtonModule],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss'
})
export class EditPopupComponent {
  @Input() header! : string;
  @Input() display: boolean = false;
  @Output() displayChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() confirm: EventEmitter<Product> = new EventEmitter<Product>();

  @Input() product: Product = {
    name: '',
    image: '',
    price: '',
    rating: 0
  }

  onConfirm(){
    console.log("confirm");
    this.confirm.emit(this.product);
    this.display = false;
    this.displayChange.emit(this.display);
  }

  onCancel(){
    console.log(this.display);
    this.display = false;
    this.displayChange.emit(this.display); 
  }

}
