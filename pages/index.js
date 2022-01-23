import NFTItemCard from '../components/molecules/NFTItemCard';
import NoEntry from '../components/molecules/NoEntry';
import { useStore } from '../lib/helpers/store';
import Search from '../components/molecules/Search';

export default function Home() {

  const infoData = useStore(state => state.infoData)

  return (
    <div className='w-full justify-center md:items-center flex min-h-screen bg-gray-100 p-4 md:p-12 transition-all duration-300 select-none'>
      <div className='space-y-4'>
        <Search />
        <div className='min-w-1/2 md:max-w-3xl bg-white rounded-2xl p-4 space-y-4 relative flex flex-wrap shadow-lg justify-center select-text'>
          {infoData ? (
            <NFTItemCard />
          ) : (
            <NoEntry />
          )}
        </div>
      </div>
    </div>
  )
}
