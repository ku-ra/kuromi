import Link from 'next/link';

const LogoutButton = () => {
    return (
        <Link href="/login">
            <button className="bg-transparent hover:bg-pink-500 text-pink-700 font-semibold hover:text-white py-2 px-4 border border-pink-500 hover:border-transparent rounded">
                Sign in
            </button>
        </Link>
    );
}

export default LogoutButton;