import NFTItemCard from '../components/molecules/NFTItemCard';
import NoEntry from '../components/molecules/NoEntry';
import { useStore } from '../lib/helpers/store';
import Search from '../components/molecules/Search';
import Loader from '../components/atoms/Loader';

export default function Home() {

  const infoData = useStore(state => state.infoData)

  return (
    <div className='w-full justify-start md:items-start flex min-h-screen bg-gray-100 p-4 md:p-12 transition-all duration-300 select-none'>
      <div className='space-y-4'>
        <Search />
        <div className=' md:w-full flex-grow  md:max-w-2xl bg-white rounded-2xl p-4 space-y-4 relative flex flex-wrap shadow-lg justify-center select-text'>
          <Loader />
          {infoData && infoData.items[0] ? (
            <NFTItemCard />
          ) : (
            <NoEntry />
          )}
        </div>
      </div>
    </div >
  )
}
