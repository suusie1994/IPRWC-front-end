import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { EditComponent } from './edit/edit.component';



@NgModule({
  declarations: [UserComponent, EditComponent],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
