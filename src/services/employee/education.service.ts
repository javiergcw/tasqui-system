// Servicio para educaciones de empleado

import httpService from '@/utils/http';
import { API_ROUTES } from '@/lib/api-routes';
import type {
  EmployeeEducationsResponse,
  CreateEmployeeEducationRequest,
  CreateEmployeeEducationResponse,
  UpdateEmployeeEducationRequest,
  UpdateEmployeeEducationResponse,
} from '@/models/employee/education.model';

class EmployeeEducationService {
  async getEducations(): Promise<EmployeeEducationsResponse> {
    const response = await httpService.get<EmployeeEducationsResponse>(
      API_ROUTES.employee.educations
    );
    return response.data;
  }

  async createEducation(data: CreateEmployeeEducationRequest): Promise<CreateEmployeeEducationResponse> {
    const response = await httpService.post<CreateEmployeeEducationResponse>(
      API_ROUTES.employee.educations,
      data
    );
    return response.data;
  }

  async updateEducation(id: string, data: UpdateEmployeeEducationRequest): Promise<UpdateEmployeeEducationResponse> {
    const response = await httpService.put<UpdateEmployeeEducationResponse>(
      API_ROUTES.employee.educationDetail(id),
      data
    );
    return response.data;
  }

  async deleteEducation(id: string): Promise<void> {
    await httpService.delete(API_ROUTES.employee.educationDetail(id));
  }
}

export default new EmployeeEducationService();


