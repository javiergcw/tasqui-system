// Caso de uso para obtener habilidades del empleado

import employeeSkillsService from '@/services/employee/skills.service';
import type {
  EmployeeSkillsResponse,
  EmployeeSkillsUpsertRequest,
  EmployeeSkillsUpsertResponse,
} from '@/models/employee/employee-skills.model';

export class EmployeeSkillsUseCase {
  async execute(): Promise<EmployeeSkillsResponse> {
    try {
      const result = await employeeSkillsService.getSkills();
      return result;
    } catch (error) {
      console.error('Error in employee skills use case:', error);
      throw error;
    }
  }

  async save(payload: EmployeeSkillsUpsertRequest): Promise<EmployeeSkillsUpsertResponse> {
    try {
      const result = await employeeSkillsService.saveSkills(payload);
      return result;
    } catch (error) {
      console.error('Error saving employee skills in use case:', error);
      throw error;
    }
  }

  async deleteSubcategory(subcategoryId: string): Promise<void> {
    try {
      await employeeSkillsService.deleteSkillSubcategory(subcategoryId);
    } catch (error) {
      console.error('Error deleting employee skill subcategory in use case:', error);
      throw error;
    }
  }

  async deleteCategory(categoryId: string): Promise<void> {
    try {
      await employeeSkillsService.deleteSkillCategory(categoryId);
    } catch (error) {
      console.error('Error deleting employee skill category in use case:', error);
      throw error;
    }
  }
}

export default new EmployeeSkillsUseCase();


