import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { LoadingController } from '@ionic/angular';
import { SortAlgorithm } from '../model/SortAlgorithm';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  ionicForm: FormGroup;
  isSubmitted = false;
  optionEnum:SortAlgorithm[] = [SortAlgorithm.BUBBLE_SORT,SortAlgorithm.INSERTION_SORT,SortAlgorithm.MERGE_SORT,SortAlgorithm.QUICK_SORT,SortAlgorithm.SELECTOR_SORT,SortAlgorithm.SHELL_SORT]
  constructor(public formBuilder: FormBuilder,private loadingCtrl: LoadingController) {
  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      number: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
  }

  async submitForm() {
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      return false;
    } else {
      const loading = await this.loadingCtrl.create({
        message: 'Realizando ordenamiento ...',
        duration: 2000,
      });
  
      loading.present();
    }
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  async showLoading() {
    
  }
  
}
