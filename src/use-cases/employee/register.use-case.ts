// Caso de uso para el registro de empleados

import employeeRegisterService from '@/services/employee/register.service';
import type {
  EmployeeRegisterRequest,
  EmployeeRegisterResponse,
} from '@/models/employee/register.model';

export class EmployeeRegisterUseCase {
  async execute(
    data: EmployeeRegisterRequest
  ): Promise<EmployeeRegisterResponse> {
    try {
      // Validaciones básicas
      this.validateData(data);

      // Registrar empleado
      const result = await employeeRegisterService.register(data);

      return result;
    } catch (error) {
      console.error('Error in employee register use case:', error);
      throw error;
    }
  }

  private validateData(data: EmployeeRegisterRequest): void {
    if (!data.email || !this.isValidEmail(data.email)) {
      throw new Error('Email inválido');
    }

    if (!data.password || data.password.length < 8) {
      throw new Error('La contraseña debe tener al menos 8 caracteres');
    }

    if (!data.employee_first_name || !data.employee_last_name) {
      throw new Error('Nombre y apellido son requeridos');
    }

    if (!data.employee_location) {
      throw new Error('La ubicación es requerida');
    }

    if (data.role !== 'EMPLOYEE') {
      throw new Error('El rol debe ser EMPLOYEE');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

export default new EmployeeRegisterUseCase();

