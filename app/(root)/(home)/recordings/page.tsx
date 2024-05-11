import CallList from '@/components/CallList'
import React from 'react'

const Recordings = () => {
  return (
    <section className='felx size-full flex-col gap-10 text-white'>
      <h1 className="text-3xl font-bold">
        Meeting Recordings
      </h1>

      <div className="relative my-5">
        <CallList type='recordings' />
      </div>
    </section>
  )
}

export default Recordings