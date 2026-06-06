export default async function Page({ params }: { params: Promise<{ id: string; mode: string }> }) {
  const { id, mode } = await params
  return (
    <div>
      {mode} / {id}
    </div>
  )
}
