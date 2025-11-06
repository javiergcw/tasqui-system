// Servicio para datos maestros completos de trabajos

import httpService from '@/utils/http';
import { API_ROUTES } from '@/lib/api-routes';
import type { JobMasterDataCompleteResponse } from '@/models/master/job-master-data-complete.model';

export class JobMasterDataCompleteService {
  async getJobMasterDataComplete(): Promise<JobMasterDataCompleteResponse> {
    try {
      const response = await httpService.get<JobMasterDataCompleteResponse>(
        API_ROUTES.master.jobMasterDataComplete
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching job master data complete:', error);
      throw error;
    }
  }
}

export default new JobMasterDataCompleteService();

