import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myForm:FormGroup;
  genders = ['male', 'female'];
  forbiddenUserNames = ['John', 'Doe'];

  ngOnInit(): void {
    this.myForm = new FormGroup({
      'userData': new FormGroup({
        'username':new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      'gender':new FormControl('male'),
      'hobbies': new FormArray([])
    })
  }


  onAddHobby(){
    const controls = new FormControl(null, Validators.required);
    (<FormArray>this.myForm.get('hobbies')).push(controls);
  }

  getControls() {
    return (<FormArray>this.myForm.get('hobbies')).controls;
  }

  onSubmit(){
    console.log(this.myForm); 
  }

  forbiddenNames(control:FormControl):{[s:string]: boolean}{
     if (this.forbiddenUserNames.indexOf(control.value) !== -1) {
         return {'nameIsForbidden': true}
     }
     return null;
  }
  forbiddenEmails(control:FormControl):Promise<any> | Observable<any>{
  const promise = new Promise<any>((resolve,reject) => {     
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        }
        else{
          resolve(null);
        }
      }, 1000);
  });

  return promise;
}

}
