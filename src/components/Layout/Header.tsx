import { Link } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import {
    ChevronDown,
    ChevronRight,
    Home,
    Menu,
    StickyNote,
} from 'lucide-react'
import { Activity, useState } from 'react'
import { logoutFn } from '~/server/auth/logout'

interface HeaderProps {
    isOpen: boolean
    setIsOpen: (isOpen: boolean) => void
    user: { email: string } | null
}

export default function Header({ isOpen, setIsOpen, user }: HeaderProps) {
    const [groupedExpanded, setGroupedExpanded] = useState<
        Record<string, boolean>
    >({})


    const logout = useServerFn(logoutFn)


    return (
        <>
            <header className="p-4 flex justify-between items-center bg-gray-800 text-white shadow-lg">

                <div className='flex'>
                    <Activity mode={user ? "visible" : "hidden"}>


                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                            aria-label="Open menu"
                        >
                            <Menu size={24} />
                        </button>
                    </Activity>

                    <h1 className="ml-4 text-xl font-semibold">
                        <Link to="/" disabled={!user}>
                            <img
                                src="/tanstack-word-logo-white.svg"
                                alt="TanStack Logo"
                                className="h-10"
                            />
                        </Link>
                    </h1>
                </div>
                <Activity mode={user ? "visible" : "hidden"}>
                    <div onClick={() => logout()} className='cursor-pointer'>
                        Logout
                    </div>
                </Activity>

            </header>

            <aside
                className={`fixed top-0 left-0 h-full w-80 bg-gray-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col ${isOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
            >
                <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <h2 className="text-xl font-bold">Navigation</h2>
                </div>

                <nav className="flex-1 p-4 overflow-y-auto">
                    <Link
                        to="/"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
                        activeProps={{
                            className:
                                'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
                        }}
                    >
                        <Home size={20} />
                        <span className="font-medium">Home</span>
                    </Link>

                    {/* Demo Links Start */}


                    <div className="flex flex-row justify-between">
                        <Link
                            to="/posts"
                            onClick={() => setIsOpen(false)}
                            activeOptions={{ exact: true }}

                            className="flex-1 flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors "
                            activeProps={{
                                className:
                                    'flex-1 flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors',
                            }}
                        >
                            <StickyNote size={20} />
                            <span className="font-medium">Posts</span>
                        </Link>
                        <button
                            className="px-2 hover:bg-gray-800 rounded-lg transition-colors"
                            onClick={() =>
                                setGroupedExpanded((prev) => ({
                                    ...prev,
                                    posts: !prev.posts,
                                }))
                            }
                        >
                            {groupedExpanded.posts ? (
                                <ChevronDown size={20} />
                            ) : (
                                <ChevronRight size={20} />
                            )}
                        </button>
                    </div>
                    {groupedExpanded.posts && (
                        <div className="flex flex-col ml-4">
                            <Link
                                to="/posts/$postId"
                                params={{ postId: '1' }}
                                onClick={() => setIsOpen(false)}
                                activeOptions={{ exact: true }}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-800 transition-colors mb-2"
                                activeProps={{
                                    className:
                                        'flex items-center gap-3 p-3 rounded-lg bg-cyan-600 hover:bg-cyan-700 transition-colors mb-2',
                                }}
                            >
                                <StickyNote size={20} />
                                <span className="font-medium">Details</span>
                            </Link>

                        </div>
                    )}

                </nav>
            </aside>
        </>
    )
}