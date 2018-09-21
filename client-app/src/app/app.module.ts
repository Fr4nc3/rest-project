import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppComponent } from './app.component';
import { ResultsComponent } from './results/results.component';
import { HomeComponent } from './home/home.component';
import { SiteLayoutComponent } from './layout/site-layout/site-layout.component';
import { SiteHeaderComponent } from './layout/site-header/site-header.component';
import { SiteFooterComponent } from './layout/site-footer/site-footer.component';
import { RestService } from './services/rest.service';
import { DataService } from './services/data.service';
import { routing } from './app.routing';
import { GradesComponent } from './grades/grades.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResultsComponent,
    SiteLayoutComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    GradesComponent
  ],
  imports: [BrowserModule, HttpModule, FormsModule, routing, NgbModule, MatIconModule, MatProgressSpinnerModule],
  providers: [RestService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule {}
