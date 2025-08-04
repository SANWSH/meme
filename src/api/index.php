<? 

require_once 'middlewares/headers.php';
require_once 'router.php';

require_once 'model/track.php';
require_once 'config/database.php';

$router = new Router();

#region test_area
    $tracks = new TrackModel();
    $tracks->get_track_by_name("test");
#endregion

$router->listen();

?>