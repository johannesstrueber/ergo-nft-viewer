import Image from "next/image"

export default function NextImage({
    fill = "contain",
    responsive = true,
    image = undefined,
    rounded = true,
    priority = true }) {

    const fillMethods = {
        contain: "contain",
        fill: "fill"
    }

    return (
        <div className='w-full relative'>
            <Image
                className={`${rounded && "rounded-lg"} bg-gray-200`}
                src={image}
                priority={priority}
                width="100%"
                height="100%"
                layout={responsive ? "responsive" : "fill"}
                objectFit={fillMethods[fill]}
            />
        </div>
    )
}
