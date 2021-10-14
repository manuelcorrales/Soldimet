import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICliente, Cliente } from '../cliente.model';
import { ClienteService } from '../service/cliente.service';
import { IPersona } from 'app/entities/persona/persona.model';
import { PersonaService } from 'app/entities/persona/service/persona.service';

@Component({
  selector: 'jhi-cliente-update',
  templateUrl: './cliente-update.component.html',
})
export class ClienteUpdateComponent implements OnInit {
  isSaving = false;

  personasCollection: IPersona[] = [];

  editForm = this.fb.group({
    id: [],
    persona: [null, Validators.required],
  });

  constructor(
    protected clienteService: ClienteService,
    protected personaService: PersonaService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cliente }) => {
      this.updateForm(cliente);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cliente = this.createFromForm();
    if (cliente.id !== undefined) {
      this.subscribeToSaveResponse(this.clienteService.update(cliente));
    } else {
      this.subscribeToSaveResponse(this.clienteService.create(cliente));
    }
  }

  trackPersonaById(index: number, item: IPersona): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICliente>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(cliente: ICliente): void {
    this.editForm.patchValue({
      id: cliente.id,
      persona: cliente.persona,
    });

    this.personasCollection = this.personaService.addPersonaToCollectionIfMissing(this.personasCollection, cliente.persona);
  }

  protected loadRelationshipsOptions(): void {
    this.personaService
      .query({ 'clienteId.specified': 'false' })
      .pipe(map((res: HttpResponse<IPersona[]>) => res.body ?? []))
      .pipe(
        map((personas: IPersona[]) => this.personaService.addPersonaToCollectionIfMissing(personas, this.editForm.get('persona')!.value))
      )
      .subscribe((personas: IPersona[]) => (this.personasCollection = personas));
  }

  protected createFromForm(): ICliente {
    return {
      ...new Cliente(),
      id: this.editForm.get(['id'])!.value,
      persona: this.editForm.get(['persona'])!.value,
    };
  }
}
