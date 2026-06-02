export default function Page() {
  return (
    <div className="flex w-full max-w-360">
      <div className="bg-[#FAFAFA] w-1/2">이미지</div>
      <div className="px-13">
        <div className="flex flex-col gap-4.5">
          <h1 className="text-36 leading-7.5">[회원가입]</h1>
          <div className="text-16 leading-24">
            6단계 정보 입력으로 더 정확한 맞춤 추천을 제공해드려요.
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <h2>
            닉네임 입력 <span>(필수)</span>
          </h2>
        </div>
      </div>
    </div>
  )
}
