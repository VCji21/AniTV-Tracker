import { NavLink } from 'react-router-dom'

/* --- Second nav for page rendering --- */
const NavSec = () => {
    return (
        <nav className="w-full pt-2 bg-zinc-900 border-b border-zinc-800">
            <div className="max-w-full mx-auto px-4">
                <ul className='list-none flex items-center justify-around h-12'>
                    <li>
                        <NavLink to="/explore" className={({ isActive }) => `flex items-center justify-center gap-3 p-2 rounded-lg transition-all ${isActive ? 'bg-red-600' : 'hover:bg-gray-700'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20">
                                <path fill="white" d="M541.9 139.5C546.4 127.7 543.6 114.3 534.7 105.4C525.8 96.5 512.4 93.6 500.6 98.2L84.6 258.2C71.9 263 63.7 275.2 64 288.7C64.3 302.2 73.1 314.1 85.9 318.3L262.7 377.2L321.6 554C325.9 566.8 337.7 575.6 351.2 575.9C364.7 576.2 376.9 568 381.8 555.4L541.8 139.4z" />
                            </svg>

                            <span className='text-white'>Explore</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/list" className={({ isActive }) => `flex items-center justify-center gap-3 p-2 rounded-lg transition-all ${isActive ? 'bg-red-600' : 'hover:bg-gray-700'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20">
                                <path fill="white" d="M112 208C138.5 208 160 186.5 160 160C160 133.5 138.5 112 112 112C85.5 112 64 133.5 64 160C64 186.5 85.5 208 112 208zM256 128C238.3 128 224 142.3 224 160C224 177.7 238.3 192 256 192L544 192C561.7 192 576 177.7 576 160C576 142.3 561.7 128 544 128L256 128zM256 288C238.3 288 224 302.3 224 320C224 337.7 238.3 352 256 352L544 352C561.7 352 576 337.7 576 320C576 302.3 561.7 288 544 288L256 288zM256 448C238.3 448 224 462.3 224 480C224 497.7 238.3 512 256 512L544 512C561.7 512 576 497.7 576 480C576 462.3 561.7 448 544 448L256 448zM112 528C138.5 528 160 506.5 160 480C160 453.5 138.5 432 112 432C85.5 432 64 453.5 64 480C64 506.5 85.5 528 112 528zM160 320C160 293.5 138.5 272 112 272C85.5 272 64 293.5 64 320C64 346.5 85.5 368 112 368C138.5 368 160 346.5 160 320z" />
                            </svg>
                            <span className='text-white'>List</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/feeds" className={({ isActive }) => `flex items-center justify-center gap-3 p-2 rounded-lg transition-all ${isActive ? 'bg-red-600' : 'hover:bg-gray-700'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20">
                                <path fill="white" d="M320 80C377.4 80 424 126.6 424 184C424 241.4 377.4 288 320 288C262.6 288 216 241.4 216 184C216 126.6 262.6 80 320 80zM96 152C135.8 152 168 184.2 168 224C168 263.8 135.8 296 96 296C56.2 296 24 263.8 24 224C24 184.2 56.2 152 96 152zM0 480C0 409.3 57.3 352 128 352C140.8 352 153.2 353.9 164.9 357.4C132 394.2 112 442.8 112 496L112 512C112 523.4 114.4 534.2 118.7 544L32 544C14.3 544 0 529.7 0 512L0 480zM521.3 544C525.6 534.2 528 523.4 528 512L528 496C528 442.8 508 394.2 475.1 357.4C486.8 353.9 499.2 352 512 352C582.7 352 640 409.3 640 480L640 512C640 529.7 625.7 544 608 544L521.3 544zM472 224C472 184.2 504.2 152 544 152C583.8 152 616 184.2 616 224C616 263.8 583.8 296 544 296C504.2 296 472 263.8 472 224zM160 496C160 407.6 231.6 336 320 336C408.4 336 480 407.6 480 496L480 512C480 529.7 465.7 544 448 544L192 544C174.3 544 160 529.7 160 512L160 496z" />
                            </svg>
                            <span className='text-white'>Feeds</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/profile" className={({ isActive }) => `flex items-center justify-center gap-3 p-2 rounded-lg transition-all ${isActive ? 'bg-red-600' : 'hover:bg-gray-700'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20">
                                <path fill="white" d="M320 312C386.3 312 440 258.3 440 192C440 125.7 386.3 72 320 72C253.7 72 200 125.7 200 192C200 258.3 253.7 312 320 312zM290.3 368C191.8 368 112 447.8 112 546.3C112 562.7 125.3 576 141.7 576L498.3 576C514.7 576 528 562.7 528 546.3C528 447.8 448.2 368 349.7 368L290.3 368z" />
                            </svg>
                            <span className='text-white font-extrabold'>Profile</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavSec