import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors} from '@angular/forms';
import {LoadingController} from '@ionic/angular';
import {SortAlgorithm} from '../model/SortAlgorithm';

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

  constructor(public formBuilder: FormBuilder, private loadingCtrl: LoadingController) {
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
      return false;
    } else {
      const loading = await this.loadingCtrl.create({
        message: 'Realizando ordenamiento ...',
        duration: 2000,
      });

      await loading.present();
    }
  }

  private checkForm(control: AbstractControl): ValidationErrors | null {
    const minElements = control.get('minElements');
    const maxElements = control.get('maxElements');
    return minElements.value > maxElements.value ? {minElementsGreaterThanMaxElements: true} : null;
  }
}
