<? 

require_once 'middlewares/headers.php';
require_once 'router.php';
require_once 'controller/testController.php';
require_once 'model/playlist.php';

$router = new Router();

#region test_area
    $playlist = new Playlist();
    $playlist->init_playlist('./config/TrackList.ini');
#endregion

$router->add('GET', '/test', 'TestController::read')  ;

$router->listen();

?>