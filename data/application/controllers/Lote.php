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

    public function create()
    {
        if($this->input->post("lote"))
        {
            $addNew = $this->lote_model->create($this->input->post("lote"));
            if($addNew)
            { 
                header("HTTP/1.1 200 OK");
                echo json_encode(array("respuesta" => "success", 'data' => $addNew));
            }
            else
            {   
                header("HTTP/1.1 500 Internal Server Error");                
                echo json_encode(array("respuesta" => "Error al procesar los datos."));
            }
        }
        else
        {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(array("respuesta" => "Faltan completar datos."));
        }
    }

    public function update()
    {
        if($this->input->post("lote"))
        {
            $addNew = $this->lote_model->update($this->input->post("lote"));
            if($addNew)
            { 
                header("HTTP/1.1 200 OK");
                echo json_encode(array("respuesta" => "success"));
            }
            else
            {   
                header("HTTP/1.1 500 Internal Server Error");                
                echo json_encode(array("respuesta" => "Error al procesar los datos."));
            }
        }
        else
        {
            header("HTTP/1.1 400 Bad Request");
            echo json_encode(array("respuesta" => "Faltan completar datos."));
        }
    }
}