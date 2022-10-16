import { OpmetRes } from '@ibl-test-task/api-interfaces';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getData(): OpmetRes {
    return {
      error: null,
      id: '123',
      result: [
        {
          placeId: 'icao:EGLL',
          queryType: 'METAR',
          receptionTime: '2022-10-13T11:32:42.569Z',
          refs: ['briefing01'],
          reportTime: '2022-10-13T11:20:00Z',
          reportType: 'MSG_METAR',
          revision: 'COR',
          stationId: 'EGLL',
          text: 'EGLL 131120Z AUTO 36003KT 310V040 9999 SCT009 BKN013 OVC038\r\r\n     15/12 Q1016 BECMG BKN020=',
          textHTML:
            'EGLL 131120Z AUTO 36003KT 310V040 9999 <font color="green">SCT009</font> BKN013 OVC038<br/>\n     15/12 Q1016 BECMG BKN020=',
        },
        {
          placeId: 'icao:LKPR',
          queryType: 'METAR',
          receptionTime: '2022-10-13T11:37:34.467Z',
          refs: ['briefing01'],
          reportTime: '2022-10-13T11:30:00Z',
          reportType: 'MSG_METAR',
          stationId: 'LKPR',
          text: 'LKPR 131130Z 19003KT 140V240 9999 FEW027 BKN034 16/09 Q1021\r\r\n     NOSIG=',
          textHTML:
            'LKPR 131130Z 19003KT 140V240 <font color="blue">9999</font> FEW027 <font color="blue">BKN034</font> 16/09 Q1021<br/>\n     NOSIG=',
        },
        {
          placeId: 'icao:LZIB',
          queryType: 'METAR',
          receptionTime: '2022-10-13T11:32:34.221Z',
          refs: ['briefing01'],
          reportTime: '2022-10-13T11:30:00Z',
          reportType: 'MSG_METAR',
          stationId: 'LZIB',
          text: 'LZIB 131130Z VRB01KT 9999 FEW018 SCT021 16/12 Q1022 NOSIG=',
          textHTML:
            'LZIB 131130Z VRB01KT 9999 FEW018 <font color="white">SCT021</font> 16/12 Q1022 NOSIG=',
        },
        {
          placeId: 'icao:LZKZ',
          queryType: 'METAR',
          receptionTime: '2022-10-13T11:32:34.221Z',
          refs: ['briefing01'],
          reportTime: '2022-10-13T11:30:00Z',
          reportType: 'MSG_METAR',
          stationId: 'LZKZ',
          text: 'LZKZ 131130Z 25006KT 200V280 CAVOK 16/08 Q1023 NOSIG=',
          textHTML:
            'LZKZ 131130Z 25006KT 200V280 <font color="blue">CAVOK</font> 16/08 Q1023 NOSIG=',
        },
        {
          placeId: 'icao:LZPP',
          queryType: 'METAR',
          receptionTime: '2022-10-13T11:37:48.939Z',
          refs: ['briefing01'],
          reportTime: '2022-10-13T11:30:00Z',
          reportType: 'MSG_METAR',
          stationId: 'LZPP',
          text: 'LZPP 131130Z 17004KT 130V200 9999 SCT025 17/12 Q1022=',
          textHTML:
            'LZPP 131130Z 17004KT 130V200 <font color="blue">9999</font> <font color="blue">SCT025</font> 17/12 Q1022=',
        },
        {
          placeId: 'icao:LZTT',
          queryType: 'METAR',
          receptionTime: '2022-10-13T11:32:34.221Z',
          refs: ['briefing01'],
          reportTime: '2022-10-13T11:30:00Z',
          reportType: 'MSG_METAR',
          stationId: 'LZTT',
          text: 'LZTT 131130Z 09003KT 050V150 9999 FEW040 15/06 Q1022 NOSIG=',
          textHTML:
            'LZTT 131130Z 09003KT 050V150 <font color="blue">9999</font> FEW040 15/06 Q1022 NOSIG=',
        },
        {
          placeId: 'icao:LZZI',
          queryType: 'METAR',
          receptionTime: '2022-10-13T11:37:48.939Z',
          refs: ['briefing01'],
          reportTime: '2022-10-13T11:30:00Z',
          reportType: 'MSG_METAR',
          stationId: 'LZZI',
          text: 'LZZI 131130Z VRB01KT 9999 SCT035 14/08 Q1022=',
          textHTML:
            'LZZI 131130Z VRB01KT <font color="blue">9999</font> <font color="blue">SCT035</font> 14/08 Q1022=',
        },
        {
          placeId: 'icao:EGLL',
          queryType: 'TAF_LONGTAF',
          receptionTime: '2022-10-13T11:13:12.426Z',
          refs: ['briefing01'],
          reportTime: '2022-10-13T11:12:00Z',
          reportType: 'MSG_LONGTAF',
          stationId: 'EGLL',
          text: 'EGLL 131112Z 1312/1418 35003KT 9999 FEW007 SCT025 PROB30 TEMPO\r\r\n    1403/1409 7000 BKN006 TEMPO 1409/1418 7000 RA PROB30 TEMPO\r\r\n    1412/1415 4000 RADZ BKN007 BECMG 1415/1418 BKN007=',
          textHTML:
            'EGLL 131112Z 1312/1418 35003KT <font color="blue">9999</font> FEW007 <font color="blue">SCT025</font> PROB30 TEMPO<br/>\n    1403/1409 7000 <font color="yellow">BKN006</font> TEMPO 1409/1418 <font color="white">7000</font> RA PROB30 TEMPO<br/>\n    1412/1415 <font color="green">4000</font> RADZ <font color="green">BKN007</font> BECMG 1415/1418 BKN007=',
          validFrom: '2022-10-13T12:00:00Z',
          validTo: '2022-10-14T18:00:00Z',
        },
        {
          placeId: 'icao:LKPR',
          queryType: 'TAF_LONGTAF',
          receptionTime: '2022-10-13T11:08:11.498Z',
          refs: ['briefing01'],
          reportTime: '2022-10-13T11:00:00Z',
          reportType: 'MSG_LONGTAF',
          stationId: 'LKPR',
          text: 'LKPR 131100Z 1312/1418 18004KT 9999 BKN035\r\r\n      BECMG 1318/1321 23008KT\r\r\n      TEMPO 1322/1408 4000 BR BKN020 PROB30\r\r\n      TEMPO 1400/1406 2000 -RA BR SCT007 BKN014\r\r\n      BECMG 1415/1417 18007KT CAVOK=',
          textHTML:
            'LKPR 131100Z 1312/1418 18004KT <font color="blue">9999</font> <font color="blue">BKN035</font><br/>\n      BECMG 1318/1321 23008KT<br/>\n      TEMPO 1322/1408 <font color="green">4000</font> BR BKN020 PROB30<br/>\n      TEMPO 1400/1406 <font color="yellow">2000</font> -RA BR SCT007 BKN014<br/>\n      BECMG 1415/1417 18007KT <font color="blue">CAVOK</font>=',
          validFrom: '2022-10-13T12:00:00Z',
          validTo: '2022-10-14T18:00:00Z',
        },
        {
          placeId: 'icao:LZIB',
          queryType: 'TAF_LONGTAF',
          receptionTime: '2022-10-13T11:13:13.461Z',
          refs: ['briefing01'],
          reportTime: '2022-10-13T11:15:00Z',
          reportType: 'MSG_LONGTAF',
          stationId: 'LZIB',
          text: 'LZIB 131115Z 1312/1412 12004KT 9999 SCT020 PROB40\r\r\n      TEMPO 1312/1314 5000 BR BKN015\r\r\n      BECMG 1401/1403 VRB02KT PROB40\r\r\n      TEMPO 1403/1408 2000 MIFG BKN004=',
          textHTML:
            'LZIB 131115Z 1312/1412 12004KT 9999 <font color="white">SCT020</font> PROB40<br/>\n      TEMPO 1312/1314 <font color="white">5000</font> BR <font color="white">BKN015</font><br/>\n      BECMG 1401/1403 VRB02KT PROB40<br/>\n      TEMPO 1403/1408 <font color="yellow">2000</font> MIFG <font color="yellow">BKN004</font>=',
          validFrom: '2022-10-13T12:00:00Z',
          validTo: '2022-10-14T12:00:00Z',
        },
        {
          placeId: 'icao:LZKZ',
          queryType: 'TAF_LONGTAF',
          receptionTime: '2022-10-13T11:13:13.461Z',
          refs: ['briefing01'],
          reportTime: '2022-10-13T11:15:00Z',
          reportType: 'MSG_LONGTAF',
          stationId: 'LZKZ',
          text: 'LZKZ 131115Z 1312/1412 VRB02KT CAVOK\r\r\n      BECMG 1410/1412 18006KT=',
          textHTML:
            'LZKZ 131115Z 1312/1412 VRB02KT <font color="blue">CAVOK</font><br/>\n      BECMG 1410/1412 18006KT=',
          validFrom: '2022-10-13T12:00:00Z',
          validTo: '2022-10-14T12:00:00Z',
        },
        {
          placeId: 'icao:LZTT',
          queryType: 'TAF_LONGTAF',
          receptionTime: '2022-10-13T11:13:13.461Z',
          refs: ['briefing01'],
          reportTime: '2022-10-13T11:15:00Z',
          reportType: 'MSG_LONGTAF',
          stationId: 'LZTT',
          text: 'LZTT 131115Z 1312/1412 VRB02KT 9999 SCT050\r\r\n      TEMPO 1402/1408 1500 BCFG BKN002\r\r\n      BECMG 1410/1412 21005KT=',
          textHTML:
            'LZTT 131115Z 1312/1412 VRB02KT <font color="blue">9999</font> <font color="blue">SCT050</font><br/>\n      TEMPO 1402/1408 <font color="orange">1500</font> BCFG <font color="orange">BKN002</font><br/>\n      BECMG 1410/1412 21005KT=',
          validFrom: '2022-10-13T12:00:00Z',
          validTo: '2022-10-14T12:00:00Z',
        },
      ],
    };
  }
}
