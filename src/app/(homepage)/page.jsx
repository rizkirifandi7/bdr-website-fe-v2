import React from 'react'

import Kontak from '@/components/homepage/kontak'
import Layanan from '@/components/homepage/layanan'
import Tentang from '@/components/homepage/tentang'
import Reservasi from '@/components/homepage/reservasi'
import Jumbotron from '@/components/homepage/jumbotron'
import MenuPopuler from '@/components/homepage/menu-populer'

const HomePage = () => {
  return (
    <>
      <Jumbotron />
      <MenuPopuler />
      <Layanan />
      <Tentang />
      <Reservasi />
      <Kontak />
    </>
  )
}

export default HomePage