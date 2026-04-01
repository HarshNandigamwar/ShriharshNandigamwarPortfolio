import Link from "next/link";

export default function PrankPage() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-5">
            <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent text-center">UNDER DEVELOPMENT!</h1>
            <div className="flex flex-wrap justify-center mt-10">
                <Link href="/">
                    <button className="px-8 py-3 bg-black border text-white font-bold rounded-full transition ">Go Back Home</button>
                </Link>
            </div>
        </div>
    );
}
