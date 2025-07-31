<?

class Database {
    private $host = 'localhost';
    private $db   = 'your_db';
    private $user = 'your_user';
    private $pass = 'your_pass';
    private $connection;

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