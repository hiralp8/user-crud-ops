import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { toFormData } from 'src/app/service/toFormData';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  image: any;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudApi: CrudService) {
      this.userForm = this.formBuilder.group({
        firstname: [''],
        lastname: [''],
        email: [''],
        phone: [''],
        file: ['']
      });
    }

  ngOnInit(): void {
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      this.image = <File>event.target.files[0];
    }
  }

  onSubmit(): any {
    // console.log('before this.userForm.value  ', this.userForm.value);
    this.userForm.value.file = this.image;
    this.crudApi.addUser(toFormData(this.userForm.value))
    .subscribe((res: any) => {
      console.log('Data Added Successfully');
      this.ngZone.run(() => this.router.navigateByUrl('/user-list'));
    });
  }
}
