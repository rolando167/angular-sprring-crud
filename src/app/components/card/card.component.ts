import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CardModel } from 'src/app/models/card-mode';
import { CardService } from 'src/app/services/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  modalClass: string = 'hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full';
  muestraModal: boolean = false;
  isUpdate: boolean = false;

  listCards : CardModel[] = [];

  formCard : FormGroup = new FormGroup({});

  constructor(private cardService: CardService) { }

  ngOnInit(): void {
    this.listarCards();
    this.crearFormlario();
  }

  listarCards() : void {
    this.cardService.getCards().subscribe(
      resp => {
        this.listCards = resp;
      }
    );
  }

  crearFormlario() : void {
    this.formCard = new FormGroup({
      id_card: new FormControl(''),
      name: new FormControl(''),
      number: new FormControl(''),
      type: new FormControl(''),
      cvv: new FormControl(''),
      status: new FormControl('1'),
      created_at: new FormControl(''),
    });
  }

  mostrarModal ( ) : void{
    if(!this.modalClass.includes(" md:h-full flex")){
      this.muestraModal = true;
      this.modalClass = 'overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full flex';
    }else{
      this.muestraModal = false;
      this.modalClass = 'hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full';
    }
  }

  crearCard() : void{
    this.isUpdate = false;
    this.formCard.reset();
    this.mostrarModal();
  }

  actualizarCard(item: any): void{
    this.isUpdate = true;
    this.formCard.controls['id_card'].setValue(item.id_card);
    this.formCard.controls['name'].setValue(item.name);
    this.formCard.controls['number'].setValue(item.number);
    this.formCard.controls['type'].setValue(item.type);
    this.formCard.controls['cvv'].setValue(item.cvv);
    this.formCard.controls['created_at'].setValue(item.created_at);
    this.mostrarModal();
  }



  saveOrUpdate():void{
    if(!this.isUpdate){
      this.save();
    }else{
      this.update();
    }
  }

  save() : void{
    this.formCard.controls['status'].setValue('1');
    this.formCard.controls['id_card'].setValue('0');
    this.cardService.saveCard(this.formCard.value).subscribe(resp =>{
      if(resp){
        this.listarCards();
        this.formCard.reset();
      }
    });
  }


  update() : void{
    this.cardService.updateCard(this.formCard.value).subscribe(resp =>{
      if(resp){
        this.listarCards();
        this.formCard.reset();
      }
    });
  }

  deleteCard(id: any) : void{
    this.cardService.deleteCard(id).subscribe(resp =>{
      if(resp){
        this.listarCards();
      }
    });
  }

}
