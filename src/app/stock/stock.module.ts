import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './stock.component';
import { StockService } from './stock.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

// Add an icon to the library for convenient access in other components
library.add(faChartLine);

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    StockRoutingModule,
    FontAwesomeModule
  ],
  declarations: [StockComponent],
  providers: [StockService]
})
export class StockModule {}
