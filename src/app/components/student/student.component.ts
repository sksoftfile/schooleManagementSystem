import { Component,AfterViewInit } from '@angular/core';
declare var bootstrap: any;

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})


export class StudentComponent implements AfterViewInit {

  ngAfterViewInit() {
    document.querySelectorAll('.sidebar .nav-link').forEach((element: any) => {
      element.addEventListener('click', (e: any) => {
        let nextEl = element.nextElementSibling;
        let parentEl = element.parentElement;

        if (nextEl) {
          e.preventDefault();
          let mycollapse = new bootstrap.Collapse(nextEl);

          if (nextEl.classList.contains('show')) {
            mycollapse.hide();
          } else {
            mycollapse.show();
            // Find other submenus with class=show
            let opened_submenu = parentEl.parentElement.querySelector('.submenu.show');
            // If it exists, then close all of them
            if (opened_submenu) {
              new bootstrap.Collapse(opened_submenu);
            }
          }
        }
      });
    });
  }
}

