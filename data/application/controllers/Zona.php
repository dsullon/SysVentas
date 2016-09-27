<?php
defined("BASEPATH" or die("El acceso al script no está permitido"));

class Zona extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->model("zona_model");
	}
    
    public function getAll()
    {
        $data = $this->zona_model->get();
        if($data){
            header("HTTP/1.1 200 OK");
            echo json_encode($data );
        }
    }
}