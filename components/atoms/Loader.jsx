import { useStore } from "../../lib/helpers/store"

export default function Loader() {
    const isLoading = useStore(state => state.isLoading)
    return (
        <>
            {isLoading &&
                <div className="w-full md:w-screen relative flex-grow h-24 justify-center flex items-center cursor-wait text-center py-4 text-2xl ">
                    Loading…
                </div>
            }
        </>
    )
}