<?php
defined("BASEPATH" or die("El acceso al script no está permitido"));

class Factura extends CI_Controller
{
	public function __construct()
	{
		parent::__construct();
		$this->load->model("factura_model");
	}

    public function getById($id)
    {
        $data = $this->factura_model->get($id);
        if($data){
            header("HTTP/1.1 200 OK");
            echo json_encode($data );
        }   
    }

    public function getAll()
    {
        $data = $this->factura_model->get();
        if($data){
            header("HTTP/1.1 200 OK");
            echo json_encode($data );
        }
    }

    public function create()
    {
        if($this->input->post("factura"))
        {
            $addNew = $this->factura_model->create($this->input->post("factura"));
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

    public function delete()		
    {
        if($this->input->post('evaluation'))
        {
            $delete = $this->factura_model->delete($this->input->post('evaluation'));		
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