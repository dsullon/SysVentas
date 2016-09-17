<?php
defined("BASEPATH" or die("El acceso al script no está permitido"));

class ResponseType extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->model("responseType_model");
	}

    public function getAll()
    {
    	echo json_encode($this->responseType_model->get());
    }
}