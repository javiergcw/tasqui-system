// Caso de uso para datos maestros completos de trabajos

import jobMasterDataCompleteService from '@/services/master/job-master-data-complete.service';
import type { JobMasterDataCompleteResponse } from '@/models/master/job-master-data-complete.model';

export class JobMasterDataCompleteUseCase {
  async execute(): Promise<JobMasterDataCompleteResponse> {
    try {
      const result = await jobMasterDataCompleteService.getJobMasterDataComplete();
      return result;
    } catch (error) {
      console.error('Error in job master data complete use case:', error);
      throw error;
    }
  }
}

export default new JobMasterDataCompleteUseCase();

