import { Injectable } from '@angular/core';
// import { throwError } from 'rxjs';

@Injectable()
export class JwtHelperService {

  constructor() { }
  urlBase64Decode(str: string): string {
    let output = str.replace(/-/g, '+').replace(/_/g, '/');
    switch (output.length % 4) {
      case 0: { break; }
      case 2: { output += '=='; break; }
      case 3: { output += '='; break; }
      default: {
        throw new Error('Illegal base64url string!');
      }
    }
    // polyfill https://github.com/davidchambers/Base64.js
    return decodeURIComponent(escape(atob(output)));
  }

  decodeToken(token: string) {
    const parts = token.split('.');

    if (parts.length !== 3) {
      throw new Error('JWT must have 3 parts');
    }

    const decoded = this.urlBase64Decode(parts[1]);
    if (!decoded) {
      throw new Error('Cannot decode the token');
    }

    return JSON.parse(decoded);
  }

  getTokenExpirationDate(token: string): Date {
    const decoded = this.decodeToken(token);

    if (typeof decoded.exp === 'undefined') {
      return null;
    }

    const d = new Date(0); // The 0 here is the key, which sets the date to the epoch
    d.setUTCSeconds(decoded.exp);

    return d;
  }

  isTokenExpired(token: string, offsetSeconds: number): boolean {
    const d = this.getTokenExpirationDate(token);
    offsetSeconds = offsetSeconds || 0;
    if (d === null) {
      return false;
    }

    // Token expired?
    return !(d.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
  }
}
