import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  Users: any = [];
  constructor(private crudApi: CrudService) { }

  ngOnInit(): void {
    this.crudApi.getUsers().subscribe((res: any) => {
      this.Users = res;
    })
  }

  // Delete record
  deleteUser(id: any, index: number) {
    console.log('User id ', id);
    this.crudApi.deleteUser(id).subscribe(() => {
      this.Users.splice(index, 1);
      console.log('Record deleted successfully');
    });
  }

}
