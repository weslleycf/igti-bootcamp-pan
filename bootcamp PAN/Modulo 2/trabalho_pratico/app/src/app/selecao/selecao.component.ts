import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-selecao',
  templateUrl: './selecao.component.html',
  styleUrls: ['./selecao.component.css']
})
export class SelecaoComponent {

@Input() titulo: string = ""

@Input() opcoes: string[] = []

@Input() escolhaAte: number = 0

selectedTotal: number = 0


selectedTotalChange(e:any):void{
    e.currentTarget.checked ? this.selectedTotal++ : this.selectedTotal--
}

}
