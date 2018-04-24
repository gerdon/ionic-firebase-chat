import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
import { User } from '../../models/user.model';

@Injectable()
export class UserProvider {

  constructor(
    public db: AngularFireDatabase,
    public http: HttpClient
  ) {
  }

  // createUser(user: User): Promise<void> {
  //   return this.db.object('/users')
  //   .set(user)
  // }

  createUser(user: User): void {
    this.db.list('/users').push(user);
  }
}
