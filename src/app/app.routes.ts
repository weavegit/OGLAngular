import { RouterModule, Routes } from '@angular/router';
import { SplashComponent } from './Component/splash/splash.component';
import { ProductComponent } from './Component/product/product.component';
import { CustomerComponent } from './Component/customer/customer.component';
import { NgModule } from '@angular/core';
export const routes: Routes = [
  {
      path: '',
      redirectTo: 'splash',
      pathMatch: 'full'
    },
  {
    path: 'splash',
    component: SplashComponent
  },

  {

    path: 'product',
    component: ProductComponent
  },

  {
    path: 'customer',
    component: CustomerComponent
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false, initialNavigation: 'enabledBlocking' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
