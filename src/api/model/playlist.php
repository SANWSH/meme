<?

class Playlist {
    private $defaultPlaylistSettings = [];
    private $playlist = [];

    private function compose_tracks($tracks) {
        foreach($tracks as $track) {
            [$track_path, $track_name] = explode("|", $track, 2);
            $this->playlist[] = [$track_name => $track_path];
        }

        var_dump($this->playlist);
    }
    private function read_config_file($path) {
        if (!file_exists($path)) return;    
        
        $tracks = parse_ini_file($path, false);
        $this->compose_tracks($tracks);

        return $tracks;
    }

    public function init_playlist($path) {
        $this->read_config_file($path);
    }
}

?>