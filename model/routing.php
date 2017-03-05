<?php

    /**
     * ROUTING CLASS
     */

    class Routing {

        private $root;
        private $request;
        private $routes;
        private $route;
        private $parameter;

        function __construct(){
            $_this = $this;
            
            $this->root = __DIR__.'\..\\';
            $this->request = $_SERVER['REQUEST_URI'];
            $this->route = $this->root;
            $this->parameter = array();

            $this->routes = json_decode(file_get_contents($this->root."/model/routes.json"),true);

            if($this->routes == null){
                echo "Error on JSON file";
                exit;
            }

            $request = explode('/',$this->request);

            $indexOfApi = array_search("api",$request);
            $new_request = "";
            for($i = ($indexOfApi + 1); $i < count($request); $i ++){
                if($request[$i] != ''){
                    $new_request .= $request[$i];
                    if($i != count($request) - 1) $new_request.= '/';
                }
            }

            $this->request = $new_request;

            foreach ($this->routes as $name => $route) {
                $correspondance = true;
                //On ne s'intèsse qu'aux routes possédant un paramètre
                if(strpos($name,'{') !== false){
                    $name_expl = explode("/",$name);
                    $indexOfParam = -1;
                    foreach($name_expl as $key => $part_of_name){
                        if(strpos($part_of_name,"{") !== false){
                            $indexOfParam = $key;
                        }
                    }
                    //On regarde si on peut trouver une correspondance avec notre route demandé
                    $request_in_part = explode("/",$new_request);

                    if($request_in_part[count($request_in_part) - 1] == ""){
                        array_pop($request_in_part);
                    }
                    if($name_expl[count($name_expl) - 1] == ""){
                        array_pop($name_expl);
                    }

                    if(count($name_expl) !== count($request_in_part)){
                        $correspondance = false;
                    }

                    if($correspondance){
                        for($i=0;$i < count($name_expl); $i++){
                            if(isset($request_in_part[$i]) && isset($name_expl[$i])){
                                if($request_in_part[$i] != $name_expl[$i] && $i != $indexOfParam){
                                    $correspondance = false;
                                }
                            } else {
                                $correspondance = false;
                            }
                        }
                    }

                    if($correspondance){
                        $this->parameter = $request_in_part[$indexOfParam];
                        $this->route = $this->routes[$name]["request"];
                        break;
                    }
                } else {
                    $correspondance = false;
                }
            }

            if(!$correspondance){
                if(array_key_exists($this->request,$this->routes)){
                    $this->route = $this->routes[$this->request]["request"];
                } else {
                    $this->route = $this->routes["404/"]["request"];
                }
            }
        }

        function getRoute(){
            return $this->route;
        }

        function getParameter(){
            return $this->parameter;
        }

        function getRoot(){
            return $this->root;
        }
    }


?>
