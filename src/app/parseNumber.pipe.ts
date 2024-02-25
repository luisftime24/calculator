import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseNumber',
})
export class ParseNumberPipe implements PipeTransform {
  transform(value: number): string {
    if (isNaN(value)) {
      return 'Invalid Number';
    }

    // Convierte el número a una cadena
    let stringValue = value.toString();

    // Separa la parte entera de la parte decimal
    const parts = stringValue.split('.');
    const integerPart = parts[0];
    const decimalPart = parts.length > 1 ? '.' + parts[1] : '.00';

    // Agrega comas como separadores de miles
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Combina las partes y devuelve el resultado
    const formattedValue = formattedIntegerPart + decimalPart;

    return formattedValue;
  }
}
