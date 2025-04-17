import { Component , NgModule } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'age-calculator';

  day: number | null = null;
  month: number | null = null;
  year: number | null = null;

age: { years: number; months: number; days: number } | null = null;

errors = {
  day: '',
  month: '',
  year: '',
};

calculateAge() {
  this.age = null;
  this.errors = { day: '', month: '', year: '' };

  const today = new Date();

  // Required fields
  if (this.day === null) this.errors.day = 'This field is required';
  if (this.month === null) this.errors.month = 'This field is required';
  if (this.year === null) this.errors.year = 'This field is required';

  // Stop if any required field is empty
  if (this.day === null || this.month === null || this.year === null) return;

  // ✅ Continue with validation only if all fields are filled
  if (this.day < 1 || this.day > 31) {
    this.errors.day = 'Must be a valid day';
  }

  if (this.month < 1 || this.month > 12) {
    this.errors.month = 'Must be a valid month';
  }

  //Future date validation
  const inputDate = new Date(this.year, this.month - 1, this.day);
  if (inputDate > today) {
    this.errors.year = 'Must be in the past';
  }

  // Date invalidity
  const isValid =
  inputDate.getDate() === this.day &&
  inputDate.getMonth() === this.month - 1 &&
  inputDate.getFullYear() === this.year;

if (!isValid) {
  this.errors.day = 'Must be a valid date';
  this.errors.month = 'Must be a valid date';
  this.errors.year = 'Must be a valid date';
}

  // Stop if any error was set
  if (Object.values(this.errors).some((e) => e)) return;

  // Calculate age
  let years = today.getFullYear() - this.year;
  let months = today.getMonth() - (this.month - 1);
  let days = today.getDate() - this.day;

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  this.age = { years, months, days };
}



/*

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'age-calculator';

  day: number | null = null;
  month: number | null = null;
  year: number | null = null;

  age: { years: number; months: number; days: number } | null = null;

  errors = {
    day: '',
    month: '',
    year: '',
  };

  calculateAge() {
    this.age = null;
    this.errors = { day: '', month: '', year: '' };

    const today = new Date();

    // Step 1: Required field check
    if (this.day === null) this.errors.day = 'This field is required';
    if (this.month === null) this.errors.month = 'This field is required';
    if (this.year === null) this.errors.year = 'This field is required';

    if (this.day === null || this.month === null || this.year === null) return;

    // Step 2: Range checks
    if (this.day < 1 || this.day > 31) {
      this.errors.day = 'Must be a valid day';
    }

    if (this.month < 1 || this.month > 12) {
      this.errors.month = 'Must be a valid month';
    }

    if (this.year > today.getFullYear()) {
      this.errors.year = 'Must be in the past';
    }

    // Step 3: Date validity check (e.g., 31/04/1991)
    const inputDate = new Date(this.year, this.month - 1, this.day);
    const isValid =
      inputDate.getDate() === this.day &&
      inputDate.getMonth() === this.month - 1 &&
      inputDate.getFullYear() === this.year;

    if (!isValid) {
      // Check which part caused the failure
      const lastValidDay = new Date(this.year, this.month, 0).getDate();
      if (this.day > lastValidDay) {
        this.errors.day = 'Must be a valid date';
      }
      // Month and year are already range checked
    }

    // Step 4: Abort if errors exist
    if (Object.values(this.errors).some((e) => e)) return;

    // Step 5: Age Calculation
    let years = today.getFullYear() - this.year;
    let months = today.getMonth() - (this.month - 1);
    let days = today.getDate() - this.day;

    if (days < 0) {
      months--;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    this.age = { years, months, days };
  }
}
*/

}