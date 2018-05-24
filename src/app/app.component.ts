import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions} from '@ionic-native/push';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

    rootPage: any = TabsPage;

    constructor(private platform: Platform,
                private statusBar: StatusBar,
                private splashScreen: SplashScreen,
                private push: Push,
                private alertCtrl: AlertController) {

        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            if (this.platform.is('cordova')) {
                // this.fcm.getToken()
                //     .then(token => {
                //         console.log("Registering FCM token on backend: " + token);
                //     });
                // this.fcm.onNotification()
                //     .subscribe(data => {
                //         if (data.wasTapped) {
                //             console.log("Received FCM notification in background");
                //         } else {
                //             console.log("Received FCM notification in foreground");
                //         }
                //     });
                this.pushsetup();
            }

        });
    }

    public pushsetup(): any {
        const options: PushOptions = {
            android: {
                senderID: '250972695193',
                sound: true
            },
            ios: {
                alert: 'true',
                badge: true,
                sound: true
            },
            windows: {}
        };

        const pushObject: PushObject = this.push.init(options);
        pushObject.on('notification').subscribe((notification: any) => {
            if (notification.additionalData.foreground) {
                console.log("Notification Received");
                let youralert = this.alertCtrl.create({
                    title: 'New Push notification',
                    message: notification.message
                });
                youralert.present();
            } else {
                console.log("Notification Clicked");
            }
        });
        pushObject.on('registration').subscribe((registration: any) => {
            //do whatever you want with the registration ID
            console.log(registration);
        });
    }
}
