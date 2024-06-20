"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import WalletButton from '../Wallet/WalletButton';

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <header className=" text-white p-2 border-b border-gray-700">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-[#4d55c7]">Aggregator</Link>
                <nav className="flex-1">
                    <ul className="flex justify-center space-x-8 ">
                        <li className='hover:text-[#4d55c7]'>
                            <Link href="/inscriptions" onClick={toggleDropdown}>
                                Inscriptions
                            </Link>
                        </li>
                        <li className='hover:text-[#4d55c7]'>
                            <Link href="/marketplace">
                                Marketplace
                            </Link>
                        </li>
                        <li className='hover:text-[#4d55c7]'>
                            <Link href="/staking">
                                Staking
                            </Link>
                        </li>
                        <li className='hover:text-[#4d55c7]'>
                            <Link href="/launchpad">
                                Launchpad
                            </Link>
                        </li>
                    </ul>
                </nav>
                <WalletButton/>
            </div>
        </header>
    );
};

export default Header;
