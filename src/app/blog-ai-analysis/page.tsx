import { BlogAnalysisDashboard } from './_components/BlogAnalysisDashboard'
import { mockBlogAnalysis, mockPopularBloggers, mockRecommendations } from './blog-ai-analysis.mock'

export default function BlogAiAnalysisPage() {
  return (
    <BlogAnalysisDashboard
      analysis={mockBlogAnalysis}
      bloggers={mockPopularBloggers.bloggers}
      recommendations={mockRecommendations.campaigns}
    />
  )
}
