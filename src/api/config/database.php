<?

class Database {
    private string|null $host = null;
    private string|null $db   = null;
    private string|null $user = null;
    private string|null $pass = null;
    private PDO|null $connection = null;

    private bool $is_initialized = false;

    private function init() {
        $file_path = '../config/database.connection.ini';
        
        if(!is_file($file_path)) throw new Exception("Connection config has not found!");
        
        try {
            $connection_config = parse_ini_file($file_path, true);

            $this->host = $connection_config['host'];
            $this->db   = $connection_config['db'];
            $this->user = $connection_config['user'];
            $this->pass = $connection_config['pass'];
            $this->is_initialized = true;

        } catch(ErrorException $ex) {
            $this->is_initialized = false;
            throw new Exception($ex->getMessage());
        }

    
    }

    public function connect() {

        if (!$this->is_initialized) {
            try {
                $this->init();
            } catch (ErrorException $ex) {
                echo json_encode(["error" => "Couldn't connect to database: " . $ex->getMessage()]);
            }
        }

        $this->connection = null; // if connection exsists
        try {
            $this->connection = new PDO(
                "mysql:host={$this->host};dbname={$this->db}",
                $this->user,
                $this->pass
            );
            $this->connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch(PDOException $ex) {
            echo json_encode(['error' => 'Connection failed: ' . $ex->getMessage()]);
        }
        return $this->connection;
    }
}

?>