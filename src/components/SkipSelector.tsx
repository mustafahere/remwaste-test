import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import axios from "axios";
import {
  ChevronRightIcon,
  TruckIcon,
  ExclamationTriangleIcon,
  ScaleIcon,
  XCircleIcon,
  CheckCircleIcon,
  NoSymbolIcon,
} from "@heroicons/react/24/outline";
import { FeatureBadge } from "./FeatureBadge";
import { SkipCardSkeleton } from "./SkipCardSkeleton";

interface Skip {
  id: number;
  size: number;
  hire_period_days: number;
  transport_cost: number | null;
  per_tonne_cost: number | null;
  price_before_vat: number;
  vat: number;
  postcode: string;
  area: string;
  forbidden: boolean;
  created_at: string;
  updated_at: string;
  allowed_on_road: boolean;
  allows_heavy_waste: boolean;
}

const fetchSkips = async () => {
  const response = await axios.get(
    "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
  );
  return response.data;
};

const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
  }).format(price);
};

const calculateTotalPrice = (priceBeforeVat: number, vatPercentage: number) => {
  const vatAmount = (priceBeforeVat * vatPercentage) / 100;
  return priceBeforeVat + vatAmount;
};

const getImageUrl = (skipSize: number) => {
  return `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${skipSize}-yarder-skip.jpg`;
};

