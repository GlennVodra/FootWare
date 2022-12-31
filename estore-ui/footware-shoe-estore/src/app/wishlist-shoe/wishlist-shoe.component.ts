import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Shoe } from '../interfaces/shoe';
import { ShoeService } from '../services/shoe.service';
import { Account } from '../interfaces/account';
import { AccountService } from '../services/account.service';
import { ShoeProductPageComponent } from '../shoe-product-page/shoe-product-page.component';
@Component({
  selector: 'app-wishlist-shoe',
  templateUrl: './wishlist-shoe.component.html',
  styleUrls: ['./wishlist-shoe.component.css']
})
export class WishlistShoeComponent extends ShoeProductPageComponent implements OnInit {

  @Input() override shoe?: Shoe | undefined;

  constructor(route: ActivatedRoute, shoeService: ShoeService,
    location: Location,
    accountService: AccountService) { 
      super(route, shoeService, location, accountService);
    }

  override ngOnInit(): void {
    const id = Number(this.getRoute().snapshot.paramMap.get('id'));
    this.getAccountService().getShoeFromWishlist(this.getUsername(), id).subscribe(shoe => this.shoe = shoe);
  }

  override getUsername(): string {
    const userJson = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const accountObject = <Account>userJson;
    return accountObject.userName;
  }

  override goBack(): void {
    this.getLocation().back();
  }
}
