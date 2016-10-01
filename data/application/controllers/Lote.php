<?php
defined("BASEPATH" or die("El acceso al script no está permitido"));

class Lote extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->model("lote_model");
	}

    public function getById($id)
    {
        $data = $this->lote_model->get($id);
        if($data){
            header("HTTP/1.1 200 OK");
            echo json_encode($data );
        }   
    }

    public function getAll()
    {
        $data = $this->lote_model->get();
        if($data){
            header("HTTP/1.1 200 OK");
            echo json_encode($data );
        }
    }
}