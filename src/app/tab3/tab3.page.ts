import { Component, Input } from '@angular/core';
import { computeStackId } from '@ionic/angular/directives/navigation/stack-utils';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { ItemsService } from '../items.service';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  item = {
    name: '',
    price: null,
    quantity: null,
    totalPrice:null,
  };
  @Input() id: any;
  constructor(public http : HttpClient,
    public modalController: ModalController,
    public itemsService :ItemsService) {

  }
  ngOnInit(): void {
    this.http.get(`https://localhost:44310/api/app/item/${this.id}/item-by-id`).subscribe((res : any) =>{
      
      this.item = res
      console.log(this.item)
    })
    console.log(this.id)
  }
  save(){
    this.http.put(`https://localhost:44310/api/app/item/${this.id}/item`,this.item).subscribe((res) =>{
      this.dismiss()
      this.http.get("https://localhost:44310/api/app/item/items-for-order/37").subscribe((res : any) =>{
        this.itemsService.items = res;
      })
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
