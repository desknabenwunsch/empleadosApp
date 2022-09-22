import { Injectable } from '@angular/core';
import { Empleado } from '../models/Empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  listEmpleado: Empleado[] = [
    {
      nombre: 'Manuel',
      correo: 'manuel@mail.com',
      telefono: 2234243232432,
      sexo: 'Masculino',
      estadoCivil: 'Soltero',
      fechaIngreso: new Date()
    },
    {
      nombre: 'Leidy',
      correo: 'jogopi@mail.com',
      telefono: 2234243232432,
      sexo: 'Femenino',
      estadoCivil: 'Soltero',
      fechaIngreso: new Date()
    },
    {
      nombre: 'Ignacio',
      correo: 'nacho@mail.com',
      telefono: 2234243232432,
      sexo: 'Masculino',
      estadoCivil: 'Casado',
      fechaIngreso: new Date()
    }
  ]

  constructor() { }

  getEmpleados(){
    return this.listEmpleado.slice();
  }

  deleteEmpleados(index: number){
    this.listEmpleado.splice(index,1)
  }

  agregarEmpleado(empleado : Empleado){
    this.listEmpleado.unshift(empleado)
  }

  getEdicionEmpleado(index: number) {
    return this.listEmpleado[index];
  }

  editEmpleado(empleado: Empleado, idEmpleado: number){
    this.listEmpleado[idEmpleado].nombre = empleado.nombre;
    this.listEmpleado[idEmpleado].correo = empleado.correo;
    this.listEmpleado[idEmpleado].telefono = empleado.telefono;
    this.listEmpleado[idEmpleado].fechaIngreso = empleado.fechaIngreso;
    this.listEmpleado[idEmpleado].estadoCivil = empleado.estadoCivil;
    this.listEmpleado[idEmpleado].sexo = empleado.sexo;
  }
}
