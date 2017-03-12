<?php

    class Main {

        private $className;
        protected $id;
        protected $pdo;
        protected $fields = [];

        public function __construct($id = 0){
            $this->className = get_class($this);
            $this->id = $id;
            $this->pdo = database::getPdo();
        }

    }

?>
