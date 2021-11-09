import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class TableService {
  tableList: AngularFireList<any>;
  array: any;

  constructor(private firebase: AngularFireDatabase) { 
    this.tableList = this.firebase.list('tables');
    this.tableList.snapshotChanges().subscribe( list => {
      this.array = list.map(item => {
        return {
          $key: item.key,
          ...item.payload.val()
        }
      });
    });
  }
}
