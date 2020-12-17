import { Component } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ModalController } from '@ionic/angular';
import { Tab2Page } from '../tab2/tab2.page';
import { Tab3Page } from '../tab3/tab3.page';
import { ItemsService } from '../items.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
items : any [] = []
  constructor(public http : HttpClient,
    public modalController: ModalController,
    public itemsService :ItemsService,
    public alertController: AlertController) {
    this.http.get("https://localhost:44310/api/app/item/items-for-order/37").subscribe((res : any) =>{
      this.itemsService.items = res;
      this.items = this.itemsService.items
    })


  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: Tab2Page,
      cssClass: 'my-custom-class'
    });
    return await modal.present();
  }

  
  async presentModal2(id : number) {
    const modal = await this.modalController.create({
      component: Tab3Page,
      cssClass: 'my-custom-class',
      componentProps: {
        'id': id,
      }
    });
    return await modal.present();
  }
  async presentAlertConfirm(id : number) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are you sure Delete Item!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.deletItem(id)
          }
        }
      ]
    });

    await alert.present();
  }
  deletItem(id : number){
    this.http.delete(`https://localhost:44310/api/app/item/${id}/item`).subscribe((res) =>{

      this.http.get("https://localhost:44310/api/app/item/items-for-order/37").subscribe((res : any) =>{
        this.itemsService.items = res;
        this.items = this.itemsService.items
        
        console.log(this.items)
      })
    })
  }


}
