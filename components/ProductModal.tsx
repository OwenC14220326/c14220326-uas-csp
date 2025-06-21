'use client';

import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Product } from '../lib/api';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Omit<Product, 'id'>) => Promise<void>;
  product?: Product | null;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
  product,
}) => {
  const [formData, setFormData] = useState({
    nama_produk: '',
    harga_satuan: '',
    quantity: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (product) {
      setFormData({
        nama_produk: product.nama_produk,
        harga_satuan: product.harga_satuan.toString(),
        quantity: product.quantity.toString(),
      });
    } else {
      setFormData({
        nama_produk: '',
        harga_satuan: '',
        quantity: '',
      });
    }
  }, [product]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nama_produk.trim()) {
      newErrors.nama_produk = 'Product name is required';
    }

    const harga = parseFloat(formData.harga_satuan);
    if (!formData.harga_satuan || isNaN(harga) || harga <= 0) {
      newErrors.harga_satuan = 'Please enter a valid price';
    }

    const qty = parseInt(formData.quantity);
    if (!formData.quantity || isNaN(qty) || qty < 0) {
      newErrors.quantity = 'Please enter a valid quantity';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave({
        nama_produk: formData.nama_produk.trim(),
        harga_satuan: parseFloat(formData.harga_satuan),
        quantity: parseInt(formData.quantity),
      });
    } catch (error) {
      console.error('Failed to save product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  useEffect(() => {
    if (isOpen && !product) {
      setFormData({
        nama_produk: '',
        harga_satuan: '',
        quantity: '',
      });
      setErrors({});
    }
  }, [isOpen, product]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-md bg-white text-gray-900 shadow-lg rounded-lg border border-gray-200"
        style={{ backgroundColor: '#fff', color: '#1a202c', opacity: 1 }}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-900">
            {product ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nama_produk" className="text-sm font-medium text-gray-700">
              Product Name
            </Label>
            <Input
              id="nama_produk"
              value={formData.nama_produk}
              onChange={(e) => handleInputChange('nama_produk', e.target.value)}
              placeholder="Enter product name"
              className={`bg-white text-gray-900 border ${errors.nama_produk ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
            />
            {errors.nama_produk && (
              <p className="text-sm text-red-600">{errors.nama_produk}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="harga_satuan" className="text-sm font-medium text-gray-700">
              Unit Price (IDR)
            </Label>
            <Input
              id="harga_satuan"
              type="number"
              min="0"
              step="1000"
              value={formData.harga_satuan}
              onChange={(e) => handleInputChange('harga_satuan', e.target.value)}
              placeholder="Enter unit price"
              className={`bg-white text-gray-900 border ${errors.harga_satuan ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
            />
            {errors.harga_satuan && (
              <p className="text-sm text-red-600">{errors.harga_satuan}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="quantity" className="text-sm font-medium text-gray-700">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              min="0"
              value={formData.quantity}
              onChange={(e) => handleInputChange('quantity', e.target.value)}
              placeholder="Enter quantity"
              className={`bg-white text-gray-900 border ${errors.quantity ? 'border-red-300 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
            />
            {errors.quantity && (
              <p className="text-sm text-red-600">{errors.quantity}</p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="border-gray-300 hover:bg-gray-100 text-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
            >
              {isSubmitting ? 'Saving...' : product ? 'Update Product' : 'Add Product'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};