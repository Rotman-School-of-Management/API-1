import { Routes } from '@angular/router';
import { Home as HomeComponent } from './home/home';
import { Post } from './post/post';
import { Quotes } from './quotes/quotes';
import { Products } from './products/products';
import { About} from './about/about';
import { Page1 } from './about/page1/page1';
import { Page2 } from './about/page2/page2';
import { Contact } from './contact/contact';
//import { Team } from './team/team ';
import { Navbar } from './navbar/navbar';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home Page' },
  { path: 'post', component: Post, title: 'Recent Posts' },
  { path: 'quotes', component: Quotes, title: 'Inspiring Quotes' },
  { path: 'products', component: Products, title: 'New Products' },
  { path: 'Contact', component: Contact, title: 'Contact' },
  { path: 'about', component: About, title: 'About' },
  // children: [
   //  { path: 'Page1', component: Page1 },
   //  { path: 'Page2', component: Page2 },
   //  { path: '', redirectTo: 'Page1', pathMatch: 'full'  }
    // ]},  // Default subpage
  { path: 'contact', component: Contact, title: 'Contact Us' },
  { path: 'navbar', component: Navbar },
  { path: '**', redirectTo: '' } // Redirect unknown paths to home
]  
