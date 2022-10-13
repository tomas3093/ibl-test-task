import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { OpmetRes, ReportType } from '@ibl-test-task/api-interfaces';
import { BehaviorSubject, combineLatest, map, tap } from 'rxjs';
import { ErrorType } from '../enums/error-type.enum';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'itt-page',
  templateUrl: './page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
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

  onCheckboxChange(e: any) {
    this.formReset();
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

    if (this.formTypes?.errors?.['required']) {
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

  formReset() {
    this.error.next(null);
  }

  get showError() {
    return combineLatest([this.error, this.submited, this.loading]).pipe(
      map(([x, y, z]) => x != null && y && !z)
    );
  }

  get showTypesEmptyError() {
    return combineLatest([this.showError, this.error]).pipe(
      map(([x, y]) => x && y === ErrorType.TYPES_EMPTY)
    );
  }

  get showAirportsEmptyError() {
    return this.error.pipe(map((x) => x === ErrorType.AIRPORTS_EMPTY));
  }

  get showAirportsPatternError() {
    return this.error.pipe(map((x) => x === ErrorType.AIRPORTS_PATTERN));
  }

  get showCountriesEmptyError() {
    return this.error.pipe(map((x) => x === ErrorType.COUNTRIES_EMPTY));
  }

  get showCountriesPatternError() {
    return this.error.pipe(map((x) => x === ErrorType.COUNTRIES_PATTERN));
  }

  get showAirportsFieldInvalid() {
    return combineLatest([
      this.showAirportsEmptyError,
      this.showAirportsPatternError,
    ]).pipe(map(([x, y]) => x || y));
  }

  get showCountriesFieldInvalid() {
    return combineLatest([
      this.showCountriesEmptyError,
      this.showCountriesPatternError,
    ]).pipe(map(([x, y]) => x || y));
  }

  get formTypes() {
    return this.form.get('types') as FormArray;
  }

  get formAirports() {
    return this.form.get('airports');
  }

  get formCountries() {
    return this.form.get('countries');
  }
}
