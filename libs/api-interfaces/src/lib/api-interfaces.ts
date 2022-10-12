export enum ReportType {
  METAR = 'METAR',
  TAF = 'TAF_LONGTAF',
  SIGMET = 'SIGMET',
}

export interface OpmetReq {
  id: string;
  method: 'query';
  params: {
    id: string;
    reportTypes: ReportType[];
    stations: string[];
    countries: string[];
  }[];
}

export interface OpmetRes {
  error: any;
  id: string;
  result: [
    {
      placeId: string;
      queryType: string;
      receptionTime: string;
      refs: string[];
      reportTime: string;
      reportType: string;
      revision: string;
      stationId: string;
      text: string;
      textHTML: string;
    }
  ];
}
