'use client';

import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { MeetingSetupProps } from '@/constants';

const MeetingSetup = ({ setupStatus }: MeetingSetupProps) => {

  const [MicCamStatus, setMicCamStatus] = useState(false);
  const call = useCall();

  if (!call) throw new Error('useCall must be used within a StreamCall component');

  useEffect(() => {
    if (MicCamStatus) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }

  }, [MicCamStatus, call?.camera, call?.microphone])


  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className='text-2xl font-bold'>
        All Set to Join the Meeting
      </h1>
      <span className='border-t w-[20rem] md:w-[40rem] opacity-25'/>
      <div className='max-w-[60rem] p-5 md:p-10'>
        <VideoPreview />
      </div>
      <div className="flex h-16 items-center justify-center gap-3">
        <label className='flex items-center justify-center gap-2 font-medium'>
          <input
            type="checkbox"
            checked={MicCamStatus}
            onChange={(e) => setMicCamStatus(e.target.checked)}
          />
          <span>Turn Off Camera and Microphone</span>
        </label>
        <DeviceSettings />
      </div>
      <Button
        className='rounded-md bg-green-500 px-4 py-2.5'
        onClick={() => {
          call.join();

          setupStatus(true);
        }}>
        Join Meeting
      </Button>
    </div>
  )
}

export default MeetingSetup