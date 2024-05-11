import CallList from '@/components/CallList'
import React from 'react'

const Upcoming = () => {
  return (
    <section className='felx size-full flex-col gap-10 text-white'>
      <h1 className="text-3xl font-bold">
        Upcoming Meetings
      </h1>

      <div className="relative my-5">
        <CallList type="upcoming" />
      </div>
    </section>
  )
}

export default Upcoming