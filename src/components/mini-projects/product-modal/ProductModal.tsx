import Image from 'next/image';
import React from 'react';

function ProductModal() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-100">
      <div className="flex flex-col p-6 m-3 space-y-10 bg-white rounded-2xl shadow-2xl md:flex-row md:space-y-0 md:space-x-10 md:m-0 md:p-16">
        <div className="hover:scale-105 duration-200 self-center mt-6 md:mt-0">
          <Image
            className="object-fill mx-auto rounded-xl"
            src="/all-project-assets/product-modal/images/headphone.png"
            width={240}
            height={240}
            objectFit="cover"
            alt=""
          />
        </div>
        <div className="flex flex-col space-y-6">
          <div className="flex flex-col mb-4 space-y-3 text-center md:text-left">
            <div>
              <div className="inline-block p-3 py-1 text-sm text-white bg-black rounded-full">
                Free Shipping
              </div>
            </div>

            <div className="max-w-sm text-2xl font-medium">
              Razer Kraken Kitty Edt Gaming Headset Quartz
            </div>

            <div className="flex flex-col mb-4 space-y-3 text-center md:text-left">
              <p className="line-through">$799</p>
              <p className="text-5xl font-bold">$599</p>
              <p className="text-sm font-light text-gray-400">
                This offer is valid until April 3rd or as log as stock lasts!
              </p>
            </div>

            <div className="group">
              <button className="w-full transition-all duration-150 bg-blue-700 text-white border-b-8 border-b-blue-700 rounded-lg hoverable:group-hover:border-t-8 hoverable:group-hover:border-b-0 hoverable:group-hover:bg-blue-700 hoverable:group-hover:border-t-blue-700 hoverable:group-hover:shadow-lg">
                <div className="px-6 py-4 duration-150 bg-blue-500 rounded-lg hoverable:group-hover:bg-blue-700">
                  Add to cart
                </div>
              </button>
            </div>

            <div className="flex items-center space-x-3 group">
              <div className="w-3 h-3 bg-green-400 rounded-full group-hover:animate-ping"></div>
              <div className="text-sm">50+ pcs. in stock</div>
            </div>

            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-4 md:flex-row">
              <button className="flex items-center justify-center py-3 px-5 space-x-3 border-2 border-gray-300 rounded-lg shadow-sm hoverable:hover:bg-opacity-30 hoverable:hover:shadow-lg hoverable:hover:-translate-y-0.5 transition-all duration-150">
                <Image
                  src="/all-project-assets/product-modal/images/weight.png"
                  width={32}
                  height={32}
                  objectFit="cover"
                  alt=""
                />
                <span>Add ro cart</span>
              </button>

              <button className="flex items-center justify-center py-3 px-5 space-x-3 border-2 border-gray-300 rounded-lg shadow-sm hoverable:hover:bg-opacity-30 hoverable:hover:shadow-lg hoverable:hover:-translate-y-0.5 transition-all duration-150">
                <Image
                  src="/all-project-assets/product-modal/images/heart.png"
                  width={32}
                  height={32}
                  objectFit="cover"
                  alt=""
                />
                <span>Add ro wishlist</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;
