import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], filter: any): any {
    if (!items || !filter) {
      return items;
    }
    return items.filter(item => {
      for (let key in filter) {
        if (item[key] === undefined || item[key].toLowerCase().indexOf(filter[key].toLowerCase()) === -1) {
          return false;
        }
      }
      return true;
    });
  }
}
