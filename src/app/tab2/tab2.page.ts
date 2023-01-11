import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {LoadingController, NavController, ToastController, ViewWillEnter} from '@ionic/angular';
import { Colors } from 'chart.js';
import { Observable } from 'rxjs';
import { RequestResult } from '../model/RequestResult';
import {ResultService} from "../services/result.service";

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit,ViewWillEnter {
  private loading:HTMLIonLoadingElement;
  public sort2:Observable<RequestResult[]>;
  public sort: RequestResult[];
  constructor(private loadingCtrl: LoadingController,private toastController: ToastController,private router: Router,private navController: NavController, private readonly http: ResultService) { }

  async ionViewWillEnter() {
     this.sort = await this.http.getAllResults().toPromise();
    }

  public async showLoading(msg?){
    if(this.loading) return;
    this.loading = await this.loadingCtrl.create({
      message: msg
    });
    await this.loading.present();
  }

  public async hideLoading(){
    if(!this.loading) return;
    await this.loading.dismiss();
    this.loading = null;
  }

  async ngOnInit() {
    this.sort = await this.http.getAllResults().toPromise();
    console.log(this.sort);
  }

  viewGraph(sort:RequestResult) {
    this.http.lastResult = sort;
    this.navController.navigateForward('/tabs/tab3')
  }

  public delete(sort:RequestResult) {
    this.http.deleteResult(sort.id);
    this.sort = this.sort.filter(s => s.id !== sort.id);
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
