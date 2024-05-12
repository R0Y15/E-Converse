import { ReactNode } from "react";

export const sideBarLinks = [
    {
        label: 'Home',
        route: '/',
        imgUrl: '/icons/home-icn.svg'
    },
    {
        label: 'Upcoming',
        route: '/upcoming',
        imgUrl: '/icons/upcoming.svg'
    },
    {
        label: 'Previous',
        route: '/previous',
        imgUrl: '/icons/previous.svg'
    },
    {
        label: 'Recordings',
        route: '/recordings',
        imgUrl: '/icons/cam.svg'
    },
    {
        label: 'Personal Room',
        route: '/room',
        imgUrl: '/icons/add-room.svg'
    },
]

export interface CardProps {
    iconURL: string;
    cardName: string;
    cardDesc: string;
    color: string;
    handleClick?: () => void;
}

export interface MeetingModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    handleClick?: () => void;
    className?: string;
    buttonText?: string;
    children?: ReactNode;
    image?: string;
    buttonIcon?: string;
    btnHide?: boolean;
}

export interface MeetingSetupProps {
    setupStatus: (value: boolean) => void;
}

export interface MeetingCardProps {
    title: string,
    date: string,
    icon: string,
    link: string,
    isPreviousMeeting?: boolean,
    buttonIcon1?: string,
    buttonText?: string,
    handleClick?: () => void,
    deleteMeeting?: () => void
}

export const avatarImages = [
    '/images/avatar-1.jpeg',
    '/images/avatar-2.jpeg',
    '/images/avatar-3.png',
    '/images/avatar-4.png',
    '/images/avatar-5.png',
]

export type CallLayoutTypes = 'speaker-left' | 'speaker-right' | 'grid' 