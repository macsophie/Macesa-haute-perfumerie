import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles, Check, Truck, CreditCard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, Currency } from '../types';
import { formatPrice } from '../utils/formatters';
import { COMPLIMENTARY_SAMPLES } from '../data/fragrances';
import { luxuryEase, backdropVariants, drawerVariants } from '../motion/motionSystem';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  currency: Currency;
  onUpdateQuantity: (cartId: string, delta: number) => void;
  onRemoveItem: (cartId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [selectedSamples, setSelectedSamples] = useState<string[]>([
    'sample-santal',
    'sample-rose'
  ]);
  const [giftWrap, setGiftWrap] = useState<boolean>(true);
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);
  const [orderComplete, setOrderComplete] = useState<boolean>(false);

  // Checkout inputs
  const [customerName, setCustomerName] = useState('Helena Laurent');
  const [shippingAddress, setShippingAddress] = useState('74 Avenue Montaigne, 75008 Paris, France');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = currency === 'EUR' ? 150 : currency === 'USD' ? 170 : 135;
  const isFreeShipping = subtotal >= freeShippingThreshold;
  const shippingCost = subtotal === 0 ? 0 : isFreeShipping ? 0 : currency === 'EUR' ? 15 : 20;
  const total = subtotal + shippingCost;

  const toggleSample = (sampleId: string) => {
    if (selectedSamples.includes(sampleId)) {
      setSelectedSamples(selectedSamples.filter((id) => id !== sampleId));
    } else {
      if (selectedSamples.length < 2) {
        setSelectedSamples([...selectedSamples, sampleId]);
      } else {
        setSelectedSamples([selectedSamples[1], sampleId]);
      }
    }
  };

  const handleExecuteCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderComplete(true);
  };

  const finishAndClose = () => {
    onClearCart();
    setOrderComplete(false);
    setIsCheckingOut(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
          {/* Backdrop Fade */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-[#141312]/80 backdrop-blur-xs cursor-pointer"
          />

          {/* Drawer Panel Slide from Right */}
          <motion.div
            id="cart-drawer-panel"
            variants={drawerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-10 w-full max-w-lg bg-[#FAF8F5] h-full shadow-2xl flex flex-col justify-between border-l border-[#E2DBD0]"
          >
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#E8E2D6] flex items-center justify-between bg-[#FAF8F5]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#C5A880]" />
                <h2 className="font-serif text-2xl text-[#181716]">
                  Your Olfactory Bag
                </h2>
                <span className="text-xs text-[#8C8479] font-sans">
                  ({cart.reduce((sum, i) => sum + i.quantity, 0)} items)
                </span>
              </div>

              <button
                id="close-cart-btn"
                onClick={onClose}
                className="p-2 text-[#181716] hover:text-[#C5A880] transition-colors cursor-pointer"
                aria-label="Close bag"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="bg-[#F2EDE4] px-6 py-3 border-b border-[#E2DBD0] text-xs font-sans text-[#544E47]">
              {isFreeShipping ? (
                <div className="flex items-center gap-2 text-[#346643] font-medium">
                  <Truck className="w-4 h-4" />
                  <span>Complimentary White-Glove Courier Delivery unlocked.</span>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span>Add {formatPrice(freeShippingThreshold - subtotal, currency)} for Complimentary Delivery</span>
                  <span className="font-medium text-[#181716]">{Math.round((subtotal / freeShippingThreshold) * 100)}%</span>
                </div>
              )}
            </div>

            {/* Drawer Scrollable Content */}
            <div className="p-6 overflow-y-auto flex-grow space-y-6">
              {orderComplete ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: luxuryEase }}
                  className="py-12 text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-[#181716] text-[#C5A880] rounded-full flex items-center justify-center mx-auto shadow-lg">
                    <Check className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-3xl text-[#181716]">
                    Commande Confirmée
                  </h3>
                  <p className="text-xs text-[#6B6358] font-sans max-w-sm mx-auto leading-relaxed">
                    Thank you, {customerName}. Your flacons have been reserved in our Grasse cellar 
                    and prepared for insulated courier transport to {shippingAddress}.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={finishAndClose}
                      className="px-8 py-3 bg-[#181716] text-[#FAF8F5] text-xs font-sans uppercase tracking-[0.2em] hover:bg-[#C5A880] hover:text-[#181716] transition-luxury cursor-pointer"
                    >
                      Return to House
                    </button>
                  </div>
                </motion.div>
              ) : isCheckingOut ? (
                /* Interactive Checkout Flow */
                <form onSubmit={handleExecuteCheckout} className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-[#E8E2D6]">
                    <h3 className="font-serif text-xl text-[#181716]">Privilege Delivery Details</h3>
                    <button
                      type="button"
                      onClick={() => setIsCheckingOut(false)}
                      className="text-xs text-[#9E7D52] hover:underline cursor-pointer"
                    >
                      ← Back to Bag
                    </button>
                  </div>

                  <div className="space-y-3 text-xs font-sans">
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#756E63] mb-1">
                        Recipient Full Name
                      </label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-[#FFFFFF] border border-[#DDD5C7] p-2.5 text-[#181716] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#756E63] mb-1">
                        Delivery Address
                      </label>
                      <input
                        type="text"
                        required
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        className="w-full bg-[#FFFFFF] border border-[#DDD5C7] p-2.5 text-[#181716] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#756E63] mb-1">
                        Settlement Method
                      </label>
                      <div className="p-3 bg-[#FFFFFF] border border-[#DDD5C7] flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-4 h-4 text-[#C5A880]" />
                          <span>Private Maison Account / Card ending 8842</span>
                        </div>
                        <span className="text-[10px] text-[#3B6E4A] uppercase font-medium">Verified</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#181716] hover:bg-[#312E2A] text-[#FAF8F5] text-xs font-sans uppercase tracking-[0.25em] font-medium transition-luxury cursor-pointer shadow-md"
                  >
                    Confirm Order • {formatPrice(total, currency)}
                  </button>
                </form>
              ) : cart.length === 0 ? (
                <div className="py-20 text-center space-y-4">
                  <div className="w-12 h-12 bg-[#F2EDE4] rounded-full flex items-center justify-center mx-auto text-[#9E7D52]">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-2xl text-[#181716]">
                    Your bag is presently empty
                  </h3>
                  <p className="text-xs text-[#6B6358] font-sans max-w-xs mx-auto">
                    Explore our signature flacons or take our private diagnostic quiz to discover your scent.
                  </p>
                </div>
              ) : (
                <>
                  {/* Itemized List with Fluid AnimatePresence Height Collapse */}
                  <div className="space-y-4">
                    <AnimatePresence mode="popLayout">
                      {cart.map((item) => (
                        <motion.div 
                          key={item.id}
                          layout
                          initial={{ opacity: 0, height: 0, y: -10 }}
                          animate={{ opacity: 1, height: 'auto', y: 0 }}
                          exit={{ opacity: 0, height: 0, y: -10, overflow: 'hidden' }}
                          transition={{ duration: 0.32, ease: luxuryEase }}
                          className="flex gap-4 p-3 bg-[#FFFFFF] border border-[#E8E2D6] items-start shadow-xs"
                        >
                          <img
                            src={item.fragrance.heroImage}
                            alt={item.fragrance.name}
                            className="w-18 aspect-[4/5] object-cover bg-[#F2EDE4] shrink-0"
                          />

                          <div className="flex-grow space-y-1">
                            <div className="flex justify-between items-start">
                              <h4 className="font-serif text-lg text-[#181716] leading-snug">
                                {item.fragrance.name}
                              </h4>
                              <button
                                onClick={() => onRemoveItem(item.id)}
                                className="text-[#8C8479] hover:text-[#B84040] transition-colors p-1 cursor-pointer"
                                aria-label="Remove item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="text-[11px] text-[#8C8479] uppercase font-sans tracking-wider">
                              {item.fragrance.concentration} • {item.sizeMl}ml
                            </div>

                            {/* Engraved Plaque Label */}
                            {item.engravingText && (
                              <div className="text-[10px] text-[#9E7D52] font-sans tracking-widest bg-[#F9F6F0] px-2 py-0.5 border border-[#EADFCB] inline-block">
                                Engraved: "{item.engravingText}"
                              </div>
                            )}

                            <div className="pt-2 flex items-center justify-between">
                              {/* Quantity Increment/Decrement */}
                              <div className="flex items-center border border-[#DDD5C7] text-xs">
                                <button
                                  onClick={() => onUpdateQuantity(item.id, -1)}
                                  className="px-2 py-1 text-[#6B6358] hover:bg-[#F2EDE4] cursor-pointer"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-2.5 py-1 text-[#181716] font-medium font-sans">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity(item.id, 1)}
                                  className="px-2 py-1 text-[#6B6358] hover:bg-[#F2EDE4] cursor-pointer"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>

                              <span className="font-serif text-base text-[#181716] font-medium">
                                {formatPrice(item.price * item.quantity, currency)}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Complimentary 2ml Samples Selection */}
                  <div className="p-4 bg-[#F2EDE4] border border-[#DDD5C7] space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#544E47] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                        Complimentary 2ml Deluxe Samples
                      </span>
                      <span className="text-[10px] text-[#8C8479] font-sans">
                        {selectedSamples.length}/2 Selected
                      </span>
                    </div>
                    <p className="text-[10px] text-[#7A7368] font-sans">
                      Choose two miniature samples to accompany your order in our signature velvet pouch:
                    </p>

                    <div className="grid grid-cols-1 gap-1.5">
                      {COMPLIMENTARY_SAMPLES.map((sample) => (
                        <button
                          key={sample.id}
                          type="button"
                          onClick={() => toggleSample(sample.id)}
                          className={`flex items-center justify-between p-2 text-left text-xs font-sans transition-luxury border cursor-pointer ${
                            selectedSamples.includes(sample.id)
                              ? 'bg-[#181716] text-[#FAF8F5] border-[#181716]'
                              : 'bg-[#FAF8F5] text-[#544E47] border-[#DDD5C7] hover:border-[#181716]'
                          }`}
                        >
                          <div>
                            <span className="font-serif text-sm block">{sample.name}</span>
                            <span className="text-[10px] text-[#8C8479]">{sample.notes}</span>
                          </div>
                          {selectedSamples.includes(sample.id) && (
                            <Check className="w-3.5 h-3.5 text-[#C5A880]" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Complimentary Gift Box */}
                  <div className="p-3 bg-[#FFFFFF] border border-[#E8E2D6] flex items-center justify-between text-xs font-sans">
                    <label className="flex items-center gap-2 cursor-pointer text-[#4A443D]">
                      <input
                        type="checkbox"
                        checked={giftWrap}
                        onChange={(e) => setGiftWrap(e.target.checked)}
                        className="accent-[#C5A880] w-4 h-4 cursor-pointer"
                      />
                      <span>Maison Gift Packaging & Wax Seal</span>
                    </label>
                    <span className="text-[10px] text-[#9E7D52] uppercase tracking-wider">Free</span>
                  </div>
                </>
              )}
            </div>

            {/* Drawer Footer / Checkout CTA */}
            {cart.length > 0 && !orderComplete && !isCheckingOut && (
              <div className="p-6 bg-[#F5F0E6] border-t border-[#E2DBD0] space-y-4">
                <div className="space-y-1.5 text-xs font-sans">
                  <div className="flex justify-between text-[#6B6358]">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal, currency)}</span>
                  </div>
                  <div className="flex justify-between text-[#6B6358]">
                    <span>Courier Transport</span>
                    <span>{shippingCost === 0 ? 'Complimentary' : formatPrice(shippingCost, currency)}</span>
                  </div>
                  <div className="pt-2 border-t border-[#DDD5C7] flex justify-between text-[#181716] font-serif text-xl font-medium">
                    <span>Estimated Total</span>
                    <span className="text-[#C5A880]">{formatPrice(total, currency)}</span>
                  </div>
                </div>

                <button
                  id="cart-checkout-proceed-btn"
                  onClick={() => setIsCheckingOut(true)}
                  className="w-full py-4 bg-[#181716] hover:bg-[#C5A880] hover:text-[#181716] text-[#FAF8F5] text-xs font-sans uppercase tracking-[0.25em] font-medium transition-luxury cursor-pointer shadow-md active:scale-99"
                >
                  Proceed to Secure Checkout
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
