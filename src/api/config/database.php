<?

class Database {
    private string|null $sqlite_path = null;
    private PDO|null $connection;
    private bool $is_initialized = false;

    private function init() {
        $file_path = 'config/database.connection.ini';
        
        if(!is_file($file_path)) throw new Exception("Connection config has not found!");
        
        try {
            $connection_config = parse_ini_file($file_path, false);

            $this->sqlite_path = $connection_config['sqlite'];
            $this->is_initialized = true;

        } catch(Exception $ex) {
            $this->is_initialized = false;
            throw new Exception($ex->getMessage());
        }
    }

    public function connect() {

        if (!$this->is_initialized) {
            try {
                $this->init();
            } catch (Exception $ex) {
                echo json_encode(["error" => "Couldn't connect to database: " . $ex->getMessage()]);
            }
        }

        $this->connection = null; // if connection exsists
        try {
            $this->connection = new PDO("sqlite:$this->sqlite_path");
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            print_r("Success!\n");
        } catch(PDOException $ex) {
            echo json_encode(['error' => 'Connection failed: ' . $ex->getMessage()]);
        }
        return $this->connection;
    }
}

?>