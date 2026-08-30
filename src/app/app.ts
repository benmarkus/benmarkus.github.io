import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './features/layout/header/header';
import { Navbar } from './features/layout/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}
