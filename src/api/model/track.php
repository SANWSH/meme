<? 

require_once 'config/database.php';

class TrackInstance {
    public readonly string $name;
    public readonly CategoryInstance $category;
    public function __construct(string $track_name, CategoryInstance $track_category) {
        $this->name     = $track_name;
        $this->category = $track_category;
    }
}

class TrackModel {
    private $dbc = null;
    // Output: id, track name, category name
    public function get_track_by_name($track_name) {
        if (!$this->dbc) {
            $db = new Database();
            $this->dbc = $db->connect();
        }

        $statement = 
        $this->dbc->query("select 
        t.id as track_id, t.view_name as track_name, c.view_name as category_name
        from track as t 
        left join category as c on t.category_id = c.id;");

        $statement->execute();
        $res = $statement->fetch(PDO::FETCH_ASSOC);

        echo json_encode(['data' => $res]);
    }

}

?>