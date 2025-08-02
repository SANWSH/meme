<?

class Database {
    private $host;
    private $db;
    private $user;
    private $pass;
    private $connection;

    private function getConnectionProps() {
        $file_path = '../config/database.connection.ini';
        
        if(!is_file($file_path)) throw new Exception("Connection config has not found!");
        $connection_config = parse_ini_file($file_path, true);

        if(!isset($connection_config->database)) throw new Exception('Parsing of the database config failed!');
    }

    public function getConnection() {
        $this->connection = null;
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