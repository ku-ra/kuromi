import UserIcon from '../static/icons/fi-rr-user.svg'
import UploadIcon from '../static/icons/fi-rr-upload.svg'
import SearchIcon from '../static/icons/fi-rr-search.svg'
import HelpIcon from '../static/icons/fi-rr-interrogation.svg'
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../context/user.context';
import Link from 'next/link';

//import Link from 'next/link'

const Header = () => {
	const router = useRouter();
	const { user } = useContext(UserContext);

    return (
		<div className="min-w-full w-full h-14 fixed border-b bg-white">
			<div className="flex min-w-full min-h-full flex-row items-center justify-around ">
				<Link href="/">
					<h1 className="font-bold text-lg cursor-pointer">Kuromi</h1>
				</Link>
				<div>
					<div className="relative rounded-md shadow-sm">
						<div className="absolute flex items-center pointer-events-none justify-center h-9 px-3">
							<SearchIcon className="h-4"></SearchIcon>
						</div>
						<input
							type="text"
							name="search"
							id="search"
							className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
							placeholder="Search"
						/>
					</div>
				</div>
				<div>
					<button className="py-4 px-4 rounded inline-flex items-center w-14">
						<UserIcon className="w-full" onClick={() => router.push(`/${user}`)}></UserIcon>
					</button>
					<button className="py-4 px-4 rounded inline-flex items-center w-14">
						<UploadIcon className="w-full"></UploadIcon>
					</button>
					<button className="py-4 px-4 rounded inline-flex items-center w-14">
						<HelpIcon className="w-full"></HelpIcon>
					</button>
				</div>
			</div>
		</div>
    )
}

export default Header;