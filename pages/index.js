import Head from 'next/head'
import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
import { render } from 'react-dom';


export default function Home() {

  const [searchQuery, setSearchQuery] = useState("f40de5cd87fbb077293382c1d9ed5b9197ce4fbc08776a32c383583470c40eef");
  const [infoData, setInfoData] = useState(null);
  const [parsedObjData, setParsedObjData] = useState(null)

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
        setParsedObjData(JSON.parse(toUtf8String(response.items[0].additionalRegisters.R5.renderedValue)));
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
    setSearchQuery(e.target[0].value)
    setParsedObjData(undefined);
    setInfoData(undefined);
  }

  useEffect(() => {
    getInfoToken(searchQuery);
    // return () => {
    //   getInfoToken(null);
    // }
  }, [getInfoToken]);

  //console.log(infoData && infoData.items[0], "infoData")
  console.log(parsedObjData && parsedObjData, "parsedObjData")


  return (
    <>
      <Head>
        <title>Ergo NFT Viewer</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </Head>
      <div className='w-full justify-center md:items-center flex min-h-screen bg-gray-100 p-4 md:p-12 transition-all duration-300 select-none'>
        <div className='space-y-4'>
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
                name="tokenId"
                maxLength={64}
                minLength={64}
                id="tokenId"
                required
                placeholder='paste your ID here …'
                className='w-full h-12 border rounded-lg px-4 text-center text-[13px] overflow-scroll '
              />
            </div>
            <div className='w-full space-x-4 flex '>
              <button
                className='w-full h-12 bg-blue-500 hover:bg-blue-400 transition-all rounded-lg text-white'
                type="submit"
              >
                search
              </button>
            </div>
          </form>

          <div className='min-w-1/2 md:max-w-3xl bg-white rounded-2xl p-4 space-y-4 relative flex flex-wrap shadow-lg justify-center select-text'>
            {infoData ? (
              <>
                <h1 className='text-2xl py-4'>
                  {infoData.items[0].assets[0].name}
                </h1>
                <div className='w-full relative'>
                  <Image
                    className="rounded-lg bg-gray-200"
                    src={resolveIpfs(toUtf8String(infoData.items[0].additionalRegisters.R9.renderedValue))}
                    width="100%" height="100%" layout="responsive" objectFit="contain"
                  />
                </div>
                {parsedObjData ? (
                  <table className="table-auto w-full border-collapse border border-slate-400 bg-gray-50   rounded-lg">
                    <thead className='bg-blue-500 text-base font-normal font-mono text-white p-4 text-left'>
                      <tr>
                        <th className='border border-slate-300 p-2 font-normal uppercase'>meta</th>
                        <th className='border border-slate-300 p-2 font-normal uppercase'>content</th>
                      </tr>
                    </thead>
                    <tbody>
                      {parsedObjData && Object.keys(parsedObjData).map(key =>
                        <tr key={`metatable-${key}`}>
                          <td className='border border-slate-300 p-2'>{key}</td>
                          <td className='border border-slate-300 p-2'>{parsedObjData[key]}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                ) :
                  (
                    <p>
                      {toUtf8String(infoData.items[0].additionalRegisters.R5.renderedValue)}
                    </p>
                  )}
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
