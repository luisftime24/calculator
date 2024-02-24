import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'compounding-calculator';
  calculatorForm!: FormGroup;
  futuredValue: number = 0;
  user = '<Luis Chota>'
  frequencyOptions = [
    { value: 'annually', label: 'Anual', times: 1 },
    { value: 'semi-annually', label: 'Semestral', times: 2 },
    { value: 'quarterly', label: 'Trimestral', times: 4 },
    { value: 'monthly', label: 'Mensual', times: 12 },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.calculatorForm = this.fb.group({
      principal: [null, [Validators.required]],
      annualAddition: [null, [Validators.required]],
      yearsToGrow: [null, [Validators.required]],
      interestRate: [null, [Validators.required]],
      compoundTimes: ['annually', [Validators.required]],
    });
  }

  public onSubmit(): void {
    if (this.calculatorForm.valid) {
      const frequencyTimes = this.frequencyOptions.find(
        (f) => f.value === this.calculatorForm.get('compoundTimes')?.value
      )?.times;
      const { principal, annualAddition, yearsToGrow, interestRate } =
        this.calculatorForm.value;

      this.futuredValue = parseFloat(this.calculateCompoundInterest(
        principal,
        annualAddition,
        yearsToGrow,
        interestRate,
        frequencyTimes!
      ).toFixed(2));
    }
  }

  public resetValues(): void {
    this.calculatorForm.reset({
      compoundTimes: 'annually',
    });
  }

  private calculateCompoundInterest(
    principal: number,
    annualAddition: number,
    yearsToGrow: number,
    interestRate: number,
    compoundTimes: number
  ): number {
    let total =
      principal *
        Math.pow(
          1 + interestRate / 100 / compoundTimes,
          yearsToGrow * compoundTimes
        ) +
      annualAddition *
        ((Math.pow(
          1 + interestRate / 100 / compoundTimes,
          yearsToGrow * compoundTimes
        ) -
          1) /
          (interestRate / 100 / compoundTimes));

    console.log(principal, annualAddition, yearsToGrow, interestRate, compoundTimes, total)
    return total;
  }
}
