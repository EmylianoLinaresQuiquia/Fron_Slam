import { Component,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  totalOrders: number;
  totalSpent: string;
  status: string;
}
@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent {

  isVisible = false;


  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  clients: Client[] = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', phone: '+1234567890', location: 'Ciudadejemplo', totalOrders: 5, totalSpent: '500', status: 'Active' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+1234567891', location: 'Ciudadejemplo', totalOrders: 3, totalSpent: '300', status: 'Inactive' },
    // other clients...
  ];

  newClient: Partial<Client> = {
    name: '',
    email: '',
    phone: '',
    location: '',
    totalOrders: 0,
    totalSpent: '0',
    status: 'Active'
  };

  sortColumn: string = 'name';
  sortDirection: string = 'asc';
  filterStatus: string = 'All';
  searchQuery: string = '';
  isAddClientModalVisible = false;
  
  filteredClients: Client[] = [...this.clients];

  constructor() {
    this.applyFilters();
  }

  applyFilters() {
    this.filteredClients = this.clients.filter(client => {
      const matchesQuery = client.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || client.email.toLowerCase().includes(this.searchQuery.toLowerCase());
      const matchesStatus = this.filterStatus === 'All' || client.status === this.filterStatus;
      return matchesQuery && matchesStatus;
    });
  }
  
  toggleSort(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  showAddClientModal() {
    this.isAddClientModalVisible = true;
  }

  handleAddClientCancel() {
    this.isAddClientModalVisible = false;
  }

  addClient(clientData: Partial<Client>) {
    const newId = (this.clients.length ? parseInt(this.clients[this.clients.length - 1].id) + 1 : 1).toString();
    const newClient: Client = { id: newId, ...clientData } as Client;
    this.clients.push(newClient);
    this.isAddClientModalVisible = false;
    this.resetNewClient();
  }

  resetNewClient() {
    this.newClient = {
      name: '',
      email: '',
      phone: '',
      location: '',
      totalOrders: 0,
      totalSpent: '0',
      status: 'Active'
    };
  }

  isFormValid() {
    return this.newClient.name && this.newClient.email && this.newClient.phone;
  }
}
