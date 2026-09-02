export interface Project {
    id: number;
    title: string;
    url?: string;
    liveUrl?: string;
    description: string;
    tags: string[];
    icon?: string;
    media?: string;
    mediaWidth?: number;
    mediaHeight?: number;
}