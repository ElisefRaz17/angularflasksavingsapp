import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSort',
  standalone: true,
  pure: false // Allows the pipe to evaluate newly loaded service data dynamically
})
export class FilterSortPipe implements PipeTransform {
  transform(
    data: any[], 
    sortFilter: string, 
    activeFilterFn: (data: any) => boolean = () => true
  ): any[] {
    if (!data) return [];

    // 1. Apply activeFilterFn (Defaults to showing all when nothing selected)
    let filtered = data.filter(activeFilterFn);

    // 3. Apply Sort Filter
    if (sortFilter) {
      filtered.sort((a, b) => {
        if (sortFilter === 'recently_added') {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        }
        if (sortFilter === 'deadline_soonest') {
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        }
        if (sortFilter === 'progress_highest') {
          return (b.current_amount / b.target_amount) - (a.current_amount / a.target_amount);
        }
        if (sortFilter === 'progress_lowest') {
          return (a.current_amount / a.target_amount) - (b.current_amount / b.target_amount);
        }
        if (sortFilter === 'amount_highest') {
          return b.current_amount - a.current_amount;
        }
        if (sortFilter === 'alphabetical') {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
    }

    return filtered;
  }
}
