import React from "react";
import { Fragment, useContext, useEffect, useState } from "react";
import Logo from "../assets/smartphone.png";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext";

const Navbar = () => {
  const { fetchCart, deleteCart, cart } = useContext(CartContext);
  // console.log(x);
  const [open, setOpen] = useState(false);
  // const [carts, setCarts] = useState();
  // const [error, setError] = useState(null);
  const navigate = useNavigate();

  const openCart = () => {
    setOpen(true);
  };

  const logout = () => {
    localStorage.clear();
    navigate("/auth");
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <>
      <Disclosure as="nav" className="bg-gray-800 ">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center">
                    <img
                      className="block h-8 w-auto lg:hidden"
                      src={Logo}
                      alt="Your Company"
                    />
                    <img
                      className="hidden h-8 w-auto lg:block"
                      src={Logo}
                      alt="Your Company"
                    />
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <h1 className="text-white text-l font-semibold">
                      Shopping Cart
                    </h1>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span></span>
                    <ShoppingBagIcon
                      className="h-6 w-6"
                      aria-hidden="true"
                      onClick={openCart}
                    />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <button
                      onClick={logout}
                      className="text-white font-semibold bg-gray-900 px-4 py-2 rounded-md"
                    >
                      Logout
                    </button>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden"></Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Shopping cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setOpen(false)}
                            >
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>

                        <div className="mt-8">
                          <div className="flow-root">
                            <div className="">
                              {cart.map((x) => (
                                <div
                                  className=" w-full px-5 mx-auto  shadow-2xl rounded-lg hover:scale-105 hover:duration-500 "
                                  key={x}
                                >
                                  <img
                                    className="w-[50%] mx-auto py-5"
                                    src={x.image}
                                  />
                                  <div className="pb-5">
                                    <h1 className="text-2xl text-center font-bold">
                                      {x.title}
                                    </h1>
                                    <p className="text-center pt-5 text-xl font-semibold">
                                      {x.category}
                                    </p>

                                    <p className="text-lg  gap-5 flex justify-center text-center font-bold py-5">
                                      <h1>Price </h1>${x.price}
                                    </p>
                                    <p className="text-lg  gap-5 flex justify-center text-center font-bold py-5">
                                      <h1>Quantity </h1>
                                      {x.quantity}
                                    </p>
                                    <button
                                      onClick={() => {
                                        deleteCart(x.id);
                                      }}
                                      className="bg-orange-600  w-full hover:bg-orange-500  text-white p-3 text-lg font-bold rounded-lg "
                                    >
                                      Remove
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <Link onClick={() => setOpen(false)} className="">
                              hello
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Navbar;
