import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { OpmetReq, OpmetRes, ReportType } from '@ibl-test-task/api-interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getData(types: ReportType[], airports: string[], countries: string[]) {
    const req: OpmetReq = {
      id: '123',
      method: 'query',
      params: [
        {
          id: 'briefing01',
          reportTypes: types,
          stations: airports,
          countries,
        },
      ],
    };
    return this.http.post<OpmetRes>(
      'https://ogcie.iblsoft.com/ria/opmetquery',
      req
    );
  }
}
