import { AudiencePageView, audienceMetadata } from '@/components/AudiencePage'
import { audiencePage } from '@/data/audiencePages'

const page = audiencePage('particulier')

export const metadata = audienceMetadata(page)

export default function ParticuliersPage() {
  return <AudiencePageView page={page} />
}
