import CallList from '@/components/CallList'
import React from 'react'

const Previous = () => {
  return (
    <section className='felx size-full flex-col gap-10 text-white'>
      <h1 className="text-3xl font-bold">
        Previous Meetings
      </h1>

      <div className="relative my-5">
        <CallList type='ended' />
      </div>
    </section>
  )
}

export default Previous