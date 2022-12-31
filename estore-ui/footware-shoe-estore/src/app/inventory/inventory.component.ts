import { Component, OnInit } from '@angular/core';
import { Shoe } from '../interfaces/shoe';
import { ShoeService } from '../services/shoe.service';
import { Account } from '../interfaces/account';
import { MessageService } from '../services/message.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-inventory',
  templateUrl:  './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  shoes: Shoe[] = [];
  shoe: Shoe = {
    id: 1,
    brand: 'Yeezy',
    name: 'Boost',
    model: 350,
    color: 'Zebra',
    shoeType: 'Athletic',
    size: 9.5,
    price: 250,
    quantity: 5
  };

  constructor(private shoeService: ShoeService, 
    private messageService: MessageService,
    private location: Location) { 
  }
  
  ngOnInit(): void {
    this.getInventory();
  }

  getInventory(): void {
    this.shoeService.getInventory().subscribe(shoes => this.shoes = shoes);
  }
  
  createShoe(id: string, brand: string, name: string, model: string, color: string, 
    shoeType: string, size: string, price: string, quantity: string): void {
    id = id.trim();
    brand = brand.trim();
    name = name.trim();
    color = color.trim();
    shoeType = shoeType.trim();
    if (!brand || !name || !model || !color || !shoeType || !size || !price || !quantity){
      return;
    }
    this.shoe.id = Number(id);
    this.shoe.brand = brand;
    this.shoe.name = name;
    this.shoe.model = Number(model);
    this.shoe.color = color;
    this.shoe.shoeType = shoeType;
    this.shoe.size = Number(size);
    this.shoe.price = Number(price);
    this.shoe.quantity = Number(quantity);

    this.shoeService.addShoe(this.shoe)
      .subscribe(shoe => { this.shoes.push(shoe);
        this.current();
      });
    this.reloadPage();
  }

  deleteShoe(shoe: Shoe): void {
    this.shoes = this.shoes.filter(s => s !== shoe);
    this.shoeService.deleteShoe(shoe.id).subscribe();
  }

  adminLoggedIn(): boolean {
    const userJson = JSON.parse(localStorage.getItem('currentUser')|| '{}' );
    const accountObject = <Account> userJson;
    if ((accountObject.displayName != undefined) && (accountObject.isAdmin)){
      return true;
    } else{
      return false;
    }
  }

  reloadPage() {
    setTimeout(()=>{
      window.location.reload();
    }, 200);
  }

  current(): void {
    this.location.getState();
  }
}