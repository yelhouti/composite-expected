import { Pipe, PipeTransform } from '@angular/core';

import * as dayjs from 'dayjs';
import * as duration from 'dayjs/plugin/duration';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  constructor() {
    dayjs.extend(duration);
  }

  transform(value: any): string {
    if (value) {
      return dayjs.duration(value).humanize();
    }
    return '';
  }
}
