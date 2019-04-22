import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  pageOne: FormGroup;
  pageTwo: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    this.pageOne = this.fb.group({
      firstName: [null],
      lastName: [null],
      address: [null],
      avatar: [null]
    });

    this.pageTwo = this.fb.group({
      thisThing: [null],
      that: [null],
      other: [null]
    });
  }
}
