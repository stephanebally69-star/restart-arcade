import { AudiencePageView, audienceMetadata } from '@/components/AudiencePage'
import { audiencePage } from '@/data/audiencePages'

const page = audiencePage('bar-commerce')

export const metadata = audienceMetadata(page)

export default function BarsCommercesPage() {
  return <AudiencePageView page={page} />
}
