// Servicio para habilidades del empleado

import httpService from '@/utils/http';
import { API_ROUTES } from '@/lib/api-routes';
import type {
  EmployeeSkillsResponse,
  EmployeeSkillsUpsertRequest,
  EmployeeSkillsUpsertResponse,
} from '@/models/employee/employee-skills.model';

export class EmployeeSkillsService {
  async getSkills(): Promise<EmployeeSkillsResponse> {
    try {
      const response = await httpService.get<EmployeeSkillsResponse>(
        API_ROUTES.employee.skills
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching employee skills:', error);
      throw error;
    }
  }

  async saveSkills(payload: EmployeeSkillsUpsertRequest): Promise<EmployeeSkillsUpsertResponse> {
    try {
      const response = await httpService.post<EmployeeSkillsUpsertResponse>(
        API_ROUTES.employee.skills,
        payload
      );
      return response.data;
    } catch (error) {
      console.error('Error saving employee skills:', error);
      throw error;
    }
  }

  async deleteSkillSubcategory(subcategoryId: string): Promise<void> {
    try {
      await httpService.delete(
        API_ROUTES.employee.skillSubcategoryDetail(subcategoryId)
      );
    } catch (error) {
      console.error('Error deleting employee skill subcategory:', error);
      throw error;
    }
  }

  async deleteSkillCategory(categoryId: string): Promise<void> {
    try {
      await httpService.delete(
        API_ROUTES.employee.skillCategoryDetail(categoryId)
      );
    } catch (error) {
      console.error('Error deleting employee skill category:', error);
      throw error;
    }
  }
}

export default new EmployeeSkillsService();


