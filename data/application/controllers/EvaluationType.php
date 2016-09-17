<?php
defined("BASEPATH" or die("El acceso al script no está permitido"));

class EvaluationType extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->model("evaluationType_model");
	}

    public function getById($id)
    {
        $data = $this->evaluationType_model->get($id);
        if($data){
            header("HTTP/1.1 200 OK");
            echo json_encode($data );
        }else{
            header("HTTP/1.1 404 Not Found");
            echo json_encode(array("respuesta" => "failederror", 'data' => "No se encontró resultados"));
        }     
    }

    public function getAll()
    {
        $data = $this->evaluationType_model->get();
        if($data){
            header("HTTP/1.1 200 OK");
            echo json_encode($data );
        }else{
            header("HTTP/1.1 404 Not Found");
            echo json_encode(array("respuesta" => "failederror", 'data' => "No se encontró resultados"));
        }
    }

    public function create()
    {
        if($this->input->post('name'))
        {
            $data = array(
                'name' => $this->input->post('name')
            );
            $addnew = $this->evaluationType_model->create($data);		
            if($addnew)		
            {
                header("HTTP/1.1 200 OK");
                echo json_encode(array("respuesta" => "success", "data" => $addnew));		
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

    public function updateStatus()
    {
        if($this->input->post('id') && !is_null($this->input->post('status')))
        {
            $data = array(
                'id' => $this->input->post('id'),
                'status' => $this->input->post('status')
            );
            $success = $this->evaluationType_model->updateStatus($data);		
            if($success)		
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