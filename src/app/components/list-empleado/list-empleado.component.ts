import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { Empleado } from 'src/app/models/Empleado';
import { MatDialog } from '@angular/material/dialog';
import { MensajeConfirmacionComponent } from '../shared/mensaje-confirmacion/mensaje-confirmacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';

// export interface PeriodicElement {
//   nombre: any;
//   correo: any;
//   telefono: any;
//   sexo: any;
//   fechaIngreso:any;
//   estadoCivil:any;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {nombre:'', correo: '', telefono: '', sexo: '', fechaIngreso: '', estadoCivil: ''},
// ];

@Component({
  selector: 'app-list-empleado',
  templateUrl: './list-empleado.component.html',
  styleUrls: ['./list-empleado.component.css']
})
export class ListEmpleadoComponent implements OnInit, AfterViewInit  {

  displayedColumns: string[] = ['nombre', 'correo', 'telefono', 'estadoCivil', 'fechaIngreso', 'sexo', 'acciones'];
  dataSource : any;
  listEmpleado: Empleado[] = [];


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _empleadoServices: EmpleadoService,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.cargarEmpleados();
    
    //this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  cargarEmpleados() {
    this.listEmpleado = this._empleadoServices.getEmpleados();
    this.dataSource = new MatTableDataSource(this.listEmpleado);
    this.dataSource.paginator = this.paginator;
    //console.log(this.listEmpleado);
    
  }

  eliminarEmpleado(index: number) {

    const dialogRef = this.dialog.open(MensajeConfirmacionComponent, {
      width: '350px',
      data: {mensaje: '¿Esta seguro que desea eliminar el empleado?'},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'aceptar'){
        console.log('The dialog was closed');
        this._empleadoServices.deleteEmpleados(index);
        this.cargarEmpleados();
        this._snackBar.open('Empleado eliminado', '', {
          duration:2300
        });
      }
      
    });
    
  }

}
