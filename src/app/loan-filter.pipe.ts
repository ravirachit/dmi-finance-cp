import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'loanFilter',
  pure: false
})
export class LoanFilterPipe implements PipeTransform {

  public transform(value, keys: string, name: string) {

    if (!name) return value;
    return (value || []).filter(item => keys.split(',').some(key => item.hasOwnProperty(key) && new RegExp(name, 'gi').test(item[key])));

  }

}
