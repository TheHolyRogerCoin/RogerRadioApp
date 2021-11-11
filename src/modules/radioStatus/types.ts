interface NextTrack {
    Artist: string;
    Title: string;
}

export interface NowPlayingInfo {
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

export interface RadioStatusInfo {
    now_playing: NowPlayingInfo;
}

export interface RadioPlaylistInfo {
    playlist: PlaylistItem[];
}
