import Head from 'next/head'
import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'


export default function Home() {

  const [searchQuery, setSearchQuery] = useState("f40de5cd87fbb077293382c1d9ed5b9197ce4fbc08776a32c383583470c40eef");
  const [infoData, setInfoData] = useState(null);

  const getInfoToken = useCallback(async () => {

    const response = await fetch("https://api.ergoplatform.com/api/v1/boxes/byTokenId/" + searchQuery)
      .catch(e => console.log(e))

    if (response != undefined) {
      console.log(response.status, "response status 1.1")

      if (response.status >= 400 && response.status < 600) {
        setInfoData(null);
        console.log("400 - 600")
      } else if (response.status === 200) {
        response = await response.json()
        setInfoData(response);
      }
    } else {
      setInfoData(null);
    }
  }, [searchQuery])

  const toUtf8String = (hex) => {
    if (!hex) { hex = '' }
    var str = ''
    for (var i = 0; i < hex.length; i += 2) {
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16))
    }
    return str
  }

  const resolveIpfs = (url) => {
    const ipfsPrefix = 'ipfs://'
    if (!url.startsWith(ipfsPrefix)) return url
    else return url.replace(ipfsPrefix, 'https://cloudflare-ipfs.com/ipfs/')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    //console.info(e.target[0].value, "handle submit");
    setSearchQuery(e.target[0].value);
  }

  useEffect(() => {
    getInfoToken(searchQuery);
    // return () => {
    //   getInfoToken(searchQuery);
    // }
  }, [getInfoToken]);
  console.log(searchQuery, "searchQuery")


  return (
    <>
      <Head>
        <title>Ergo NFT Viewer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <div className='w-full justify-center md:items-center flex min-h-screen bg-green-300 p-4 md:p-12 transition-all duration-300 select-none'>
        <div className='space-y-4'>
          <form
            className='min-w-1/2 md:max-w-4xl bg-white rounded-2xl items-center p-4 space-y-4 relative flex flex-wrap shadow-lg'
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
                name="tokenId"
                maxLength={64}
                minLength={64}
                id="tokenId"
                required
                placeholder='paste your ID here …'
                className='w-full h-12 border rounded-lg px-4 text-center text-[13px] overflow-scroll'
              />
            </div>
            <div className='w-full space-x-4 flex '>
              <button
                className='w-full h-12 bg-blue-500 rounded-lg text-white'
                type="submit"
              >
                search
              </button>
            </div>
          </form>

          <div className='min-w-1/2 md:max-w-4xl bg-white rounded-2xl p-4 space-y-4 relative flex flex-wrap shadow-lg justify-center'>
            {infoData ? (
              <>
                <h1>
                  {infoData.items[0].assets[0].name}
                </h1>
                <div className="h-[33.3vh] min-h-96 w-full relative">
                  <Image
                    className="rounded-lg bg-gray-200"
                    src={resolveIpfs(toUtf8String(infoData.items[0].additionalRegisters.R9.renderedValue))}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <p>
                  {toUtf8String(infoData.items[0].additionalRegisters.R5.renderedValue)}
                </p>
              </>
            ) : (
              <>
                <div className='w-full text-left'>
                  There seems to be no NFT with given ID
                </div>
                <div className="overflow-scroll select-text text-center cursor-drag p-4 rounded-lg bg-gray-100 w-32 md:w-auto flex-grow shadow-inner text-[13px]">
                  {searchQuery}
                </div>
                <div className='w-full text-6xl text-center '>
                  🥺
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
