import toUtf8String from "../../lib/helpers/toUtf8String"
import resolveIpfs from "../../lib/helpers/resolveIpfs"
import NextImage from "../atoms/NextImage"
import { useStore } from "../../lib/helpers/store"

export default function NFTItemCard() {

    const infoData = useStore(state => state.infoData)
    const parsedObjData = useStore(state => state.parsedObjData)

    return (
        <>
            {infoData != 0 && (
                <>
                    <h1 className='text-2xl py-4'>
                        {infoData.items[0].assets[0].name}
                    </h1>
                    <NextImage image={resolveIpfs(toUtf8String(infoData.items[0].additionalRegisters.R9.renderedValue))} />
                    {parsedObjData ? (
                        <table className="table-auto w-full border-collapse border border-slate-400 bg-gray-50 rounded-lg">
                            <thead className='bg-blue-500 text-base font-normal font-mono text-white p-4 text-left'>
                                <tr>
                                    <th className='border border-slate-300 p-2 font-normal uppercase'>
                                        meta
                                    </th>
                                    <th className='border border-slate-300 p-2 font-normal uppercase'>
                                        content
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {parsedObjData && Object.keys(parsedObjData).map(key =>
                                    <tr key={`metaTable-${key}`}>
                                        <td className='border border-slate-300 p-2'>
                                            {key}
                                        </td>
                                        <td className='border border-slate-300 p-2'>
                                            {parsedObjData[key]}
                                        </td>
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
            )}
        </>
    )
}