import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { Colors } from 'chart.js';
import {ResultService} from "../services/result.service";

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {

  constructor(private toastController: ToastController,private router: Router,private navController: NavController, private readonly http: ResultService) { }

  ngOnInit() {
  }

  prueba() {
    this.navController.navigateForward('/tabs/tab3')
  }

  public delete(sort) {
    this.presentToast('bottom');
  }

  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: 'Elemento eliminado',
      duration: 1500,
      position: position,
      color: 'danger'
    });

    await toast.present();
  }

}
