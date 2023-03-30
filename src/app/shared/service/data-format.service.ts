import { Injectable } from '@angular/core';
import * as moment from 'moment-timezone';
@Injectable({
  providedIn: 'root'
})
export class DataFormatService {

  constructor() { }

  formatUTCLocalDateToBrazilDate(dataNascimento: string): Date {
    // let data =  moment.utc(dataNascimento).tz('America/Sao_Paulo').toDate();
    // const fusoHorario = 'America/Sao_Paulo'; // Fuso horário desejado
    // console.log(moment.utc(dataNascimento).tz(fusoHorario).format('DD/MM/YYYY HH:mm:ss')) // Converte a data e hora para o fuso horário desejado e formata
    let data = new Date(dataNascimento)
    const offset = 3 * 60 // 2 horas em minutos
    return new Date(data.getTime() + offset * 60 * 1000);
  }
}
