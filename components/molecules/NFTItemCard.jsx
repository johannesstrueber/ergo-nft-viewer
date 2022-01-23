import toUtf8String from "../../lib/helpers/toUtf8String"
import resolveIpfs from "../../lib/helpers/resolveIpfs"
import NextImage from "../atoms/NextImage"
import { useStore } from "../../lib/helpers/store"

export default function NFTItemCard() {

    const infoData = useStore(state => state.infoData)
    const parsedObjData = useStore(state => state.parsedObjData)

    return (
        <>
            {infoData && (
                <>
                    <h1 className='text-2xl py-4'>
                        {infoData.items[0].assets[0].name}
                    </h1>
                    <NextImage image={resolveIpfs(toUtf8String(infoData.items[0].additionalRegisters.R9.renderedValue))} />
                    {parsedObjData ? (
                        <div>
                            <table className="table-auto w-full border-collapse border-b border-gray-100 ">
                                <thead className='bg-blue-500 font-mono text-white text-left uppercase'>
                                    <tr>
                                        <th className='rounded-tl-lg p-3 font-normal'>
                                            meta
                                        </th>
                                        <th className='rounded-tr-lg p-3 font-normal'>
                                            content
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {parsedObjData && Object.keys(parsedObjData).map((key, i) =>
                                        <tr key={`metaTable-${key}`} className={`${i & 1 ? "bg-white" : "bg-gray-100"} align-top`}>
                                            <td className='border-x border-gray-100 p-3'>
                                                {key}
                                            </td>
                                            <td className='border-x border-gray-100 p-3'>
                                                {parsedObjData[key]}
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <div className="w-full h-10 bg-gray-100 rounded-b-lg" />
                        </div>
                    ) :
                        (
                            <p>
                                {toUtf8String(infoData.items[0].additionalRegisters.R5.renderedValue)}
                            </p>
                        )}
                </>
            )
            }
        </>
    )
}