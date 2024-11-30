import {Routes} from '@angular/router';
import {ChildOneComponent} from '../child-one/child-one.component';
import {ChildTwoComponent} from '../child-two/child-two.component';

export const routes: Routes = [
  { path: '', redirectTo: 'tab1', pathMatch: 'full' },
  { path: 'tab1', component: ChildOneComponent },
  { path: 'tab2', component: ChildTwoComponent }
];
