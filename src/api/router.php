<?

class Router {
    
    private $routes = [];

    private function callback($function) {
        if (is_callable($function)) {
            $function();
        } elseif (is_string($function) && strpos($function ,'::') !== false) {
            [$class, $method] = explode('::', $function, 2);
            $instance = new $class();
            $instance->$method();
        } else {
            throw new Exception("Invalid callback $function:" . print_r($function, true));
        }
    }

    public function add(string $method, string $uri, $handler, $middleware = null) {
        $this->routes[] = [
            'method'     => $method,
            'uri'        => parse_url($uri),
            'handler'    => $handler,
            'middleware' => $middleware
        ];
    }

    public function listen() {
        foreach ($this->routes as $route) {
            if ($route['uri'] === $_SERVER['REQUEST_URI'] && $route['method'] === $_SERVER['REQUEST_METHOD']) {

                if ($route['middleware']) {
                    $this->callback($route['middleware']);
                }

                if ($route['handler']) {
                    $this->callback($route['handler']);
                }

                return;

            }
        }
    }

}

?>