import logo from "../assets/logo3.png"
import { HiOutlineDotsVertical } from "react-icons/hi"
import { WiMoonAltThirdQuarter } from "react-icons/wi"
import { FaCookieBite } from "react-icons/fa"

export function Header() {
    return (
        <header className="bg-slate-50 justify-between flex p-4 fixed w-full shadow-2xl">
            <div className="flex items-center space-x-1">
                <img width={100} src={logo} alt="logo" />
                <span className="text-blue-800 text-2xl font-bold">
                    <HiOutlineDotsVertical />
                </span>
            </div>

            <div className="flex items-center space-x-4">
                <div className="space-x-2 flex items-center">
                    <span className="text-blue-800 text-xl font-bold">
                        <FaCookieBite />
                    </span>
                    <span className="text-blue-800 text-2xl font-bold">
                        <WiMoonAltThirdQuarter />
                    </span>
                </div>
                <button className="text-white bg-blue-800 rounded-3xl px-4 py-2">Acesso</button>
            </div>
        </header>
    )
}