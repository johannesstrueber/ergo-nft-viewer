import create from 'zustand'

export const useStore = create(set => ({
    searchQuery: "f40de5cd87fbb077293382c1d9ed5b9197ce4fbc08776a32c383583470c40eef",
    setSearchQuery: (input) => set(state => ({ searchQuery: input })),

    infoData: undefined,
    setInfoData: (input) => set(state => ({ infoData: input })),

    parsedObjData: undefined,
    setParsedObjData: (input) => set(state => ({ parsedObjData: input })),

    isLoading: true,
    setIsLoading: (input) => set(state => ({ isLoading: input })),
}))