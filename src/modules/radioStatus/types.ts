interface NextTrack {
    Artist: string;
    Title: string;
}

export interface NowPlayingInfo {
    event_timestamp?: number;
    Artist: string;
    Duration: string;
    Listeners: string;
    TimeLeft: string;
    Title: string;
    CurrentRotation: string;
    NextTrack: NextTrack;
}

export interface PlaylistItem {
    Artist: string;
    Title: string;
    Position: string;
}

export interface ScheduleEvent {
    Position: number;
    Name: string;
    BlockTime: string;
    BlockHour: number;
    BlockName: string;
    GroupName: string;
    StartTime: number;
    TimeToStart: number;
    DayName: string;
    ActiveToday: boolean;
    Active: boolean;
}

export interface RadioStatusInfo {
    now_playing: NowPlayingInfo;
}

export interface RadioPlaylistInfo {
    playlist: PlaylistItem[];
}

export interface RadioScheduleListInfo {
    schedulelist: ScheduleEvent[];
}
