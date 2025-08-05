<? 

require_once 'config/database.php';

class TrackModel {
    private PDO|null $dbc = null;


    private function create_connection() {
        $db = new Database();
        $this->dbc = $db->connect();
        print_r("Create connection...\n");
        return $this->dbc;
    }
    private function check_connection() {
        return $this->dbc ?? $this->create_connection();
    }


    /**
     * @return array[string] - ['track_id', 'track_name', 'category_id']
     */ 
    public function get_track_by_name($track_name) {
        $this->check_connection();

        $statement = 
        $this->dbc->query("select 
        t.id as track_id, t.view_name as track_name, c.view_name as category_name
        from track as t 
        left join category as c on t.category_id = c.id
        where t.name = :var_name");
        
        $statement->bindValue("var_name", $track_name);
        $statement->execute();

        $res = ['data' => []];
        while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
            array_push($res['data'], $row);
        }

        return $res;
    }

    public function get_tracks_in_category($category) {
        $statement = 
        $this->dbc->query("select 
        t.id as track_id, t.view_name as track_name, t.blob as blob, c.view_name as category
        from track as t
        left join category as c on t.category_id = c.id
        where c.name = :var_name;");

        $statement->bindValue('var_name', $category);
        $statement->execute();

        $res = ['data' => []];
        while ($row = $statement->fetch(PDO::FETCH_ASSOC)) {
            array_push($res['data'], $row);
        }

        return $res;
    }

}

?>