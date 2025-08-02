<? 

require_once '../config/database.php';

class TrackInstance {
    public string $name;
    public string $category; // TODO: Replace on CategoryInstance
    public function __construct(string $track_name, string $track_category) {
        $this->name     = $track_name;
        $this->category = $track_category;
    }
}

class TrackModel {
    public function create($blob, TrackInstance $track, callable $on_error = null) {
        // TODO: Make query to db and add track

        $a = new TrackInstance('a', 's');

    }

}

?>