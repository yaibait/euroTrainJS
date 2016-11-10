import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'filtersexy'})
export class FilterSexy implements PipeTransform {
  transform(value: number, exponent: string): number {
    let exp = parseFloat(exponent);
    return Math.pow(value, isNaN(exp) ? 1 : exp);
  }
}
