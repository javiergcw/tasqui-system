// Servicio para experiencias de empleado

import httpService from '@/utils/http';
import { API_ROUTES } from '@/lib/api-routes';
import type {
  EmployeeExperiencesResponse,
  CreateEmployeeExperienceRequest,
  CreateEmployeeExperienceResponse,
  UpdateEmployeeExperienceRequest,
  UpdateEmployeeExperienceResponse,
} from '@/models/employee/experience.model';

class EmployeeExperienceService {
  async getExperiences(): Promise<EmployeeExperiencesResponse> {
    const response = await httpService.get<EmployeeExperiencesResponse>(
      API_ROUTES.employee.experiences
    );
    return response.data;
  }

  async createExperience(data: CreateEmployeeExperienceRequest): Promise<CreateEmployeeExperienceResponse> {
    const response = await httpService.post<CreateEmployeeExperienceResponse>(
      API_ROUTES.employee.experiences,
      data
    );
    return response.data;
  }

  async updateExperience(id: string, data: UpdateEmployeeExperienceRequest): Promise<UpdateEmployeeExperienceResponse> {
    const response = await httpService.put<UpdateEmployeeExperienceResponse>(
      API_ROUTES.employee.experienceDetail(id),
      data
    );
    return response.data;
  }

  async deleteExperience(id: string): Promise<void> {
    await httpService.delete(API_ROUTES.employee.experienceDetail(id));
  }
}

export default new EmployeeExperienceService();


