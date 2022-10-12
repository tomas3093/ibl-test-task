import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { OpmetRes, ReportType } from '@ibl-test-task/api-interfaces';
import { BehaviorSubject, tap } from 'rxjs';
import { ErrorType } from '../enums/error-type.enum';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'itt-page',
  templateUrl: './page.component.html',
})
export class PageComponent {
  form: FormGroup;

  error = new BehaviorSubject<ErrorType | null>(null);
  submited = new BehaviorSubject<boolean>(false);
  loading = new BehaviorSubject<boolean>(false);

  result = new BehaviorSubject<OpmetRes | null>(null);

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.form = this.fb.group({
      types: this.fb.array([], Validators.required),
      airports: new FormControl('', [
        Validators.required,
        Validators.pattern('^([a-zA-Z]{4}([ ][a-zA-Z]{4})*)$'),
      ]),
      countries: new FormControl('', [
        Validators.required,
        Validators.pattern('^([a-zA-Z]{2}([ ][a-zA-Z]{2})*)$'),
      ]),
    });
  }

  messageTypes = [
    { name: 'METAR', value: ReportType.METAR },
    { name: 'TAF', value: ReportType.TAF },
    { name: 'SIGMET', value: ReportType.SIGMET },
  ];

  get formTypes() {
    return this.form.get('types') as FormArray;
  }

  get formAirports() {
    return this.form.get('airports');
  }

  get formCountries() {
    return this.form.get('countries');
  }

  onCheckboxChange(e: any) {
    const types: FormArray = this.form.get('types') as FormArray;
    if (e.target.checked) {
      types.push(new FormControl(e.target.value));
    } else {
      let i = 0;
      types.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          types.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  submit() {
    this.submited.next(true);

    if (this.formAirports?.errors?.['required']) {
      this.error.next(ErrorType.TYPES_EMPTY);
      return;
    }

    if (this.formAirports?.errors?.['required']) {
      this.error.next(ErrorType.AIRPORTS_EMPTY);
      return;
    }

    if (this.formAirports?.errors?.['pattern']) {
      this.error.next(ErrorType.AIRPORTS_PATTERN);
      return;
    }

    if (this.formCountries?.errors?.['required']) {
      this.error.next(ErrorType.COUNTRIES_EMPTY);
      return;
    }

    if (this.formCountries?.errors?.['pattern']) {
      this.error.next(ErrorType.COUNTRIES_PATTERN);
      return;
    }

    this.loading.next(true);

    const values: {
      types: ReportType[];
      airports: string[];
      countries: string[];
    } = {
      types: this.form.value.types,
      airports: this.form.value.airports.trim().split(' '),
      countries: this.form.value.countries.trim().split(' '),
    };
    this.api
      .getData(values.types, values.airports, values.countries)
      .pipe(
        tap((x) => {
          this.loading.next(false);
          this.result.next({ id: x.id, error: x.error, result: x.result });
        })
      )
      .subscribe();
  }
}
