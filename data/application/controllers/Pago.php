<?php
defined("BASEPATH" or die("El acceso al script no está permitido"));

class Pago extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->model("pago_model");
	}

    public function getById($id)
    {
        $data = $this->pago_model->get($id);
        if($data){
            header("HTTP/1.1 200 OK");
            echo json_encode($data );
        }   
    }

    public function getAll()
    {
        $data = $this->pago_model->get();
        if($data){
            header("HTTP/1.1 200 OK");
            echo json_encode($data);
        }
    }

    public function getDetail($id)
    {
        $data = $this->pago_model->getDetail($id);
        if($data){
            header("HTTP/1.1 200 OK");
            echo json_encode($data );
        }   
    }

    public function create()
    {
        if($this->input->post("pago"))
        {
            $addNew = $this->pago_model->create($this->input->post("pago"));
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

    public function delete()		
    {
        if($this->input->post('evaluation'))
        {
            $delete = $this->pago_model->delete($this->input->post('evaluation'));		
            if($delete)		
            {
                header("HTTP/1.1 200 OK");
                echo json_encode(array("respuesta" => "success"));		
            }
            else{
                header("HTTP/1.1 500 Internal Server Error");                		
                echo json_encode(array("respuesta" => "Error al procesar los datos"));
            }		
        }
        else		
        {
            header("HTTP/1.1 400 Bad Request");		
            echo json_encode(array("respuesta" => "Faltan completar datos."));		
        }		
    }
}