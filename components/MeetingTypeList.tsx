'use client';

import React, { useState } from 'react'
import Card from './Card';
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from "@/components/ui/use-toast"


const MeetingTypeList = () => {

    const { user } = useUser();
    const { toast } = useToast()
    const router = useRouter();
    const client = useStreamVideoClient();
    const [meetingState, setMeetingState] = useState<'isJoining' | 'isSchedule' | 'isInstant' | undefined>()
    const [values, setValues] = useState({
        DateTime: new Date(),
        desc: '',
        link: ''
    })
    const [callDetails, setCallDetails] = useState<Call>()

    const createMeeting = async () => {
        if (!client || !user) return;

        try {

            if(!values.DateTime) {
                toast({ title: 'Please Select A Date & Time' })
                return;
            }
            const meetID = crypto.randomUUID();
            const call = client.call('default', meetID);

            if (!call) throw new Error('Failed to create a meeting');
            const startsAt = values.DateTime.toISOString() || new Date(Date.now()).toISOString();
            const description = values.desc || 'Instant Meeting';

            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description
                    }
                }
            })

            setCallDetails(call);

            if (!values.desc) {
                router.push(`/meeting/${call.id}`);
            }
            toast({ title: 'Meeting Created' })

        } catch (error) {
            toast({ title: 'Failed to create a meeting' })
        }
    }


    return (
        <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
            {/* add-meeting */}
            <Card
                iconURL='/icons/add-meeting.svg'
                cardName='New Meeting'
                cardDesc='Start An Instant Meeting'
                color='bg-orange-1'
                handleClick={() => { setMeetingState('isInstant') }}
            />
            {/* schedule meeting */}
            <Card
                iconURL='/icons/schedule.svg'
                cardName='Shedule Meeting'
                cardDesc='Schedule A Meeting'
                color='bg-blue-1'
                handleClick={() => { setMeetingState('isSchedule') }}
            />
            {/* Recordings */}
            <Card
                iconURL='/icons/recordings.svg'
                cardName='View Recordings'
                cardDesc='View Your Recordings'
                color='bg-purple-1'
                handleClick={() => { router.push('/recordings') }}
            />
            {/* join meeting */}
            <Card
                iconURL='/icons/join-meeting.svg'
                cardName='Join Meeting'
                cardDesc='Join A Meeting Via Link/ID'
                color='bg-yellow-1'
                handleClick={() => { setMeetingState('isJoining') }}
            />

            <MeetingModal
                isOpen={meetingState === 'isInstant'}
                onClose={() => { setMeetingState(undefined) }}
                title='Start An Instant Meeting'
                className='text-center'
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />
        </section>
    )
}

export default MeetingTypeList