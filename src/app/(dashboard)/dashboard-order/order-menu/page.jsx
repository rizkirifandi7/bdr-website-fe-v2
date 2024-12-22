"use client"

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Minus, Plus, Soup } from 'lucide-react'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import FilterMenu from './components/FilterMenu'
import { formatRupiah } from '@/lib/formatRupiah'
import { useCart } from '@/hooks/useCart'
import OrderItem from './components/OrderItem'
import OrderNotes from './components/OrderNotes'

const PageOrderMenu = () => {
  const [dataMenus, setDataMenus] = useState([]);
  const [dataFilterMenu, setDataFilterMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const {
    addToCart,
    cart,
    removeFromCart,
  } = useCart();

  const [tipePayment, setTipePayment] = useState("Cash");
  const [note, setNote] = useState("");

  const fetchData = useCallback(async () => {
    const [menuResponse, kategoriResponse] = await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu`),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/kategori`)
    ]);

    const menuData = await menuResponse.json();
    const kategoriData = await kategoriResponse.json();

    setDataMenus(menuData.data);
    setDataFilterMenu(kategoriData.data);
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const filteredMenus = selectedCategory
    ? dataMenus.filter((menu) => menu.id_kategori === selectedCategory.id)
    : dataMenus;

  const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = getTotalPrice();

  return (
    <div className="">
      <div className="flex gap-4 mt-4">
        <div className="flex flex-col gap-4 w-full  h-full">
          <div className="grid grid-cols-4 gap-4">
            {dataFilterMenu.map((data, index) => (
              <FilterMenu
                key={index}
                namafilter={data.nama_kategori}
                onClick={() => handleCategorySelect(data)}
              />
            ))}
          </div>
          <div className="flex flex-col gap-4">
            <h1 className='text-2xl font-semibold'>{selectedCategory
              ? selectedCategory.nama_kategori
              : "Semua Menu"}</h1>
            {filteredMenus.length > 0 ? (
              <div className="grid grid-cols-4 gap-4">
                {filteredMenus.map((data) => {
                  const cartItem = cart ? cart.find((item) => item.id === data.id) : null
                  return (
                    <Card className="flex flex-col rounded-md" key={data.id}>
                      <div className="rounded-md overflow-hidden p-2 bg-slate-50">
                        <Image src={data.gambar} width={500} height={500} alt={data.nama_menu} className='object-cover rounded-md h-[200px]' />
                      </div>
                      <div className="flex flex-col px-3 py-3 w-full">
                        <h1 className='text-base font-semibold'>{data.nama_menu}</h1>
                        <p className='truncate w-full text-sm text-muted-foreground'>{data.deskripsi}</p>
                        <div className="flex justify-between items-center mt-3">
                          <p className='text-base font-bold'>{formatRupiah(data.harga)}</p>
                          <div className="flex justify-between items-center gap-2">
                            {cartItem && cartItem.quantity > 0 && (
                              <>
                                <Button variant="outline" size="icon" onClick={() => removeFromCart(data)}><Minus /></Button>
                                <p className='px-1'>{cartItem.quantity}</p>
                              </>
                            )}
                            <Button variant="outline" size="icon" onClick={() => addToCart(data)}><Plus /></Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )
                })}
              </div>
            ) : (
              <div className="flex flex-col h-[500px] justify-center items-center">
                <Soup size={40} />
                <h1 className="text-center text-2xl font-semibold">
                  Tidak ada menu
                </h1>
              </div>
            )}
          </div>
        </div>
        <div className="w-[800px] p-4 bg-blue-50 h-full rounded-md">
          <h1>Cart</h1>

          <OrderItem cart={cart} totalQuantity={totalQuantity} />
          {/* <OrderNotes note={note} setNote={setNote} />
          <OrderPaymentMethod
            tipePayment={tipePayment}
            handlePaymentChange={handlePaymentChange}
          />
          <OrderSummary
            totalPrice={totalPrice}
            tax={0}
            total={totalPrice}
            discount={0}
          /> */}
        </div>
      </div>
    </div>
  )
}

export default PageOrderMenu