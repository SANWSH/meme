<? 

require_once 'middlewares/headers.php';
require_once 'router.php';

require_once 'model/track.php';
require_once 'config/database.php';

$router = new Router();

#region test_area
    $tracks = new TrackModel();
    $tracksbyname = $tracks->get_track_by_name("test");
    echo join($tracksbyname);
    $tracksincat = $tracks->get_tracks_in_category("TSE");
    echo join($tracksincat);
#endregion

$router->listen();

?>