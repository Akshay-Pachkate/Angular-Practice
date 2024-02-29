import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsService } from './services/products.service';
import { Products } from '../types';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ecommerse';
  

}
