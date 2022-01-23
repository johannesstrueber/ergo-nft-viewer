import { useStore } from "../../lib/helpers/store"

export default function NoEntry() {
    const searchQuery = useStore(state => state.searchQuery)
    const isLoading = useStore(state => state.isLoading)
    return (
        <>
            {!isLoading &&
                <>
                    <div className='w-full text-left'>
                        There seems to be no NFT with given ID
                    </div>
                    <div className="overflow-scroll select-text text-center cursor-drag p-4 rounded-lg bg-gray-100 w-32 md:w-auto flex-grow shadow-inner text-[13px]">
                        {searchQuery}
                    </div>
                    <div className='w-full  text-center  text-2xl'>
                        <span className="text-4xl">
                            🥺
                        </span><br />
                        👉 👈
                    </div>
                </>
            }
        </>
    )
}
