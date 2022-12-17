import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { toFormData } from 'src/app/service/toFormData';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  getId: any;
  updateForm!: FormGroup;
  image: any;
  userData: any;
  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudApi: CrudService) {
      this.getId = this.activatedRoute.snapshot.paramMap.get('id');
      this.crudApi.getUser(this.getId).subscribe((res: any) => {
        console.log('res ', res);
        this.userData = res;
        this.updateForm.setValue({
          firstname: res['firstname'],
          lastname: res['lastname'],
          email: res['email'],
          phone: res['phone'],
          file: res['file']
        })
      });

      this.updateForm = this.formBuilder.group({
        firstname: [''],
        lastname: [''],
        email: [''],
        phone: [''],
        file: ['']
      })
    }

  ngOnInit(): void {
  }

  onFileSelect(event: any) {
    console.log('event.target.files ', event.target.files);
    if (event.target.files.length > 0) {
      this.image = <File>event.target.files[0];
      console.log(' this.updateForm.value ',  this.updateForm.value);
    }
  }

  onUpdate() {
    this.updateForm.value.file = this.image;

    console.log('this.updateForm.value on update', this.updateForm.value);
    this.crudApi.updateUser(this.getId, toFormData(this.updateForm.value)).subscribe((res) => {
      console.log('Data updated successfully !');
      this.ngZone.run(() => this.router.navigateByUrl('/user-list'))
    })
  }

}
