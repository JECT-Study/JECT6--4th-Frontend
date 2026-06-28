import type { Campaign } from '@/entities/campaign'

import { AnalysisSectionContent } from './AnalysisSectionContent'

interface AnalysisSectionProps {
  previewCampaigns: Campaign[]
}

export default function AnalysisSection({ previewCampaigns }: AnalysisSectionProps) {
  return <AnalysisSectionContent previewCampaigns={previewCampaigns} />
}
