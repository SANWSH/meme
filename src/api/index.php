<? 

require_once 'middlewares/cors.php';
require_once 'router.php';
require_once 'controller/testController.php';

$router = new Router();

$router->add('GET', '/test', 'TestController::read')  ;

$router->listen();

?>