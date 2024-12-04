import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Chart } from '@antv/g2';
import { SharedModule } from '../../../shared/shared.module';
interface ReporteVentas {
  fecha_inicio: string;
  fecha_fin: string;
  ventas_totales: number;
  productos_mas_vendidos: { nombre: string; cantidad_vendida: number }[];
  ingresos_por_categoria: { categoria: string; ingresos: number }[];
}
@Component({
  selector: 'app-report',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent implements OnInit { 
  reporteVentas: ReporteVentas = {
    fecha_inicio: '2024-01-01',
    fecha_fin: '2024-11-04',
    ventas_totales: 100000.00,
    productos_mas_vendidos: [
      { nombre: 'Pasta con Pesto', cantidad_vendida: 500 },
      { nombre: 'Salsa de Tomate', cantidad_vendida: 300 }
    ],
    ingresos_por_categoria: [
      { categoria: 'Alimentos', ingresos: 80000.00 },
      { categoria: 'Bebidas', ingresos: 20000.00 }
    ]
  };

  @ViewChild('ingresosChart', { static: true }) ingresosChartContainer!: ElementRef;

  constructor() {}

  ngOnInit(): void {
    // Initialize data if needed
  }

  ngAfterViewInit(): void {
    this.initIngresosChart();
  }

  private initIngresosChart(): void {
    const chart = new Chart({
      container: this.ingresosChartContainer.nativeElement,
      autoFit: true,
      height: 300,
    });

    chart.data(this.reporteVentas.ingresos_por_categoria);

    chart
      .interval()
      .encode('x', 'categoria')
      .encode('y', 'ingresos')
      .encode('color', 'categoria');

    // Configure labels if your version supports .label with one argument only
    chart.label('ingresos'); // Remove extra config object

    chart.axis('categoria', {
      title: null,
      label: {
        offset: 12,
      },
    });

    chart.axis('ingresos', {
      title: {
        text: 'Ingresos',
        style: {
          fontWeight: 'bold',
          fontSize: 12,
          fill: '#595959',
        },
      },
    });

    chart.render();
  }
}