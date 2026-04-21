import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';
import Button from './Button';

const CartDrawer = ({ isOpen, onClose, cartItems = [], onUpdateQuantity, onRemoveItem }) => {
  const navigate = useNavigate();
  const subtotal = cartItems?.reduce((sum, item) => sum + (item?.price * item?.quantity), 0);
  const shipping = subtotal >= 499 ? 0 : 49;
  const total = subtotal + shipping;

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      onRemoveItem?.(itemId);
    } else {
      onUpdateQuantity?.(itemId, newQuantity);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-[1003]"
        onClick={onClose}
      />
      {/* Cart Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card shadow-warm-xl z-[1003] transform transition-transform duration-300">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="font-heading font-semibold text-lg text-foreground">
              Shopping Cart ({cartItems?.length})
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-full transition-colors duration-200"
              aria-label="Close cart"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cartItems?.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="ShoppingCart" size={48} className="mx-auto text-muted-foreground mb-4" />
                <p className="font-body text-muted-foreground mb-4">Your cart is empty</p>
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="mx-auto"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems?.map((item) => (
                  <div key={item?.id} className="flex gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item?.image}
                        alt={item?.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-body font-bold text-sm text-[#f5e6c8] truncate">
                        {item?.name}
                      </h3>
                      <p className="font-caption text-xs text-[#f5e6c8]/60">
                        {item?.variant}
                      </p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQuantityChange(item?.id, item?.quantity - 1)}
                            className="w-7 h-7 rounded-full border border-[#f5e6c8]/20 flex items-center justify-center text-[#f5e6c8] hover:bg-[#f5e6c8]/10 transition-colors duration-200"
                          >
                            <Icon name="Minus" size={12} />
                          </button>
                          <span className="font-data text-sm font-bold w-8 text-center text-[#f5e6c8]">
                            {item?.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item?.id, item?.quantity + 1)}
                            className="w-7 h-7 rounded-full border border-[#f5e6c8]/20 flex items-center justify-center text-[#f5e6c8] hover:bg-[#f5e6c8]/10 transition-colors duration-200"
                          >
                            <Icon name="Plus" size={12} />
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="font-data font-bold text-base text-[#F0C040]">
                            ₹{(item?.price * item?.quantity)?.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => onRemoveItem(item?.id)}
                      className="p-1 hover:bg-destructive/10 hover:text-destructive rounded transition-colors duration-200"
                      aria-label="Remove item"
                    >
                      <Icon name="Trash2" size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems?.length > 0 && (
            <div className="border-t border-border p-4 space-y-4">
              {/* Shipping Notice */}
              {subtotal < 499 && (
                <div className="bg-[#C9A227]/10 border border-[#C9A227]/30 rounded-lg p-3">
                  <p className="font-caption text-xs text-[#C9A227] font-bold">
                    Add ₹{(499 - subtotal)?.toFixed(2)} more for free shipping!
                  </p>
                </div>
              )}
              
              {/* Order Summary */}
              <div className="space-y-2">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-[#f5e6c8]/60 font-medium">Subtotal</span>
                  <span className="font-data font-bold text-[#f5e6c8]">₹{subtotal?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-body text-sm">
                  <span className="text-[#f5e6c8]/60 font-medium">Shipping</span>
                  <span className="font-data font-bold text-[#f5e6c8]">
                    {shipping === 0 ? <span className="text-green-400">Free</span> : `₹${shipping?.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between font-heading font-bold text-lg pt-2 border-t border-[#f5e6c8]/10 text-[#F0C040]">
                  <span>Total</span>
                  <span className="font-data">₹{total?.toFixed(2)}</span>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-3">
                <Button
                  variant="default"
                  fullWidth
                  onClick={() => {
                    onClose();
                    navigate('/checkout-process');
                  }}
                  className="bg-[#C9A227] hover:bg-[#F0C040] text-[#120d07] font-bold py-4 rounded-xl shadow-gold-md"
                >
                  Proceed to Checkout
                </Button>
                <Link to="/shopping-cart" onClick={onClose} className="block">
                  <Button 
                    variant="outline" 
                    fullWidth
                    className="border-[#f5e6c8]/20 text-[#f5e6c8] hover:bg-[#f5e6c8]/10 py-3 rounded-xl"
                  >
                    View Cart
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartDrawer;