'use client';

import React, { useState } from 'react'
import Card from './Card';
import { useRouter } from 'next/navigation';
import MeetingModal from './MeetingModal';
import { useUser } from '@clerk/nextjs';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useToast } from "@/components/ui/use-toast"
import { Textarea } from './ui/textarea';
import ReactDatePicker from 'react-datepicker';
import { Input } from './ui/input';
import { Button } from './ui/button';


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

            if (!values.DateTime) {
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

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

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

            {!callDetails ? (
                <MeetingModal
                    isOpen={meetingState === 'isSchedule'}
                    onClose={() => { setMeetingState(undefined) }}
                    className='text-center'
                    title='Create a Meeting'
                    handleClick={createMeeting}
                >
                    <div className="flex flex-col gap-2.5">
                        <label className='text-base text-normal leading-[22px] text-sky-2'>Add A Description</label>
                        <Textarea className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0' onChange={(e) => {
                            setValues({ ...values, desc: e.target.value })
                        }} />
                    </div>

                    <div className='flex w-full flex-col gap-2.5'>
                        <label className='text-base text-normal leading-[22px] text-sky-2'>Select Date And Time</label>
                        <ReactDatePicker
                            selected={values.DateTime}
                            onChange={(date) => setValues({ ...values, DateTime: date! })}
                            showTimeSelect
                            timeFormat='HH:mm'
                            timeIntervals={15}
                            timeCaption='Time'
                            dateFormat="MMMM d, yyyy h:mm aa"
                            className='w-full rounded bg-dark-3 p-2 focus:outline-none'
                        />
                    </div>
                </MeetingModal>
            ) : (
                <MeetingModal
                    isOpen={meetingState === 'isSchedule'}
                    onClose={() => { setMeetingState(undefined) }}
                    title='Meeting Created Successfully'
                    className='text-center'
                    handleClick={() => {
                        navigator.clipboard.writeText(meetingLink)
                        toast({ title: "Link Copied To Clipboard" })
                    }}
                    image='/icons/checked.svg'
                    buttonIcon='icons/copy.svg'
                    buttonText="Copy Meeting Link"
                />
            )}

            <MeetingModal
                isOpen={meetingState === 'isInstant'}
                onClose={() => { setMeetingState(undefined) }}
                title='Start An Instant Meeting'
                className='text-center'
                buttonText="Start Meeting"
                handleClick={createMeeting}
            />

            <MeetingModal
                isOpen={meetingState === 'isJoining'}
                onClose={() => { setMeetingState(undefined) }}
                title='Type Meeting ID/Link'
                className='text-center'
                btnHide
                // handleClick={}
            >
                <div className="flex justify-center items-center gap-5">
                    <Input
                        type="text"
                        placeholder="Meeting ID/URL"
                        className='text-white bg-dark-3 border-none focus-visible:ring-0 focus-visible:ring-offset-0'
                        onChange={(e) => setValues({ ...values, link: e.target.value })}
                    />
                    <Button
                        type="submit"
                        className='bg-blue-1'
                        onClick={() => { router.push(`${values.link}`) }}
                    >
                        Join Meeting
                    </Button>
                </div>
            </MeetingModal>
        </section>
    )
}

export default MeetingTypeList