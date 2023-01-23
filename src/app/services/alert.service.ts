import { Injectable } from '@angular/core';
import swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  fireWarning(text: string) {
    return swal.fire({
      title: 'Weet u het zeker?',
      text: text,
      icon: 'warning',
      iconColor: '#e95c4b',
      showCancelButton: true,
      confirmButtonColor: '#e95c4b',
      cancelButtonColor: '#1d2951',
      confirmButtonText: 'Ja, verwijder het',
      cancelButtonText: 'Nee, annuleer het',
    })
  }
}
