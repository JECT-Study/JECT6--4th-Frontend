import Details from './_components/Details'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <div className="mx-auto flex w-full max-w-300 flex-col gap-8 px-5 md:px-8 lg:px-0">
      <Details id={id} />
      <div></div>
    </div>
  )
}
