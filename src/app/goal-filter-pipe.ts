import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'goalFilter',
  standalone:true
})
export class GoalFilterPipe implements PipeTransform {
  transform(data: any[] | null, filterFn: ((data: any) => boolean) | null): any[] {
    if (!data || !filterFn) return [];
    // Show all data by default if no filter function is selected
    if (!filterFn) return data; 
    
    return data.filter(filterFn);
  }
}
