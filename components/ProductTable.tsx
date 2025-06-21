'use client';

import React from 'react';
import { Button } from '../components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Badge } from '../components/ui/badge';
import { Edit, Trash2, Package } from 'lucide-react';
import { Product, formatCurrency } from '../lib/api';

interface ProductTableProps {
  products: Product[];
  isAdmin: boolean;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

export const ProductTable: React.FC<ProductTableProps> = ({
  products,
  isAdmin,
  onEdit,
  onDelete,
}) => {
  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { label: 'Out of Stock', variant: 'destructive' as const };
    if (quantity < 10) return { label: 'Low Stock', variant: 'secondary' as const };
    return { label: 'In Stock', variant: 'default' as const };
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
        <p className="text-gray-600">
          {isAdmin ? 'Start by adding your first product.' : 'No products are currently available.'}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-200">
            <TableHead className="font-semibold text-gray-900">Product Name</TableHead>
            <TableHead className="font-semibold text-gray-900">Price</TableHead>
            <TableHead className="font-semibold text-gray-900">Quantity</TableHead>
            <TableHead className="font-semibold text-gray-900">Status</TableHead>
            <TableHead className="font-semibold text-gray-900">Total Value</TableHead>
            {isAdmin && <TableHead className="font-semibold text-gray-900">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            const stockStatus = getStockStatus(product.quantity);
            return (
              <TableRow key={product.id} className="border-gray-100 hover:bg-gray-50/50">
                <TableCell className="font-medium text-gray-900">
                  {product.nama_produk}
                </TableCell>
                <TableCell className="text-gray-700">
                  {formatCurrency(product.harga_satuan)}
                </TableCell>
                <TableCell className="text-gray-700">
                  {product.quantity}
                </TableCell>
                <TableCell>
                  <Badge variant={stockStatus.variant}>
                    {stockStatus.label}
                  </Badge>
                </TableCell>
                <TableCell className="font-medium text-gray-900">
                  {formatCurrency(product.harga_satuan * product.quantity)}
                </TableCell>
                {isAdmin && (
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(product)}
                        className="border-blue-200 text-blue-600 hover:bg-blue-50"
                      >
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(product.id)}
                        className="border-red-200 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};