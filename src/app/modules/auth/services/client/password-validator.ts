import { AbstractControl } from '@angular/forms';

export class PasswordMatch {
  static matchingPasswords = (control: AbstractControl): { [p: string]: boolean } | null =>{

    const newPassword = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!newPassword || !confirmPassword) {
      return null;
    }
    if(newPassword?.value !== confirmPassword?.value){
      control.get('confirmPassword')?.setErrors({ mismatchedPasswords: true });

    }
    return newPassword?.value === confirmPassword?.value ? null : { mismatchedPasswords: true };
  }

}
