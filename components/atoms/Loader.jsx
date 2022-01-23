import { useStore } from "../../lib/helpers/store"

export default function Loader() {
    const isLoading = useStore(state => state.isLoading)
    return (
        <>
            {isLoading &&
                <div className="w-full flex-grow h-24 justify-center items-center cursor-wait text-center py-4 text-2xl ">
                    Loading…
                </div>
            }
        </>
    )
}