export default function SkipSelector() {
  const [selectedSkip, setSelectedSkip] = useState<number | null>(null);
  const {
    data: skips,
    isLoading,
    error,
  } = useQuery<Skip[]>("skips", fetchSkips);

  const handleSkipSelection = (skipId: number) => {
    setSelectedSkip(selectedSkip === skipId ? null : skipId);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12 animate-pulse">
            <div className="h-12 w-96 bg-gray-200 rounded-lg mx-auto mb-4" />
            <div className="h-6 w-2/3 bg-gray-200 rounded-lg mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, index) => (
              <SkipCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-red-500 p-8 rounded-lg bg-white shadow-lg">
          <ExclamationTriangleIcon className="h-12 w-12 mx-auto mb-4" />
          <p className="text-xl font-semibold mb-2">Error loading skips</p>
          <p className="text-gray-600">Please try again later</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Choose Your Skip Size
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select the skip size that best suits your needs. All skips come with
            a standard hire period and competitive pricing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skips?.map((skip) => (
            <motion.div
              key={skip.id}
              whileHover={{ scale: 1.02, translateY: -4 }}
              whileTap={{ scale: 0.98 }}
              className={`
                rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer
                ${
                  selectedSkip === skip.id
                    ? "ring-4 ring-blue-500 ring-opacity-50"
                    : ""
                }
              `}
              onClick={() => handleSkipSelection(skip.id)}
            >
              <div className="relative">
                <img
                  src={getImageUrl(skip.size)}
                  alt={`${skip.size} Yard Skip`}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  {skip.size} Yards
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center justify-between">
                  {skip.size} Yard Skip
                  {selectedSkip === skip.id && (
                    <span className="text-sm font-normal text-gray-500 flex items-center">
                      Click to deselect
                    </span>
                  )}
                </h3>

                <div className="space-y-4 mb-6">
                  {/* Hire Period */}
                  <div className="flex items-center text-gray-600 bg-gray-50 p-3 rounded-lg">
                    <TruckIcon className="w-6 h-6 mr-3 text-blue-500" />
                    <span className="font-medium">
                      {skip.hire_period_days} day hire period
                    </span>
                  </div>

                  {/* Updated Features */}
                  <div className="grid grid-cols-1 gap-2">
                    <FeatureBadge
                      isActive={skip.allowed_on_road}
                      activeText="Road Legal"
                      inactiveText="Not Road Legal"
                      activeIcon={CheckCircleIcon}
                      inactiveIcon={XCircleIcon}
                      activeClass="bg-green-50 text-green-700 border border-green-100"
                      inactiveClass="bg-red-50 text-red-700 border border-red-100"
                    />
                    <FeatureBadge
                      isActive={skip.allows_heavy_waste}
                      activeText="Heavy Waste Allowed"
                      inactiveText="Light Waste Only"
                      activeIcon={ScaleIcon}
                      inactiveIcon={NoSymbolIcon}
                      activeClass="bg-blue-50 text-blue-700 border border-blue-100"
                      inactiveClass="bg-yellow-50 text-yellow-700 border border-yellow-100"
                    />
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <div className="flex justify-between text-gray-600">
                      <span>Base Price:</span>
                      <span>{formatPrice(skip.price_before_vat)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>VAT ({skip.vat}%):</span>
                      <span>
                        {formatPrice((skip.price_before_vat * skip.vat) / 100)}
                      </span>
                    </div>
                    <div className="border-t border-gray-200 pt-2 mt-2">
                      <div className="flex justify-between font-bold text-gray-900">
                        <span>Total:</span>
                        <span>
                          {formatPrice(
                            calculateTotalPrice(skip.price_before_vat, skip.vat)
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSkipSelection(skip.id);
                  }}
                  className={`
                    w-full px-6 py-3 rounded-xl flex items-center justify-center font-semibold transition-colors duration-200 cursor-pointer
                    ${
                      selectedSkip === skip.id
                        ? "bg-blue-500 text-white shadow-lg hover:bg-blue-600"
                        : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                    }
                  `}
                >
                  {selectedSkip === skip.id ? (
                    <>
                      Deselect Skip
                      <ChevronRightIcon className="w-5 h-5 ml-2 rotate-90" />
                    </>
                  ) : (
                    <>
                      Select This Skip
                      <ChevronRightIcon className="w-5 h-5 ml-2" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedSkip && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          className="fixed bottom-0 left-0 right-0 bg-white shadow-xl border-t z-50"
        >
          {/* Desktop Version */}
          <div className="hidden md:block">
            <div className="max-w-7xl mx-auto p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mr-6">
                    <img
                      src={getImageUrl(
                        skips?.find((skip) => skip.id === selectedSkip)?.size ||
                          4
                      )}
                      alt={`${
                        skips?.find((skip) => skip.id === selectedSkip)?.size
                      } Yard Skip`}
                      className="w-full h-full  rounded-lg"
                    />
                  </div>
                  <div>
                    <p className="text-gray-600 mb-1">Selected Skip</p>
                    <p className="text-xl font-bold text-gray-900">
                      {skips?.find((skip) => skip.id === selectedSkip)?.size}{" "}
                      Yard Skip
                    </p>
                    <p className="text-sm text-gray-500">
                      Total:{" "}
                      {formatPrice(
                        calculateTotalPrice(
                          skips?.find((skip) => skip.id === selectedSkip)
                            ?.price_before_vat || 0,
                          skips?.find((skip) => skip.id === selectedSkip)
                            ?.vat || 0
                        )
                      )}
                    </p>
                  </div>
                </div>
                <button
                  className="bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 transition-colors shadow-lg flex items-center cursor-pointer"
                  onClick={() => {
                    console.log("Continuing with skip:", selectedSkip);
                  }}
                >
                  Continue to Booking
                  <ChevronRightIcon className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Version */}
          <div className="md:hidden">
            <div className="p-4">
              <div className="flex flex-col space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <img
                        src={getImageUrl(
                          skips?.find((skip) => skip.id === selectedSkip)
                            ?.size || 4
                        )}
                        alt={`${
                          skips?.find((skip) => skip.id === selectedSkip)?.size
                        } Yard Skip`}
                        className="w-full h-full rounded-lg"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Selected Skip
                      </p>
                      <p className="text-base font-bold text-gray-900">
                        {skips?.find((skip) => skip.id === selectedSkip)?.size}{" "}
                        Yard Skip
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Total Price</p>
                    <p className="text-base font-bold text-blue-500">
                      {formatPrice(
                        calculateTotalPrice(
                          skips?.find((skip) => skip.id === selectedSkip)
                            ?.price_before_vat || 0,
                          skips?.find((skip) => skip.id === selectedSkip)
                            ?.vat || 0
                        )
                      )}
                    </p>
                  </div>
                </div>
                <button
                  className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors shadow-md flex items-center justify-center cursor-pointer"
                  onClick={() => {
                    console.log("Continuing with skip:", selectedSkip);
                  }}
                >
                  Continue to Booking
                  <ChevronRightIcon className="w-5 h-5 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
