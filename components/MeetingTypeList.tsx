'use client';

import Image from 'next/image';
import React, { useState } from 'react'
import Card from './Card';
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';

const MeetingTypeList = () => {

    const createMeeting = () => {

    }

    const router = useRouter();
    const [meetingState, setMeetingState] = useState<'isJoining' | 'isSchedule' | 'isInstant' | undefined>()

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