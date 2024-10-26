import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { NavLink, useLocation} from 'react-router-dom'
import { useContext } from 'react'
import { LoginContext } from '../App'


const navigation = [
    { name: 'Home', href: '/', },
    { name: 'Dictionary', href: '/Dictionary', },
    { name: 'Employees', href: '/Employees', },
    { name: 'Customers', href: '/Customers', },
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}


export default function Header(props) {
    
    let [isLoggedIn, setIsLoggedIn] = useContext(LoginContext);

    const location = useLocation(); // Get current route location


    // Dynamically set page title based on route
    const getPageTitle = () => {
        const currentNav = navigation.find(item => item.href === location.pathname);
        return currentNav ? currentNav.name : 'Dashboard';
    };

    return (
        <div className="min-h-full">
            <Disclosure as="nav" className="bg-white-800">
                {({ open }) => (
                    <>
                        <div className=" mx-auto max-w-7xl px-2 sm:px-6 lg:px-8" >
                            <div className="relative flex h-14 items-center justify-between">
                                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                    {/* Mobile menu button*/}
                                    <DisclosureButton className=" relative inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-gray-200 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="absolute -inset-0.5" />
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </DisclosureButton>
                                </div>
                                <div className=" flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                    <div className="flex flex-shrink-0 items-center">
                                        <img
                                            className="h-8 w-auto"
                                            src="https://1000logos.net/wp-content/uploads/2023/05/Straw-Hat-Emblem.png"
                                            alt="Your Company"
                                        />
                                    </div>
                                    <div className="hidden sm:ml-6 sm:block">
                                        <div className="flex space-x-4">
                                            {navigation.map((item) => (
                                                <NavLink
                                                    key={item.name}
                                                    to={item.href}

                                                    className={({ isActive }) => {
                                                        return "no-underline rounded-md px-3 py-2 text-sm font-medium" + (!isActive ? " text-black hover:bg-gray-100 hover:text-black" : " bg-gray-100 text-black")
                                                    }}
                                                    aria-current={item.current ? 'page' : undefined}
                                                >
                                                    {item.name}
                                                </NavLink>
                                            ))}

                                            {
                                                isLoggedIn ? (
                                                    <NavLink
                                                        to={'/login'}
                                                        className='no-underline rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-100 hover:text-black'
                                                        onClick={() => {
                                                            setIsLoggedIn(false);
                                                            localStorage.clear();                                                        
                                                        }}  
                                                    >
                                                        {'Logout'}
                                                    </NavLink>
                                                ) : (<NavLink
                                                    to={'/login'}
                                                    className='no-underline rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-100 hover:text-black'
                                                >
                                                    {'Login'}
                                                </NavLink>)
                                            }

                                        </div>
                                    </div>
                                </div>
                                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    <button
                                        type="button"
                                        className="relative rounded-full bg-gray-100 p-1 text-black hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-500"
                                    >
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">View notifications</span>
                                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>


                                </div>
                            </div>
                        </div>

                        <DisclosurePanel className="sm:hidden">
                            <div className=" space-y-1 px-2 pb-3 pt-2">
                                {navigation.map((item) => (

                                    <NavLink
                                        key={item.name}
                                        to={item.href}

                                        className={({ isActive }) => {
                                            return "no-underline block rounded-md px-3 py-2 text-base font-medium" + (!isActive ? " text-black hover:bg-gray-100 hover:text-black" : " bg-gray-100 text-black")
                                        }}
                                        aria-current={item.current ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </NavLink>
                                ))}

                                <NavLink
                                    to={isLoggedIn ? '/logout' : '/login'}
                                    className='no-underline rounded-md px-3 py-2 text-sm font-medium text-black hover:bg-gray-100 hover:text-black'
                                >
                                    {isLoggedIn ? 'Logout' : 'Login'}
                                </NavLink>
                            </div>
                        </DisclosurePanel>

                    </>
                )}


            </Disclosure>
            <header className="bg-white mx-auto max-w-7xl">
                <div className="mx-auto max-w-7xl  px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">{getPageTitle()}</h1>
                </div>
            </header>
            <main>
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8"> {props.children}</div>
            </main>
        </div>



    )
}