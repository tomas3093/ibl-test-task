import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ReportType } from '@ibl-test-task/api-interfaces';
import { highlightHTML } from '@ibl-test-task/util';
import { isEmpty } from 'lodash';
import { BehaviorSubject, catchError, combineLatest, map, of, tap } from 'rxjs';
import { ErrorType } from '../enums/error-type.enum';
import { ApiService } from '../services/api.service';

interface DataItem {
  [stationId: string]: {
    queryType: string;
    reportTime: string;
    text: string;
  }[];
}

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

  result = new BehaviorSubject<DataItem | null>(null);

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

    if (
      this.formAirports?.errors?.['required'] &&
      this.formCountries?.errors?.['required']
    ) {
      this.error.next(ErrorType.AIRPORTS_COUNTRIES_EMPTY);
      return;
    }

    if (this.formAirports?.errors?.['pattern']) {
      this.error.next(ErrorType.AIRPORTS_PATTERN);
      return;
    }

    if (this.formCountries?.errors?.['pattern']) {
      this.error.next(ErrorType.COUNTRIES_PATTERN);
      return;
    }

    this.loading.next(true);
    this.result.next(null);

    const airports =
      this.form.value.airports.trim().length > 0
        ? this.form.value.airports.trim().split(' ')
        : undefined;
    const countries =
      this.form.value.countries.trim().length > 0
        ? this.form.value.countries.trim().split(' ')
        : undefined;

    const values: {
      types: ReportType[];
      airports: string[];
      countries: string[];
    } = {
      types: this.form.value.types,
      airports,
      countries,
    };
    this.api
      .getData(values.types, values.airports, values.countries)
      .pipe(
        tap((x) => {
          this.loading.next(false);

          if (!(x && x.result)) {
            this.error.next(ErrorType.COMMON);
            return;
          }

          // Transformation
          const transformedData: DataItem = x.result.reduce((acc, cur) => {
            if (
              isEmpty(acc) ||
              acc[cur.stationId as keyof typeof acc] == null
            ) {
              acc = { ...acc, [cur.stationId]: [] };
            }

            acc = {
              ...acc,
              [cur.stationId]: [
                ...acc[cur.stationId as keyof typeof acc],
                {
                  queryType: cur.queryType,
                  reportTime: cur.reportTime,
                  text: highlightHTML(cur.text),
                },
              ],
            };

            return acc;
          }, {});

          this.result.next(transformedData);
          if (isEmpty(transformedData)) {
            this.error.next(ErrorType.NO_RESULTS);
          }
        }),
        catchError((x) => {
          this.loading.next(false);
          this.error.next(ErrorType.COMMON);
          console.error(x);
          return of(null);
        })
      )
      .subscribe();
  }

  formReset() {
    this.error.next(null);
  }

  objectKeys(o: any) {
    return Object.keys(o);
  }

  get showValidationError() {
    return combineLatest([this.error, this.submited, this.loading]).pipe(
      map(
        ([x, y, z]) =>
          x !== null &&
          [
            ErrorType.AIRPORTS_COUNTRIES_EMPTY,
            ErrorType.AIRPORTS_PATTERN,
            ErrorType.COUNTRIES_PATTERN,
            ErrorType.TYPES_EMPTY,
          ].includes(x) &&
          y &&
          !z
      )
    );
  }

  get showTypesEmptyError() {
    return combineLatest([this.showValidationError, this.error]).pipe(
      map(([x, y]) => x && y === ErrorType.TYPES_EMPTY)
    );
  }

  get showAirportsCountriesEmptyError() {
    return this.error.pipe(
      map((x) => x === ErrorType.AIRPORTS_COUNTRIES_EMPTY)
    );
  }

  get showAirportsPatternError() {
    return this.error.pipe(map((x) => x === ErrorType.AIRPORTS_PATTERN));
  }

  get showCountriesPatternError() {
    return this.error.pipe(map((x) => x === ErrorType.COUNTRIES_PATTERN));
  }

  get showAirportsFieldInvalid() {
    return combineLatest([
      this.showAirportsCountriesEmptyError,
      this.showAirportsPatternError,
    ]).pipe(map(([x, y]) => x || y));
  }

  get showCountriesFieldInvalid() {
    return combineLatest([
      this.showAirportsCountriesEmptyError,
      this.showCountriesPatternError,
    ]).pipe(map(([x, y]) => x || y));
  }

  get showNoResult() {
    return combineLatest([this.error, this.submited, this.loading]).pipe(
      map(
        ([err, submited, loading]) =>
          err === ErrorType.NO_RESULTS && submited && !loading
      )
    );
  }

  get showCommonError() {
    return combineLatest([this.error, this.loading]).pipe(
      map(([err, loading]) => err === ErrorType.COMMON && !loading)
    );
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
