<? 

require_once 'middlewares/headers.php';
require_once 'router.php';

require_once 'model/track.php';
require_once 'config/database.php';

$router = new Router();



$router->listen();

?>