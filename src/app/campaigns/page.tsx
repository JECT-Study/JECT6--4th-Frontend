import { CampaignList } from './_components/CampaignList'
import Filter from './_components/Filter'

export default function Page() {
  return (
    <div className="mx-auto flex w-full flex-col max-w-300">
      <Filter />
      <CampaignList />
    </div>
  )
}
