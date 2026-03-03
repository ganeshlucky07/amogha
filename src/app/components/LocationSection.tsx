"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation, Clock, Phone, Mail } from "lucide-react";
import { SHOP_INFO } from "../data";

export function LocationSection() {
  return (
    <section id="location" className="py-12 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-gray-800 px-4 py-2 rounded-full mb-4">
            <MapPin className="w-5 h-5 text-amber-400" />
            <span className="font-medium">Visit Us</span>
          </div>
          <h2 className="text-3xl font-bold mb-3">Find Us</h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Located in the heart of Jodimetla, Pocharam area. Easy to find and
            plenty of parking available!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-800 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-400" />
              Location Details
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="font-medium">Address</p>
                  <p className="text-gray-400 text-sm">{SHOP_INFO.address}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="font-medium">Timings</p>
                  <p className="text-gray-400 text-sm">{SHOP_INFO.hours}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="text-gray-400 text-sm">{SHOP_INFO.phoneNumber}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-gray-400 text-sm">{SHOP_INFO.email}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-800 rounded-2xl p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Navigation className="w-5 h-5 text-amber-400" />
                Quick Directions
              </h3>
              <p className="text-gray-400 mb-4">
                Use our Plus Code to find us easily on Google Maps. Perfect for
                sharing with friends and family!
              </p>
              <div className="bg-gray-700 rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-400 mb-1">Google Plus Code</p>
                <p className="text-2xl font-bold text-amber-400">
                  {SHOP_INFO.plusCode}
                </p>
              </div>
            </div>
            <motion.a
              href={SHOP_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center gap-2 bg-amber-500 text-gray-900 py-3 rounded-xl font-bold hover:bg-amber-400 transition-colors"
            >
              <Navigation className="w-5 h-5" />
              Get Directions on Google Maps
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
