import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({
  standalone: true,
  name: 'replaceDecimalSeparator'
})
export class replaceDecimalSeparator implements PipeTransform {
  transform(value: string): string {
    if (value === null || value === undefined) return '';

    // Separa milhares com ponto e define a vírgula como separador decimal
    return value.toLocaleString();
  }
}
