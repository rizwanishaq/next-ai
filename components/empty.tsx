import Image from "next/image"

const Empty = () => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
      <div className="relative h-72 w-72">
        <Image alt="Empty" fill src="/empty.png"/>
      </div>
    </div>
  )
}

export default Empty