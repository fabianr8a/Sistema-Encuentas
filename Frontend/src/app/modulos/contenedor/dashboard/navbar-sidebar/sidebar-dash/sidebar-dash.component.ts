import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar-dash',
  templateUrl: './sidebar-dash.component.html',
  styleUrls: ['./sidebar-dash.component.css']
})
export class SidebarDashComponent implements OnInit {

  public items: any[] = [
    {
        id: 1,
        ruta: '/inicio',
        icono: 'fas fa-home',
        label: 'Inicio'
    },
    {
        id: 2,
        ruta: '/resultados',
        icono: 'fas fa-chart-area',
        label: 'Análisis de resultados'
    }
]

public itemsAccordion: any[] = [
    {
        id: 1,
        ruta: 'administrador',
        icono: 'fas fa-user-cog',
        label: 'Administrador',
        itemsHijos: [
            {
                ruta: 'administrador/listar-rol',
                label: 'Roles'
            },
            {
              ruta: 'administrador/listar-usuario',
              label: 'Usuarios'
            },
        ]
    },
    {
        id: 2,
        ruta: '/encuestas',
        icono: 'fas fa-book-open',
        label: 'Encuestas',
        itemsHijos: [
            {
                ruta: '/encuestas/crear-encuesta',
                label: 'Crear encuesta'
            },
            {
                ruta: '/encuestas/listar-encuesta',
                label: 'Listar Encuesta'
            }
        ]
    }
]

constructor() { }

ngOnInit(): void {
}

}
