import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ItemsService } from '../items.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  item = {
    name: '',
    price: null,
    quantity: null,
    totalPrice:null,
    orderId:37
  };

  constructor(public modalController: ModalController,
    public http : HttpClient,
    public itemsService :ItemsService) {}



  save(){
    this.http.post("https://localhost:44310/api/app/item/item",this.item).subscribe((res) =>{
      this.http.get("https://localhost:44310/api/app/item/items-for-order/37").subscribe((res : any) =>{
        this.itemsService.items = res;
      })
      this.dismiss()
    })
  }
  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

}
