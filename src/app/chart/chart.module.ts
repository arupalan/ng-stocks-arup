import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { ChartRoutingModule } from './chart-routing.module';
import { ChartComponent } from './chart.component';
import { ChartService } from './chart.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import {RouterModule} from '@angular/router';
import { MacdChartComponent } from '@app/macd-chart/macd-chart.component';

// Add an icon to the library for convenient access in other components
library.add(faChartLine);

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    RouterModule,
    ChartRoutingModule,
    FontAwesomeModule
  ],
  exports: [MacdChartComponent],
  declarations: [ChartComponent, MacdChartComponent],
  providers: [ChartService]
})
export class ChartModule {}
