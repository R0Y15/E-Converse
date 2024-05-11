import { CallLayoutTypes } from '@/constants'
import { CallControls, CallParticipantsList, CallStatsButton, CallingState, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LayoutList, Users } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import EndCallButton from './EndCallButton'
import Loader from './Loader'


const MeetingRoom = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const isPersonalRoom = !!searchParams.get('personal');
    const [layout, setlayout] = useState<CallLayoutTypes>('speaker-left')
    const [showParticipants, setShowParticipants] = useState(false);
    const { useCallCallingState } = useCallStateHooks();

    const callingState = useCallCallingState();

    if (callingState !== CallingState.JOINED) return <Loader />
    const callLayout = () => {
        switch (layout) {
            case 'grid':
                return <PaginatedGridLayout />
            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition='left' />

            default:
                return <SpeakerLayout participantsBarPosition='right' />
        }
    }
    return (
        <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
            <div className="fixed top-5 right-5 flex w-full items-end justify-end z-10 ">
                <CallStatsButton />
            </div>
            <div className="relative flex size-full items-center justify-center">
                <div className="flex size-full max-w-[1000px] items-center">
                    {callLayout()}
                </div>

                <div className={`h-[40rem] hidden ml-2 ${showParticipants ? "show-block" : ""}`}>
                    <CallParticipantsList
                        onClose={() => setShowParticipants(false)} />
                </div>
            </div>

            <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
                <CallControls onLeave={() => (
                    router.push('/')
                )} />

                <DropdownMenu>
                    <div className="flex items-center">
                        <DropdownMenuTrigger className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
                            <LayoutList size={20} className='text-white' />
                        </DropdownMenuTrigger>
                    </div>
                    <DropdownMenuContent className='border-dark-1 bg-dark-1 text-white mb-5'>
                        {['grid', 'speaker-left', 'speaker-right'].map((item, idx) => (
                            <div key={idx}>
                                <DropdownMenuItem className='cursor-pointer' onClick={() => setlayout(item.toLocaleLowerCase() as CallLayoutTypes)}>
                                    {item}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className='border-dark-1' />
                            </div>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <button onClick={() => { setShowParticipants((prev) => !prev) }}>
                    <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
                        <Users size={20} className='text-white' />
                    </div>
                </button>

                {!isPersonalRoom && <EndCallButton />}
            </div>
        </section>
    )
}

export default MeetingRoom