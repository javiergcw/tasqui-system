'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Sidebar } from '@/components/home/Sidebar';
import { Footer, CopyrightSection } from '@/components/home/Footer';
import { ScrollToTopButton } from '@/components/home/ScrollToTopButton';
import { AdminLeadDetailHeroSection } from '@/components/admin/AdminLeadDetailHeroSection';
import { AdminLeadDetailMainSection } from '@/components/admin/AdminLeadDetailMainSection';
import { colorClasses } from '@/lib/colors';
import { getAdminLeadsUseCase } from '@/use-cases';
import type { AdminLeadDetailData } from '@/models/admin/lead.model';

export default function AdminLeadDetailPage() {
  const params = useParams<{ id: string }>();
  const [lead, setLead] = useState<AdminLeadDetailData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const leadId = params?.id;

  useEffect(() => {
    if (!leadId) {
      setError('Identificador de lead no válido.');
      setIsLoading(false);
      return;
    }

    const fetchLead = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getAdminLeadsUseCase.executeById(leadId);
        setLead(data);
      } catch (err) {
        console.error('Error fetching admin lead detail:', err);
        setError('No se pudo cargar la información del lead. Intenta nuevamente.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLead();
  }, [leadId]);

  return (
    <div className={`min-h-screen ${colorClasses.background.gray50}`}>
      <Sidebar />
      <main>
        <AdminLeadDetailHeroSection />
        <AdminLeadDetailMainSection lead={lead} isLoading={isLoading} error={error} />
      </main>
      <Footer />
      <CopyrightSection />
      <ScrollToTopButton />
    </div>
  );
}


