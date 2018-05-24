import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    public notificationList: Array<any>;

    constructor(public navCtrl: NavController,
                private db: AngularFireDatabase,
                private alert: AlertController) {
        
        this,this.notificationList = [];
    }

    public ionViewWillEnter() {
        this.db.list('/notifications').valueChanges().subscribe((data: any) => {
            this.notificationList = data;
        });
    }

    public removeAllNotification() {
      let confirm = this.alert.create({
              title: "Delete",
              message: "Delete all notification",
              buttons: [
                {
                    text: 'Yes',
                    handler: () => {
                        this.db.list('/notifications').remove();
                    }
                },
                {
                    text: 'No',
                    handler: () => {
                        
                    }
                }
              ]
        });
        confirm.present();
    }
    trackByFn(index, item) {
        return item.title;
    }

}
