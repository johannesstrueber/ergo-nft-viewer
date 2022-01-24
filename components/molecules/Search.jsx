import { useStore } from "../../lib/helpers/store"
import { useEffect, useCallback } from "react";
import toUtf8String from "../../lib/helpers/toUtf8String";

export default function Search() {
    const searchQuery = useStore(state => state.searchQuery)

    const setSearchQuery = useStore(state => state.setSearchQuery)
    const setInfoData = useStore(state => state.setInfoData)
    const setParsedObjData = useStore(state => state.setParsedObjData)

    const setIsLoading = useStore(state => state.setIsLoading)

    const handleSubmit = (e) => {
        e.preventDefault()
        setSearchQuery(e.target[0].value)
        setParsedObjData(undefined);
        setInfoData(undefined);
    }

    const getInfoToken = useCallback(async () => {
        try {
            setIsLoading(true)
            let response = await fetch("https://api.ergoplatform.com/api/v1/boxes/byTokenId/" + searchQuery)
            if (response != undefined) {
                if (response.status >= 400 && response.status < 600) {
                    setInfoData(undefined);
                    setIsLoading(false);
                } else if (response.status === 200) {
                    response = await response.json()
                    setInfoData(response);
                    setIsLoading(false);
                    try {
                        setParsedObjData(JSON.parse(toUtf8String(response.items[0].additionalRegisters.R5.renderedValue)));
                    } catch (e) {
                        setParsedObjData(undefined);
                    }
                }
            } else {
                setInfoData(undefined);
                setIsLoading(false)
            }
        }
        catch (e) {
            setIsLoading(false)
        }
    }, [searchQuery])

    useEffect(() => {
        getInfoToken(searchQuery);
    }, [getInfoToken]);



    return (
        <form
            className='min-w-1/2 md:max-w-3xl bg-white rounded-2xl items-center p-4 space-y-4 relative flex flex-wrap shadow-lg'
            onSubmit={handleSubmit}
        >
            <label
                className="whitespace-nowrap w-full"
                htmlFor="tokenId">
                Token-ID
            </label>
            <div className='w-full space-x-4 flex'>
                <input
                    type="text"
                    spellCheck={false}
                    name="tokenId"
                    maxLength={64}
                    minLength={64}
                    id="tokenId"
                    required
                    placeholder='paste your ID here …'
                    className='w-full h-12 border rounded-lg px-4 text-center text-[13px] overflow-scroll'
                />
            </div>
            <div className='w-full space-x-4 flex'>
                <button
                    className='w-full h-12 bg-blue-500 hover:bg-blue-400 transition-all rounded-lg text-white'
                    type="submit"
                >
                    search
                </button>
            </div>
        </form>
    )
}