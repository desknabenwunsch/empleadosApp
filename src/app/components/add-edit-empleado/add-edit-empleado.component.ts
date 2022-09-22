import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_RADIO_DEFAULT_OPTIONS } from '@angular/material/radio';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from 'src/app/models/Empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-add-edit-empleado',
  templateUrl: './add-edit-empleado.component.html',
  styleUrls: ['./add-edit-empleado.component.css'],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: { color: 'primary' },
  }]
})
export class AddEditEmpleadoComponent implements OnInit {

  estadoCiviles: Food[] = [
    { value: 'Soltero', viewValue: 'Soltero' },
    { value: 'Casado', viewValue: 'Casado' },
    { value: 'Divorciado', viewValue: 'Divorciado' },
    { value: 'Viudo', viewValue: 'Viudo' }
  ];

  idEmpleado: any;
  accion = 'Crear';

  myForm: FormGroup;

  constructor(private fb: FormBuilder,
    private _empleadoService: EmpleadoService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private aRoute: ActivatedRoute) {
    this.myForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(30)]],
      correo: ['', [Validators.required, Validators.email]],
      fechaIngreso: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      estadoCivil: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
    });

    this.idEmpleado = this.aRoute.snapshot.params['id'];
  }

  ngOnInit(): void {
    if (this.idEmpleado !== undefined) {
      this.accion = 'Editar';
      this.editarEmpleado();
    }
  }

  editarEmpleado() {
    const EMPLEADO: Empleado = this._empleadoService.getEdicionEmpleado(this.idEmpleado);
    console.log(EMPLEADO);
    this.myForm.patchValue({
      nombre: EMPLEADO.nombre,
      correo: EMPLEADO.correo,
      telefono: EMPLEADO.telefono,
      fechaIngreso: EMPLEADO.fechaIngreso,
      estadoCivil: EMPLEADO.estadoCivil,
      sexo: EMPLEADO.sexo
    })
  }

  guardarEmpleado() {

    console.log(this.myForm);

    const EMPLEADO: Empleado = {
      nombre: this.myForm.get('nombre')?.value,
      fechaIngreso: this.myForm.get('fechaIngreso')?.value,
      estadoCivil: this.myForm.get('estadoCivil')?.value,
      sexo: this.myForm.get('sexo')?.value,
      telefono: this.myForm.get('telefono')?.value,
      correo: this.myForm.get('correo')?.value,
    }

    if(this.idEmpleado != undefined){
      this.updateEmpleado(EMPLEADO);
    } else {
      this.addEmpleado(EMPLEADO)
    }    
  }

  updateEmpleado(empleado: Empleado){
    this._empleadoService.editEmpleado(empleado, this.idEmpleado);
    this._snackBar.open('Empleado actualizado con éxito', '', {
      duration: 2300
    });
    this.router.navigate(['/']);

  }

  addEmpleado(empleado : Empleado){
    this._empleadoService.agregarEmpleado(empleado);
    this._snackBar.open('Empleado registrado con éxito', '', {
      duration: 2300
    });
    this.router.navigate(['/']);
  }
}
