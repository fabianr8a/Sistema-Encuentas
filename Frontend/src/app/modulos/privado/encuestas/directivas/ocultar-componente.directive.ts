import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOcultarComponente]'
})
export class OcultarComponenteDirective {

  @Input()idPregunta!:string
  @HostListener('click')eliminarSeccion(){
    const seccion=document.getElementById(this.idPregunta)
    seccion?.remove()
  }

}
