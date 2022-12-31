import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Shoe } from '../interfaces/shoe';
import { Transaction } from '../interfaces/transaction';
import { ShoeService } from '../services/shoe.service';
import { Account } from '../interfaces/account';
import { AccountService } from '../services/account.service';
import { MessageService } from '../services/message.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction-detail',
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent implements OnInit {
  @Input() transaction: Transaction | undefined

  constructor(private route: ActivatedRoute,
    private accountService: AccountService,
    private messageService: MessageService,
    private shoeService: ShoeService,
    private location: Location) { }

  ngOnInit(): void {
    this.getTransaction();
  }

  getUsername(): string {
    const userJson = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const accountObject = <Account>userJson;
    return accountObject.userName;
  }

  getTransaction(): void {
    const id: string = String(this.route.snapshot.paramMap.get('id'));
    this.accountService.getTransactionFromPurchaseHistory(this.getUsername(), id).subscribe(transaction => 
      this.transaction = transaction);
  }

}
