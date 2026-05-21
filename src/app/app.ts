import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './features/layout/header/header';
import { Footer } from './features/layout/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
