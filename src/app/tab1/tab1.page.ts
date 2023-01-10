import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import {LoadingController} from '@ionic/angular';
import {SortAlgorithm} from '../model/SortAlgorithm';
import { NavController, ToastController } from '@ionic/angular';
import {ResultService} from "../services/result.service";
import {RequestData} from "../model/RequestData";


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  ionicForm: FormGroup;
  isSubmitted = false;
  optionEnum: SortAlgorithm[] = [SortAlgorithm.BUBBLE_SORT, SortAlgorithm.INSERTION_SORT,
    SortAlgorithm.MERGE_SORT, SortAlgorithm.QUICK_SORT, SortAlgorithm.SELECTOR_SORT, SortAlgorithm.SHELL_SORT];

  constructor(public formBuilder: FormBuilder, private loadingCtrl: LoadingController,
              private toastController: ToastController,private navController: NavController,
              private readonly http: ResultService) {
  }

  get minElements() {
    return this.ionicForm.get('minElements');
  }

  get maxElements() {
    return this.ionicForm.get('maxElements');
  }

  get increment() {
    return this.ionicForm.get('increment');
  }

  ngOnInit(): void {
    this.ionicForm = this.formBuilder.group({
      minElements: ['', [Validators.required, Validators.min(1)]],
      maxElements: ['', [Validators.required, Validators.min(1)]],
      increment: ['', [Validators.required, Validators.min(1)]],
    },{validators: this.checkForm});
  }

  async submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      this.presentToast('bottom','danger','No se puede realizar la petición')
      return false;
    } else {
      const rq: RequestData = {
        minElements: this.ionicForm.value.minElements,
        maxElements: this.ionicForm.value.maxElements,
        step: this.ionicForm.value.increment,
        algorithm: this.optionEnum.values().next().value,
        date: new Date()
      };
      this.presentToast('bottom','success','Peticion realizada correctamente')
      const loading = await this.loadingCtrl.create({
        message: 'Realizando ordenamiento ...'
      });

      await loading.present();
      const result = await this.http.requestSorting(rq).toPromise();
      console.log(result);
      await loading.dismiss();
      this.http.lastResult = result;
      this.navController.navigateForward('/tabs/tab3')
    }
  }

  private checkForm(control: AbstractControl): ValidationErrors | null {
    const minElements = control.get('minElements');
    const maxElements = control.get('maxElements');
    return minElements.value > maxElements.value ? {minElementsGreaterThanMaxElements: true} : null;
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', color, msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500,
      position: position,
      color: color
    });

    await toast.present();
  }
}
