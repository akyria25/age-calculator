import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms'; // ✅ Import

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(FormsModule)] // ✅ Add FormsModule here too
};
