import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'expiry'
})
export class ExpiryPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
