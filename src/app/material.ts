import { NgModule } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatInputModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  imports: [ MatButtonModule, MatCheckboxModule, MatSidenavModule, MatFormFieldModule, MatInputModule ],
  exports: [ MatButtonModule, MatCheckboxModule, MatSidenavModule, MatFormFieldModule, MatInputModule ]
})
export class MaterialModule { }
