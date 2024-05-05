import { ReactNode } from "react";

export const sideBarLinks = [
    {
        label: 'Home',
        route: '/',
        imgUrl: '/icons/home.svg'
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
        imgUrl: '/icons/video.svg'
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
    handleClick: () => void;
    className?: string;
    buttonText?: string;
    children?: ReactNode;
    image?: string;
    buttonIcon?: string;
}

export interface MeetingSetupProps {
    setupStatus: (value: boolean) => void;
}