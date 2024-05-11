"use client";

import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useGetCallById } from '@/hooks/useGetCallById';
import { useUser } from '@clerk/nextjs'
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react'

const Table = ({ title, desc }: {
  title: string,
  desc: string
}) => (
  <div className='flex flex-col items-start gap-2 xl:flex-row'>
    <h1 className='text-base font-medium text-orange-1 lg:text-xl xl:min-w-32'>
      {title}
    </h1>
    <h1 className='truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl'>
      {desc}
    </h1>
  </div>
)

const Room = () => {

  const { user } = useUser();
  const { toast } = useToast();
  const router = useRouter();
  const client = useStreamVideoClient();
  const meetingId = user?.id;
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`

  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;


    if (!call) {
      const newCall = client.call('default', meetingId!);

      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        }
      })
    }
    router.push(`/meeting/${meetingId}?personal=true`)
  }

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className='text-3xl font-bold'>
        Personal Room
      </h1>

      <div className='container bg-dark-1 p-6 rounded-2xl'>
        <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
          <Table title='Topic' desc={`${user?.username}'s Meeting Room`} />
          <Table title='Meeting ID' desc={meetingId!} />
          <Table title='Link' desc={meetingLink} />
        </div>

        <div className="flex gap-5 mt-12">
          <Button className='bg-orange-1' onClick={startRoom}>Start Meeting</Button>
          <Button
            className='bg-dark-3'
            onClick={() => {
              navigator.clipboard.writeText(meetingLink);
              toast({
                title: 'Link Copied',
              });
            }}>
            <Image
              src='icons/copy.svg'
              width={20}
              height={20}
              alt='Copy Link Icon'
            />
            Copy Link
          </Button>
        </div>
      </div>
    </section>
  )
}

export default Room