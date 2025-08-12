import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CalculatorActions from '../../ngrx/actions/calculator.actions';
import { CalculatorState } from '../../models/number.model';
import {Observable} from 'rxjs';
import {AsyncPipe, CommonModule} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {
  MatCard,
  MatCardActions,
} from '@angular/material/card';

@Component({
  selector: 'app-calculator',
  imports: [
    AsyncPipe,
    CommonModule,
    MatButton,
    MatCard,
    MatCardActions,
  ],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss']
})
export class CalculatorComponent {

  calculator$!: Observable<CalculatorState>;

  constructor(private store: Store<{ calculator: CalculatorState }>) {

  this.calculator$ = this.store.select('calculator');}


  onNumber(value: string) {
    this.store.dispatch(CalculatorActions.enterNumber({ number: value}));
  }

  onOperator(op: string) {
    this.store.dispatch(CalculatorActions.enterOperator({ operator: op }));
  }

  onCalculate() {
    this.store.dispatch(CalculatorActions.calculateResult());
  }

  onDelete() {
    this.store.dispatch(CalculatorActions.deleteNumber());
  }

  onClear() {
    this.store.dispatch(CalculatorActions.clear());
  }
}



